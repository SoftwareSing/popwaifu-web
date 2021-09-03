<script>
  export let title = ''
  export let description = ''

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
</svelte:head>

<style>
</style>
