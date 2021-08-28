import { writable } from 'svelte/store'
import { Waifu } from './Waifu'

const current = writable(new Waifu())
let unsubscribe = () => {}

let originWaifuWritable = writable()

export const currentWaifu = {
  subscribe: current.subscribe,
  /**
   * @param {import('svelte/store').Writable<Waifu>} waifuWritable
   */
  change: function (waifuWritable) {
    unsubscribe()
    originWaifuWritable = waifuWritable
    unsubscribe = waifuWritable.subscribe((waifu) => {
      current.set(waifu)
    })
  },
  /**
   * @param {import('svelte/store').Updater<Waifu>} updater
   */
  update: function (updater) {
    return originWaifuWritable.update(updater)
  }
}
