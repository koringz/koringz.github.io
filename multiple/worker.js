/* koringz.github.io
*
* $author koringz
* $date 2015-12-24
* $version 0.1
*
*/

onmessage = function(e){ //e接收postmessage传的参数
	var s = (e.data[2]*e.data[1]);
	var workerResult =  "result  : " + s;
	postMessage(workerResult); //worker.onmessage进行回调workerResult参数
}

