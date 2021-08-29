<script>
  import { Router, Route } from 'svelte-routing'
  import HomePage from './HomePage.svelte'
  import WaifuPopPage from './WaifuPopPage.svelte'

  export let url = ''
</script>

<Router url="{url}">
  <div class="app">
    <Route path="/:urlId" component="{WaifuPopPage}" />
    <Route path="/" component="{HomePage}" />
  </div>
</Router>

<style>
  .app {
    position: relative;
  }
</style>
