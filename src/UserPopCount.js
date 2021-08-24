import { writable } from 'svelte/store'
import { getStorage, setStorage } from './Storage'
import { addUnuploaded } from './PopUploader'
import { waifuId as currentWaifuIdWriteable } from './Waifu'

function waifuKey (waifuId) {
  return `waifu.${waifuId}.userpop.total`
}
function getUserPopCount (waifuId) {
  return getStorage(waifuKey(waifuId)) || 0
}
function setUserPopCount (waifuId, userPopCount) {
  return setStorage(waifuKey(waifuId), userPopCount)
}

const waifuPopRecord = writable(0)
let waifuId = ''
currentWaifuIdWriteable.subscribe((value) => {
  waifuId = value
  waifuPopRecord.set(getUserPopCount(waifuId))
})
export const userPopCount = {
  subscribe: waifuPopRecord.subscribe,
  add: (addNum) => {
    if (!waifuId) return
    const oldCount = getUserPopCount(waifuId)
    const count = oldCount + addNum
    waifuPopRecord.set(count)
    setUserPopCount(waifuId, count)
    addUnuploaded(waifuId, addNum)
  }
}
