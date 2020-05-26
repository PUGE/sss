# sss - 视差滚动库

不断完善中

使用方法:
1. 引入js库，例如:
```
<script src="http://cunchu.site/github/sss/sss.js"></script>
```
2. 设置滚动参数
```
new sss([
  {
    el: 视差滚动元素,
    rangList: [
      [滚动起始百分比, 滚动结束百分比, {变化属性: [最小值, 最大值]}],
    ]
  }
])

new sss([
  {
    el: '.so-1',
    rangList: [
      [23, 30, {opacity: [0, 1]}],
      [23, 30, {x: [-200, 0]}],
    ]
  }
])
```
