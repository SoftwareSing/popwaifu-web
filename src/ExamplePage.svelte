<script>
  import Pop from './Pop.svelte'
  import UploadComponent from './UploadComponent.svelte'
  import { currentWaifu } from './waifu/CurrentWaifu'
  import { buildWaifu } from './waifu/WaifuManager'
  import { exampleWaifuData } from './config'

  const example = buildWaifu(exampleWaifuData)
  currentWaifu.change(example)

  function getSearch (name) {
    const url = new URL(window.location.href)
    return url.searchParams.get(name)
  }

  function update ({ imgNormalUrl, imgPopUrl, audioNormalUrl, audioPopUrl }) {
    const modeConfig = { ...example.currentModeConfig }
    if (imgNormalUrl) modeConfig.imgNormalUrl = imgNormalUrl
    if (imgPopUrl) modeConfig.imgPopUrl = imgPopUrl
    if (audioNormalUrl) modeConfig.audioNormalUrl = audioNormalUrl
    if (audioPopUrl) modeConfig.audioPopUrl = audioPopUrl

    example.update({
      name: example.name,
      popCount: example.popCount,
      modeConfigList: [modeConfig]
    })

    rewriteUrl()
  }

  const initTime = Date.now()
  function rewriteUrl () {
    if (Date.now() - initTime < 1000) return
    if (!window.history.pushState) return

    const url = new URL(`${window.location.origin}${window.location.pathname}`)
    if (isValidFileUrl(example.imgNormalUrl)) url.searchParams.set('imgNormalUrl', example.imgNormalUrl)
    if (isValidFileUrl(example.imgPopUrl)) url.searchParams.set('imgPopUrl', example.imgPopUrl)
    if (isValidFileUrl(example.audioNormalUrl)) url.searchParams.set('audioNormalUrl', example.audioNormalUrl)
    if (isValidFileUrl(example.audioPopUrl)) url.searchParams.set('audioPopUrl', example.audioPopUrl)

    const urlStr = url.toString()
    if (urlStr === window.location.href) return
    window.history.pushState({ path: urlStr }, '', urlStr)
  }

  function isValidFileUrl (url) {
    return /^http/.test(url) && !(new RegExp(window.location.origin)).test(url)
  }

  async function copyLink () {
    await navigator.clipboard.writeText(window.location.href)
  }
</script>


<div>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-12" style="z-index: 10;">
        <div class="mt-5"></div>

        <div class="row">
          <div class="col-3">normal image</div>
          <div class="col-9">
            <UploadComponent fileType="image" initUrl="{getSearch('imgNormalUrl')}" changeCallback="{(imgNormalUrl) => update({ imgNormalUrl })}" />
          </div>
        </div>
        <hr />

        <div class="row">
          <div class="col-3">pop image</div>
          <div class="col-9">
            <UploadComponent fileType="image" initUrl="{getSearch('imgPopUrl')}" changeCallback="{(imgPopUrl) => update({ imgPopUrl })}" />
          </div>
        </div>
        <hr />

        <div class="row">
          <div class="col-3">pop audio (optional)</div>
          <div class="col-9">
            <UploadComponent fileType="audio" initUrl="{getSearch('audioPopUrl')}" changeCallback="{(audioPopUrl) => update({ audioPopUrl })}" />
          </div>
        </div>
        <hr />

        <div class="row">
          <div class="col-3">normal audio (optional)</div>
          <div class="col-9">
            <UploadComponent fileType="audio" initUrl="{getSearch('audioNormalUrl')}" changeCallback="{(audioNormalUrl) => update({ audioNormalUrl })}" />
          </div>
        </div>
        <hr />

        <div class="d-flex">
          <button class="flex-fill btn btn-primary" on:click={copyLink}>copy preview link</button>
        </div>
        <div class="row">
          <div class="col-lg-7 col-12">
            <h5 class="mt-3">*only <div class="text-danger d-inline-block">URL</div> can share with link</h5>
          </div>
          <div class="col-lg-5 col-12">
            <img class="w-100 mt-1" src="https://i.imgur.com/Ko9H6Pf.png" alt="NOTE img" />
          </div>
        </div>
      </div>
      <div class="col-md-6 col-10 mx-auto">
        <div class="pop-area">
          <Pop />
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .pop-area {
    position: relative;
    height: 100vh;
    width: 100%;
    overflow: hidden;
  }
</style>
