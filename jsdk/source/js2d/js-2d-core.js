/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.3
 * @author feng.chun
 * @date 2011-01-05
 * @date 2011-03-22
 * @date 2011-05-18
 * 
 * @version 0.2
 * @author feng.chun
 * @date 2010-11-15
 *
 * @version 0.1
 * @author feng.chun
 * @date 2010-9-20
 * 
 * @requires /core/js-core.js
 */
js.lang.System.namespace('js.d2');

(function(){
	var SYS = js.lang.System
	  , D = js.core.Dom
	  , $ = js.core.Dom.$
	  , B = js.core.Env
	  , E = js.core.Event;
    
    /**
     * @class js.d2.Canvas
     * @constructor
     * 
     * @struct js.d2.Canvas$Config {
	 * 		"description":""
	 * 		,"type":"object"
	 * 		,"properties":{
	 * 			"id":{"type":"string"}
	 * 			,"html":{"type":"string"}
	 * 			,"title":{"type":"string"}
	 * 			,"cssName":{"type":"string"}
	 * 			,"x":{"type":"number"}
	 * 			,"y":{"type":"number"}
	 * 			,"z":{"type":"number"}
	 * 			,"opacity":{"type":"number"}
	 * 			,"width":{"type":"number"}
	 * 			,"height":{"type":"number"}
	 * 			,"background":{"type":"string"}
	 * 			,"viewWindow":{"type":"js.math.Rect"}	
	 * 		}
	 * } 
	 * 
     * @param {js.d2.Canvas$Config} config
     */
    js.d2.Canvas = function(config){
        this._config = {
            id: config['id'] || SYS.getUUID(),
            html: config['html'] || '',
            title: config['title'] || '',
            cssName: config['cssName'] || '',
            x: config['x'] || 0,
            y: config['y'] || 0,
            z: config['z'] || 0,
            opacity: SYS.isUndefined(config['opacity']) ? 1 : config['opacity'],
            width: config['width'] || 0,
            height: config['height'] || 0,
            background: config['background'] || ''
        };
		this._config['viewWindow'] = config['viewWindow']||this.getBound();
        
		this._init();
    };
    js.d2.Canvas.prototype = {
        /**
         * Sets the view window on the canvas.
         * 
         * @method setViewWindow
         * @param {Number} x X coordinate relative to the canvas
         * @param {Number} y X coordinate relative to the canvas
         * @param {Number} w with
         * @param {Number} h height
         */
        setViewWindow: function(x, y, w, h){
            var v = this.getViewWindow(),
			 hasX = !SYS.isUndefined(x), 
			 hasY = !SYS.isUndefined(y), 
			 hasW = !SYS.isUndefined(w), 
			 hasH = !SYS.isUndefined(h);
			if(!hasX && !hasY && !hasW && !hasH) return;
			
			if (hasW) v['w'] = w;
            if (hasH) v['h'] = h;				
			
			if (hasX) {
				this._config['x']+= v['x'] - x;//update canvas' x
				v['x'] = x;
			}                
            if (hasY) {
				this._config['y']+= v['y'] - y;//update canvas' y
				v['y'] = y;
			}                
            	
			if(hasX || hasY) 
				D.updateEl(this._config['id'], null, {left:(-v['x'])+'px',top:(-v['y'])+'px'});				
				
			if(hasW || hasH) 
				D.updateEl(this._config['id']+'_view_window', null, {width:v.w+'px',height:v.h+'px'});
        },
		/**
		 * Move the view window in the limit bound.
		 * 
		 * @method moveViewPoint
		 * @param {Number} dx move distance in the X-axis
		 * @param {Number} dy move distance in the Y-axis
		 * @param {js.math.Rect} limitRect:optional
		 */
		moveViewPoint: function(dx, dy, limitRect){
			var v = this.getViewWindow(), x = v['x']+dx, y = v['y']+dy;
			
			//限制视窗区域
			if(limitRect){
				var minX = limitRect['x'], maxX = limitRect['x']+limitRect['w']-v['w']
				,minY = limitRect['y'], maxY = limitRect['y']+limitRect['h']-v['h'];
				
				if (x < minX) {
					x = minX;
				}else if(x > maxX){
					x = maxX;
				}
				if (y < minY) {
					y = minY;
				}else if(y > maxY){
					y = maxY;
				}
			}				
			
			this.setViewWindow(x, y);
		},
		/**
		 * Returns the view window.
		 * 
		 * @method getViewWindow
		 * @return {js.math.Rect}
		 */
        getViewWindow: function(){
            return this._config['viewWindow'];
        },
		/**
		 * Returns the value of the key.
		 * 
		 * @method getConfig
		 * @param {String} k:optional
		 * @return {js.d2.Canvas$Config} v
		 */
        getConfig: function(k){
            return k ? this._config[k] : this._config;
        },		
		_setupView: function(){
            var view = this.getViewWindow()
			, s = 'left:' + this._config['x'] + 'px;top:' + this._config['y'] + 'px;z-index:' + this._config['z'] + ';';
            s += 'width:' + view['w'] + 'px;height:' + view['h'] + 'px;';
            s += 'position:absolute;overflow:hidden;';
			
			this._config['x']-= view['x'];//update canvas' x
			this._config['y']-= view['y'];//update canvas' x
			return s ? {
                cssText: s
            } : null;
        },
        _calcCanvasXY: function(){
			var view = this.getViewWindow();
			return [-view['x'], -view['y']];
		},
        _setupCanvas: function(){
            var xy = this._calcCanvasXY();
            var s = 'position:absolute;overflow:hidden;left:' + xy[0] + 'px;top:' + xy[1] + 'px;z-index:' + this._config['z'] + ';';
            s += 'width:' + this._config['width'] + 'px;height:' + this._config['height'] + 'px;';
            //BUGFIX: ie7's filter style cause child element's z-index disorder.
			if(this._config['opacity'] < 1) s += 'filter:alpha(opacity:' + this._config['opacity'] * 100 + '); opacity:' + this._config['opacity'] + ';';
			s += 'background:' + this._config['background'] + ';';
                
            return s ? {
                cssText: s
            } : null;
        },
        _init: function(){
            document.body.appendChild(D.createEl('div', {
                id: this._config['id'] + '_view_window',
                title: this._config['title']
            }, this._setupView()));
            
            $(this._config['id'] + '_view_window').appendChild(D.createEl('div', {
                id: this._config['id'],
                cssName: this._config['cssName']
            }, this._setupCanvas()));
            this._el = $(this._config['id']);
            
            E.on(this._el, 'contextmenu', function(e){
            	E.stopEvent(e);
            });
        },
		/**
		 * Hide the canvas.
		 * 
		 * @method hide
		 */
		hide: function(){
			var el = $(this._config['id'] + '_view_window');
			if(el) el.style.display = 'none';
		},
		/**
		 * Show the canvas.
		 * 
		 * @method show
		 */
		show: function(){
			var el = $(this._config['id'] + '_view_window');
			if(el) el.style.display = '';
		},
		/**
		 * Returns the absolute Coordinates(Relative to the browser).
		 * 
		 * @method getXY
		 * @return {js.math.Point}
		 */
		getXY: function(){
			return [this._config['x'],this._config['y']];
		},
		/**
		 * Move the canvas in the browser.
		 * 
		 * @method move
		 * @param {Number} dx 
		 * @param {Number} dy 
		 */
		move: function(dx, dy){
			var xy = this.getXY();
			if (!SYS.isUndefined(dx)) xy[0]+=dx;
			if (!SYS.isUndefined(dy)) xy[1]+=dy;
			this.setXY(xy[0], xy[1]);			
		},
		/**
		 * Sets the new absolute Coordinates(Relative to the browser).
		 * 
		 * @method setXY
		 * @param {Number} x
		 * @param {Number} y
		 */
		setXY: function(x, y){
			var view = this.getViewWindow();	
			if (!SYS.isUndefined(x)) {
                this._config['x'] = x;
				D.setStyle(this._config['id']+'_view_window', 'x', x);
            }
            if (!SYS.isUndefined(y)) {
                this._config['y'] = y;
				D.setStyle(this._config['id']+'_view_window', 'y', y);
            }
        },		
		/**
		 * Sets the size.
		 * 
		 * @method setSize
		 * @param {Number} w 
		 * @param {Number} h 
		 */
        setSize: function(w, h){
            if (!SYS.isUndefined(w)) {
                this._config['width'] = w;
                D.setStyle(this._config['id'], 'width', w);
            }
            if (!SYS.isUndefined(h)) {
                this._config['height'] = h;
                D.setStyle(this._config['id'], 'height', h);
            }
        },
		/**
		 * Returns the size.
		 * 
		 * @method getSize
		 * @return {Array}
		 */
		getSize: function(){return [this._config['width'], this._config['height']];},
		/**
		 * Returns the bound relative to the canvas self.
		 * 
		 * @method getBound
		 * @return {js.math.Rect}
		 */		
        getBound: function(){
            return {
                x: 0,
                y: 0,
                w: this._config['width'],
                h: this._config['height']
            }
        },
		/**
		 * Returns the canvas bound relative to the browser.
		 * 
		 * @method getScreenBound
		 * @return {js.math.Rect}
		 */	
		getScreenBound: function(){
            return {
                x: this._config['x'],
                y: this._config['y'],
                w: this._config['width'],
                h: this._config['height']
            }
        },   		     
		_updateTextElement: function(el, text){			
			D.setStyle(el,'opacity',SYS.isUndefined(text['opacity']) ? 1:text['opacity']);
			D.setStyle(el,'visible',SYS.isUndefined(text['visible'])?true:text['visible']);
			
			D.setStyle(el,'position','absolute');
			D.setStyle(el,'overflow','hidden');
			D.setStyle(el,'z',text['z']);
			D.setStyle(el,'color',text['color']);
			D.setStyle(el,'fontFamily',text['fontFamily']);
			D.setStyle(el,'fontSize',text['fontSize']);
			D.setStyle(el,'width',text['width']);
			D.setStyle(el,'height',text['height']);
			
			if(text['align'] == 'center'){
				D.setStyle(el,'left','50%');
				D.setStyle(el,'marginLeft','-' + text['width'] / 2 + 'px');			
			}else{
				D.setStyle(el,'x',text['x']);				
			}
			if(text['valign'] == 'middle'){
				D.setStyle(el,'top','50%');
				D.setStyle(el,'marginTop','-' + text['height'] / 2 + 'px');			
			}else{
				D.setStyle(el,'y',text['y']);				
			}
			
			D.setAttribute(el, 'cssName', text['cssName']);
			if(text['text']) el.innerHTML = text['text'];					
		},
		/**
		 * Draw new text on the canvas.
		 * 
		 * @struct js.d2.Canvas$Text {
		 * 		"description":""
		 * 		,"type":"object"
		 * 		,"properties":{
		 * 			"id":{"type":"string"}
		 * 			,"opacity":{"type":"number"}
		 * 			,"visible":{"type":"boolean"}
		 * 			,"x":{"type":"number"}
		 * 			,"y":{"type":"number"}
		 * 			,"z":{"type":"number"}
		 * 			,"align":{"type":"string"}
		 * 			,"valign":{"type":"string"}
		 * 			,"width":{"type":"number"}
		 * 			,"height":{"type":"number"}
		 * 			,"cssName":{"type":"string"}
		 * 			,"text":{"type":"string"}
		 * 			,"fontFamily":{"type":"string"}
		 * 			,"fontSize":{"type":"string"}
		 * 			,"color":{"type":"string"}
		 * 		}
		 * } 
		 * 
		 * @method drawText
		 * @param {js.d2.Canvas$Text} text
		 * @return {HTMLElement} the DOM Element
		 * @throws {TypeError} when the arguments is empty
		 */
        drawText: function(text){
            if (!text) throw new TypeError('[js.d2.Canvas#drawText]The arguments is empty.');
			
			var el = $(text['id']);			
			if(el) {
				this._updateTextElement(el, text);
			}else{
				el = this.createText(text);
				this._el.appendChild(el);
			}
			
			return el;
        },
        /**
         * @method createText
		 * @param {js.d2.Canvas$Text} text
		 * @return {HTMLElement} the DOM Element
		 * @throws {TypeError} when the arguments is empty
         */
        createText: function(text){
            if (!text) throw new TypeError('[js.d2.Canvas#createText]The arguments is empty.');
			
            var el = document.createElement('div');
			this._updateTextElement(el, text);			
			D.setAttribute(el, 'id', text['id']||SYS.getUUID());
			return el;
        },
		/**
		 * Update old text on the canvas.
		 * @method updateText
		 * @param {js.d2.Canvas$Text} text
		 * @return {HTMLElement} the DOM Element
		 * @throws {TypeError} when the arguments is empty
		 * @throws {Error} when the element not found
		 */
        updateText: function(text){
            if (!text) throw new TypeError('[js.d2.Canvas#updateText]The arguments is empty.');
            
			var el = $(text['id']);
			if (el) {
				this._updateTextElement(el, text);
			}else{
				throw new Error('[js.d2.Canvas#updateText]Text\'s element not found.');
			}
			return el;
        },		
		_updateImageElement: function(el, image){
			if(image['src']) D.setStyle(el,'background','url(' + image['src'] + ') -' + (image['offsetX'] || 0) + 'px -' + (image['offsetY'] || 0) + 'px');
			
			D.setStyle(el,'opacity',SYS.isUndefined(image['opacity']) ? 1:image['opacity']);
			D.setStyle(el,'visible',SYS.isUndefined(image['visible'])?true:image['visible']);
			
			D.setStyle(el,'position','absolute');
			D.setStyle(el,'overflow','hidden');
			
			D.setStyle(el,'x',image['x']);
			D.setStyle(el,'y',image['y']);
			D.setStyle(el,'z',image['z']);
			D.setStyle(el,'width',image['width']);
			D.setStyle(el,'height',image['height']);
			
			D.setAttribute(el, 'cssName', image['cssName']);
		},
		/**
		 * Draw new image on the canvas.
		 * 
		 * @struct js.d2.Canvas$Image {
		 * 		"description":""
		 * 		,"type":"object"
		 * 		,"properties":{
		 * 			"id":{"type":"string"}
		 * 			,"opacity":{"type":"number"}
		 * 			,"visible":{"type":"boolean"}
		 * 			,"x":{"type":"number"}
		 * 			,"y":{"type":"number"}
		 * 			,"z":{"type":"number"}
		 * 			,"src":{"type":"string"}
		 * 			,"offsetX":{"type":"number"}
		 * 			,"offsetY":{"type":"number"}
		 * 			,"width":{"type":"number"}
		 * 			,"height":{"type":"number"}
		 * 			,"cssName":{"type":"string"}
		 * 		}
		 * } 
		 * 
		 * @method drawImage
		 * @param {js.d2.Canvas$Image} image
		 * @return {HTMLElement} the DOM Element
		 * @throws {TypeError} when the arguments is empty
		 */
        drawImage: function(image){
            if (!image) throw new Error('[js.d2.Canvas#drawImage]The arguments is empty.');
				
			var el = $(image['id']);
			if(el) {
				this._updateImageElement(el, image);
			}else{
				el = this.createImage(image);
				this._el.appendChild(el);
			}
			
			return el;
        },
        /**
         * @method createImage
		 * @param {js.d2.Canvas$Image} image
		 * @return {HTMLElement} the DOM Element
		 * @throws {TypeError} when the arguments is empty
         */
        createImage: function(image){
        	if (!image) throw new Error('[js.d2.Canvas#createImage]The arguments is empty.');
			
        	var el = document.createElement('div');
			this._updateImageElement(el, image);			
			D.setAttribute(el, 'id', image['id']||SYS.getUUID());
			return el;
        },
		/**
		 * Update old image on the canvas.
		 * @method updateImage
		 * @param {js.d2.Canvas$Image} image
		 * @return {HTMLElement} the DOM Element
		 * @throws {TypeError} when the arguments is empty
		 * @throws {Error} when the element not found
		 */
        updateImage: function(image){
            if (!image) throw new Error('[js.d2.Canvas#updateImage]The arguments is empty.');
            
			var el = $(image['id']);
			if (el) {
				this._updateImageElement(el, image);
			}else{
				throw new Error('[js.d2.Canvas#updateImage]Image\'s element not found.');
			}
			return el;
        },
		/**
		 * Paint a new element on the canvas.
		 * 
		 * @method drawElement
		 * @param {String} tag
		 * @param {Object} attrs
		 * @param {Object} styles
		 * @param {String} html
		 */
        drawElement: function(tag, attrs, styles, html){
        	if(!styles) styles = {};
        	styles['position'] = 'absolute';
			var el = D.createEl(tag, attrs, styles, html);
            this._el.appendChild(el);
			return el;
        },
        /**
		 * Append a new element on the canvas.
		 * 
		 * @method appendElement
		 * @param {HTMLElement} el
		 */
        appendElement: function(el){
        	if(el) this._el.appendChild(el);
        },
		/**
		 * Erase a dom element on the canvas.
		 * 
		 * @method erase
		 * @param {String|HTMLElement|Array} el
		 */
        erase: function(el){
			var arr = SYS.isArray(el)?el:[el];
            arr.forEach(function(a){
				var ele = $(a);
	            if (ele) {
	                E.purgeElement(ele, true);
	                this._el.removeChild(ele);
	            }
			},this);			
        },
        /**
         * Clear and Destory the canvas.
         * 
         * @method destory
         */
        destory: function(){            
            //销毁DOM对象
            if (this._el && this._el.parentNode) {
                E.purgeElement(this._el, true);
                this._el.parentNode.removeChild(this._el);
            }
        },
        /**
         * Clear all elements on the canvas and remove all event listeners.
         * 
         * @method clear
         */
        clear: function(){
            //注销所有DOM事件
            E.purgeElement(this._el, true);
            
            var nodes = this._el.childNodes;
            if (!nodes) return;
            while (nodes.length > 0) {
                var node = this._el.childNodes[0];
                this._el.removeChild(node);
            }            
        },
        /**
		 * Print FPS on the canvas for debug.
		 * 
		 * @method printFPS
		 * @param {Number} fps
		 */
		printFPS: function(fps){
			this.drawText({
				id:'fps',text:'FPS='+fps,z:99
				,x:this.getConfig('width')-100,y:0,color:'yellow',fontSize:'18px'
			});
		}
    };
	
/**
 * @class js.d2.View
 * @abstract
 * @constructor 
 * 
 * @struct js.d2.View$Config {
 * 		"description":""
 * 		,"type":"object"
 * 		,"properties":{
 * 			"id":{"type":"string", "required":false, "default":0}
 * 			,"x":{"type":"number", "required":false, "default":0}
 * 			,"y":{"type":"number", "required":false, "default":0}
 * 			,"z":{"type":"number", "required":false, "default":0}
 * 			,"width":{"type":"number", "required":false, "default":0}
 * 			,"height":{"type":"number", "required":false, "default":0}
 * 			,"visible":{"type":"boolean", "required":false, "default":true}
 * 			,"movable":{"type":"boolean", "required":false, "default":true}
 * 			,"opacity":{"type":"number", "required":false, "default":1}	
 * 		}
 * } 
 * 
 * 
 * @param {js.d2.View$Config} config
 */
js.d2.View = function(config){
	/** 
	 * @field {String} _id  图层ID 
	 * @private
	 */
	this._id = config['id']||SYS.getUUID();
	/** 
	 * @field {Int} _x 图层X坐标（相对画布） 
	 * @private
	 */
	this._x = SYS.isUndefined(config['x'])?0:config['x'];
	/** 
	 * @field {Int} _y 图层Y坐标（相对画布）
	 * @private
	 */
	this._y = SYS.isUndefined(config['y'])?0:config['y'];
	/** 
	 * @field {Int} _z 图层Z坐标（相对画布）
	 * @private
	 */
	this._z = SYS.isUndefined(config['z'])?0:config['z'];;
	/** 
	 * @field {Int} _w 图层宽度 
	 * @private
	 */
	this._w = SYS.isUndefined(config['width'])?0:config['width'];
	/** 
	 * @field {Int} _h 图层高度
	 * @private
	 */
	this._h = SYS.isUndefined(config['height'])?0:config['height'];
	/** 
	 * @field {Boolean} _isV 是否可视
	 * @private
	 */
	this._isV = SYS.isUndefined(config['visible'])?true:config['visible'];
	/**
	 * @field {Boolean} _isD isDestoryed
	 * @private
	 */
	this._isD = false;
	/**
	 * @field {Boolean} _isM 是否可动
	 * @private
	 */	
	this._isM = SYS.isUndefined(config['movable'])?true:config['movable'];
	/**
	 * @field {Number} _opacity 透明
	 * @private
	 */	
	this._opacity = SYS.isUndefined(config['opacity'])?1:config['opacity'];
	
	//事件初始化
	/**
	 * @event painting {
	 * 		"description":"fires before paint on the canvas"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.d2.View"}
	 *      ,"arguments":{
	 *          "type":"null"
	 *      }
	 * }
	 */
	this.createEvent('painting');
	/**
	 * @event painted {
	 * 		"description":"fires after paint on the canvas"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.d2.View"}
	 *      ,"arguments":{
	 *          "type":"null"
	 *      }
	 * }
	 */
	this.createEvent('painted');	
	/**
	 * @event destorying {
	 * 		"description":"fires before destory the layer once"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.d2.View"}
	 *      ,"arguments":{
	 *          "type":"null"
	 *      }
	 * }
	 */
	this.createEvent('destorying', true);
	/**
	 * @event destoryed {
	 * 		"description":"fires after destory the layer once"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.d2.View"}
	 *      ,"arguments":{
	 *          "type":"null"
	 *      }
	 * }
	 */
	this.createEvent('destoryed', true);	
	/**
	 * @event moving {
	 * 		"description":"fires before move the layer"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.d2.View"}
	 *      ,"arguments":{
	 *          "type":"array"
	 *          ,"items":[
	 *              {"type":"js.math.Point", "description":"the old position of the layer"}
	 *          ]
	 *      }
	 * }
	 */
	this.createEvent('moving');
	/**
	 * @event moved {
	 * 		"description":"fires after move the layer"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.d2.View"}
	 *      ,"arguments":{
	 *          "type":"array"
	 *          ,"items":[
	 *              {"type":"js.math.Point", "description":"the old position of the layer"}
	 *              ,{"type":"js.math.Point", "description":"the new position of the layer"}
	 *          ]
	 *      }
	 * }
	 */
	this.createEvent('moved');
};
js.d2.View.prototype = {
	/**
	 * Returns the ID.
	 * 
	 * @method getId
	 * @return {String}
	 */
	getId: function(){return this._id;},
	/**
	 * Returns the bound relative to the canvas which this layer be painted on.
	 * 
	 * @method getBound
	 * @return {js.math.Rect} 
	 */
	getBound: function(){return {x: this._x, y: this._y, w: this._w, h: this._h}},
	/**
	 * Returns the bound relative to the browser.
	 * 
	 * @method getScreenBound
	 * @return {js.math.Rect} 
	 */
	getScreenBound: function(){
		var xy = D.getXY(this._id);
		if(xy){
			return {x: xy[0], y: xy[1], w: this._w, h: this._h};
		}
		return null;
	},
	/**
	 * Returns the width.
	 * 
	 * @method getWidth
	 * @return {Number} 
	 */
	getWidth: function(){return this._w},
	/**
	 * Returns the height.
	 * 
	 * @method getHeight
	 * @return {Number} 
	 */
	getHeight: function(){return this._h},
	/**
	 * Returns the size.
	 * 
	 * @method getSize
	 * @return {Array} [width,height]
	 */
	getSize: function(){return [this._w,this._h]},
	/**
	 * Sets the size.
	 * @param {Number} w
	 * @param {Number} h
	 */
	setSize: function(w,h){this._w = w;this._h = h;},
	/**
	 * Returns the X coordinate relative to the canvas which this layer be painted on.
	 * 
	 * @method getX
	 * @return {Number}
	 */
	getX: function(){return this._x},
	/**
	 * Returns the Y coordinate relative to the the canvas which this layer be painted on.
	 * 
	 * @method getY
	 * @return {Number}
	 */
	getY: function(){return this._y},
	/**
	 * Returns the layer's z-index.
	 * 
	 * @method getZ
	 * @return {Int}
	 */
	getZ: function(){return this._z},
	/**
	 * Sets the X coordinate relative to the the canvas which this layer be painted on.
	 * 
	 * @method setX
	 * @param {Number} x
	 */
	setX: function(x){if(!this.isMovable()) return;this._x = x},
	/**
	 * Sets the Y coordinate relative to the the canvas which this layer be painted on.
	 * 
	 * @method setY
	 * @param {Number} y
	 */
	setY: function(y){if(!this.isMovable()) return;this._y = y},
	/**
	 * Sets the z-index.
	 * 
	 * @method setZ
	 * @param {Int} z
	 */
	setZ: function(z){if(!this.isMovable()) return;this._z = z},	
	/**
	 * Sets the X and Y coordinates relative to the the canvas which this layer be painted on.
	 * 
	 * @method setXY
	 * @param {Number} x
	 * @param {Number} y
	 */
	setXY: function(x,y){if(!this.isMovable()) return;this._x=x;this._y=y;},
	/**
	 * Returns the X and Y coordinates relative to the the canvas which this layer be painted on.
	 * 
	 * @method getXY
	 * @return {js.math.Point}
	 */
	getXY: function(){return [this._x,this._y]},
	/**
	 * The layer is movable?
	 * 
	 * @method isMovable
	 * @return {Boolean}
	 */
	isMovable: function(){return this._isM;},
	/**
	 * Sets the layer is movable.
	 * 
	 * @method setMovable
	 * @param {Boolean} m
	 */
	setMovable: function(m){
		this._isM = m;
	},
	/**
	 * Sets the Opacity.
	 * 
	 * @method setOpacity
	 * @param {Number} opa The float is in [0,1].
	 */
	setOpacity : function(opa){
		this._opacity = opa;
	},
	/**
	 * Returns the Opacity.
	 * 
	 * @method getOpacity
	 * @return {Number}
	 */
	getOpacity : function(){
		return this._opacity;
	},
	/**
	 * Move the layer on the canvas.
	 * 
	 * @method move
	 * @param {Number} dx deltaX
	 * @param {Number} dy deltaY
	 */
	move: function(dx, dy){
		if(!this.isMovable()) return;
		var oldXY = [Number(this._x),Number(this._y)];		
		this.fireEvent('moving', oldXY);
		this._x+= dx;
		this._y+= dy;	
		this.fireEvent('moved', oldXY, [this._x,this._y]);	
	},
	/**
	 * The layer is visible?
	 * 
	 * @method isVisible
	 * @return {Boolean}
	 */
	isVisible: function(){return this._isV},
	/**
	 * Sets the layer's visible.
	 * 
	 * @method setVisible
	 * @param {Boolean} v
	 */
	setVisible: function(v){
		this._isV = v;
	},
	/**
	 * The layer is destoryed?
	 * 
	 * @method isDestoryed
	 * @return {Boolean}
	 */
	isDestoryed: function(){
		return this._isD;		
	},
	/**
	 * Destory the layer.
	 * 
	 * @method destory
	 * @param {js.d2.Canvas} canvas
	 */
	destory: function(canvas){
		this.fireEvent('destorying');
		canvas.erase(this.getId());
		this._isV = false;
		this._isD = true;				
		this.fireEvent('destoryed');
		//清除所有的事件
		this.unsubscribeAll();
	}, 
	/**
	 * Paint the layer on the canvas.
	 * 
	 * @abstract
	 * @method paint
	 * @param {js.d2.Canvas} canvas
	 */
	paint: function(canvas){}
};
/**
 * @mix js.core.EventProvider
 */
SYS.augment(js.d2.View, js.core.EventProvider);
    
}());
