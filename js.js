function GetLocalIPAddr(){ 
var oSetting = null; 
var ip = null; 
try{ 
oSetting = new ActiveXObject( "rcbdyctl.Setting" ); 
ip = oSetting.GetIPAddress; 
console.log(ip); 
if (ip.length == 0){ 
return "没有连接到Internet"; 
} 
oSetting = null; 
}catch(e){ 
return ip; 
} 
return ip; 
} 
console.log(GetLocalIPAddr()) 