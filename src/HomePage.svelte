<script>
  import { onDestroy } from 'svelte'
  import { navigate } from 'svelte-routing'
  import { getWaifuList, syncServerWaifuEvent } from './waifu/WaifuManager'

  const unsubscribeSyncEvent = syncServerWaifuEvent.subscribe(() => {
    const waifuList = getWaifuList()
    if (waifuList.length < 1) return

    waifuList.sort((a, b) => b.popCount - a.popCount)
    const firstWaifu = waifuList[0]
    navigate(`/${firstWaifu.urlId}`, { replace: true })
  })

  onDestroy(() => {
    unsubscribeSyncEvent()
  })
</script>

<div class="position-relative vh-100 vw-100">
  <div class="position-absolute top-50 start-50 translate-middle">
    loading...
  </div>
</div>

<style>
</style>
