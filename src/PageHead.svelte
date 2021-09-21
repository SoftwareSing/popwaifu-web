<script>
  export let title = ''
  export let description = ''
  export let image = ''

  const websiteName = 'pop waifu'
  $: headTitle = title ? `${title} - ${websiteName}` : websiteName
  $: headDescription = description || 'Click your waifu'
</script>

<svelte:head>
	<title>{headTitle}</title>
  <meta property="og:title" content="{headTitle}" />
  <meta property="twitter:title" content="{headTitle}" />

  <meta name="description" content="{headDescription}" />
  <meta property="og:description" content="{headDescription}" />
  <meta property="twitter:description" content="{headDescription}" />

  {#if image}
    <meta property="twitter:card" content="summary" />
    <meta property="og:image" content="{image}" />
    <meta property="twitter:image" content="{image}" />

    <link rel="icon" href="{image}" />
  {:else}
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  {/if}
</svelte:head>

<style>
</style>
