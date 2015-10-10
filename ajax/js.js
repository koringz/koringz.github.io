function  xmlhttp(argument) {
	if(typeof ajax == 'undefined'){
		try{
			ajax = new XMLHttpRequest();
		}
		catch(e){
			ajax = new ActiveXObject('Microsoft.XMLHTTP');
		}
	}
	return ajax;
}

function getcontent (url) {
	var request = xmlhttp();

	request.open('get',url,true);
	request.onreadystatechange = function () {
		if(request.readyState == 4){
			var img  = '<img src="'+ url +'" />';
			console.log('typeof eval(img)');
			document.querySelector('.box-inline-block').innerHTML = img;
		}
	}
	request.send(null);
}

function gettag(name) {
	return document.getElementsByTagName(name);
}

window.onload= function(){
	var input = gettag('input');
	
		console.log(input + '2');
		for(var i = 0; i<input.length;i++){
			console.log(input[i]);
			input[i].index = i;
			input[i].onclick = function () {
				var value = 'images/gyy' + this.index + '.jpg';
				getcontent (value);
			}
		}
}
