/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.1
 * @author feng.chun
 * @date 2007-8-30
 * 
 * @requires /core/js-core.js
 */
js.util.Cookie=function(){return{write:function(b,c,a,e){if(!b){return;}var d=e?e:"/";var f=a?a.toGMTString():"Wed, 15 Apr 2099 00:00:00 GMT";document.cookie=js.util.Cookie.NAME_SPACE+b+"="+escape(""+c)+"; path="+d+"; expires="+f;},read:function(a){var b=new RegExp("(^| )"+js.util.Cookie.NAME_SPACE+a+"=([^;]*)(;|$)","gi");var c=b.exec(document.cookie);return c?unescape(c[2]):null;},clear:function(a){this.write(a,"");}};}();js.util.Cookie.NAME_SPACE="JSDK_";