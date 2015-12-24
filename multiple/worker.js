/* koringz.github.io
*
* $author koringz
* $data 2015-12-24
* $version 0.1
*
*/

onmessage =function(e){ //接收postmessage传过来的参数进行一次回调处理
	var workerResult =  "result  : " + (e.data[0]*e.data[1])
	postMessage(workerResult);
}


