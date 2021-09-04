<script>
  import { onDestroy } from 'svelte'
  import PageHead from './PageHead.svelte'
  import Pop from './Pop.svelte'
  import WaifuInfo from './WaifuInfo.svelte'
  import WaifuList from './WaifuList.svelte'
  import { currentWaifu } from './waifu/CurrentWaifu'
  import { findWaifuByUrlId, syncServerWaifuEvent } from './waifu/WaifuManager'

  export let urlId = ''
  export let mode
  $: if (urlId) {
    const waifu = findWaifuByUrlId(urlId)
    if (waifu) {
      waifu.changeMode(mode)
      currentWaifu.change(waifu)
    } else {
      changeCurrentAfterSync()
    }
  }

  let unsubscribeSyncEvent
  function changeCurrentAfterSync () {
    if (unsubscribeSyncEvent) return

    unsubscribeSyncEvent = () => {}
    unsubscribeSyncEvent = syncServerWaifuEvent.subscribe(() => {
      const waifu = findWaifuByUrlId(urlId)
      if (!waifu) return

      if (mode) waifu.changeMode(mode)
      currentWaifu.change(waifu)
      unsubscribeSyncEvent()
      unsubscribeSyncEvent = undefined
    })
  }

  onDestroy(() => {
    if (unsubscribeSyncEvent) unsubscribeSyncEvent()
  })
</script>

<PageHead title={$currentWaifu.name} description={`Click ${$currentWaifu.name}`} image={$currentWaifu.imgIconUrl} />

<div class="pop-page">
  <div class="fixed-top">
    <WaifuInfo />
  </div>

  <div class="container">
    <div class="row">
      <div class="col">
        <Pop />
      </div>
    </div>
  </div>

  <div class="fixed-bottom">
    <div class="container-lg">
      <WaifuList />
    </div>
  </div>
</div>

<style>
  .pop-page {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }
</style>
