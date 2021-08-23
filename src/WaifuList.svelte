<script>
	import { waifuId, name, imgNormalUrl, imgPopUrl, imgInfo, popAudioUrl, popAudioInfo, popCount } from './Waifu.js'

	let waifuList = [
	  {
	    waifuId: '6123ae2737407351ca02f2d4',
	    name: '十五號',
	    imgNormalUrl: 'https://i.imgur.com/yYmR0t5.png',
	    imgPopUrl: 'https://i.imgur.com/cmFYQri.png',
	    imgInfo: '',
	    popAudioUrl: 'https://no15rescute.github.io/PopLeopardCat/A.mp3',
	    popAudioInfo: '',
	    popCount: 0
	  },
	  {
	    waifuId: '6123ae2737407351ca02f2d6',
	    name: '杏仁ミル',
	    imgNormalUrl: 'https://i.imgur.com/yWz4gP1.png',
	    imgPopUrl: 'https://i.imgur.com/P5DjSxE.png',
	    imgInfo: '',
	    popAudioUrl: '',
	    popAudioInfo: '',
	    popCount: 0
	  },
	  {
	    waifuId: '6123b24b68a4d555f81e540c',
	    name: '初音ミク',
	    imgNormalUrl: 'https://i.imgur.com/w50ILOk.jpg',
	    imgPopUrl: 'https://i.imgur.com/8jOQjgL.jpg',
	    imgInfo: '',
	    popAudioUrl: '',
	    popAudioInfo: '',
	    popCount: 0
	  }
	]

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

	function init () {
	  setShowingWaifu(waifuList[0])
	}
	init()
</script>

<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
				<div class="d-flex align-items-center w-100 me-3">
					<div class="me-2">#1</div>
					<img class="header-img me-2" src="{waifuList[0].imgNormalUrl}" alt="{waifuList[0].name} image" />
					<div class="flex-fill">{waifuList[0].name}</div>
					<div>{formatNumber(waifuList[0].popCount)}</div>
				</div>
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <div class="board">
					<div class="list-group list-group-flush">
						{#each waifuList as waifu, i}
							<button class="list-group-item list-group-item-action d-flex align-items-center waifu-info me-1" on:click={() => setShowingWaifu(waifu)}>
								<h3 class="ranking me-2">{i + 8}</h3>
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
