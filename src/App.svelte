<script>
  import { Router, Route, navigate } from 'svelte-routing'
  import HomePage from './HomePage.svelte'
  import WaifuPopPage from './WaifuPopPage.svelte'
  import ExamplePage from './ExamplePage.svelte'

  export let url = ''
  window.__navigator = navigate
</script>

<Router url="{url}">
  <div class="app">
    <Route path="/example" component="{ExamplePage}" />
    <Route path="/:urlId/:mode" component="{WaifuPopPage}" />
    <Route path="/:urlId" component="{WaifuPopPage}" />
    <Route path="/" component="{HomePage}" />
  </div>
</Router>

<style>
  .app {
    position: relative;
  }
</style>
