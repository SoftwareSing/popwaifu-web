import { writable } from 'svelte/store'
import { reloadWaifuTime, reloadPopCountTime, defaultModeName } from '../config'
import { randomNumber } from '../utils/randomNumber'
/**
 * @typedef {Object} ModeConfig
 * @property {String} modeName
 * @property {String} imgNormalUrl
 * @property {String} imgPopUrl
 * @property {String} [imgIconUrl]
 * @property {String} [imgInfo]
 * @property {String} [audioNormalUrl]
 * @property {String} [audioPopUrl]
 * @property {String} [audioInfo]
 */
/**
 * @typedef {Object} WaifuData
 * @property {String} waifuId
 * @property {String} urlId
 * @property {String} name
 * @property {Number} popCount
 * @property {Array<ModeConfig>} modeConfigList
 */

export class Waifu {
  /**
   * @param {WaifuData} waifuData
   */
  constructor ({ waifuId, urlId, name, popCount, modeConfigList } = forLoadingWaifuData) {
    this.writable = writable(this)
    this.subscribe = this.writable.subscribe

    this.waifuId = waifuId
    this.urlId = urlId
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
      (this.newPopCount - this.popCount) /
      ((reloadWaifuTime + randomNumber({ min: 100, max: 500 })) / reloadPopCountTime)
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
    if (!this.modeConfigMap.has(modeName)) modeName = defaultModeName
    if (this.modeName === modeName) return

    this.modeName = modeName
    this.writable.set(this)
    return this
  }

  assignDisplayObject (target = {}) {
    target.waifuId = this.waifuId
    target.urlId = this.urlId
    target.url = this.url
    target.name = this.name
    target.popCount = this.popCount
    target.pps = this.pps
    target.modeName = this.modeName
    target.imgNormalUrl = this.imgNormalUrl
    target.imgPopUrl = this.imgPopUrl
    target.imgIconUrl = this.imgIconUrl
    target.imgInfo = this.imgInfo
    target.audioNormalUrl = this.audioNormalUrl
    target.audioPopUrl = this.audioPopUrl
    target.audioInfo = this.audioInfo
    return target
  }

  get url () {
    return this.modeName === defaultModeName
      ? `/${this.urlId}`
      : `/${this.urlId}/${this.modeName}`
  }

  get modeUrlList () {
    return [...this.modeConfigMap.keys()].map((mode) => {
      const url = mode === defaultModeName ? `/${this.urlId}` : `/${this.urlId}/${mode}`
      return [mode, url]
    })
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

  get imgIconUrl () {
    return this.currentModeConfig.imgIconUrl
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
    modeConfig.imgIconUrl = modeConfig.imgIconUrl ? formatUrl(modeConfig.imgIconUrl) : ''
    modeConfig.audioNormalUrl = formatUrl(modeConfig.audioNormalUrl)
    modeConfig.audioPopUrl = formatUrl(modeConfig.audioPopUrl)
  }
  return new Map(modeConfigList.map((modeConfig) => [modeConfig.modeName, modeConfig]))
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
      imgIconUrl: '',
      imgInfo: '',
      audioNormalUrl: '',
      audioPopUrl: '',
      audioInfo: ''
    }
  ]
}
