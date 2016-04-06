var dqb_nwf = function  () {}

/*获得一个天数*/
function getdate(){
  var mydate = new Date();
  month = mydate.getMonth() + 1;
  if (month >= 1 && month <= 9) {month = "0" + month; }
  strDate = mydate.getDate();
  if (strDate >= 0 && strDate <= 9) {strDate = "0" + strDate; }
  var today = "" + mydate.getFullYear() + "-" + month + "-" + strDate;
  return today;
}
// /*领取金额*/
function show_suc(){
  $.togoalAjax({
     type:'post',
     url:$.userUrl+'api/AppUser/GetSalaryJudge?userId='+$.userInfo.id,
     success:function(data){

        /*判断金额是否小于一元*/
        if(toDecimal2($.userAccount.withdrawals)<1) {$.showMsg("金额小于一元不能领取"); return; }
        /*判断账户是否绑定 */
        if($.userAccount.weChat==''){
            $('.for_pay_account').removeClass('hide');
            $("#wzf_mobile_input").val($.userInfo.phone);
        }
        else{
          /*跳出确认领取页面*/
          $("#pay_success_time").text("预计到账时间："+getdate());
          $("#pay_success_withdrawals").text("￥"+parseInt(toDecimal2($.userAccount.withdrawals)));
          $('.pay_success').show(); 
        }
        $('.get_draw a').css('visibility','hidden');
      }
   
 })
}





/*分享*/
function hide_suc(){
  
        if($('#shareto').is(':checked')){
         totimeline();
        }
        else{
          $.showMsg("领取失败");
        }
        $('.pay_success').hide(); 
        $('.get_draw a').css('visibility','visible');
      }
// 分享领取成功返回
function totimeline(){
  $.togoalAjax({
     type:'post',
     url:$.userUrl+'api/AppUser/GetShareLink',
     success:function(shareurl){
     debugger;
     var weiXin = api.require('weiXin');
     weiXin.registerApp(
          function(ret,err){
            if (ret.status) {
                weiXin.sendRequest({
                    scene:'timeline',
                    contentType:'web_page',
                    title:'我在点钱宝获得了' + parseInt(toDecimal2($.userAccount.withdrawals)) + '元，小伙伴们快来吧',
                    description:'我在点钱宝获得了' + parseInt(toDecimal2($.userAccount.withdrawals)) + '元，小伙伴们快来吧',
                    thumbUrl:'widget://image/logo1.png',
                    contentUrl: shareurl
                },function(ret,err){
                    if(ret.status){
                        $.togoalAjax({
                               type:'post',
                               url:$.userUrl+'api/AppUser/GetSalaryMoeny?userId='+$.userInfo.id,
                               success:function(data){
                                  if (data) {
                                    /*$.userAccount.withdrawals=Number(toDecimal2($.userAccount.withdrawals))-Number(parseInt(toDecimal2($.userAccount.withdrawals)));
                                    localStorage.userAccount=JSON.stringify($.userAccount);*/
                                    /*$("#withdrawals").text(parseInt(toDecimal2($.userAccount.withdrawals))+"元");
                                    $("#total").text(toDecimal2(Number($.userAccount.total-$.userAccount.withdrawals))+"元");*/
                                    $.showMsg(data);
                                  }
                               },
                               error:function(data){
                                    $.showMsg(data.details);
                                    if(data.details=='网络通道堵塞，请稍后重试!')
                                    {
                                      return;
                                    }
                                    $('.for_pay_account').removeClass('hide');
                                    $("#wzf_mobile_input").val($.userInfo.phone);
                                    $('.get_draw a').css('visibility','hidden');
                               }
                           });
                    } else{
                        $.showMsg("领取失败");
                    }
                });
            } else{
              $.showMsg("请安装微信客户端后再进行分享!");
            }
      });
   }
 });

}
// 获得服务器的参数
function GetRequest() {  
  var url = location.search;
   var theRequest = new Object();
   if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
         theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
      }
   }
   return theRequest;
}




/*$(document).ready(function() {*/

$(document).ready(function() {
    $('.user_name').text($.userIndexInfo.userName);
    $('.user_lv').text('身份：'+$.userIndexInfo.rankName);
    $('.user_paytype').text('发薪类型：'+$.userIndexInfo.payrollRules);
    if ($.userIndexInfo.headImgUrl!=null && $.userIndexInfo.headImgUrl!="") 
    $('.user_face').css('background-image','url('+$.userIndexInfo.headImgUrl+')');
  	var win_W=$(window).width();
  	var usable_earning_W=$('.usable_earning').width();
  	var usable_earning_ml=win_W/2-usable_earning_W/2;
  	// $('.usable_earning').css('margin-left',usable_earning_ml);
    // 20160406

    var pay_success_W=$('.pay_success').width();
    var pay_success_H=$('.pay_success').height();
    var win_H=$(window).height();
    $('.pay_success').css({left:win_W/2-pay_success_W/2,top:win_H/2-pay_success_H/2});

    var success_icon_W=$('.success_icon').width();
    $('.success_icon').css('margin-left',pay_success_W/2-success_icon_W/2);

    var pay_account_detial_W=$('.pay_account_detial').width();
    $('.pay_account_detial').css('margin-left',pay_success_W/2-pay_account_detial_W/2);

    var label_W=$('.pay_success label').width();
    $('.pay_success label').css('margin-left',pay_success_W/2-label_W/2);

    var com_W=$('.pay_success .complete').width();
    $('.pay_success .complete').css('margin-left',pay_success_W/2-com_W/2);



	/*auto center*/
    $("#withdrawals").text(parseInt(toDecimal2($.userAccount.withdrawals))+"元")
    $("#total").text(toDecimal2(Number($.userAccount.total-$.userAccount.withdrawals))+"元")

    $.togoalAjax({
        type:'get',
        url:$.userUrl+'api/AppUser/GetUserAccountSortByUserId?userid='+$.userInfo.id,
        success:function(data){
            $(".earning_rank p").text('第'+data+'位');
        }
    });

    /*
      显示金额的部分
    
    */


});

/*$(document).ready(function() {*/







/*收款账户验证*/
function wzf_yanzheng(){
    var mobile=$("#wzf_mobile_input");
    var mobile_L=$("#wzf_mobile_input").val().length;
    var security=$("#wzf_security");
    var regPhoneNumber = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if(mobile_L==''){
        $.showMsg("手机号码不能为空");
        return false;
    }else if(mobile_L!=11 || !regPhoneNumber.test(mobile.val())){
        $.showMsg("手机号码格式不对");
        return false;
    }else{
        return true;
    }
};

var timer;
var time=120;
/*点击发送倒计时*/
function wzf_timer_count(){
    clearTimeout(timer);
    btn_disable();
    time--;
    $("#wzf_security_btn").val(time);
    timer=setTimeout(function(){
        if(time<1){
            time=1;
        };
        wzf_timer_count()
    },1000);
    if($("#wzf_security_btn").val()==0){
        wzf_btn_enable();
        clearTimeout(timer);
        $("#wzf_security_btn").val(null);
    }
};



/*判断是否成功*/
function wzf_securityfn() {
      if(wzf_yanzheng()){
          time=120;
          wzf_timer_count();
          wzf_btn_disable();
          $.togoalAjax({
              type:'post',
              url:$.userUrl+'api/AppUser/BindingCallSMSCode?id='+$.userInfo.id+'&phone='+$("#wzf_mobile_input").val()+'&isReg=' + false,
              success:function(data){
                  $.showMsg("短信发送成功",'alt-all-right');
              },
              error:function(data){
                  $.showMsg(data.details);
                  wzf_btn_enable();
                  clearTimeout(timer);
                  $('#wzf_security_btn').val(null);
              }
          });
      }
};

$("#wzf_security_btn").click(function(){
    wzf_securityfn();
});
function wzf_btn_disable(){
    $("#wzf_security_btn").attr({"disabled":"disabled"});
    $("#wzf_security_btn").css("background-image","url(../image/reg&login/security_btn_dark.png)");
};
function wzf_btn_enable(){
    $("#wzf_security_btn").removeAttr("disabled");
    $("#wzf_security_btn").css("background-image","url(../image/reg&login/security_btn.png)");
};
function btn_disable(){
      $("#security_btn").attr({"disabled":"disabled"});
      $("#security_btn").css("background-image","url(../image/reg&login/security_btn_dark.png)");
};
function btn_enable(){
    $("#security_btn").removeAttr("disabled");
    $("#security_btn").css("background-image","url(../image/reg&login/security_btn.png)");
};

/*绑定*/
$('.for_pay_account .complete').click(function(event) {
    if($('#wzf_user_name').val()!=='' && $('#wzf_security').val()!=='' && $('#wzf_mobile_input').val()!=''){
            $.togoalAjax({
            type:'post',
            url:$.userUrl+'api/AppUser/VailCode?phone='+$('#wzf_mobile_input').val()+'&vailCode='+$('#wzf_security').val(),
            success:function(data){
                    var security = $('#wzf_security').val();
                    var mobile = $('#wzf_mobile_input').val();
                    var name = $('#wzf_user_name').val();
                    /*授权*/
                     if(loginToweixin(security,mobile,name) == false)
                     {
                        return false;
                     }
                    /*关闭并清空界面*/
                    wzf_btn_enable();
                    clearTimeout(timer);
                    $("#wzf_security_btn").val(null);
                    $('#wzf_user_name').val("");
                    $('#wzf_security').val("");
                    /*$('#wzf_val,#wzf_mobile_input,#wzf_security').val('');*/
                    $('.for_pay_account').addClass('hide');
                    $('.get_draw a').css('visibility','visible');
            },
                error:function(data) {
                   $.showMsg(data.details); 
                }
        });  
    }else{
      $.showMsg('账户输入有误');
    };    
});






/*微信登录*/
function loginToweixin(security,mobile,name) {
    var wx = api.require('wx');
    var success;
    wx.isInstalled(function (ret, err) {
        if (ret.installed) {
           success = loginweixin(security,mobile,name);
        } else {
              $.showMsg("请安装微信客户端后再进行账户绑定!");
        }
    });
    return success;
}
/*获取授权信息*/
function loginweixin(security,mobile,name) {
        var wx = api.require('wx');
        var success;
        wx.auth({
            apiKey: 'wxd874b3905bacbcb3'
        },
        function (ret, err) {
            if (ret.status) {
              success = weixingetToken(ret.code,security,mobile,name);
            } else {
                if(err!=null)
                {
                    if(err.code==1)
                    {
                        $.showMsg("用户取消授权");
                    }
                    else if(err.code==2)
                    {
                        $.showMsg("用户拒绝授权");
                    }
                    else if(err.code==3)
                    {
                        $.showMsg("请安装微信客户端后再进行账户绑定!");
                    }
                    else if (err.code==0)
                    {
                        $.showMsg("授权成功");
                    }
                    else if(err.code==-1)
                    {
                        $.showMsg("授权失败");
                    }
                }
                else
                {
                    $.showMsg("授权失败");
                }
            }
        });
    return success;
}
/*获取微信用户Token*/
function weixingetToken(code,security,mobile,name) {
    var wx = api.require('wx');
    var success=false;
    wx.getToken({
        apiKey: 'wxd874b3905bacbcb3',
        apiSecret: 'd4624c36b6795d1d99dcf0547af5443d',
        code: code
    },
     function (ret, err) {
         if (ret.status) {
            $.userIndexInfo.payAccounts=name;
            localStorage.userIndexInfo=JSON.stringify($.userIndexInfo);
      $.togoalAjax({
            type:'post',
            url:$.userUrl+'api/AppUser/BindingAccount',
            data:{id:$.userInfo.id,AccountType:"weChat",Account:ret.openId,ActualName:name,VailCode:security,Phone:mobile},
            success:function(data){
                    $('#pay_account i').text($.userIndexInfo.payAccounts);                    
                    $.showMsg("授权成功",'alt-all-right');
                    success=true;
            },
                error:function(data) {
                    $.showMsg(data.details);
                    success=false;
                }
        });
         } else {
            if(err!=null)
            {
                 if(err.code==4)
                {
                    $.showMsg("请求超时");
                }
                 else if (err.code==0)
                {
                    $.showMsg("授权成功",'alt-all-right');
                }
                else
                {
                    $.showMsg("绑定授权失败");
                }
            }
            else
            {
                $.showMsg("绑定授权失败");
            }
             success=false;
         }
     });
      return success;
}




$(function() {

    $('.show_suc').bind('click',function (e) {
      e.preventDefault();
      show_suc();
    });

    $('.pay_sure').bind('click',function (e) {
      e.preventDefault();
      hide_suc();
    });
    
    $('.pay_cancle').bind('click',function (e) {
      e.preventDefault();
      $('.pay_success').hide();$('.get_btn a').css('visibility','visible')
    });

});


/*保留两位小数*/
function toDecimal2(x) {
    return x.toString().substring(0,x.toString().indexOf(".") + 3);
}

/*睡眠*/
function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}



// var w = window;
// var j = w.document;
// function  appendImages(options) {
//   var img = j.createElement('img');
//   img.style.cssText = 'display:none';
//   img.src = options;
//   j.body.appendChild(img);
// }