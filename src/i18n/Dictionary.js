export class Dictionary {
  static showAllWaifu ({ number }) { return `show all waifu (${number})` }
  static helpUsAddMoreWaifu () { return 'help us add more waifu' }
  static pictureSource () { return 'picture source' }
  static audioSource () { return 'audio source' }

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
