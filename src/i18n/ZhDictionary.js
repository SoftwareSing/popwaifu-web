import { Dictionary } from './Dictionary'

export class ZhDictionary extends Dictionary {
  static showAllWaifu ({ number }) { return `老婆列表 (${number})` }
  static helpUsAddMoreWaifu () { return '幫我們加入更多老婆' }
  static helpUsFixBug () { return '幫我們修點 BUG' }
  static pictureSource () { return '圖片來源' }
  static audioSource () { return '聲音來源' }

  static copyPreviewLink () { return '複製預覽連結' }
  static onlyUrlCanShareWithLink () { return '*只有 URL 會跟著連結一起分享' }
  static file () { return '檔案' }
  static clipboard () { return '剪貼簿' }
  static clickToPostFile ({ fileType }) {
    fileType = transFileType(fileType)
    return `貼上剪貼簿的${fileType}檔案`
  }

  static postFileTypeUrl ({ fileType }) {
    fileType = transFileType(fileType)
    return `貼上${fileType}的 URL`
  }
}

function transFileType (fileType) {
  if (fileType === 'image') return '圖片'
  else if (fileType === 'audio') return '聲音'
  else return ` ${fileType} `
}
