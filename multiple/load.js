/* koringz.github.io
*
* $author koringz
* $data 2015-12-24
* $version 0.1
*
*/

var txt1 = document.querySelector("#txt1")
var txt2 = document.querySelector("#txt2")

var result = document.querySelector("#result")
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
if(!window.indexedDB)
{
    console.log("你的浏览器不支持IndexedDB");
}

if(window.Worker){
	var _this = new Worker("worker.js");


	txt1.onchange = function(){ 
		_this.postMessage([txt1.value,txt1.value,txt2.value]) // e = [txt1.value,txt2.value]
		console.log("message post to work")
	}

	txt2.onchange = function(){
		_this.postMessage([txt1.value,txt1.value,txt2.value]) // e = [txt1.value,txt2.value]
		console.log("message post to work")
	}
	

	_this.onmessage = function(s){ //接收到的数据 e
		result.textContent = s.data;
	}
}


//onmessage表示接收线程worker脚本返回的消息，消息的参数在onmessage方法里面。
//postMessage表示向worker脚本onmessage方法扔参数进行传参
// *注Worker的首字母大写的
// *注Worker的脚本的目录为HTML页面能够访问到的目录















