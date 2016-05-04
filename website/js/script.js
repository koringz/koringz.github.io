$(function(){$("a,lable").focus(function(){this.blur();});});//去除链接虚线

$(document).ready(function(){
  $('.case li').mouseover(function(){
  $(this).removeClass();	
  $(this).find('.mast').slideDown("fast");
  });
  $('.case li').mouseleave(function(){
   $(this).removeClass();
  $(this).find('.mast').slideUp("fast");
  });
});

$(function(){


//var doc=document;
//kf_script=doc.createElement("script");
//kf_script.setAttribute("src", "http://kefu.qycn.com/vclient/state.php?webid=108924");
//doc.getElementsByTagName("head")[0].appendChild(kf_script);



 $('a[href*=#]').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
            if ($target.length) {
                var targetOffset = $target.offset().top;
                $('html,body').animate({
                    scrollTop: targetOffset
                },
                1000);
                return false;
            }
        }
    });
});
function setTab(name,cursel,n){
	for(i=1;i<=n;i++){
		var menu=document.getElementById(name+i);
		var con=document.getElementById("con_"+name+"_"+i);
		menu.className=i==cursel?"hover":"";
		con.style.display=i==cursel?"block":"none";
	}
}

	
//单选和多选表单样式	
/*var d = document;
var safari = (navigator.userAgent.toLowerCase().indexOf('safari') != -1) ? true : false;
var gebtn = function(parEl,child) { return parEl.getElementsByTagName(child); };
onload = function() {
	var body = gebtn(d,'body')[0];
	body.className = body.className && body.className != '' ? body.className + ' has-js' : 'has-js';
	if (!d.getElementById || !d.createTextNode) {
		return;
	}
	var ls = gebtn(d,'label');
	for (var i = 0; i < ls.length; i++) {
		var l = ls[i];
		if (l.className.indexOf('label_') == -1) {
			continue;
		}
		var inp = gebtn(l,'input')[0];
		if (l.className == 'label_check') {
			//l.className = (safari && inp.checked == true || inp.checked) ? 'label_check c_on' : 'label_check c_off';
			l.className = (safari && inp.checked == true || inp.checked) ? 'label_check c_off' : 'label_check c_on';
			l.onclick = check_it;
		};
		if (l.className == 'label_radio') {
			l.className = (safari && inp.checked == true || inp.checked) ? 'label_radio r_on' : 'label_radio r_off';
			l.onclick = turn_radio;
		};
	};
};
var check_it = function() {
	var inp = gebtn(this,'input')[0];
	if (this.className == 'label_check c_off' || (!safari && inp.checked)) {
		this.className = 'label_check c_on';
		if (safari) {
			inp.click();
		};
	} else {
		this.className = 'label_check c_off';
		if (safari){ 
			inp.click();
		};
	};
};
var turn_radio = function() {
	var inp = gebtn(this,'input')[0];
	if (this.className == 'label_radio r_off' || inp.checked) {
		var ls = gebtn(this.parentNode,'label');
		for (var i = 0; i < ls.length; i++) {
			var l = ls[i];
			if (l.className.indexOf('label_radio') == -1) {
				continue;
			};
			l.className = 'label_radio r_off';
		};
		this.className = 'label_radio r_on';
		if (safari){ 
			inp.click();
		};
	} else {
		this.className = 'label_radio r_off';
		if (safari) {
			inp.click();
		};
	};
};
			
*/
$(document).ready(function(){
	$(".close").click(function(){
		$("#rightad").hide();
		$(".jia").fadeIn();
	});
	$(".btn").click(function(){
		$("#rightad").fadeIn();
		$(".jia").hide();
	});
});


/**
 * @fileOverview 创建一个悬浮层
 *    $("#to-right").float({position:"rm"}); //右中位置浮动
 */
jQuery.fn.float= function(settings){
	if(typeof settings == "object"){
		settings = jQuery.extend({
			//延迟
			delay : 900,
			//位置偏移
			offset : {
				right : 0,
				top : 200,
				bottom : 0
			},
			style : null, //样式
			width:100,  //宽度
			height:200, //高度
			position:"r" //位置
		}, settings || {});	
		var winW = $(window).width();
		var winH = $(window).height();
		
		 //根据参数获取位置数值
		function getPosition($applyTo,position){
			_pos = {left:settings.offset.left,top:settings.offset.top};
			return _pos;
		}
		//设置容器位置
		function setPosition($applyTo,position,isUseAnimate){
			var scrollTop = $(window).scrollTop();
			var scrollLeft = $(window).scrollLeft();
			var _pos = getPosition($applyTo,position);
			_pos.top += scrollTop;
			isUseAnimate && $applyTo.stop().animate(_pos,settings.delay) || $applyTo.css(_pos);
		} 
		return this.each(function(){
			var $this =  $(this);
			$this.css("position","absolute");
			settings.style && $this.css(settings.style);
			setPosition($this,settings.position);
			$(this).data("isAllowScroll",true);
			$(window).scroll(function(){
				$this.data("isAllowScroll") && setPosition($this,settings.position,true);
			});
		})	
	}else{
		var speed = arguments.length > 1 && arguments[1] || "fast"; 
		this.each(function(){		   
			if(settings == "clearOffset"){
					var _c = {};
					if($(this).data("offset")){
						 _c[$(this).data("offset")] = 0; 
						 $(this).data("isAllowScroll",false);
						 $(this).stop().animate(_c,speed);
					}
			}else if(settings == "addOffset"){
					var _c = {};
					if($(this).data("offset") && $(this).data("offsetPostion")){
						 _c[$(this).data("offset")] = $(this).data("offsetPostion"); 
						 $(this).stop().animate(_c,speed);
						 $(this).data("isAllowScroll",true);
					}
									   
			}else if(settings == "setScrollDisable"){
				$(this).data("isAllowScroll",false);
			}else if(settings == "setScrollUsable"){
				$(this).data("isAllowScroll",true);	
			}
		})
	}
}

$(function(){
	$(".qqad").show();
	$("#rightad,.jia").float({
		delay : 500,//延迟
		position:"r" //位置
	});
	//faq
	$(".faqlist li h3").click(function(){
		$(this).siblings(".mast").fadeIn().closest("li").siblings("li").find(".mast").hide();	
	});
});

$(function(){	
	setInterval(function(){if($(".mfgif").css("display")=='none'){$(".mfgif").css("display","")}else{$(".mfgif").css("display","none")}},500);	
	//
	$(".openfa").click(function(){
		$(".joywinbox,.joywingrey").remove();
		var openfa='<div class="joywingrey"></div><div class="joywinbox">'
			+'<ul class="wingetfa">'
			+'<li class="lifirst"><span>单位名称：</span><input name="fa-company" type="text" value="" style="width:360px" /><a class="closewin"></a></li>'
			+'<li><span>联<font style="margin:0 7px">系</font>人：</span><input name="fa-contact" type="text" value="" /></li>'
			+'<li><span>联系电话：</span><input name="fa-tel" type="text" value="" /></li>'
			+'<li><span style="position:relative; top:-40px">网站需求：</span><textarea class="fainfo" name="fa-info" type="text"></textarea></li>'
			+' <li class="marleft fontgrey">提交需求，<em>免费获取方案</em>，并可获赠"神秘"礼品！</li>'
			+'<li class="marleft"><a href="javascript:;" class="faajaxbtn"><img src="/images/win-fabtn.png" /></a></li></ul></div>';
		$("body").append(openfa);
		$(".joywingrey").show();
		//自动设置宽高
		autoWH($(".joywinbox"),313);
		
        $('.wingetfa').stop(false,true).show().animate({
			  'height':'453px',
              'margin-top':'-150px'
        },500,'easeOutQuart');

	});
	$(".closewin").live('click',function(){
        $('.wingetfa').stop(false,true).show().animate({
			  'height':'0px',
              'margin-top':'150px'
        },500,'easeOutQuart');
		$(".joywingrey").fadeOut();   
	});

	//auto
	//$(window).scroll(function(){autoWH($(".joywinbox"),313);});	
	
	//添加需求方案
	$(".faajaxbtn").live("click",function(){
		var facompany=$("input[name='fa-company']").val();
		var facontact=$("input[name='fa-contact']").val();
		var fatel=$("input[name='fa-tel']").val();
		var fainfo=$(".fainfo").val();
		if(!facompany){
			alert("请填写您的单位名称");
			$("input[name='fa-company']").focus();
			return false;	
		}
		if(!facontact){
			alert("请填写联系人");
			$("input[name='fa-contact']").focus();
			return false;	
		}
		if(!fatel){
			alert("请填写联系电话");
			$("input[name='fa-tel']").focus();
			return false;	
		}
		if(!fainfo){
			alert("请填写您对网站的需求信息");
			$("input[name='fa-info']").focus();
			return false;	
		}
		$.ajax({
			 type:"POST",url:"include/accontrol.php?ac=submitgetfa",
			 data:"company="+facompany+"&contact="+facontact+'&tel='+fatel+'&fainfo='+fainfo,
			 success:function(reback){
				 alert('需求已成功提交，我们会安排工作人员尽快为您处理。');
				 $('.closewin').click();
			}
		});
		
		
		
	});
	
	//downfile
	$(".downFiles .down,.downFiles .kb").live('click',function(){
		$(".downpass").remove();
		var inputbox='<div style="position:absolute"><div class="downpass">'
        	+'<p>请输入下载密码：<em>x</em></p>'
        	+'<p><input class="downinput" type="password" name="downpwd" value="" /></p>'
            +'<p><input type="button" class="getdownpwd" value="确认" /><span></span></p></div></div>';
		$(this).closest('li').append(inputbox);
		var clkclass=$(this).attr("class");
		if(clkclass=='kb'){$(".downpass").css({"left":"500px"})}
		$(".downpass").fadeIn();
		
	});	
	$(".downpass em").live('click',function(){
		$(".downpass").fadeOut();
	})
	$(".getdownpwd").live('click',function(){
		if($('.downinput').val()==''){
			$(this).siblings('span').html('请输入下载密码').fadeIn();
		}else{
			$(this).siblings('span').html('密码输入不正确').fadeIn();	
		}
	});
	//换wellknown
	$(".wellknown a").hover(function(){
		$(this).find("img").attr('src','images/client/wellknown/'+$(this).attr('rel')+'_white.png');
	},function(){
		$(this).find("img").attr('src','images/client/wellknown/'+$(this).attr('rel')+'_gray.png');
	});
	//自动报价链接
	// $(".rightadv .price").click(function(){
	// 	location.href='/cost.html';	
	// });
	
	//解决方案添加需求方案
	$(".solutionsub").click(function(){
		var scompany=$(".scompany").val();
		var scontact=$(".scontact").val();
		var stel=$(".stel").val();
		var sinfo=$(".sinfo").val();
		if(!scompany){
			alert("请填写您的单位名称");
			$(".scompany").focus();
			return false;	
		}
		if(!scontact){
			alert("请填写联系人");
			$(".scontact").focus();
			return false;	
		}
		if(!stel){
			alert("请填写联系电话");
			$(".stel").focus();
			return false;	
		}
		if(!sinfo){
			alert("请填写您对网站的需求信息");
			$(".sinfo").focus();
			return false;	
		}
		$.ajax({
			 type:"POST",url:"include/accontrol.php?ac=submitgetfa",
			 data:"company="+scompany+"&contact="+scontact+'&tel='+stel+'&fainfo='+sinfo,
			 success:function(reback){
				 alert('需求已成功提交，我们会安排工作人员尽快为您处理。');
				 $('.tabform input,.tabform textarea').val('');
				 $('.tabform .solutionsub').val('提交需求');
			}
		});
		
	});
	
	
	
//	
});

//设置框架
function autoWH(win,defaultw){
	var Rw=$(window).width()/2-defaultw;
	var Rh=$(window).height()/2-280;
	$(win).css({'left':Rw,'top':Rh});
	$(".joywingrey").css({'width':$(window).width(),'height':$(window).height()});
}

//
function postform(){
	var name=$(".bname").val();
	var phone=$(".bphone").val();
	var companyname=$(".bcompanyname").val();
	var content=$(".bcontent").val();
	var checkcode=$(".bcheckcode").val();
	if (name==""){
		alert("姓名不能为空！");
		$(".bname").focus();
		return false;
		}
	if (phone==""){
		alert("您的电话不能为空！");
		$(".bphone").focus();
		return false;
		}
	if (companyname==""){
		alert("单位名称不能为空！");
		$(".bcompanyname").focus();
		return false;
		}		
	if (content==""){
		alert("留言内容不能为空！");
		$(".bcontent").focus();
		return false;
		}
	if (checkcode==""){
		alert("验证码不能为空！");
		$(".bcheckcode").focus();
		return false;
	}
	$.ajax({
		 type:"POST",url:"include/accontrol.php?ac=bookmsg",
		 data:"bname="+name+"&btel="+phone+'&bcompany='+companyname+'&bcontent='+content+'&checkcode='+checkcode,
		 success:function(reback){
			 if(reback=='0'){alert('验证码输入有误');return false;}
			 alert('需求已成功提交，我们会安排工作人员尽快为您处理。');
			 $('.closewin').click();
		}
	});
	return false;
	
}
function ckcode(o){
	var nowtime	 = new Date().getTime();
	o.src = 'js/yzcode.php?nowtime=' + nowtime;
}

//years
$(function(){	
	function years(){
		var mydate = new Date();
		var nowyear=mydate.getFullYear();
		var years1=$('.time').text().substr(0, 4);
		var year=nowyear - years1;
		var cont=$('.info.yh li').eq(2);
		cont.empty();
		var conttxt='合作时长：'+year+'年';
		cont.html(conttxt);
	}
	years();
})