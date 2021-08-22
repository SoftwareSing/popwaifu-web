<script>
	import { imgNormalUrl, imgPopUrl } from './Waifu.js'

	const NORMAL = 'normal'
	const POP = 'pop'
	let showing = NORMAL

	function handleInputDown () {
	  if (showing === POP) return
	  showing = POP
	}
	function handleInputUp () {
	  if (showing === NORMAL) return
	  showing = NORMAL
	}

	document.addEventListener('keydown', handleInputDown)
	document.addEventListener('keyup', handleInputUp)
</script>

<div class="d-flex justify-content-center"
	on:mousedown={handleInputDown}
	on:mouseup={handleInputUp}
	on:touchstart={handleInputDown}
	on:touchend={handleInputUp}
>
	{#if showing === NORMAL}
		<img src="{$imgNormalUrl}" alt="normal img" />
	{:else if showing === POP}
		<img src="{$imgPopUrl}" alt="pop img" />
	{/if}
</div>

<style>
	img {
		height: 100vh;
	}
</style>
