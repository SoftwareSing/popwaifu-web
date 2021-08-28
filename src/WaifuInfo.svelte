<script>
  import { currentWaifu } from './waifu/CurrentWaifu'
  import { formatNumber } from './utils/formatter'

  function changeWaifuMode (modeName) {
    currentWaifu.update((waifu) => waifu.changeMode(modeName))
  }

  function clickMode (modeName) {
    changeWaifuMode(modeName)
    document.getElementById('headingWaifuInfoButton').click()
  }
</script>

<div class="accordion" id="accordionWaifuInfo">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingWaifuInfo">
      <button class="accordion-button" id="headingWaifuInfoButton" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWaifuInfo" aria-expanded="true" aria-controls="collapseWaifuInfo">
        <div class="d-flex justify-content-between w-100">
          <div class="px-3">{$currentWaifu.name}</div>
          <div class=""></div>
          <div class="px-3">{formatNumber($currentWaifu.popCount)}</div>
        </div>
      </button>
    </h2>
    <div id="collapseWaifuInfo" class="accordion-collapse collapse" aria-labelledby="headingWaifuInfo" data-bs-parent="#accordionWaifuInfo">
      <div class="accordion-body">
        <div class="visually-hidden" style="display: none;">{$currentWaifu.waifuId}</div>
        <div>{$currentWaifu.name}</div>
        {#if $currentWaifu.modeConfigMap.size > 1}
          <div class="d-flex mt-3">
            {#each [...$currentWaifu.modeConfigMap.keys()] as modeName}
              <button class="btn btn-outline-primary me-3" on:click={clickMode(modeName)}>
                {modeName}
              </button>
            {/each}
          </div>
        {/if}
        <hr />
        <div>picture info: {$currentWaifu.imgInfo}</div>
        {#if $currentWaifu.audioInfo}
          <hr />
          <div>audio info: {$currentWaifu.audioInfo}</div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
</style>
