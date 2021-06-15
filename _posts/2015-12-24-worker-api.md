---
title: "JavaScript:理解worker事件api"
show_date: true
# categories:
#   - Edge Case
# tags:
#   - markup
---

如果你不是很了解Event事件，建议先看我上一篇随文javascript:理解DOM事件。或者直接看下文worker api。

## hack
首先，我们需要实例一个Worker的对象，浏览器会根据新创建的worker对象新开一个接口，此接口会处理客户端与indexedDB数据库之间的通信。这里的数据库是指浏览器数据库。如果，你需要判断浏览器是否支持worker对象，详见如下代码。或者浏览器是否支持indexedDB数据库，详见同下，二者判断最好选择前者。因为IE不支持indexedDB 。

```js
if(window.Worker){ dosomething }
// Workerwindow.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB; if(!window.indexedDB){ dosomething }// indexedDB
```

## 工作原理

之后，worker对象会通过postMessage线程向indexedDB数据库发送数据，当indexedDB数据库接收到客户端发送的数据，首先把数据的键值储存并记录到indexedDB数据库表里面，其实相当于把数据保存在一张结构完整的表内。

于是，indexedDB数据库会把接收到的数据值扔给新接口处理，当新接口获得数据并解析之后，会通过postMessage扔回一条数据给数据库，数据库接收返回的数据处理的方式和上面一样，此时indexedDB数据库会把返回的数据扔给客户端接受参数的onmessage线程，主线程后面onmessage线程主要是接收传回的数据。

```js
/* 
* $author koringz
* $date 2015-12-24
* $version 0.1
*/
var txt1 = document.querySelector("#txt1");
var txt2 = document.querySelector("#txt2");var result = document.querySelector("#result");
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if(!window.indexedDB)
    {
        console.log("你的浏览器不支持IndexedDB");
    }
    if(window.Worker){
        var _this = new Worker("../../js/build/scroll_ten1.js");
        txt1.onchange = function(){ 
             // e = [txt1.value,txt2.value]
            _this.postMessage([txt1.value,txt2.value]);
            console.log("message post to work");
        }
        txt2.onchange = function(){
            // e = [txt1.value,txt2.value]
            _this.postMessage([txt1.value,txt2.value]); 
            console.log("message post to work");
        }
        //接收到的数据 e
        _this.onmessage = function(s){ 
            result.textContent = s.data;
        }
    }
```

```js
    onmessage = function(e){ 
        //e接收Worker.postmessage传的参数
        var s = (e.data[2]*e.data[1]);
        var workerResult =  "result  : " + s;
        //Worker.onmessage进行回调workerResult参数
        postMessage(workerResult); 
    }
```

想必大家看了以上的分析之后，肯定在想用Worker能做什么？对于这个问题，目前能解决线程的非阻塞问题，如何说起，当用户改变browser的的尺寸、以及拖动浏览器时，主线程访问后台数据时，并不会中断数据之间的进程。

## browser

支持Worker的browser有哪些？

<img src="/assets/images/534.png" />