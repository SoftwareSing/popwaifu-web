import { Dictionary } from './Dictionary'
import { ZhDictionary } from './ZhDictionary'

const language = window.navigator.language
export let i18n = changeDictionary(language)

function changeDictionary (lang) {
  if (/^zh/.test(lang)) return ZhDictionary
  return Dictionary
}
