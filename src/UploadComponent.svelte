<script>
  import { i18n } from './i18n/i18n'

  /**
   * @type {'image' | 'audio'}
  */
  export let fileType = 'image'
  export let changeCallback = console.log
  export let initUrl = ''

  let url = ''
  $: changeCallback(url)

  if (initUrl) url = initUrl

  let fileSrc = ''
  $: changeCallback(fileSrc)
  async function changeInputFile (files) {
    const file = files[0]
    if (!file || !(new RegExp(`^${fileType}`)).test(file.type)) return
    fileSrc = await getFileSrc(file)
  }
  function getFileSrc (file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    return new Promise((resolve, reject) => {
      reader.onload = (e) => resolve(e.target.result)
      reader.onerror = reject.bind(this)
    })
  }

  let clipboardFileSrc = ''
  $: changeCallback(clipboardFileSrc)
  async function getFromClipboard () {
    const items = await navigator.clipboard.read()
    const fileItem = getFileItem(items)
    if (!fileItem) return

    clipboardFileSrc = await getClipboardFileItemSrc(fileItem.item, fileItem.type)
  }
  function getFileItem (items) {
    const regex = new RegExp(`^${fileType}`)
    for (const item of items) {
      for (const type of item.types) {
        if (regex.test(type)) return { item, type }
      }
    }
  }
  async function getClipboardFileItemSrc (item, type) {
    const blob = await item.getType(type)
    return URL.createObjectURL(blob)
  }

  const URL_INPUT = 'url'
  const FILE_INPUT = 'file'
  const CLIPBOARD_INPUT = 'clipboard'
  let inputMethod = URL_INPUT
  $: onChangeInputMethod(inputMethod)
  function onChangeInputMethod (method) {
    switch (method) {
      case URL_INPUT: {
        changeCallback(url)
        break
      }
      case FILE_INPUT: {
        changeCallback(fileSrc)
        break
      }
      case CLIPBOARD_INPUT: {
        changeCallback(clipboardFileSrc)
        break
      }
    }
  }
</script>

<select class="form-select mb-3" bind:value={inputMethod}>
  <option value="{URL_INPUT}">URL</option>
  <option value="{FILE_INPUT}">{i18n.file()}</option>
  <option value="{CLIPBOARD_INPUT}">{i18n.clipboard()}</option>
</select>

{#if inputMethod === URL_INPUT}
  <div class="input-group">
    <input class="form-control" type="text" placeholder="{i18n.postFileTypeUrl({ fileType })}" bind:value="{url}" />
  </div>
{:else if inputMethod === FILE_INPUT}
  <div class="input-group">
    <input type="file" class="form-control" on:change="{function () { changeInputFile(this.files) }}" />
  </div>
{:else if inputMethod === CLIPBOARD_INPUT}
  <div class="d-flex">
    <button class="flex-fill btn btn-secondary" on:click="{getFromClipboard}">
      {i18n.clickToPostFile({ fileType })}
    </button>
  </div>
{/if}

<style>
</style>
