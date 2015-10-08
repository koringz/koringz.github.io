function ajax() {
	var ajx01;



		try{
			var ajx01 = new XMLHttpRequest(); 
		}
		catch(e){
			var ajx01 = new ActiveXObject("Microsoft.XMLHTTP");
		}

		ajx01.onreadystatechange  = function () {
			if(ajx01.readystatus == 4 ){
				if(ajx01.status ==200){

					var text = ajx01.requestText;
					var dj = document.getElementById('dj');
					dj.setAttribute('innerHTML',text); //dj.innerHTML = text;
		
				}	
			}
		}

		ajx01.open('POST','index.txt',true);
        ajx01.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		ajx01.send("");


	console.log(navigator.appVersion); //浏览器版本号

	console.log( ajx01); //判断IE浏览器的方法类型
	console.log(typeof ajx01); //判断非IE浏览器的方法类型
};

;