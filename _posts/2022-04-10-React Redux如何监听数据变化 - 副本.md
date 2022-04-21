---
title: "React Redux如何监听数据变化 "
tags:
  - react
---

### 监听数据

当在一个组件下, 兄弟组件之间进行数据更新, 兄弟组件 A 通过 dispatch 动态修改组件储存的状态值, 那么兄弟组件 B 可以 redux 内部的 subscribe 方法监听到订阅的事件.

```bash
import store from './utils/store'
const render = () => {
  const getStore= store.getState();
  document.body.innerText = getStore.text
};

store.subscribe(render);
```
