---
title: "regExp正则字符串替换"
tags:
  - Articles
---

### 替换中英文字符串

使用^为不匹配当前正则的字符串, 不同字符查找通过括号分割出来, 依次遍历中英的替换输出.

```bash
const content = ['123-移动端1', '123-pc端2', '123-平板3'];
const all = content.map((item) => {
  const getReg = item.replace(
    new RegExp(/([^\d-/]+)([\w\u4e00-\u9fa5]+)([^\d])/g),
    (d, e, f) => {
      return d + '=';
    }
  );
  return getReg;
});

```

数组内部所有-连接的字符非数字项都会被添加后缀 等号=

```bash
// 123-移动端=1,123-pc端=2,123-平板3
```

### 替换每一个字符

```js
let nickname = "koringz";
nickname.substr(0, 1) + nickname.substr(1).split("").fill("*").join("");
// k******
```
