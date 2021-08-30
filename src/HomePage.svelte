<script>
  import { onDestroy } from 'svelte'
  import { Link } from 'svelte-routing'
  import { getWaifuList, syncServerWaifuEvent } from './waifu/WaifuManager'
  import { formatNumber } from './utils/formatter'

  let waifuList = []

  const unsubscribeSyncEvent = syncServerWaifuEvent.subscribe(() => {
    const newList = getWaifuList()
    if (newList.length < 1) return

    newList.sort((a, b) => b.popCount - a.popCount)
    waifuList = newList
  })

  onDestroy(() => {
    unsubscribeSyncEvent()
  })
</script>

{#if waifuList.length < 1}
  <div class="position-relative vh-100 vw-100">
    <div class="position-absolute top-50 start-50 translate-middle">
      loading...
    </div>
  </div>
{/if}
<div class="container">
  <div class="d-flex align-content-center flex-wrap">
    {#each waifuList as waifu }
      <Link to="{waifu.url}" class="mx-auto mt-3 text-dark" style="text-decoration: none;">
        <div class="card waifu-card">
          <img class="card-img-top mx-auto" src="{waifu.imgNormalUrl}" alt="{waifu.name} image" />
          <div class="card-body">
            <h5 class="card-title">{waifu.name}</h5>
            <div class="card-text">
              <div class="text-end">{formatNumber(waifu.popCount)}</div>
            </div>
          </div>
        </div>
      </Link>
    {/each}
  </div>
</div>

<style>
  .waifu-card {
    width: 250px;
  }

  .waifu-card img {
    object-fit: cover;
    object-position: center;
    height: 248px;
    width: 248px;
  }
</style>
