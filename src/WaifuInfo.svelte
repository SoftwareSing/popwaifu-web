<script>
  import { currentWaifu } from './CurrentWaifu'
  import { formatNumber } from './helper'
</script>

<div class="accordion" id="accordionWaifuInfo">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingWaifuInfo">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWaifuInfo" aria-expanded="true" aria-controls="collapseWaifuInfo">
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
        <hr />
        <div>picture info: {$currentWaifu.imgInfo}</div>
        {#if $currentWaifu.popAudioInfo}
          <hr />
          <div>audio info: {$currentWaifu.popAudioInfo}</div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
</style>
