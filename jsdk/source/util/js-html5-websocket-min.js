/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.1
 * @author feng.chun
 * @date 2011-9-28
 * 
 * @browsers FF 4+;Chrome 8+
 */
js.lang.System.namespace("js.html5");js.html5.WebSocket=function(b,a,c){if(!window.WebSocket){throw new Error("[js.html5.WebSocket]The browser not support HTML5's WebSocket");}this.host=b?b:"localhost";this.port=a?a:80;this.path=c?(c.startsWith("/")?c:"/"+c):"";this._events={};};js.html5.WebSocket.prototype={getStatus:function(){return this._socket?this._socket.readyState:-1;},connect:function(){this._socket=null;this._socket=new WebSocket("ws://"+this.host+":"+this.port+this.path);for(k in this._events){this._socket["on"+k]=this._events[k];}},on:function(a,b){if(["open","message","close","error"].indexOf(a)<0){return;}if(!b){return;}this._events[a]=b;},send:function(a){if(!this._socket){throw new Error("[js.html5.WebSocket]WebSocket not connect!");}this._socket.send(a);},close:function(){if(this._socket){this._socket.close();}this._socket=null;}};