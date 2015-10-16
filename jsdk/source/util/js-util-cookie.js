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

/**
 * @class js.util.Cookie
 * @static
 * @final
 */
js.util.Cookie = function(){
	return {		
		/**
		 * Write to cookie.
		 * 
		 * @method write
		 * @param {String} key
		 * @param {String|Number} value
		 * @param {Date} expires:optional
		 * @param {String} path:optional
		 */
		write: function(key, value, expires, path){
			if(!key) return;
			var p =  path? path : '/' ; 
			var exp = expires?expires.toGMTString():'Wed, 15 Apr 2099 00:00:00 GMT';
			document.cookie = js.util.Cookie.NAME_SPACE + key + '=' + escape(''+value) + '; path=' +p+ '; expires=' + exp;
		},
		/**
		 * Read the value of the key.
		 * 
		 * @method read
		 * @param {String} key
		 * @return {String}
		 */
		read: function(key){
			var reg = new RegExp("(^| )" + js.util.Cookie.NAME_SPACE + key+"=([^;]*)(;|$)","gi");
 			var data = reg.exec(document.cookie);
			return data?unescape(data[2]):null;
		},
		/**
		 * Clear the value of the key.
		 * 
		 * @method clear
		 * @param {String} key
		 */
		clear: function(key){
			this.write(key, '');
		}
	}
}();
/**
 * @field {String} NAME_SPACE
 * @static
 */
js.util.Cookie.NAME_SPACE = 'JSDK_';
