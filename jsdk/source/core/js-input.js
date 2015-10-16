/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.1
 * @author feng.chun
 * @date 2011-03-24
 * @date 2011-04-14
 * @date 2011-09-05
 *  
 * @requires /core/js-core.js
 */
js.lang.System.namespace('js.input');

/**
 * @class js.input.KEY
 * @static
 */
js.input.KEY = {
    BACK_SPACE   : 8,   /** @constant {Int} BACK_SPACE */
    TAB          : 9,   /** @constant {Int} TAB */
    ENTER        : 13,  /** @constant {Int} ENTER */
    SHIFT        : 16,  /** @constant {Int} SHIFT */
    CONTROL      : 17,  /** @constant {Int} CONTROL */
    ALT          : 18,  /** @constant {Int} ALT */
    PAUSE        : 19,  /** @constant {Int} PAUSE */
    CAPS_LOCK    : 20,  /** @constant {Int} CAPS_LOCK */
    ESCAPE       : 27,  /** @constant {Int} ESCAPE */
    SPACE        : 32,  /** @constant {Int} SPACE */
    PAGE_UP      : 33,  /** @constant {Int} PAGE_UP */ 
    PAGE_DOWN    : 34,  /** @constant {Int} PAGE_DOWN */
    END          : 35,  /** @constant {Int} END */
    HOME         : 36,  /** @constant {Int} HOME */
    LEFT         : 37,  /** @constant {Int} LEFT */
    UP           : 38,  /** @constant {Int} UP */
	RIGHT        : 39,  /** @constant {Int} RIGHT */
    DOWN         : 40,  /** @constant {Int} DOWN */
    PRINTSCREEN  : 44,  /** @constant {Int} PRINTSCREEN */
	INSERT       : 45,  /** @constant {Int} INSERT */
    DELETE       : 46,  /** @constant {Int} DELETE */
	
	NUMPAD0      : 96,  /** @constant {Int} NUMPAD0 */
	NUMPAD1      : 97,  /** @constant {Int} NUMPAD1 */
	NUMPAD2      : 98,  /** @constant {Int} NUMPAD2 */
	NUMPAD3      : 99,  /** @constant {Int} NUMPAD3 */
	NUMPAD4      : 100, /** @constant {Int} NUMPAD4 */
	NUMPAD5      : 101, /** @constant {Int} NUMPAD5 */
	NUMPAD6      : 102, /** @constant {Int} NUMPAD6 */
	NUMPAD7      : 103, /** @constant {Int} NUMPAD7 */
	NUMPAD8      : 104, /** @constant {Int} NUMPAD8 */
	NUMPAD9      : 105, /** @constant {Int} NUMPAD9 */
	
    MULTIPLY     : 106, /** @constant {Int} MULTIPLY */
    PLUS         : 107, /** @constant {Int} PLUS */
    SUBTRACT     : 109, /** @constant {Int} SUBTRACT */
	DECIMAL      : 110, /** @constant {Int} DECIMAL */
    DIVIDE       : 111, /** @constant {Int} DIVIDE */
	
    F1           : 112, /** @constant {Int} F1 */
	F2           : 113, /** @constant {Int} F2 */
	F3           : 114, /** @constant {Int} F3 */
	F4           : 115, /** @constant {Int} F4 */
	F5           : 116, /** @constant {Int} F5 */
	F6           : 117, /** @constant {Int} F6 */
	F7           : 118, /** @constant {Int} F7 */
	F8           : 119, /** @constant {Int} F8 */
	F9           : 120, /** @constant {Int} F9 */
	F10          : 121, /** @constant {Int} F10 */
	F11          : 122, /** @constant {Int} F11 */
	F12          : 123, /** @constant {Int} F12 */
	
	NUM_LOCK     : 144, /** @constant {Int} NUM_LOCK */
    SCROLL_LOCK  : 145, /** @constant {Int} SCROLL_LOCK */
	META         : 224  /** @constant {Int} META */
}

/**
 * KeyBufferProvider is designed to be used with js.lang.System.augment that allows key events to be subscribed to 
 * and fired by keycode.
 * @class js.input.KeyBufferProvider
 * @constructor
 */	
js.input.KeyBufferProvider = function(){};
js.input.KeyBufferProvider.prototype = {
	/**
	 * Reset the hold key buffer.
	 * 
	 * @method resetKeyBuffer
	 */
	resetKeyBuffer: function(){		
		this._KEY_MARK = {};
		this._holdBuffer = 0;//32位二进制整数结构。从低位到高位，每一位顺序的对应需要记录的键值数组的一个键值。
		this._holdKeys = [];//数组结构。顺序且不重复的记录了正被按下的键值。最大记录32个。		
		this._keyLog = [];
	},
	/**
	 * Returns from the first to the N records of pressed keys when isPressedKeyLoggable is true.
	 * 
	 * @struct js.input.KeyBufferProvider$PressedKey {
	 *      "description": "a key log object"
	 *      ,"type":"object"
	 *      ,"properties":{
	 *          "code":{"type":"int","required":true}
	 *          ,"time":{"type":"date","required":true}
	 *      }
	 * }
	 * 
	 * @see js.input.KeyBufferProvider#isPressedKeyLoggable
	 * @method getPressedKeyLog
	 * @param {Int} n:optional 0<n<=32
	 * @return {Array<js.input.KeyBufferProvider$PressedKey>} 
	 */
	getPressedKeyLog: function(n){
		if(!this._keyLog) return null;
		var len = this._keyLog.length;
		if(len==0) return null;
		n = (!n)?len:(n>len?len:n);
		return this._keyLog.slice(0,n);
	},
	/**
	 * Returns all(Max is 32) records of holding keys, includes with the special keys. 
	 * 
	 * @method getHoldKeys
	 * @param {Array<Int>} keys:optional the special keys
	 * @return {Array<Int>} 
	 */
	getHoldKeys: function(keys){
		if(!this._holdKeys) return null;
		if(!keys) return this._holdKeys;
		
		var keysString = keys.join(',')+',';
		return this._holdKeys.filter(function(keyCode){			
			return keysString.indexOf(keyCode+',')>-1;
		});
	},
	_isKeyHold: function(keyCode){
		if(!this._KEY_MARK) return false;
		return (this._holdBuffer & this._KEY_MARK[keyCode])!=0;
	},
	/**
	 * Determines whether or not these keys be hold.
	 * @method isKeyHold
	 * @param {Int|Array<Int>} keyCodes 
	 * @return {Boolean}
	 */
	isKeyHold: function(keyCodes){
		if(js.lang.System.isArray(keyCodes)){
			return keyCodes.every(function(keyCode){
				return this._isKeyHold(keyCode);
			}, this);
		}else{
			return this._isKeyHold(keyCodes);
		}
	},
	/**
	 * Determines whether or not these keys be pressed latest time.
	 * 
	 * @method isKeyLastest
	 * @param {Int|Array<Int>} keyCodes 
	 * @return {Boolean}
	 */
	isKeyLastest: function(keyCodes){
		if(!this._keyLog) return false;
		var len = this._keyLog.length;
		if(len==0) return false;
		var n = (js.lang.System.isArray(keyCodes))?keyCodes.length:1;
		if(len < n) return false;
		
		var keys = this._keyLog.slice(0,n);
		return keys && keys.toString()==keyCodes.toString(); 
	},
	/**
	 * Determines whether or not the key be repeat pressed latest time.
	 * 
	 * @method isKeyRepeat
	 * @param {Int} keyCode the repeat key code
	 * @param {Int} n the repeat times: <=32
	 * @return {Boolean}
	 */
	isKeyRepeat: function(keyCode, n){
		var keys = this.getLastestKeys(n);
		if(keys.length!=n) return false;
		return keys.every(function(key){return key.code==keyCode;});
	},
	/**
	 * Lets log the pressed keys.
	 * The default value is false.
	 * 
	 * @method setPressedKeyLoggable
	 * @param {Boolean} f
	 */
	setPressedKeyLoggable: function(f){this._keyLoggable = f},		
	/**
	 * True is logging the pressed keys.
	 * 
	 * @method isPressedKeyLoggable
	 * @return {Boolean} the default value is false
	 */
	isPressedKeyLoggable: function(){return this._keyLoggable?true:false},	
	/**
	 * Listen the keys hold.
	 * 
	 * @method onKeyHold
	 * @param {Object} keyData
	 * @param {js.lang.Callback} handlerKeyDown:optional 
	 * @param {js.lang.Callback} handlerKeyUp:optional 
	 */ 
	onKeyHold: function(keyData, handlerKeyDown, handlerKeyUp){
		if(!keyData) return;
		if(!this._KEY_MARK) this.resetKeyBuffer();
		
		var fnKeyDown = null, contextKeyDown = null
		, fnKeyUp = null, contextKeyUp = null;		
		if (handlerKeyDown) {
			fnKeyDown = handlerKeyDown['fn'];
			contextKeyDown = handlerKeyDown['scope'];
		}//, argsKeyDown = handlerKeyDown['args'],
		if (handlerKeyUp) {
			fnKeyUp = handlerKeyUp['fn'];
			contextKeyUp = handlerKeyUp['scope'];
		}//, argsKeyUp = handlerKeyUp['args'];
		
		var keys = keyData['keys'], noKeys = !keys||keys.length==0;	
		if (noKeys) {
			keyData['keys'] = [];
			keys = [];
			if (keyData['shift']) {
				keyData['keys'].push(js.input.KEY.SHIFT); //Fix bug for YUI's KeyListener
				keys.push(js.input.KEY.SHIFT);
			}
			if (keyData['alt']) {
				keyData['keys'].push(js.input.KEY.ALT);
				keys.push(js.input.KEY.ALT);
			}				
			if (keyData['ctrl']) {
				keyData['keys'].push(js.input.KEY.CONTROL);
				keys.push(js.input.KEY.CONTROL);
			}				
		}
				
		for(var i=0,len=keys.length;i<len;i++){
			this._KEY_MARK[keys[i]] = 1<<i;
		}
		
		this.onKeyDown(
			keyData,
			{fn:function(type, args){
				this._holdBuffer|= this._KEY_MARK[args[0]];//键值对应bit设置为1
				if(!this._holdKeys.contains(args[0])) this._holdKeys.push(args[0]);//(不重复地)按时间顺序记录Hold键
				
				if(this._keyLoggable){
					if(this._keyLog.length>=32) this._keyLog.shift();//只记录最近32个按键的信息
					this._keyLog.insertAt(0, {code:args[0],time:new Date()});										
				}
								
				if(fnKeyDown) fnKeyDown.call(contextKeyDown||this, args[0]);
			}} 
		);
		
		var newKeyData = {};
		if (noKeys) {
			newKeyData['keys'] = keyData['keys'];
			if (keyData['shift']) {
				newKeyData['shift'] = false; //Fix bug for YUI's KeyListener
			}
			if (keyData['alt']) {
				newKeyData['alt'] = false;
			}
			if (keyData['ctrl']) {
				newKeyData['ctrl'] = false;
			}				
		}		
		this.onKeyUp(
			noKeys?newKeyData:keyData,
			{fn:function(type, args){
				var k = Math.log(this._KEY_MARK[args[0]])/Math.log(2);//键值对应bit设置为0
				this._holdBuffer&= ~(1 << k) 
				this._holdKeys.remove(args[0]);//删除原记录
				
				if(fnKeyUp) fnKeyUp.call(contextKeyUp||this, args[0]);
			}}
		);
	},
	_addKeyListener: function(type, keyData, callback){
		if(!callback) throw new TypeError();
		var fn = callback['fn'], args = callback['args'], scope = callback['scope']||this;
		if(!fn) throw new TypeError();
		
		var k = new js.util.KeyListener(document, keyData, {
            'fn': fn,
			'scope': args,
            'correctScope': scope
        }, type);
        k.enable();
		
		if(!this._keyListeners) this._keyListeners = {};
        this._keyListeners[js.lang.System.getUUID()] = k;
    },
	/**
	 * Listen when keys released.
	 * 
	 * @method onKeyUp
	 * @param {Array<Int>} keyData
	 * @param {js.lang.Callback} callback
	 */
    onKeyUp: function(keyData, callback){
        this._addKeyListener('keyup', keyData, callback);
    },
	/**
	 * Listening when keys pressed.
	 * 
	 * @method onKeyDown
	 * @param {Array<Int>} keyData
	 * @param {js.lang.Callback} callback
	 */
    onKeyDown: function(keyData, callback){
        this._addKeyListener('keydown', keyData, callback);
    },
	/**
	 * Disables all keys's listening.
	 * 
	 * @method disableAllKeys
	 */
    disableAllKeys: function(){
        for (k in this._keyListeners) {
            var l = this._keyListeners[k];
        	if (l) l.disable();
        }            
    },
	/**
	 * Enables all keys's listening.
	 * 
	 * @method enableAllKeys
	 */
	enableAllKeys: function(){
        for (k in this._keyListeners) {
            var l = this._keyListeners[k];
        	if (l) l.enable();
        }
    },
	/**
	 * Remove all keys's listening.
	 * 
	 * @method removeAllKeys
	 */
	removeAllKeys: function(){
		this.disableAllKeys();
		this._keyListeners = {};
	}
}
/**
 * @class js.input.Mouse
 * @static
 */
js.input.Mouse = {LEFT: 0, CENTER: 1, RIGHT: 2};
/** @constant {Int} LEFT */
/** @constant {Int} CENTER */
/** @constant {Int} RIGHT */

/**
 * @class js.input.MouseProvider
 */
js.input.MouseProvider = function(){};
js.input.MouseProvider.prototype = {
	_getCacheIndex4Mouse: function(el, sType, fn, button) {
		var a = this._mouseCache;
        for (var i=0, l=a.length; i<l; i++) {
            var li = a[i];
            if ( li && li['fn'] == fn  && li['el'] == el  && li['type'] == sType  && li['button'] == button) {
                return i;
            }
        }
        return -1;
    },
    _cacheMouseFn: function(el, sType, fn, wfn, button) {
    	if(!this._mouseCache) this._mouseCache = [];
    	this._mouseCache.push({
    		'fn':fn,
    		'type':sType,
    		'el':el,
    		'button':button,
    		'wfn':wfn
    	});
    },
    _clearCacheItem4Mouse: function(index){
    	delete this._mouseCache[index]['wfn'];
        delete this._mouseCache[index]['fn'];
        this._mouseCache.splice(index, 1);
    },
    _fixMouseButton: function(button){
    	if(js.lang.System.isUndefined(button)) button = 0;
    	if(js.core.Env.ie){
			switch (button) {
			case 1:
				return 4;
			case 2:
				return 2;
			default:
				return 1;
			}
		}
    	return button;
    },
    /**
     * @method onMouseShift
     * @param {String|HTMLElement} el
     * @param {String} evtName over|out|move|...
     * @param {Function} fn
     * @param {Object} args:optional
     * @param {Object|Boolean} context:optional 
     * @return {Boolean}
     */
    onMouseShift: function(el, evtName, fn, args, context){
		return js.core.Event.addListener(el, 'mouse'+evtName, fn, args, context||this);
	},
	/**
     * @method onMouseTap
     * @param {String|HTMLElement} el
     * @param {String} evtName up|down
     * @param {Function} fn
     * @param {Object} args:optional
     * @param {Object|Boolean} context:optional 
     * @param {Int} button:optional 0:left|1:center|2:right. The default value is 0. 
     * @return {Boolean}
     */
	onMouseTap: function(el, evtName, fn, args, context, button){
		el = js.core.Dom.$(el);
		if(!el || !evtName || !fn) return false;
		button = this._fixMouseButton(button);
    	
		var wfn = function(e, a){
			if(e.button == button) return fn.call(this, e, a);
		};
		this._cacheMouseFn(el, evtName, fn, wfn, button);
		
		return js.core.Event.addListener(el, (evtName=='click'||evtName=='dblclick')?evtName:('mouse'+evtName), wfn, args, context||this);
	},
	/**
     * @method onMouseLeftTap
     * @param {String|HTMLElement} el
     * @param {String} evtName up|down
     * @param {Function} fn
     * @param {Object} args:optional
     * @param {Object|Boolean} context:optional 
     * @return {Boolean}
     */
	onMouseLeftTap: function(el, evtName, fn, args, context){
		return this.onMouseTap(el, evtName, fn, args, context, 0);
	},
	/**
     * @method onMouseCenterTap
     * @param {String|HTMLElement} el
     * @param {String} evtName up|down
     * @param {Function} fn
     * @param {Object} args:optional
     * @param {Object|Boolean} context:optional 
     * @return {Boolean}
     */
	onMouseCenterTap: function(el, evtName, fn, args, context){
		return this.onMouseTap(el, evtName, fn, args, context, 1);
	},
	/**
     * @method onMouseRightTap
     * @param {String|HTMLElement} el
     * @param {String} evtName up|down
     * @param {Function} fn
     * @param {Object} args:optional
     * @param {Object|Boolean} context:optional 
     * @return {Boolean}
     */
	onMouseRightTap: function(el, evtName, fn, args, context){
		return this.onMouseTap(el, evtName, fn, args, context, 2);
	},
	/**
     * @method rmMouseTap
     * @param {String|HTMLElement} el
     * @param {String} evtName
     * @param {Function} fn
     * @param {Int} button:optional 0:left|1:center|2:right. The default value is 0.
     * @return {Boolean}
     */
	rmMouseTap: function(el, evtName, fn, button){
		el = js.core.Dom.$(el);
		if(!el || !evtName || !fn) return false;
		button = this._fixMouseButton(button);
		
		var index = this._getCacheIndex4Mouse(el, evtName, fn, button);
		if(index == -1) return false;
		
		var rst = js.core.Event.removeListener(el, (evtName=='click'||evtName=='dblclick')?evtName:('mouse'+evtName), this._mouseCache[index]);
		this._clearCacheItem4Mouse(index);
		return rst;
	},
	/**
     * @method rmMouseLeftTap
     * @param {String|HTMLElement} el
     * @param {String} evtName
     * @param {Function} fn
     * @return {Boolean}
     */
	rmMouseLeftTap: function(el, evtName, fn, context){
		return this.rmMouseTap(el, evtName, fn, 0);
	},
	/**
     * @method rmMouseCenterTap
     * @param {String|HTMLElement} el
     * @param {String} evtName
     * @param {Function} fn
     * @return {Boolean}
     */
	rmMouseCenterTap: function(el, evtName, fn, context){
		return this.rmMouseTap(el, evtName, fn, 1);
	},
	/**
     * @method rmMouseRightTap
     * @param {String|HTMLElement} el
     * @param {String} evtName
     * @param {Function} fn
     * @return {Boolean}
     */
	rmMouseRightTap: function(el, evtName, fn, context){
		return this.rmMouseTap(el, evtName, fn, 2);
	}
}
			