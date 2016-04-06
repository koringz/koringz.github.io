var html1=document.documentElement;
/*
	获得客户端的宽度
	设置客户端的字体
*/
function autoScale(){
    var screen_width=html1.clientWidth;
    html1.style.fontSize=0.037*screen_width+'px';
};
autoScale();
window.onresize=function(){
	// 缩放窗口自适应字体
    autoScale();
}
// 是否为空
function ifNull(a,b){
	/*
		if(typeof a == 'undefined' || a == null || a == '')
		改
		if(!a)
	*/
	if(typeof a == 'undefined' || a == null || a == ''){
		return b;
	}else{
		return a;
	}
}

/*适配iOS7+系统状态栏，增加20px的上内边距*/
function fixHeader(){
	if($('header').length>0){
		var $header = $api.dom('header');
  		$api.fixIos7Bar($header);
	}
}
/*
	匹配手机设备
	判断是(否)为ios与版本大于7
	否则输出y的值
*/
function getHeaderY(y){
	if(typeof y == "undefined"){
		y = 0;
	}
	if("ios" == api.systemType && parseInt(api.systemVersion) >= 7){
		y = y + 20;
	}
	return y;
}

fixHeader();

/*function goback(){
	self.opener=null;  
	self.open('', '_self');  
	self.close();
}*/

/*返回的方法*/
function goback(){
	var u = navigator.userAgent, app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	if(isAndroid){
	self.opener = null;  
	self.open('', '_self');  
	self.close();
	window.location.href = document.referrer; 
	}else if(isiOS){
	   api.closeWin();
	}
	// $.isNavigator({name: 'android'},function () {
	// 	self.open('', '_self'); self.opener=null; self.close();
	// });
	// $.isNavigator({name: 'ios'},function () {api.closeWin();});
}
apiready = function  () {
	var url=window.location.href;
       api.addEventListener({
                name:"keyback"       
        },function(ret,err){
        	if(url.indexOf("login.html")>-1 || url.indexOf("fog_password.html")>-1 || url.indexOf("reg_password.html")>-1 || url.indexOf("reg_perfection.html")>-1 || url.indexOf("reg.html")>-1)
        		{api.closeWidget(); }
        	else
         		{goback(); window.location.href="main.html";}
        });
}