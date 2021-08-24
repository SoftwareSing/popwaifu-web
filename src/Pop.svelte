<script>
  import { imgNormalUrl, imgPopUrl, popAudioUrl } from './Waifu.js'
  import { userPopCount } from './UserPopCount'
  import { formatNumber } from './helper'

  const NORMAL = 'normal'
  const POP = 'pop'
  let showing = NORMAL

  const audioPlayer = new Audio()
  $: audioPlayer.src = $popAudioUrl
  function playPopAudio () {
    if (audioPlayer.readyState !== 4) return
    audioPlayer.currentTime = 0
    audioPlayer.play()
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
  }

  document.addEventListener('keydown', handleInputDown)
  document.addEventListener('keyup', handleInputUp)
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
  {#if showing === NORMAL}
    <img src="{$imgNormalUrl}" alt="normal img" />
  {:else if showing === POP}
    <img src="{$imgPopUrl}" alt="pop img" />
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
</style>
