---
title: "js图片转换为base64"
tags:
  - Articles
---

### http 请求类型 blob

首先发起 http 请求时, 需要向 http 请求头添加 type 类型为 bolb 格式, 否则为 json 格式.

```bash
xhr.responseType = 'blob'
```

### blob 转换 base64

当请求响应时, 需要把响应的数据进行数据流转换, 格式方法如下:

```bash
function blobToBase64 (resBlobdata, fallback) {
  const fr = new FileReader()
  fr.onload= function (ev) {
    fallback(ev.targe.result)
  }
  fr.readAsDataURL(resBlobdata)
}

```
