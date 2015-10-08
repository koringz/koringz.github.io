	var ajx01;
function ajax() {
	try{
		var ajx01 = new XMLHttpRequest(); 
	}
	catch(e){
		var ajx01 = new ActiveXObject("Microsoft.XMLHTTP");
	}

}
function sendajax() {
	ajax();
	ajx01.open('get','index.txt',true);
	ajx01.onreadystatechange = processready; //指定响应函数  
	ajx01.send(null)
}
function processready () {
	if(ajx01.readyState == 4){
		if(ajx01.status == 200){
			var test = ajx01.responseText;
			var dp = document.getElementById('dp');
			dp.innerHTML = "" +text;

		}
	}	
}

console.log(navigator.appVersion); //浏览器版本号

console.log( ajx01); //判断IE浏览器的方法类型
console.log(typeof ajx01); //判断非IE浏览器的方法类型

