import { writable } from 'svelte/store'
import { Waifu } from './Waifu'

const current = writable(new Waifu())
let unsubscribe = () => {}

export const currentWaifu = {
  subscribe: current.subscribe,
  update: current.update,
  /**
   * @param {Waifu} waifu
   */
  change: function (waifu) {
    unsubscribe()
    unsubscribe = waifu.subscribe((waifu) => {
      current.set(waifu)
    })
  }
}
