//百度统计代码
// var _hmt = _hmt || [];
// (function() {
//   var hm = document.createElement("script");
//   hm.src = "//hm.baidu.com/hm.js?9a10d83956549cefa167a69ed1138250";
//   var s = document.getElementsByTagName("script")[0]; 
//   s.parentNode.insertBefore(hm, s);
// })();


// $(function(){ 
// 	$('<audio id="chatAudio"><source src="../voice/notify.wav" type="audio/wav" /></audio>').appendTo('body');
// });

//弹层对话代码
!function(win,doc){

	var timeInterval=null,
		qqTimeout=null,
		fdDialog=null,
		fdDialogMask=null,
		fdCookieTime=1,
		oneTime=10*1000,//第1次弹出的时间,单位毫秒,1000毫秒=1秒.
		twoTime=10*1000,//第2次弹出的时间,单位毫秒,1000毫秒=1秒.
		threeTime=300*1000,//第3次弹出的时间,单位毫秒,1000毫秒=1秒.
		fdDialogTotal=0,
	GetQueryString=function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = location.search.substr(1).match(reg);
		if(r!=null)return  unescape(r[2]); return null;
	},
	setCookie=function(name,value,hour){
		hour = hour || 24;
		var exp = new Date();
		exp.setTime(exp.getTime() + hour*60*60*1000);
		doc.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	},
	getCookie=function(name){
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=doc.cookie.match(reg)){
			return unescape(arr[2]);
		}else{
			return null;
		}
	},
	setup=function(){
		var TEMP='<div id="fdDialog" class="fd-dialog"><div class="fd-dialog-hd"><h2>专注中高端，网站建设就选引航！</h2><a href="javascript:;" class="closebtn"></a></div><div class="fd-dialog-bd"><p><img src="http://www.joyweb.cn/images/fd_dialog1.png" width="355" height="61"></p><div class="btns"><a href="javascript:;" class="blue price">了解价格</a><a href="javascript:;" class="blue scheme">获取方案</a><a href="javascript:;" class="last orange talk" id="qyqq">立即沟通</a></div></div></div><div id="fdDialogMask" class="fd-dialog-mask"><a href="javascript:;" class="closebtn"></a></div>';
		$("body").append(TEMP);
		fdDialog=$("#fdDialog");
		fdDialogMask=$("#fdDialogMask");

		fdDialogMask.on("click",".closebtn",function(e){
			e.preventDefault();
			fdDialogHide();
		})

		fdDialog.on("click",".closebtn",function(e){
			e.preventDefault();
			fdDialogHide();
		})

		fdDialog.on("click",".btns a",function(e){

			e.preventDefault();

			if($(this).hasClass("price")){
				location.href="cost.html";
			}

			if($(this).hasClass("scheme")){
				$(".openfa").trigger("click");
			}

			setCookie("fd-dialog-total",-1,fdCookieTime);
			fdDialogHide();

		})
	},
	fdDialogShow=function(){

		fdDialogMask.fadeIn(300,function(){
			fdDialog.show().animate({
				height:244,
				marginTop:-122
			},500);
		});
		fdDialogTotal=getCookie("fd-dialog-total")?parseInt(getCookie("fd-dialog-total"))+1:1;
		setCookie("fd-dialog-total",fdDialogTotal,fdCookieTime);
	},
	fdDialogHide=function(){

		fdDialog.animate({
			height:0,
			marginTop:0
		},300,function(){
			fdDialogMask.fadeOut(200);
		}).fadeOut(200);
		setCookie("fd-dialog-time",new Date().getTime(),fdCookieTime);
		if(parseInt(getCookie("fd-dialog-total"))==1){
			fdDialogPlay(twoTime);
		}
		if(fdDialogTotal==2){
			openQQ();
		}

	},
	fdDialogPlay=function(time){

		timeInterval=setInterval(function(){
			if(new Date().getTime()-parseInt(getCookie("fd-dialog-time"))>=time){
				fdDialogShow();
				clearInterval(timeInterval);
				// $('#chatAudio')[0].play();
			}
		},300);

	},
	removeQQ=function(){
		$("#qqiframe").remove();
	},
	openQQ=function(){
		qqTimeout=setTimeout(function(){
			var	qq= doc.createElement("iframe"); 
			qq.setAttribute("id", "qqiframe"); 
			qq.setAttribute("src","tencent://message/?Menu=yes&uin=938046762&Service=58&SigT=A7F6FEA02730C988DD92405E038219A6F0E7C677CEFEDC09239791DA92FD885A6B61480B1B56E8504D6E7B19C5078C63BAE1F5CA3919C5F32FFE39F16BE196928C1D53CD9A7E1C7D311207AB6C6C8A44399247E3D3B389B9B358F2EAB2720F756E38F0EB78F8CE9D83C776A2CB31D2AFAC028F416ACAFD34&amp;amp;SigU=30E5D5233A443AB26DBE8487D638DD965BFF449FB5EFCEA8EE80827649A4FA6262139AF1AA322307492D67CC1EE945E26CC5C3595D0864A496C38868394726E48E4E2874AC327C84");
			qq.setAttribute("style","display:none");
			doc.body.appendChild(qq);
		},threeTime);
		fdDialogTotal=getCookie("fd-dialog-total")?parseInt(getCookie("fd-dialog-total"))+1:1;
		setCookie("fd-dialog-total",fdDialogTotal,fdCookieTime);
	}

	$(function(){

		//获取路径
		if(!getCookie("fd-dialog-source")){
			setCookie("fd-dialog-source",GetQueryString("source"),fdCookieTime);
		}

		if(getCookie("fd-dialog-source")=="baidu" || getCookie("fd-dialog-source")=="360"){

			//安装
			setup();
			removeQQ();

			BizQQWPA.addCustom({aty:"2",a:"",nameAccount:"4000006881",selector:"qyqq"});

		
			//获取当前时间毫秒数
			if(!getCookie("fd-dialog-time")){
				setCookie("fd-dialog-time",new Date().getTime(),fdCookieTime);
			}

			fdDialogTotal=getCookie("fd-dialog-total")?parseInt(getCookie("fd-dialog-total")):0;
			

			if(fdDialogTotal==0){
				fdDialogPlay(oneTime);
			}
			
			if(fdDialogTotal==1){
				setCookie("fd-dialog-time",new Date().getTime(),fdCookieTime);
				fdDialogPlay(twoTime);
			}
			
			if(fdDialogTotal==2){
				openQQ();
			}

		}

	})


}(this,document);
