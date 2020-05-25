function sss (config) {
  var _this = this
  this.sh = document.documentElement.scrollHeight || document.body.scrollHeight
  // 可视区域高度
  this.ch = document.documentElement.clientHeight || document.body.clientHeight

  // 判读是否出现调试面板
  if (config.debug) {
    this.debugBox = document.createElement("div")
    this.debugBox.classList.add('debug-box')
    this.debugBox.style.cssText = 'position: fixed;right: 2%;bottom: 2%;background-color: rgba(0, 159, 233, 0.8);color:white;border-radius: 5px;font-size: 12px;padding: 2px 5px;'
    document.body.appendChild(this.debugBox)
  }
  // 处理列表
  for (let index = 0; index < config.list.length; index++) {
    const element = config.list[index];
    if (typeof element.el === 'string') {
      element.el = document.querySelector(element.el)
    }
  }
  window.onscroll = function () {
    var top = parseInt(document.documentElement.scrollTop || document.body.scrollTop)
    var pre = (top + _this.ch) / _this.sh * 100
    if (config.debug) _this.debugBox.innerHTML = `Top: ${top}px<br>Per: ${pre.toFixed(1)}%`
    // 获取每个Dom元素
    for (let index = 0; index < config.list.length; index++) {
      const element = config.list[index];
      // 获取每一个过渡区间
      for (let rangKey = 0; index < element.rangList.length; index++) {
        const rangItem = element.rangList[rangKey];
        if ((rangItem[0] <= pre) && (pre <= rangItem[1])) {
          var scale = (pre - rangItem[0]) / (rangItem[1] - rangItem[0])
          for (const key in rangItem[2]) {
            const valueRnage = rangItem[2][key];
            switch (key) {
              case 'opacity': {
                element.el.style.opacity = (valueRnage[0] + ((valueRnage[1] - valueRnage[0]) * scale) / 100).toFixed(2)
              }
            }
            
          }
        }
      }
      
    }
  }
}