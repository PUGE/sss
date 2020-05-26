function sss (config) {
  var _this = this
  this.sh = document.documentElement.scrollHeight || document.body.scrollHeight
  // 可视区域高度
  this.ch = document.documentElement.clientHeight || document.body.clientHeight

  // 调试面板
  this.debug = function () {
    this.debugBox = document.createElement("div")
    this.debugBox.classList.add('debug-box')
    this.debugBox.style.cssText = 'position: fixed;right: 2%;bottom: 2%;background-color: rgba(0, 159, 233, 0.8);color:white;border-radius: 5px;font-size: 12px;padding: 2px 5px;'
    document.body.appendChild(this.debugBox)
    this.dedbugMode = true
  }
  // 处理列表
  for (let index = 0; index < config.length; index++) {
    const element = config[index];
    if (typeof element.el === 'string') {
      element.el = document.querySelector(element.el)
    }
    // 空处理
    if (!element.el) config[index].rangList = []
  }
  window.onscroll = function () {
    var top = parseInt(document.documentElement.scrollTop || document.body.scrollTop)
    var pre = (top + _this.ch) / _this.sh * 100
    if (_this.dedbugMode) _this.debugBox.innerHTML = `Top: ${top}px<br>Per: ${pre.toFixed(1)}%`
    // 获取每个Dom元素
    for (let index = 0; index < config.length; index++) {
      const element = config[index];
      // 获取每一个过渡区间
      // 样式存储
      var styleList = {}
      for (let rangKey = 0; rangKey < element.rangList.length; rangKey++) {
        const rangItem = element.rangList[rangKey];
        
        if (pre < rangItem[0]) {
          for (const key in rangItem[2]) {
            const valueRnage = rangItem[2][key];
            switch (key) {
              case 'opacity': {
                styleList.opacity = valueRnage[0]
                break
              }
              case 'x': {
                styleList.x = valueRnage[0]
                break
              }
              case 'y': {
                styleList.x = valueRnage[0]
                break
              }
            }
          }
        } else if (pre > rangItem[1]) {
          for (const key in rangItem[2]) {
            const valueRnage = rangItem[2][key];
            switch (key) {
              case 'opacity': {
                styleList.opacity = valueRnage[1]
                break
              }
              case 'x': {
                styleList.x = valueRnage[1]
                break
              }
              case 'y': {
                styleList.x = valueRnage[1]
                break
              }
            }
          }
        } else {
          var scale = (pre - rangItem[0]) / (rangItem[1] - rangItem[0])
          for (const key in rangItem[2]) {
            const valueRnage = rangItem[2][key];
            switch (key) {
              case 'opacity': {
                styleList.opacity = (valueRnage[0] + ((valueRnage[1] - valueRnage[0]) * scale)).toFixed(2)
                break
              }
              case 'x': {
                styleList.x = parseInt(valueRnage[0] + ((valueRnage[1] - valueRnage[0]) * scale))
                break
              }
              case 'y': {
                styleList.y = parseInt(valueRnage[0] + ((valueRnage[1] - valueRnage[0]) * scale))
                break
              }
            }
          }
        }
        // 生成新的样式文字
        var newCssText = ''
        if (styleList.opacity) newCssText += 'opacity: ' + styleList.opacity + ';'
        if (styleList.x || styleList.y) newCssText += 'transform: translate(' + (styleList.x || 0) + 'px, ' + (styleList.y || 0) + 'px);'
        element.el.style.cssText = newCssText
      }
    }
  }
}