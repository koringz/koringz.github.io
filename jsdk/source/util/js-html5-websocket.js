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
js.lang.System.namespace('js.html5');

/**
 * URI format: scheme://user:passward@host:port/path?query#fragment
 * 
 * @class js.html5.WebSocket
 * @constructor
 * @param {String} host:optional
 * @param {Int} port:optional
 * @param {String} path:optional
 * @throws {Error} when the browser not support HTML5's WebSocket
 */
js.html5.WebSocket = function(host, port, path){
	if(!window.WebSocket) throw new Error("[js.html5.WebSocket]The browser not support HTML5's WebSocket");
	
	/**
	 * @field {String} host
	 */
	this.host = host?host:'localhost';
	/**
	 * @field {Int} port
	 */
	this.port = port?port:80;
	/**
	 * @field {String} path
	 */
	this.path = path?(path.startsWith('/')?path:'/'+path):'';
	
	this._events = {};
	
}	
/**
 * @event open
 * @event message
 * @event close
 * @event error
 */
js.html5.WebSocket.prototype = {
	/**
	 * @method getStatus
	 * @return {Int} status
	 */
	getStatus: function(){		
		return this._socket?this._socket.readyState:-1;
	},
	/**
	 * @method connect
	 */
	connect: function(){	
		this._socket = null;
		this._socket = new WebSocket('ws://'+this.host+':'+this.port+this.path);
		
		for(k in this._events){
			this._socket['on'+k] = this._events[k];
		}		
	},
	/**
	 * @method on
	 * @param {String} eName values: open|message|close|error
	 * @param {Function} fn
	 */
	on: function(eName, fn){
		if(['open','message','close','error'].indexOf(eName) < 0) return;		
		
		if(!fn) return;
		this._events[eName] = fn;
	},
	/**
	 * @method send
	 * @param {String} data
	 */
	send: function(data){
		if(!this._socket) throw new Error("[js.html5.WebSocket]WebSocket not connect!");		
		this._socket.send(data);
	},
	/**
	 * @method close
	 */
	close: function(){
		if(this._socket) this._socket.close(); 
		this._socket = null;
	}	
}