---
title: "项目中的遇到冲突问题"
tags:
  - work
---

### 点击上传按钮失效

在使用 `react`+`antd` 框架开发项目的时候，碰到了一个问题，当我们在项目中引入第三方依赖包 [https://github.com/Alkaids/antd-editable]`antd-editable` 列表编辑组件时, 这个依赖库的 `antd` 版本和项目使用的版本不同, 如果在一个 `<button> // upload 组件 <button` 按钮内部放一个 `antd` 组件的 `upload` 上传组件，此时这个 `upload` 上传按钮会失效, 无法触发内部的点击事件访问本地文件夹, 所以需要把 `button` 放到 `upload` 组件内部.
