<script>
  import Pop from './Pop.svelte'
  import WaifuInfo from './WaifuInfo.svelte'
  import WaifuList from './WaifuList.svelte'
</script>

<div class="app">
  <div class="fixed-top">
    <WaifuInfo />
  </div>

  <div class="container">
    <div class="row">
      <div class="col">
        <Pop />
      </div>
    </div>
  </div>

  <div class="fixed-bottom">
    <div class="container-lg">
      <WaifuList />
    </div>
  </div>
</div>

<style>
  .app {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }
</style>
