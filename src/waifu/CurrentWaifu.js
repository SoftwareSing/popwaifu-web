import { writable } from 'svelte/store'
import { Waifu } from './Waifu'

let current = new Waifu()
const currentWritable = writable(current)
let unsubscribe = () => {}

export const currentWaifu = {
  subscribe: currentWritable.subscribe,
  update: currentWritable.update,
  /**
   * @param {Waifu} waifu
   */
  change: function (waifu) {
    unsubscribe()
    current = waifu
    unsubscribe = waifu.subscribe((waifu) => {
      currentWritable.set(waifu)
    })
  },
  get: function () {
    return current
  }
}
