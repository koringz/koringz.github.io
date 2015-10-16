/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.2
 * @author feng.chun
 * @date 2011-09-01
 * @date 2011-09-05
 * @date 2011-09-14
 *
 * @version 0.1
 * @author feng.chun
 * @date 2010-08-15
 */
js.lang.System.namespace("js.ui");

(function(){
var SYS = js.lang.System,
	D = js.core.Dom,
	E = js.core.Event, 
	$ = js.core.Dom.$;
	  
/**
 * The base class of all widgets.
 * @class js.ui.Widget
 * @abstract
 * @constructor
 * 
 * @struct js.ui.Widget$Config {
 * 		"description":""
 * 		,"type":"object"
 * 		,"properties":{
 * 			"id":{"type":"string","required":false}
 * 			,"name":{"type":"string","required":false}
 * 			,"lazyInit":{"type":"boolean","required":false,"default":false}
 * 			,"title":{"type":"string","required":false}
 * 			,"type":{"type":"string","required":false}
 * 			,"cssName":{"type":"string","required":false}
 * 			,"cssText":{"type":"string","required":false}
 * 			,"validate":{"type":"array","required":false}
 * 			,"display":{"type":"string","required":false}
 * 			,"width":{"type":"number","required":false}
 * 			,"height":{"type":"number","required":false}
 * 			,"x":{"type":"number","required":false}
 * 			,"y":{"type":"number","required":false}
 * 			,"z":{"type":"number","required":false}  				
 * 		}
 * }
 * 
 * @param {js.ui.Widget$Config} config
 */
js.ui.Widget = function(config){	
	this._config = config||{};	
	if(!this.get('lazyInit')) this._init();
}

js.ui.Widget.prototype = {	
	/**
	 * @abstract
	 * @method render
	 */
	render: function(){},
	/**
	 * @abstract
	 * @method load
	 * @param {String} url
	 */
	load: function(url){},	
	
	_init: function(config){
		if(config) this._config = config;
		
		var id = this.get('id')||SYS.getUUID();
		this.set('id', id);
				
		//事件初始化
		/** @event destorying */
		this.createEvent('destorying', true);
		/** @event destoryed */
		this.createEvent('destoryed', true);
		/** @event rendering */
		this.createEvent('rendering');
		/** @event rendered */
		this.createEvent('rendered');
		/** @event loading */
		this.createEvent('loading');
		/** @event loaded */
		this.createEvent('loaded');
		/** @event showing */
		this.createEvent('showing');
		/** @event showed */
		this.createEvent('showed');
		/** @event hiding */
		this.createEvent('hiding');
		/** @event hided */
		this.createEvent('hided');
		/** @event enabling */
		this.createEvent('enabling');
		/** @event enabled */
		this.createEvent('enabled');
		/** @event disabling */
		this.createEvent('disabling');
		/** @event disabled */
		this.createEvent('disabled');	
		/** @event xMoving */
		this.createEvent('xMoving');
		/** @event xMoved */
		this.createEvent('xMoved');	
		/** @event yMoving */
		this.createEvent('yMoving');
		/** @event yMoved */
		this.createEvent('yMoved');	
		/** @event wResizing */
		this.createEvent('wResizing');
		/** @event wResized */
		this.createEvent('wResized');	
		/** @event hResizing */
		this.createEvent('hResizing');
		/** @event hResized */
		this.createEvent('hResized');	
		/** @event reconfiging */
		this.createEvent('reconfiging');
		/** @event reconfiged */
		this.createEvent('reconfiged');	
	},	
	/**
	 * @method set
	 * @param {String} k
	 * @param {Object} v
	 */
	set: function(k, v){
		var old = this._config[k];
		this.fireEvent('reconfiging', k, old, v);
		this._config[k] = v;
		this.fireEvent('reconfiged', k, old, v);		
	},
	/**
	 * @method get
	 * @param {String} k
	 * @return {Object}
	 */
	get: function(k){
		return k?this._config[k]:this._config;
	},
	/**
	 * @method getId
	 * @return {String}
	 */
	getId: function(){
		return this.get('id');
	},
	/**
	 * Returns the widget class name.
	 * @method getWidgetClass
	 * @return {String}
	 */
	getWidgetClass: function(){
		return this.get('widgetClass');
	},
	/**
	 * @field {Object} DOM_ATTRIBUTES
	 */
	DOM_ATTRIBUTES: {
		id:1,
		name:1,
		title:1,
		type:1,
		cssName:1,
		cssText:1,
		value:1,
		validate:1,
		widgetClass:1
	},
	/**
	 * @field {Object} STYLE_ATTRIBUTES
	 */
	STYLE_ATTRIBUTES: {
		display:1,
		width:1,
		height:1,
		x:1,y:1,z:1
	},	
	/**
	 * @method attachEvent
	 * @param {String} eventName
	 * @param {Function} fn
	 * @param {Object} agrs:optional
	 * @param {Object} context:optional
	 */
	attachEvent: function(eventName, fn, agrs, context){
		if(this.hasEvent(eventName)) {
			this.subscribe(eventName, fn, agrs, context||this);
			return true;
		}else{
			var attachTo = this.getId();
			switch (eventName) {
				case 'focusin': return E.addFocusListener(attachTo, fn, agrs, context||this);
				case 'focusout': return E.addBlurListener(attachTo, fn, agrs, context||this);			
				default: return E.addListener(attachTo, eventName, fn, agrs, context||this);
			}	
		}			
	},
	/**
	 * @method detachEvent
	 * @param {String} eventName
	 * @param {Function} fn
	 * @param {Object} agrs:optional
	 * @param {Object} context:optional
	 */
	detachEvent: function(eventName, fn, agrs, context){
		if(this.hasEvent(eventName)) {
			this.unsubscribe(eventName, fn, agrs, context||this);
			return true;
		}else{
			var attachTo = this.getId();
			switch (eventName) {
				case 'focusin': return E.removeFocusListener(attachTo, fn, agrs, context||this);
				case 'focusout': return E.removeBlurListener(attachTo, fn, agrs, context||this);			
				default: return E.removeListener(attachTo, eventName, fn, agrs, context||this);
			}
		}
	},	
	_parseConfig: function(){
		var dAttrs = {}, sAttrs = {position:this._config.hasOwnProperty('x')||this._config.hasOwnProperty('y')?'absolute':'relative'}, html;
		for(k in this._config){
			if (k=='html') {
				html = this._config[k];
			} else if(k=='id' || this.DOM_ATTRIBUTES[k]){
				dAttrs[k] = this._config[k];
			} else if(this.STYLE_ATTRIBUTES[k]){
				sAttrs[k] = this._config[k];
			}    
		}
		return [dAttrs, sAttrs, html];
	},	
	_renderHTMLWidget: function(tag){
		var el = $(this.getId()), p = this._parseConfig();
		if(!el) {
			var ct = this.getParentEl()||document.body;
			if(ct) {
				ct.appendChild(D.createEl(tag, p[0], p[1], p[2]));
			}else{
				throw new Error();
			}
		}else{
			D.updateEl(el, p[0], p[1], p[2]);
		}
	},	
	/**
	 * @method destory
	 */
	destory: function(){
		this.fire('destorying');
		
		//销毁组件对象
		var el = $(this.getId());
		if (el && el.parentNode) {
			E.purgeElement(el, true);
            el.parentNode.removeChild(el); 
        }
		
		this.fire('destoryed');
		this.unsubscribeAll();//注销所有自定义事件	
		if(this.removeAllKeys) this.removeAllKeys();//注销所有键盘事件						
	},
	/**
	 * @method getEl
	 * @return {HTMLElement}
	 */	
	getEl: function(){
		return $(this.getId());
	},
	/**
	 * @method getParentEl
	 * @return {HTMLElement}
	 */	
	getParentEl: function(){
		return $(this.get('parent'));
	},
	/**
	 * @method getSize
	 * @return {Array}
	 */
	getSize: function(){
		var el = this.getEl();
		return el?[el.offsetWidth, el.offsetHeight]:null;
	},
	/**
	 * @method setSize
	 * @param {Number} width
	 * @param {Number} height
	 */
	setSize: function(width, height){
		var el = this.getEl();
		if(!el) return;
		
		var size = this.getSize();
		if(size[0]==width && size[1]==height) return;
		
		this.fireEvent('resizing', size);
		this.set('width', width);
		this.set('height', height);
		el.style.width = width+'px';		
		el.style.height = height+'px';		
		this.fireEvent('resized', [width, height]);
	},	
	/**
	 * @method show
	 */
	show: function(){
		var el = this.getEl();
		if(!el) return;
		
		this.fireEvent('showing');
		this.set('display', '');
		el.style.display = '';
		el.blur();//fixed FF's auto focus		
		this.fireEvent('showed');
	},
	/**
	 * @method hide
	 */
	hide: function(){
		var el = this.getEl();
		if(!el) return;
		
		this.fireEvent('hiding');
		this.set('display', 'none');
		el.style.display = 'none';		
		this.fireEvent('hided');
	},
	/**
	 * @method enable
	 */
	enable: function(){
		var el = this.getEl();
		if(!el) return;
		
		this.fireEvent('enabling');
		this.set('disabled', false);
		el.disabled = false;		
		this.fireEvent('enabled');
	},
	/**
	 * @method disable
	 */
	disable: function(){
		var el = this.getEl();
		if(!el) return;
		
		this.fireEvent('enabling');
		this.set('disabled', true);
		el.disabled = true;		
		this.fireEvent('enabled');
	},
	/**
	 * @method setXY
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Boolean} isSilent:optional not fires events
	 */
	setXY: function(x, y, isSilent){
		this.setX(x, isSilent);
		this.setY(y, isSilent);	
	},
	/**
	 * @method setX
	 * @param {Number} x
	 * @param {Boolean} isSilent:optional not fires events
	 */
	setX: function(x, isSilent){
		if (SYS.isUndefined(x) || x == null) return;
		var oldX = D.getX(this.getId()), isMoved = oldX==x?false:true;
		
		if (isMoved) {
			if(!isSilent) this.fireEvent('xMoving', x, oldX);
			this.set('x',x);
			D.setX(this.getEl(),x);
			if(isSilent) this.fireEvent('xMoved', x, oldX);
		}
	},
	/**
	 * @method setY
	 * @param {Number} y
	 * @param {Boolean} isSilent:optional not fires events
	 */
	setY: function(y, isSilent){
		if (SYS.isUndefined(y) || y == null) return;
		var oldY = D.getY(this.getId()), isMoved = oldY==y?false:true;
		
		if (isMoved) {
			if(!isSilent) this.fireEvent('yMoving', y, oldY);
			this.set('y',y);
			D.setY(this.getEl(),y);
			if(!isSilent) this.fireEvent('yMoved', y, oldY);
		}
	},
	/**
	 * @method getXY
	 * @return {js.math.Point}
	 */
	getXY: function(){
		return D.getXY(this.getId());
	},
	/**
	 * @method getX
	 * @return {Number}
	 */
	getX: function(){
		return this.getXY()[0];
	},
	/**
	 * @method getY
	 * @return {Number}
	 */
	getY: function(){
		return this.getXY()[1];
	},
	/**
	 * @method getSize
	 * @return {Array}
	 */
	getSize: function(){
		return [this.get('width'),this.get('height')];
	},
	/**
	 * @method setSize
	 * @param {Number} w
	 * @param {Number} h
	 * @param {Boolean} isSilent:optional not fires events
	 */
	setSize: function(w, h, isSilent){		
		this.setWidth(w, isSilent);
		this.setHeight(h, isSilent);
	},
	/**
	 * @method setWidth
	 * @param {Number} w
	 * @param {Boolean} isSilent:optional not fires events
	 */
	setWidth: function(n, isSilent){
		if (SYS.isUndefined(n) || n == null) return;
		var old = this.get('width'), isResized = old==n?false:true;
		
		if (isResized) {
			if(!isSilent) this.fireEvent('wResizing', n, old);
			this.set('width',n);
			D.setStyle(this.getId(), 'width', n);
			if(!isSilent) this.fireEvent('wResized', n, old);
		}
	},
	/**
	 * @method setHeight
	 * @param {Number} h
	 * @param {Boolean} isSilent:optional not fires events
	 */
	setHeight: function(n, isSilent){
		if (SYS.isUndefined(n) || n == null) return;
		var old = this.get('height'), isResized = old==n?false:true;
		
		if (isResized) {
			if(!isSilent) this.fireEvent('hResizing', n, old);
			this.set('height',n);
			D.setStyle(this.getId(), 'height', n);
			if(!isSilent) this.fireEvent('hResized', n, old);
		}
	},
	/**
	 * @method alignTo
	 * @param {String|HTMLElement} destEl
	 * @param {String} pos values: lt|ct|rt|lc|cc|rc|lb|cb|rb
	 * @param {js.math.Point} offsets:optional
	 */
	alignTo: function(destEl, pos, offsets){
		var el = this.getEl();
		if(!el) return;
		
		var xy = D.getXY(el), size = [el.offsetWidth, el.offsetHeight],
			destEl = $(destEl), destXY = D.getXY(destEl), destSize = [destEl.offsetWidth, destEl.offsetHeight]
			newX = xy[0], newY = xy[1];
		
		switch(pos){
			case 'lt': newX = destXY[0], newY = destXY[1]; break;
			case 'ct': newX = destXY[0]+(destSize[0]-size[0])/2, newY = destXY[1]; break;
			case 'rt': newX = destXY[0]-size[0], newY = destXY[1]; break;
			case 'lc': newX = destXY[0], newY = destXY[1]+(destSize[1]-size[1])/2;break;
			case 'cc': newX = destXY[0]+(destSize[0]-size[0])/2, newY = destXY[1]+(destSize[1]-size[1])/2;break;
			case 'rc': newX = destXY[0]-size[0], newY = destXY[1]+(destSize[1]-size[1])/2;break;
			case 'lb': newX = destXY[0], newY = destXY[1]-size[1]; break;
			case 'cb': newX = destXY[0]+(destSize[0]-size[0])/2, newY = destXY[1]-size[1]; break;
			case 'rb': newX = destXY[0]-size[0], newY = destXY[1]-size[1];break;			
		}
		this.setXY(newX+(offsets?offsets[0]:0), newY+(offsets?offsets[1]:0));
	},
	/**
	 * @method setValue
	 * @param {String} v
	 */
	setValue: function(v){
		var el = this.getEl();
		if(!el) return;
		
		el['value'] = v;
	},
	/**
	 * @method getValue
	 * @return {String}
	 */	
	getValue: function(){
		var el = this.getEl();
		if(!el) return null;
		
		return el['value'];
	},
	_bindEvents: function(w, fnName, events){
		if(!events || !w[fnName]) return;
		for(var i=0, len=events.length;i<len;i++){
			var event = events[i];
			if(event) w[fnName].call(w, event['name'],event['fn'],event['args'],event['context']);
		}
	},
	_addWidget: function(wgt, widgetClass){
		if(!wgt) return false;
		
		var w = null;
		if(wgt instanceof js.ui.Widget) {
			w = wgt;
			w.set('parent', this.getId());
		}else{			
			var config = wgt['config'];
			if(!config) throw new TypeError();
			config['parent'] = this.getId();
			
			w = eval('new '+(widgetClass||config['widgetClass'])+'({lazyInit:true})')
			w._init(config);
			
			this._bindEvents(w, 'attachEvent', wgt['domEvents']);
			this._bindEvents(w, 'subscribe', wgt['uiEvents']);
			this._bindEvents(w, 'onKeyDown', wgt['keyEvents']);			
		}
		this._children[w.getId()] = w;
		return true;
	},
	/**
	 * @method addSameChildWidget
	 * @param {js.ui.Widget|js.ui.Widget[]} wgts
	 * @param {String} widgetClass:optional
	 */
	addChildWidget: function(wgts, widgetClass){
		if(!wgts) return false;
		if(!this._children) this._children = {};
		
		if(SYS.isArray(wgts)) {
			for(var i=0, len=wgts.length;i<len;i++){
				var rtn = this._addWidget(wgts[i], widgetClass);
				if(!rtn) return false;
			}
			return true;
		}else{
			return this._addWidget(wgts, widgetClass);
		}		
	},
	/**
	 * @method getChildWidget
	 * @param {String} id
	 * @return {js.ui.Widget|Object<String,js.ui.Widget>} 
	 */
	getChildWidget: function(id){
		return id?this._children[id]:this._children;
	}
};
/**
 * @mix js.core.EventProvider
 */
SYS.augment(js.ui.Widget, js.core.EventProvider);
/**
 * @mix js.input.KeyBufferProvider
 */
if(js.input) SYS.augment(js.ui.Widget, js.input.KeyBufferProvider);

}());
