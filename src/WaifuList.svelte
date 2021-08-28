<script>
  import { send } from './utils/HttpSend'
  import { buildWaifu, findWaifu, reloadPopEvent } from './waifu/Waifu.js'
  import { currentWaifu } from './waifu/CurrentWaifu'
  import { formatNumber } from './utils/formatter'
  import { reloadWaifuTime } from './config'

  /**
   * @typedef {import('./waifu/Waifu').Waifu} Waifu
   */

  /**
   * @type {Array<Waifu>}
   */
  let waifuList = []
  let waifuDataList = []
  let waiufDataUnsubscribeList = []
  $: championWaifuData = waifuDataList[0]
  reloadPopEvent.subscribe(() => {
    waifuDataList.sort((a, b) => {
      return b.popCount - a.popCount
    })
    waifuDataList = waifuDataList
  })

  async function reloadWaifuList () {
    const list = await send('GET', '/api/v1/waifu/list')
    list.sort((a, b) => b.popCount - a.popCount)
    waifuList = list.map(buildWaifu)

    waiufDataUnsubscribeList.forEach((unsubscribe) => unsubscribe())
    waiufDataUnsubscribeList = []
    waifuDataList = waifuList.map((waifu) => {
      const waifuData = {}
      const unsubscribe = waifu.subscribe((waifu) => waifu.assignDisplayObject(waifuData))
      waiufDataUnsubscribeList.push(unsubscribe)
      return waifuData
    })

    return list
  }

  function setShowingWaifu (waifuId) {
    const waifu = findWaifu(waifuId)
    currentWaifu.change(waifu)
  }

  function clickWaifu (waifuId) {
    setShowingWaifu(waifuId)
    document.getElementById('headingWaifuListButton').click()
  }

  async function init () {
    await reloadWaifuList()
    setShowingWaifu(championWaifuData.waifuId)
    setInterval(reloadWaifuList, reloadWaifuTime)
  }
  init()
</script>

<div class="accordion" id="accordionWaifuList">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingWaifuList">
      <button id="headingWaifuListButton" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWaifuList" aria-expanded="true" aria-controls="collapseWaifuList">
        <div class="d-flex align-items-center w-100 me-3">
          {#if championWaifuData}
            <div class="me-2">#1</div>
            <img class="header-img me-2" src="{championWaifuData.imgNormalUrl}" alt="{championWaifuData.name} image" />
            <div class="flex-fill">{championWaifuData.name}</div>
            <div>{formatNumber(championWaifuData.popCount)}</div>
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
            {#each waifuDataList as waifu, i}
              <button class="list-group-item list-group-item-action d-flex align-items-center waifu-info me-1" on:click={clickWaifu(waifu.waifuId)}>
                <h3 class="ranking me-2">{i + 1}</h3>
                <div class="flex-shrink-0 me-2">
                  <img class="" src="{waifu.imgNormalUrl}" alt="{waifu.name} image" />
                </div>
                <h5 class="flex-fill">{waifu.name}</h5>
                <div class="d-flex flex-column me-2">
                  <h5 class="text-end">{formatNumber(waifu.popCount)}</h5>
                  {#if (waifu.pps > 1 || waifu.pps < -1)}
                    <h5 class="text-end text-success">{formatNumber(waifu.pps)} pps</h5>
                  {/if}
                </div>
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
