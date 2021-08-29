import { writable } from 'svelte/store'
import { send } from '../utils/HttpSend'
import { Waifu } from './Waifu'
import { currentWaifu } from './CurrentWaifu'
import { reloadWaifuTime, reloadPopCountTime } from '../config'
/**
 * @typedef {import('./Waifu').WaifuData} WaifuData
 */

/**
 * @type {Map<String, Waifu}
 */
const waifuMap = new Map()
export const syncServerWaifuEvent = writable(Date.now())
export const reloadPopEvent = writable(Date.now())

export async function initWaifuManager () {
  const waifuList = await syncServerWaifuList()
  waifuList.sort((a, b) => b.popCount - a.popCount)
  currentWaifu.change(waifuList[0])

  setInterval(syncServerWaifuList, reloadWaifuTime)
  setInterval(reloadEveryPopCount, reloadPopCountTime)
}

function reloadEveryPopCount () {
  for (const waifu of waifuMap.values()) {
    waifu.reloadPopCount()
  }
  reloadPopEvent.set(Date.now())
}

async function syncServerWaifuList () {
  /**
   * @type {Array<WaifuData>}
   */
  const list = await send('GET', '/api/v1/waifu/list')
  const waifuList = list.map(buildWaifu)

  syncServerWaifuEvent.set(Date.now())
  return waifuList
}

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

export function getWaifuList () {
  return [...waifuMap.values()]
}
