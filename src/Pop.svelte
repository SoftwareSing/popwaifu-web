<script>
  import { onDestroy } from 'svelte'
  import { currentWaifu } from './waifu/CurrentWaifu'
  import { userPopCount } from './pop/UserPopCount'
  import { formatNumber } from './utils/formatter'

  const NORMAL = 'normal'
  const POP = 'pop'
  let showing = NORMAL

  const preloadImage = new Image()
  $: if (preloadImage.src !== $currentWaifu.imgPopUrl) preloadImage.src = $currentWaifu.imgPopUrl

  const popAudioPlayer = new Audio()
  const normalAudioPlayer = new Audio()
  $: if (popAudioPlayer.src !== $currentWaifu.audioPopUrl) popAudioPlayer.src = $currentWaifu.audioPopUrl
  $: if (normalAudioPlayer.src !== $currentWaifu.audioNormalUrl) normalAudioPlayer.src = $currentWaifu.audioNormalUrl
  function playPopAudio () {
    if (popAudioPlayer.readyState !== 4) return
    popAudioPlayer.currentTime = 0
    popAudioPlayer.play()
  }
  function playNormalAudio () {
    if (normalAudioPlayer.readyState !== 4) return
    normalAudioPlayer.currentTime = 0
    normalAudioPlayer.play()
  }

  function handleInputDown () {
    if (showing === POP) return
    showing = POP
    playPopAudio()
    userPopCount.add(1)
  }
  function handleInputUp () {
    if (showing === NORMAL) return
    showing = NORMAL
    playNormalAudio()
  }

  document.addEventListener('keydown', handleInputDown)
  document.addEventListener('keyup', handleInputUp)

  onDestroy(function () {
    document.removeEventListener('keydown', handleInputDown)
    document.removeEventListener('keyup', handleInputUp)
  })
</script>

<div class="d-flex justify-content-center pop"
  on:mousedown={handleInputDown}
  on:mouseup={handleInputUp}
  on:touchstart={handleInputDown}
  on:touchend={handleInputUp}
>
  <div class="pop-count-num">
    {formatNumber($userPopCount)}
  </div>
  <div class="top-div"></div>
  {#if showing === NORMAL}
    <img src="{$currentWaifu.imgNormalUrl}" alt="normal img" />
  {:else if showing === POP}
    <img src="{$currentWaifu.imgPopUrl}" alt="pop img" />
  {/if}
</div>

<style>
  .pop {
    position: relative;
    height: 100vh;
    padding-top: 52px;
  }

  .pop img {
    height: 100%;
  }

  .pop-count-num {
    position: absolute;
    font-size: 6rem;
    font-weight: 900;
    text-align: center;
    color: #fff;
    -webkit-text-stroke-width: 0.3rem;
    -webkit-text-stroke-color: #000;
    font-family: "Nunito";
    word-break: break-word;
    user-select: none;
  }

  .top-div {
    position: absolute;
    width: 100vw;
    height: 100%;
  }
</style>
