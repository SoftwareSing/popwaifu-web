import { writable } from 'svelte/store'
import { reloadWaifuTime } from './config'

/**
 * @typedef {import('svelte/store').Writable<Waifu>} WaifuWritable
 */

/**
 * @type {Map<String, WaifuWritable}
 */
const waifuMap = new Map()

export class Waifu {
  constructor ({ waifuId, name, imgNormalUrl, imgPopUrl, imgInfo, popAudioUrl, popAudioInfo, popCount }) {
    this.waifuId = waifuId
    this.name = name
    this.imgNormalUrl = imgNormalUrl
    this.imgPopUrl = imgPopUrl
    this.imgInfo = imgInfo
    this.popAudioUrl = popAudioUrl
    this.popAudioInfo = popAudioInfo
    this.popCount = popCount
    this.newPopCount = popCount
    this.pps = 0
  }

  update ({ name, imgNormalUrl, imgPopUrl, imgInfo, popAudioUrl, popAudioInfo, popCount }) {
    this.name = name
    this.imgNormalUrl = imgNormalUrl
    this.imgPopUrl = imgPopUrl
    this.imgInfo = imgInfo
    this.popAudioUrl = popAudioUrl
    this.popAudioInfo = popAudioInfo

    this.newPopCount = popCount
    this.pps = (this.newPopCount - this.popCount) / reloadWaifuTime
  }
}

export function buildWaifu ({ waifuId, name, imgNormalUrl, imgPopUrl, imgInfo, popAudioUrl, popAudioInfo, popCount }) {
  if (waifuMap.has(waifuId)) {
    return updateWaifu(waifuId, { name, imgNormalUrl, imgPopUrl, imgInfo, popAudioUrl, popAudioInfo, popCount })
  }

  const waifu = new Waifu({ waifuId, name, imgNormalUrl, imgPopUrl, imgInfo, popAudioUrl, popAudioInfo, popCount })
  const waifuWritable = writable(waifu)
  waifuMap.set(waifuId, waifuWritable)

  return waifuWritable
}

export function updateWaifu (waifuId, { name, imgNormalUrl, imgPopUrl, imgInfo, popAudioUrl, popAudioInfo, popCount }) {
  const waifuWritable = waifuMap.get(waifuId)
  waifuWritable.update((waifu) => {
    waifu.update({ name, imgNormalUrl, imgPopUrl, imgInfo, popAudioUrl, popAudioInfo, popCount })
    return waifu
  })
  return waifuWritable
}

export function findWaifu (waifuId) {
  return waifuMap.get(waifuId)
}
