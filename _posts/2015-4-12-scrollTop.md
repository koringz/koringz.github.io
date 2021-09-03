---
title: "scrollTop方法"
# categories:
#   - Edge Case
# tags:
#   - markup
---
#### 说明 
scrollTop(offset)表示滚动的高度，offset表示相对顶部的偏移，以像素计为单位。

#### 滚动功能 
scrollTop()表示滚动时，既能"设置"滚动值，也能"获取"滚动值。当设置滚动值时，该方法就会设置所有匹配元素的滚动值；当获取滚动值时，该方法只返回第一个匹配元素的滚动位置。

#### 获取滚动
需要获取scrollTop的值，可以参考如下代码：

```js
var scrollTop = document.documentElement.scrollTop || window.pageYOfset ||document.body.scrollTop
```

#### 设置滚动
如果你想在页面底部点击滚动到页面顶部，原生JavaScript平滑的滚动顶部：
```js
window.scrollTop({behavior:"smooth", left: 0, top: 0}) 
```

同样滚动scrollLeft表示往左边滚动，同理。