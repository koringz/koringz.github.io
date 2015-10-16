/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.1
 * @author feng.chun
 * @date 2011-7-28
 * 
 * @browsers FF 4+;Chrome 8+
 */
js.lang.System.namespace('js.html5');

(function() {
var WebStorage = function(type){
	this.type = type;
	this._storage = window[type+'Storage'];
	if(!this._storage) throw new Error("[js.html5."+type+'Storage'+"]The browser not support HTML5's WebStorage");
	
	//创建事件	
	this.createEvent('changed');
	this.createEvent('removed');
	this.createEvent('cleared');
}	
WebStorage.prototype = {
	get: function(k){
		return this._storage.getItem(k);
	},
	set: function(k, v){
		var old = this.get(k);
		this._storage.setItem(k, v);
		this.fireEvent('changed', k, old ,v);
	},
	remove: function(k){
		var old = this.get(k);
		this._storage.removeItem(k);
		this.fireEvent('removed', k, old);
	},
	clear: function(){
		this._storage.clear();
		this.fireEvent('cleared');
	},
	getLength: function(){
		return this._storage.length;
	}
};
js.lang.System.augment(WebStorage, js.core.EventProvider);

/**
 * @class js.html5.SessionStorage
 * @static
 * @mix js.core.EventProvider
 * @throws {Error} when the browser not support HTML5's WebStorage
 * 
 * @event changed {
 *     "description":"fires after change a item"
 * 	   ,"type":"function"
 *     ,"scope":{"type":"js.html5.SessionStorage"}
 *     ,"arguments":{
 *         "type":"array"
 *         ,items:[
 *             {"type":"string","description":"item 's key"}
 *             ,{"type":"object","description":"item 's old value"}
 *             ,{"type":"object","description":"item 's new value"}
 *         ]
 *     }
 * }
 * @event removed {
 *     "description":"fires after remove a item"
 * 	   ,"type":"function"
 *     ,"scope":{"type":"js.html5.SessionStorage"}
 *     ,"arguments":{
 *         "type":"array"
 *         ,items:[
 *             {"type":"string","description":"item 's key"}
 *             ,{"type":"object","description":"item 's value"}
 *         ]
 *     }
 * }
 * @event cleared {
 *     "description":"fires after clear all items"
 * 	   ,"type":"function"
 *     ,"scope":{"type":"js.html5.SessionStorage"}
 *     ,"arguments":null
 * }
 */
js.html5.SessionStorage = new WebStorage('session');
/**
 * @method get
 * @param {String} k
 * @return {Object}
 */
/**
 * @method set
 * @param {String} k
 * @param {Object} v
 */
/**
 * @method remove
 * @param {String} k
 */
/**
 * @method clear
 */
/**
 * @method getLength
 * @return {Int}
 */

/**
 * @class js.html5.LocalStorage
 * @static
 * @mix js.core.EventProvider
 * @throws {Error} when the browser not support HTML5's WebStorage
 * 
 * @event changed {
 *     "description":"fires after change a item"
 * 	   ,"type":"function"
 *     ,"scope":{"type":"js.html5.SessionStorage"}
 *     ,"arguments":{
 *         "type":"array"
 *         ,items:[
 *             {"type":"string","description":"item 's key"}
 *             ,{"type":"object","description":"item 's old value"}
 *             ,{"type":"object","description":"item 's new value"}
 *         ]
 *     }
 * }
 * @event removed {
 *     "description":"fires after remove a item"
 * 	   ,"type":"function"
 *     ,"scope":{"type":"js.html5.SessionStorage"}
 *     ,"arguments":{
 *         "type":"array"
 *         ,items:[
 *             {"type":"string","description":"item 's key"}
 *             ,{"type":"object","description":"item 's value"}
 *         ]
 *     }
 * }
 * @event cleared {
 *     "description":"fires after clear all items"
 * 	   ,"type":"function"
 *     ,"scope":{"type":"js.html5.SessionStorage"}
 *     ,"arguments":null
 * }
 */
js.html5.LocalStorage = new WebStorage('local');
/**
 * @method get
 * @param {String} k
 * @return {Object}
 */
/**
 * @method set
 * @param {String} k
 * @param {Object} v
 */
/**
 * @method remove
 * @param {String} k
 */
/**
 * @method clear
 */
/**
 * @method getLength
 * @return {Int}
 */
}());