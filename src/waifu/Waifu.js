import { writable } from 'svelte/store'
import { reloadWaifuTime } from '../config'

const reloadPopCountTime = 60
const defaultModeName = 'default'

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
    this.writable = writable(this)
    this.subscribe = this.writable.subscribe

    this.waifuId = waifuId
    this.name = name

    this.popCount = popCount
    this.newPopCount = popCount
    this.pps = 0

    this.modeConfigMap = transModeConfigListToMap(modeConfigList)
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

    this.modeConfigMap = transModeConfigListToMap(modeConfigList)
    if (!this.modeConfigMap.has(this.modeName)) {
      this.modeName = defaultModeName
    }

    this.writable.set(this)
    return this
  }

  reloadPopCount () {
    if (this.popCount === this.newPopCount) return

    const reloadCount = this.popCount + this.reloadAddNum
    if (this.popCount < this.newPopCount && reloadCount > this.newPopCount) this.popCount = this.newPopCount
    else if (this.popCount > this.newPopCount && reloadCount < this.newPopCount) this.popCount = this.newPopCount
    else this.popCount = reloadCount

    this.writable.set(this)
    return this
  }

  changeMode (modeName) {
    if (!this.modeConfigMap.has(modeName)) return
    this.modeName = modeName

    this.writable.set(this)
    return this
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

function formatUrl (url) {
  if (!url) return `${window.location.origin}/`
  return /^\//.test(url) ? `${window.location.origin}${url}` : url
}

/**
 * @param {Array<ModeConfig>} modeConfigList
 */
function transModeConfigListToMap (modeConfigList) {
  for (const modeConfig of modeConfigList) {
    modeConfig.imgNormalUrl = formatUrl(modeConfig.imgNormalUrl)
    modeConfig.imgPopUrl = formatUrl(modeConfig.imgPopUrl)
    modeConfig.audioNormalUrl = formatUrl(modeConfig.audioNormalUrl)
    modeConfig.audioPopUrl = formatUrl(modeConfig.audioPopUrl)
  }
  return new Map(modeConfigList.map((modeConfig) => [modeConfig.modeName, modeConfig]))
}

/**
 * @type {Map<String, Waifu}
 */
const waifuMap = new Map()

export const reloadPopEvent = writable(Date.now())
setInterval(() => {
  for (const waifu of waifuMap.values()) {
    waifu.reloadPopCount()
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
  waifuMap.set(waifu.waifuId, waifu)

  return waifu
}

/**
 * @param {String} waifuId
 * @param {WaifuData} waifuData
 */
export function updateWaifu (waifuId, waifuData) {
  const waifu = waifuMap.get(waifuId)
  waifu.update(waifuData)
  return waifu
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
