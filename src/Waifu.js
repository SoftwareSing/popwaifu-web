import { writable } from 'svelte/store'

export let waifuId = writable()
export let name = writable()
export let imgNormalUrl = writable('')
export let imgPopUrl = writable('')
export let imgInfo = writable()
export let popAudioUrl = writable()
export let popAudioInfo = writable()
export let popCount = writable()
