<script>
	import { waifuId, name, popCount, imgInfo, popAudioInfo } from './Waifu.js'
</script>

<div class="accordion" id="accordionWaifuInfo">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingWaifuInfo">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWaifuInfo" aria-expanded="true" aria-controls="collapseWaifuInfo">
        <div class="d-flex justify-content-between w-100">
          <div class="px-3">{$name}</div>
          <div class="">{$name}</div>
          <div class="px-3">{$popCount}</div>
        </div>
      </button>
    </h2>
    <div id="collapseWaifuInfo" class="accordion-collapse collapse" aria-labelledby="headingWaifuInfo" data-bs-parent="#accordionWaifuInfo">
      <div class="accordion-body">
        <div class="visually-hidden" style="display: none;">{$waifuId}</div>
        <div>{$name}</div>
        <hr />
        <div>picture info: {$imgInfo}</div>
        {#if $popAudioInfo}
          <hr />
          <div>audio info: {$popAudioInfo}</div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
</style>
