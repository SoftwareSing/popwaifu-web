<script>
  import { send } from './HttpSend'
  import { waifuId, name, imgNormalUrl, imgPopUrl, imgInfo, popAudioUrl, popAudioInfo, popCount } from './Waifu.js'

  let waifuList = []

  async function reloadWaifuList () {
    const list = await send('GET', '/api/v1/waifu/list')

    const currentWaifuNewInfo = list.find((waifu) => waifu.waifuId === $waifuId)
    if (currentWaifuNewInfo) setShowingWaifu(currentWaifuNewInfo)

    list.sort((a, b) => b.popCount - a.popCount)
    waifuList = list
    return list
  }

  function setShowingWaifu (waifu) {
    waifuId.set(waifu.waifuId)
    name.set(waifu.name)
    imgNormalUrl.set(waifu.imgNormalUrl)
    imgPopUrl.set(waifu.imgPopUrl)
    imgInfo.set(waifu.imgInfo)
    popAudioUrl.set(waifu.popAudioUrl)
    popAudioInfo.set(waifu.popAudioInfo)
    popCount.set(waifu.popCount)
  }

  function formatNumber (num) {
    return (new Intl.NumberFormat('en-US')).format(num)
  }

  async function init () {
    await reloadWaifuList()
    setShowingWaifu(waifuList[0])
    setInterval(reloadWaifuList, 15 * 1000)
  }
  init()
</script>

<div class="accordion" id="accordionWaifuList">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingWaifuList">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWaifuList" aria-expanded="true" aria-controls="collapseWaifuList">
        <div class="d-flex align-items-center w-100 me-3">
          {#if waifuList[0]}
            <div class="me-2">#1</div>
            <img class="header-img me-2" src="{waifuList[0].imgNormalUrl}" alt="{waifuList[0].name} image" />
            <div class="flex-fill">{waifuList[0].name}</div>
            <div>{formatNumber(waifuList[0].popCount)}</div>
          {:else}
            <div>loading</div>
          {/if}
        </div>
      </button>
    </h2>
    <div id="collapseWaifuList" class="accordion-collapse collapse" aria-labelledby="headingWaifuList" data-bs-parent="#accordionWaifuList">
      <div class="accordion-body">
        <div class="board">
          <div class="list-group list-group-flush">
            {#each waifuList as waifu, i}
              <button class="list-group-item list-group-item-action d-flex align-items-center waifu-info me-1" on:click={() => setShowingWaifu(waifu)}>
                <h3 class="ranking me-2">{i + 1}</h3>
                <div class="flex-shrink-0 me-2">
                  <img class="" src="{waifu.imgNormalUrl}" alt="{waifu.name} image" />
                </div>
                <h5 class="flex-fill">{waifu.name}</h5>
                <h5 class="">{formatNumber(waifu.popCount)}</h5>
              </button>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .header-img {
    object-fit: cover;
    object-position: center;
    height: 25px;
    width: 25px;
  }

  .board {
    height: 65vh;
    overflow-y: scroll;
  }

  .waifu-info {
    padding: 10px 0px;
  }

  .waifu-info img {
    object-fit: cover;
    object-position: center;
    height: 60px;
    width: 60px;
  }

  .ranking {
    min-width: 1em;
  }

  .accordion-button::after {
    transform: rotate(-180deg);
  }

  .accordion-button:not(.collapsed)::after {
    transform: rotate(0deg);
  }
</style>
