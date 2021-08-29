<script>
  import { Router, Route } from 'svelte-routing'
  import WaifuPopPage from './WaifuPopPage.svelte'

  export let url = ''
</script>

<Router url="{url}">
  <div class="app">
    <Route path="/:urlId" component="{WaifuPopPage}" />
    <Route path="/" component="{WaifuPopPage}" />
  </div>
</Router>

<style>
  .app {
    position: relative;
  }
</style>
