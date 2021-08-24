import { writable } from 'svelte/store'
import { Waifu } from './Waifu'

const current = writable(new Waifu({}))
let unsubscribe = writable().subscribe(() => {})

export const currentWaifu = {
  subscribe: current.subscribe,
  /**
   * @param {import('svelte/store').Writable<Waifu>} waifuWritable
   */
  change: function (waifuWritable) {
    unsubscribe()
    unsubscribe = waifuWritable.subscribe((waifu) => {
      current.set(waifu)
    })
  }
}
