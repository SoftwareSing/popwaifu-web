import { writable } from 'svelte/store'
import { send } from '../utils/HttpSend'
import { Waifu } from './Waifu'
import { syncWaifuTime, reloadPopCountTime } from '../config'
/**
 * @typedef {import('./Waifu').WaifuData} WaifuData
 */

/**
 * @type {Map<String, Waifu}
 */
const waifuIdMap = new Map()
/**
 * @type {Map<String, Waifu>}
 */
const waifuUrlIdMap = new Map()
export const syncServerWaifuEvent = writable(Date.now())
export const reloadPopEvent = writable(Date.now())

export async function initWaifuManager () {
  await intervalSyncWaifuList()
  setInterval(reloadEveryPopCount, reloadPopCountTime)
}

function reloadEveryPopCount () {
  for (const waifu of waifuIdMap.values()) {
    waifu.reloadPopCount()
  }
  reloadPopEvent.set(Date.now())
}

async function intervalSyncWaifuList () {
  try {
    await syncServerWaifuList()
  } finally {
    setTimeout(intervalSyncWaifuList, syncWaifuTime)
  }
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
  if (waifuIdMap.has(waifuData.waifuId)) {
    return updateWaifu(waifuData.waifuId, waifuData)
  }

  const waifu = new Waifu(waifuData)
  waifuIdMap.set(waifu.waifuId, waifu)
  waifuUrlIdMap.set(waifu.urlId, waifu)

  return waifu
}

/**
  * @param {String} waifuId
  * @param {WaifuData} waifuData
  */
export function updateWaifu (waifuId, waifuData) {
  const waifu = waifuIdMap.get(waifuId)
  waifu.update(waifuData)
  return waifu
}

export function findWaifuById (waifuId) {
  return waifuIdMap.get(waifuId)
}

export function findWaifuByUrlId (urlId) {
  return waifuUrlIdMap.get(urlId)
}

export function getWaifuList () {
  return [...waifuIdMap.values()]
}
