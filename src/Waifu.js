import { writable } from 'svelte/store'
import { reloadWaifuTime } from './config'

const reloadPopCountTime = 60

/**
 * @typedef {import('svelte/store').Writable<Waifu>} WaifuWritable
 */

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
    this.pps = (this.newPopCount - this.popCount) / (reloadWaifuTime / 1000)
    this.reloadAddNum = Math.ceil(
      (this.newPopCount - this.popCount) / ((reloadWaifuTime + 500) / reloadPopCountTime)
    )
  }

  reloadPopCount () {
    if (this.popCount === this.newPopCount) return

    const reloadCount = this.popCount + this.reloadAddNum
    if (this.popCount < this.newPopCount && reloadCount > this.newPopCount) this.popCount = this.newPopCount
    else if (this.popCount > this.newPopCount && reloadCount < this.newPopCount) this.popCount = this.newPopCount
    else this.popCount = reloadCount
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
