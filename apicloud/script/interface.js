$.extend({
 //    adUrl:'http://121.40.197.83:5433/',
	// userUrl:'http://121.40.197.83:5431/',
	// singlarUrl:'http://121.40.197.83:5434/signalr',
    adUrl:'http://121.196.236.95:5431/',//'http://localhost:16143/',
    userUrl:'http://121.196.236.95:5432/',
    singlarUrl:'http://121.196.236.95:5436/signalr',
	userInfo:localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null,//获取缓存的用户信息
    userIndexInfo:localStorage.userIndexInfo ? JSON.parse(localStorage.userIndexInfo) : null,//获取缓存用户中心信息
    userAccount:localStorage.userAccount ? JSON.parse(localStorage.userAccount) : null,
    userLocation:localStorage.userLocation ? JSON.parse(localStorage.userLocation):null,//获取用户GPS定位的地址信息
    bonusAmount:localStorage.bonusAmount ? JSON.parse(localStorage.bonusAmount):null,//获取用户注册邀请获得收益基数
    togoalAjax:function(options){
        var opts = $.extend({}, defaluts, options); /*使用jQuery.extend 覆盖插件默认参数*/
        var header={};
        if($.userInfo!=null && $.userInfo.accessToken)
    	{
    		header.Authorization = 'Togoal ' + $.uuid()+":"+$.userInfo.accessToken+":"+$.uuid()+":"+$.requestTimeStamp();
    	}
        $.ajax({
	        type:opts.type,
	        url:opts.url,
	        data:opts.data||{},
            timeout:30000,
        	headers: header,
            async:opts.async,
        	beforeSend:function(xhr){
        		$.showWait();
        	},
	        success:function(data) {  
                $.removeWait();
	        	if(data && data.success){                    
	        		if(opts.success)                        
	            		return opts.success(data.result);
	            	else
						$.showMsg(data.result);
	            }
	        	else
	        	{
	        		if(opts.error){
	        			return opts.error(data ? data.error? data.error:null:null);
	        		}
	        		else{
						$.showMsg(data?data.error? data.error.details:"null":"null");
	        		}
	        	}
	        },
	        error:function(e) {  
                 if(e.status=='401')
                {
                     localStorage.userIndexInfo=null;
                     localStorage.userInfo=null;
                     localStorage.userAccount=null;
                     window.location.href="login.html";
                }
                /*由于落地页返回时报此错误，所以注释了*/
                /*else
	        	    $.showMsg("网络君开小差了，请稍后重试");*/
	        },
            complete:function(xhr,status){
                if(status=="timeout"){
                    $.removeWait();
                    $.showMsg("网络超时");
                }
            }
        }).always(function(){
            $.removeWait();
        });
       /*默认参数*/
	    var defaluts = {
            type: 'POST',
            contentType: 'application/json'
	    };
    } ,
    /*等待动画*/
    showWait:function(){
    	var waitingBox="<div class='wait' style='display:block'><div class='loader'><div class='loader-inner line-spin-fade-loader'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div><span>网络较差, 请点我加速一下吧！</span></div>";
        // var waitingBox="<div class='wait'><div class='loader'><div class='loader-inner line-spin-fade-loader'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div>";

    	$('body').append(waitingBox);
    	$('.waitshade,.wait').show();
        /*setTimeout(function(){
            $('.wait,.waitshade').remove();
            $.showMsg("网络连接失败");
        },15000);*/
    },
    waitChild:function (options) {
        var waitingBox="<div class='waitChild waitChild-"+options+"'><div class='loader-inner line-spin-fade-loader'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>";
        $('body').append(waitingBox);
        if (options === 'left') {
            $('.waitChild-left').show();
        }
        $('.waitChild-right').show();
    }, 
    removeWaitleft:function(){
        $('.waitChild-left').remove();
    },
    removeWaitright:function(){
        $('.waitChild-right').remove();
    },
    /*remove等待动画*/
    removeWait:function(){
    	$('.waitshade,.wait').remove();
    },
    /*remove等待动画*/
    /*刷新*/
    refresh:function (callback) {
        var plsreResh="<div class='plsreResh'><img src='../image/plsreResh.png'></div><div class='plsreReshPic'></div>";
        $('body').append(plsreResh);
        $('.plsreReshPic,.plsreResh').show();
        if(callback){
            $(".plsreResh").bind("click",callback);
        }
    },
    /*移除刷新*/
    removefresh:function () {
        $('.plsreReshPic,.plsreResh').remove();
    },
    selectTime:function () {
        return {
            timer:null,
            defaultsTime:{}
        }
    },
    /*提示信息*/
    showMsg:function(msg,allRight,callback){
        // var timer = $.selectTime.timer;
        if(!allRight) allRight ='alt-x-left';
        // allRight = alt-all-right
        else allRight = allRight;

    	var newtag="<div class='failded'><p><span class='alt-icon alt-icon-mark'>"+
        "<span class="+allRight+"></span>"+
        "<span class='alt-x-right'></span>"+
        "</span><span class='message-content'></span></p></div>";
        $('body').append(newtag); 
        $('.message-content').show(); 

        if(msg.length >10){
            $('.message-content').css({'padding': '0 2rem 0 2.8rem','line-height':'1.5'})
        }
        $('.message-content').text(msg);
        
        if ( $.selectTime.timer!=undefined &&  $.selectTime.timer!=null) {
            /*
                清除时间为null
            */
            clearTimeout($.selectTime.timer);
            $.selectTime.timer = null;
        };
       /* timer*/
       $.selectTime.timer = setTimeout(function(){
        
        	$('.failded').remove();
            if(callback) callback();
        },2000);
       /*
            点击隐藏dialog
       */
        (function (e) {
            if ($('.failded').show()) {
                $('.alt-icon,.failded').click(function (e) {
                    $('.failded').remove();
                    e.preventDefault();
                    // clearTimeout($.selectTime.timer);
                });
            }
        })(event);
    },
    /*设置倒计时信息*/
    setTime:function (m,callback) {
        var newtag=" <div class='refreshTime'><p><span class='message-content'>操作太频繁，请等候<span class='showTime'></span>秒!</span></p></div>";
        $('body').append(newtag); 
        function paramTime(m) {
            $('.showTime').text(m);
            if(m == 0){
               callback()
            }else{
                m -= 1;
                setTimeout(function (){
                    paramTime(m)
                },1000);
            }
        }
        paramTime(m)
    },
    /*提示信息*/
    uuid: function() {
        var d = [];
        var a = "0123456789abcdef";
        for (var b = 0; b < 36; b++) {
            d[b] = a.substr(Math.floor(Math.random() * 16), 1)
        };
        d[14] = "4";
        d[19] = a.substr((d[19] & 3) | 8, 1);
        d[8] = d[13] = d[18] = d[23] = "";
        var c = d.join("");
        return c;
    },
    requestTimeStamp:function(){
	    var startTime= new Date (1970, 1, 1).getTime();   
	 	var endTime2  = new Date().getTime();    
	 	var a = endTime2 - startTime;
	 	return a;
    },
    /*检查手机号码*/
    checkMobile: function(telphone){
        telphone = this.trim(telphone);
        if(telphone.length !== 11){
            return '未知';/*未检测到正确的手机号码*/
        }
        else{

            var phoneRe = /^1\d{10}$/;  
            var dx = [133,153,180,181,189]; /*电信*/
            var lt = [130,131,132,145,155,156,185,186];/*联通*/
            var yd = [134,135,136,137,138,139,147,150,151,152,157,158,159,182,183,184,187,188];/*移动*/
            
            function inArray(val,arr){
                for(i in arr){
                    if(val == arr[i]) return true;
                }
                return false;
            }
            
            if(phoneRe.test(telphone)){
                var temp = telphone.slice(0,3);
                if(inArray(temp,yd)) return "移动";
                if(inArray(temp,lt)) return "联通";
                if(inArray(temp,dx)) return "电信";
                return 4;
            }
            return '未知';  
        }
    },
    /*设备的名称*/
    isNavigator: function (isMedia,callback) {
        var o = {
                getName : isMedia.name,
                an : 'android',
                io : 'ios'
            },
            u = navigator.userAgent,
            isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if (o.getName === o.an) {
                 if(isAndroid){
                    callback();
                 }
            }else if(o.getName === o.io){
                if(isiOS){
                    callback();
                }
            }else{
                return false;
            }
    }
});