---
title: "antd-component-leave组件离开执行回调"
tags:
  - Articles
---

### 组件离开

如果在 react 一个组件里设置了一个定时器, 当离开组件进入下一个路由时, 就需要清除上一个组件的定时器, 可以使用 useEffect 钩子进行清除.

```bash
let timer = null
timer = setTimeout(()=> {
  // doing something
}, 200);

useEffect(() => {
  return () => clearTimeout(timer)
}, [])
```
