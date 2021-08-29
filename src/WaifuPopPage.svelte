<script>
  import { onDestroy } from 'svelte'
  import Pop from './Pop.svelte'
  import WaifuInfo from './WaifuInfo.svelte'
  import WaifuList from './WaifuList.svelte'
  import { currentWaifu } from './waifu/CurrentWaifu'
  import { findWaifuByUrlId, syncServerWaifuEvent } from './waifu/WaifuManager'

  export let urlId = ''
  $: if (urlId) {
    const waifu = findWaifuByUrlId(urlId)
    if (waifu) currentWaifu.change(findWaifuByUrlId(urlId))
    else changeCurrentAfterSync()
  }

  let unsubscribeSyncEvent
  function changeCurrentAfterSync () {
    if (unsubscribeSyncEvent) return

    unsubscribeSyncEvent = () => {}
    unsubscribeSyncEvent = syncServerWaifuEvent.subscribe(() => {
      const waifu = findWaifuByUrlId(urlId)
      if (!waifu) return

      currentWaifu.change(waifu)
      unsubscribeSyncEvent()
      unsubscribeSyncEvent = undefined
    })
  }

  onDestroy(() => {
    if (unsubscribeSyncEvent) unsubscribeSyncEvent()
  })
</script>


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
