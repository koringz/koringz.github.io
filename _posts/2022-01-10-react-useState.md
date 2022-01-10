---
title: "react-hook useState"
tags:
  - Articles
---

### 函数组件 state 状态更新

```ts
const defineComponent = () => {
  const componentRef = useRef();
  const [conditions, setConditions] = useState({
    value: '1'
  });

  useMemo(() => {
    componentRef.current = conditions;
  });

  console.log(componentRef.current)
  // 2

  setTimeout(() => {
    setConditions({
      value: '2'
    })
  },100)
  render() {
    return (
      <>
        {conditions} == 1
      <>
    )
  }
};
```

默认的 useState 状态钩子数据保持在内存堆栈的地址上, 所以只能在渲染的时候才会更新数据, 没有更新之前获取数据还是拿到原始的地址数据. 所以想要在函数组件内部进行获取状态数据的更新, 需要把状态的值赋值给一个新的对象的内存地址上, 可以通过使用钩子 useRef 绑定.
