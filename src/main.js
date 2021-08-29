import App from './App.svelte'
import { initWaifuManager } from './waifu/WaifuManager'

initWaifuManager()

const app = new App({
  target: document.body,
  props: {}
})

export default app
