export class Dictionary {
  static showAllWaifu () { return 'show all waifu' }
  static picture () { return 'picture' }
  static audio () { return 'audio' }

  static copyPreviewLink () { return 'copy preview link' }
  static onlyUrlCanShareWithLink () { return '*only URL can share with link' }
  static file () { return 'File' }
  static clipboard () { return 'Clipboard' }
  static clickToPostFile ({ fileType }) {
    return `click to post ${fileType} file`
  }

  static postFileTypeUrl ({ fileType }) {
    return `post ${fileType} URL`
  }
}
