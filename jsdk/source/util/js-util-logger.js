/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.1
 * @author feng.chun
 * @date 2010-8-15
 * 
 * @requires /core/js-core.js
 * @requires /library/blackbirdjs-1.0/blackbird.js
 * @requires /library/blackbirdjs-1.0/blackbird.css
 */

js.lang.Loader.loadLib(
{css:'/library/blackbirdjs-1.0/blackbird-min.css'
,js:'/library/blackbirdjs-1.0/blackbird-min.js'}
, function(){	
/**
 * @class js.util.Logger
 * @static
 */
js.util.Logger = {
	_isV: false,
	/**
	 * Hide or show.
	 * @method toggle
	 */
	toggle:function(){
		if(this._isV) {
			this._isV = false;
		} else {
			this._isV = true;
		}
		log.toggle();
	},
	/**
	 * @method hide
	 */
	hide: function(){
		if(this._isV) this.toggle();
		this._isV = false;
	},
	/**
	 * @method show
	 */
	show: function(){
		if(!this._isV) this.toggle();
		this._isV = true;
	},
	/**
	 * Resize
	 * @method resize
	 */
	resize:log['resize'],
	/**
	 * Clear all messages.
	 * @method clear
	 */
	clear:log['clear'],
	/**
	 * Move to position.
	 * 
	 * @method move
	 * @param {Int} pos 0|1|2|3: TopLeft|TopRight|BottomLeft|BottomRight
	 */
	move:log['move'],
	/**
	 * Print the debug message.
	 * @method debug
	 * @param {String} msg
	 */
	debug:log['debug'],
	/**
	 * Print the warn message.
	 * @method warn
	 * @param {String} msg
	 */
	warn:log['warn'],
	/**
	 * Print the info message.
	 * @method info
	 * @param {String} msg
	 */
	info:log['info'],
	/**
	 * Print the error message.
	 * @method error
	 * @param {String} msg
	 */
	error:log['error'],	
	/**
	 * @method profile
	 */
	profile:log['profile']
}	
}

);

