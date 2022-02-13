---
title: "copy-webpack-plugin插件"
tags:
  - Articles
---

### webpack 打包报错

**Note:**【报错】HookWebpackError: Only file and data URLs are supported by the default ESM loader.

### 解决

把`copy-webpack-plugin`版本从^10.2.4 降低到 9，可以解决打包出错的问题。
`npm i -D copy-webpack-plugin@9`
