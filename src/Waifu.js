import { writable } from 'svelte/store'
import { reloadWaifuTime } from './config'

const reloadPopCountTime = 60
const defaultModeName = 'default'

/**
 * @typedef {import('svelte/store').Writable<Waifu>} WaifuWritable
 */
/**
 * @typedef {Object} ModeConfig
 * @property {String} modeName
 * @property {String} imgNormalUrl
 * @property {String} imgPopUrl
 * @property {String} [imgInfo]
 * @property {String} [audioNormalUrl]
 * @property {String} [audioPopUrl]
 * @property {String} [audioInfo]
 */
/**
 * @typedef {Object} WaifuData
 * @property {String} waifuId
 * @property {String} name
 * @property {Number} popCount
 * @property {Array<ModeConfig>} modeConfigList
 */

export class Waifu {
  /**
   * @param {WaifuData} waifuData
   */
  constructor ({ waifuId, name, popCount, modeConfigList } = forLoadingWaifuData) {
    this.waifuId = waifuId
    this.name = name

    this.popCount = popCount
    this.newPopCount = popCount
    this.pps = 0

    this.modeConfigMap = new Map(modeConfigList.map((modeConfig) => [modeConfig.modeName, modeConfig]))
    this.modeName = defaultModeName
  }

  /**
   * @param {Object} waifuData
   * @param {String} waifuData.name
   * @param {Number} waifuData.popCount
   * @param {Array<ModeConfig>} waifuData.modeConfigList
   */
  update ({ name, popCount, modeConfigList }) {
    this.name = name

    this.newPopCount = popCount
    this.pps = (this.newPopCount - this.popCount) / (reloadWaifuTime / 1000)
    this.reloadAddNum = Math.ceil(
      (this.newPopCount - this.popCount) / ((reloadWaifuTime + 500) / reloadPopCountTime)
    )

    this.modeConfigMap = new Map(modeConfigList.map((modeConfig) => [modeConfig.modeName, modeConfig]))
    if (!this.modeConfigMap.has(this.modeName)) {
      this.modeName = defaultModeName
    }
  }

  reloadPopCount () {
    if (this.popCount === this.newPopCount) return

    const reloadCount = this.popCount + this.reloadAddNum
    if (this.popCount < this.newPopCount && reloadCount > this.newPopCount) this.popCount = this.newPopCount
    else if (this.popCount > this.newPopCount && reloadCount < this.newPopCount) this.popCount = this.newPopCount
    else this.popCount = reloadCount
  }

  changeMode (modeName) {
    if (!this.modeConfigMap.has(modeName)) return
    this.modeName = modeName
  }

  assignDisplayObject (target = {}) {
    target.waifuId = this.waifuId
    target.name = this.name
    target.popCount = this.popCount
    target.pps = this.pps
    target.modeName = this.modeName
    target.imgNormalUrl = this.imgNormalUrl
    target.imgPopUrl = this.imgPopUrl
    target.imgInfo = this.imgInfo
    target.audioNormalUrl = this.audioNormalUrl
    target.audioPopUrl = this.audioPopUrl
    target.audioInfo = this.audioInfo
    return target
  }

  get currentModeConfig () {
    return this.modeConfigMap.get(this.modeName)
  }

  get imgNormalUrl () {
    return this.currentModeConfig.imgNormalUrl
  }

  get imgPopUrl () {
    return this.currentModeConfig.imgPopUrl
  }

  get imgInfo () {
    return this.currentModeConfig.imgInfo
  }

  get audioNormalUrl () {
    return this.currentModeConfig.audioNormalUrl
  }

  get audioPopUrl () {
    return this.currentModeConfig.audioPopUrl
  }

  get audioInfo () {
    return this.currentModeConfig.audioInfo
  }
}

/**
 * @type {Map<String, WaifuWritable}
 */
const waifuMap = new Map()

export const reloadPopEvent = writable(Date.now())
setInterval(() => {
  for (const waifuWritable of waifuMap.values()) {
    waifuWritable.update((waifu) => {
      waifu.reloadPopCount()
      return waifu
    })
  }
  reloadPopEvent.set(Date.now())
}, reloadPopCountTime)

/**
 * @param {WaifuData} waifuData
 */
export function buildWaifu (waifuData) {
  if (waifuMap.has(waifuData.waifuId)) {
    return updateWaifu(waifuData.waifuId, waifuData)
  }

  const waifu = new Waifu(waifuData)
  const waifuWritable = writable(waifu)
  waifuMap.set(waifu.waifuId, waifuWritable)

  return waifuWritable
}

/**
 * @param {String} waifuId
 * @param {WaifuData} waifuData
 */
export function updateWaifu (waifuId, waifuData) {
  const waifuWritable = waifuMap.get(waifuId)
  waifuWritable.update((waifu) => {
    waifu.update(waifuData)
    return waifu
  })
  return waifuWritable
}

export function findWaifu (waifuId) {
  return waifuMap.get(waifuId)
}

const forLoadingWaifuData = {
  waifuId: 'loadingId',
  name: 'loading',
  popCount: 0,
  modeConfigList: [
    {
      modeName: 'default',
      imgNormalUrl: '',
      imgPopUrl: '',
      imgInfo: '',
      audioNormalUrl: '',
      audioPopUrl: '',
      audioInfo: ''
    }
  ]
}
