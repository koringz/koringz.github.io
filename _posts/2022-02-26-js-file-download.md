---
title: "js文件下载"
tags:
  - Articles
---

### 解析数据

首先基于 axios 插件的 http 请求, 设置 xhr.responseType = 'blob'格式, 接收后端返回的数据流.

```bash
const handleLoadingFile = (dataStream:any, fallback: Function) => {
  const getBlobData = (blob:any,fallback:Function) =>{
    const fr = new FileReader()
    fr.onload= function (ev) {
      fallback(ev.targe.result)
    }
    fr.readAsDataURL(resBlobdata)
  }
  getBlobData(dataStream, (value: any) => {
    if(value) fallback(value)
  })
}
```

### 读取并下载数据

在封装了上面的接收数据流的同时读取结果数据, 然后把结果数据通过回调函数进行输出下载.

```bash
import axios from 'axios'

axios('172.0.0.1').then((res:any) => {
  handleLoadingFile(res.data, function (value: any) {
    try{
      let link = document.createElement('a')
      let filename = res.headers['content-disposition'].split('=')
      filename = filename[filename.length - 1]
      filename = decodeURI(filename.replace(/"/g, ''))
      link.download = record.filename
      link.href = value
      document.body.appendChild(link)
      link.click()
      document.body.appendChild(link)
    }catch(err) {
      console.log(err)
    }
  })
})
```
