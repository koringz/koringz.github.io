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
  }, [conditions]);

  console.log(componentRef.current)
  // 2

  setTimeout(() => {
    setConditions({
      value: '2'
    })
  },100);

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

第二种方案, 可以通过...扩展符继承上一个对象的 proto 属性, 在 react 组件里面改变数组的状态, 然后再结合`memo`钩子可以同时拿到修改的状态值, 不需要在渲染阶段拿到更新的状态值.

```ts
const defineComponent = () => {
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    init()
  }, [])
  const params = useMemo(() => {
    if(conditions) {
      return [...conditions]
    }
  }, [conditions]);

  // 2
  function init (){
    const val = conditions.push(params.lenght)
    setConditions([...val])
  }

  render() {
    return (
      <>
        {conditions} == 1 == conditions.length
      <>
    )
  }
};


```
