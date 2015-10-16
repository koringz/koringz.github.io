/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.3
 * @author feng.chun
 * @date 2011-01-05
 * @date 2011-01-11
 * @date 2011-03-22
 * 
 * @version 0.2
 * @author feng.chun
 * @date 2010-12-31
 * 
 * @version 0.1
 * @author feng.chun
 * @date 2010-10-6
 * 
 * @requires /core/js-core.js
 * @requires /core/js-mathphys.js
 */
js.lang.System.namespace('js.anim');

(function(){
	var SYS = js.lang.System
	  , D = js.core.Dom
	  , $ = js.core.Dom.$
	  , MT = js.math.MathTool
	  , G2D = js.math.Geom2D;

/**
 * Math formulas.
 * 
 * @class js.anim.Formulas 
 * @singleton
 */
js.anim.Formulas = {
	/**
	 * @method linear
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
	linear: function(t,b,c,d){ return c*t/d + b; },
	/**
	 * @method quad_easein
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
	quad_easein: function(t,b,c,d){
        return c*(t/=d)*t + b;
    },
	/**
	 * @method quad_easeout
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
    quad_easeout: function(t,b,c,d){
        return -c *(t/=d)*(t-2) + b;
    },
	/**
	 * @method quad_easeinout
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
    quad_easeinout: function(t,b,c,d){
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
	/**
	 * @method cubic_easein
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
	cubic_easein: function(t,b,c,d){
        return c*(t/=d)*t*t + b;
    },
	/**
	 * @method cubic_easeout
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
    cubic_easeout: function(t,b,c,d){
        return c*((t=t/d-1)*t*t + 1) + b;
    },
	/**
	 * @method cubic_easeinout
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
    cubic_easeinout: function(t,b,c,d){
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
	/**
	 * @method quart_easein
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
	quart_easein: function(t,b,c,d){
        return c*(t/=d)*t*t*t + b;
    },
	/**
	 * @method quart_easeout
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
    quart_easeout: function(t,b,c,d){
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
	/**
	 * @method quart_easeinout
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
    quart_easeinout: function(t,b,c,d){
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
	/**
	 * @method quint_easein
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
	quint_easein: function(t,b,c,d){
        return c*(t/=d)*t*t*t*t + b;
    },
	/**
	 * @method quint_easeout
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
    quint_easeout: function(t,b,c,d){
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
	/**
	 * @method quint_easeinout
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
    quint_easeinout: function(t,b,c,d){
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
	/**
	 * @method sine_easein
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
	sine_easein: function(t,b,c,d){
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
	/**
	 * @method sine_easeout
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
    sine_easeout: function(t,b,c,d){
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
	/**
	 * @method sine_easeinout
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
    sine_easeinout: function(t,b,c,d){
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
	/**
	 * @method expo_easein
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
	expo_easein: function(t,b,c,d){
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
	/**
	 * @method expo_easeout
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
    expo_easeout: function(t,b,c,d){
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
	/**
	 * @method expo_easeinout
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
    expo_easeinout: function(t,b,c,d){
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
	/**
	 * @method circ_easein
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
	circ_easein: function(t,b,c,d){
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
	/**
	 * @method circ_easeout
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
    circ_easeout: function(t,b,c,d){
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
	/**
	 * @method circ_easeinout
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
    circ_easeinout: function(t,b,c,d){
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
	/**
	 * @method elastic_easein
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
	elastic_easein: function(t,b,c,d,a,p){
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
	/**
	 * @method elastic_easeout
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
    elastic_easeout: function(t,b,c,d,a,p){
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
    },
	/**
	 * @method elastic_easeinout
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
    elastic_easeinout: function(t,b,c,d,a,p){
        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
        if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
	/**
	 * @method back_easein
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
	back_easein: function(t,b,c,d,s){
        if (s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
	/**
	 * @method back_easeout
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
    back_easeout: function(t,b,c,d,s){
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
	/**
	 * @method back_easeinout
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
    back_easeinout: function(t,b,c,d,s){
        if (s == undefined) s = 1.70158; 
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
	/**
	 * @method bounce_easein
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
	bounce_easein: function(t,b,c,d){
        return c - this.bounce_easeout(d-t, 0, c, d) + b;
    },
	/**
	 * @method bounce_easeout
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
    bounce_easeout: function(t,b,c,d){
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },
	/**
	 * @method bounce_easeinout
	 * @param {Int} t times
	 * @param {Number} b begin
	 * @param {Number} c increment
	 * @param {Number} d step
	 * @return {Number}
	 */
    bounce_easeinout: function(t,b,c,d){
        if (t < d/2) return this.bounce_easein(t*2, 0, c, d) * .5 + b;
        else return this.bounce_easeout(t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
}

/**
 * @class js.anim.Anim
 * @constructor 
 * 
 * @struct js.anim.Anim$Config {
 * 		"description":""
 * 		,"type":"object"
 * 		,"properties":{
 * 			"repeat":{"description":"the default value is 0", "type":"number", "required":false}
 * 			,"interval":{"description":"the default value is 0", "type":"number", "required":false}
 * 		}
 * } 
 * 
 * @param {js.anim.Anim$Config} config
 * @param {Function} method The arguments:[currentCount, currentRepeat]
 */	  
js.anim.Anim = function(config, method){
	this._config = config;
	this._method = method;	
	
	this._isAnimated = false;//是否动画已开始
	this._startTime = null;//动画开始时间
	this._counter = 0;//计数器
	this._maxRepeat = config['repeat'] || 0;
	this._repeat = 0;
	
	/**
	 * @event started 
	 * {
	 *     "description": "fires when the animation started"
	 *     ,"type":"function"
	 *     ,"scope":{"type":"js.anim.Anim"}
	 *     ,"arguments":{
	 *         "type":"null"
	 *     }
	 * }
	 */
	this.createEvent('started');
	/**
	 * @event completed
	 * {
	 *     "description": "fires when the animation finished"
	 *     ,"type":"function"
	 *     ,"scope":{"type":"js.anim.Anim"}
	 *     ,"arguments":{
	 *         "type":"null"
	 *     }
	 * }
	 */
	this.createEvent('completed');
	/**
	 * @event stoped
	 * {
	 *     "description": "fires when the animation stoped"
	 *     ,"type":"function"
	 *     ,"scope":{"type":"js.anim.Anim"}
	 *     ,"arguments":{
	 *         "type":"null"
	 *     }
	 * }
	 */
	this.createEvent('stoped');
	/**
	 * @event looped
	 * {
	 *     "description": "fires when looped on same repeat"
	 *     ,"type":"function"
	 *     ,"scope":{"type":"js.anim.Anim"}
	 *     ,"arguments":{
	 *         "type":"array"
	 *         ,"items":[
	 *             {"type":"int", "description": "current counter number on current repeat"}
	 *             ,{"type":"int", "description": "current repeat number"}
	 *         ]
	 *     }
	 * }
	 */
	this.createEvent('looped');
	/**
	 * @event repeated
	 * {
	 *     "description": "fires when a repeat finished"
	 *     ,"type":"function"
	 *     ,"scope":{"type":"js.anim.Anim"}
	 *     ,"arguments":{
	 *         "type":"null"
	 *     }
	 * } 
	 */
	this.createEvent('repeated');
		
	this._thread = new SYS.Thread(this,{interval:this._config['interval']});		
} 
js.anim.Anim.prototype = {
	/**
	 * Sets the config by key.
	 * 
	 * @method setConfig
	 * @param {String} k
	 * @param {Object} v
	 */
	setConfig: function(k, v){
		this._config[k] = v;
	},
	/**
	 * Returns the config of the key.
	 * 
	 * @method getConfig
	 * @param {String} k
	 * @return {Object}
	 */
	getConfig: function(k){
		return this._config[k];
	},
	/**
	 * Returns the max repeat times.The default value is zero.
	 * 
	 * @method getMaxTimes
	 * @return {Int}
	 */
	getMaxTimes: function(){
		return this._maxRepeat;
	},
	/**
	 * Returns the current repeat times.
	 * 
	 * @method getCurrentTimes
	 * @return {Int}
	 */
	getCurrentTimes: function(){
		return this._repeat;
	},
	/**
	 * Returns the current counter in this times.
	 * 
	 * @method getCount
	 * @return {Int}
	 */
	getCount: function(){
		return this._counter;
	},
	/**
	 * Returns True when the animation is started.
	 * 
	 * @method isAnimated
	 * @return {Boolean}
	 */
	isAnimated: function(){
		return this._isAnimated;
	},
	/**
	 * Returns the start time.
	 * 
	 * @method getStartTime
	 * @return {Date}
	 */
	getStartTime: function(){
		return this._startTime;
	},
	/**
	 * Start the animation.
	 * 
	 * @method start
	 */
	start: function(){
		if(this.isAnimated()) return;
		this._isAnimated = true;
		this._counter = 0;
		this._repeat = 0;	
		this._startTime = new Date();		
		
		this._thread.start();
		this.fireEvent('started');
	},
	/**
	 * Reset the counter equals zero.
	 * 
	 * @method resetCount
	 */
	resetCount: function(){this._counter = 0},
	/**
	 * Execute the main method when the main thread is running.
	 * 
	 * @method run
	 * @protected
	 */
	run: function(){
		if(typeof this._method == 'function'){
			var rst = this._method.call(this, this._counter, this._repeat);				
			this._counter++;
			this.fireEvent('looped', this._counter, this._repeat);		
				
			if(rst){
				this._counter = 0;
				if ((this._repeat+1) > this._maxRepeat) {
					this.complete();
				}else {
					this._repeat++;				
					this.fireEvent('repeated');				
				}							
			}
		}else{
			this.complete();
		}
	},
	/**
	 * End the animation.
	 * 
	 * @method complete
	 */
	complete: function(){
		if (!this.isAnimated()) return;
		this._thread.stop();		
		this._counter = 0;
		this._isAnimated = false;
		this.fireEvent('completed');					
	},
	/**
	 * Stop the animation.
	 * 
	 * @method stop
	 */
	stop: function(){
		if (!this.isAnimated()) return;
		this._thread.stop();		
		this._counter = 0;
		this._isAnimated = false;
		this.fireEvent('stoped');					
	}
}
/**
 * @mix js.core.EventProvider
 */
SYS.augment(js.anim.Anim, js.core.EventProvider);

/**
 * @struct js.anim.Film$Element {
 * 		"description":""
 * 		,"type":"object"
 * 		,"properties":{
 * 			,"id":{"type":"string", "description":"HTML Element's id", "required":false}
 * 			,"x":{"type":"number", "description":"default value is 0", "required":false}
 * 			,"y":{"type":"number", "description":"default value is 0", "required":false}
 * 		}
 * }
 */
/**
 * @struct js.anim.Film$Config {
 * 		"description":""
 * 		,"type":"object"
 * 		,"properties":{
 * 			,"target":{"type":"string|js.anim.Film$Element[]", "description":"Image Element's id or Image Elements", "required":false}
 * 			,"canvas":{"type":"js.d2.Canvas"}
 * 			,"frameSeq":{"type":"array<js.math.Point>", "description":"a array of offset points in the image map"}
 * 			,"src":{"type":"string", "description":"the file path of a image"}
 * 		}
 *      ,"extends":"js.anim.Anim$Config"
 * } 
 */
/**
 * @class js.anim.Film
 * @constructor
 * @extends js.anim.Anim
 * 
 * @param {js.anim.Film$Config} config
 * @throws {TypeError} when canvas or frames or src is null
 */	
js.anim.Film = function(config){
	var _w = config['width'], _h = config['height']
	, _canvas = config['canvas']
	, _frames = config['frameSeq']
	, _src = config['src'];
	if(!_canvas || !_frames || !_src) throw new TypeError("[js.anim.Film]The arguments invalid.");
	this._objArray = SYS.isString(config['target'])?[{'id':config['target']}]:(config['target']||[]);

    var _doRun = function(t){		
		if(t >= _frames.length){
			this._objArray.forEach(function(a){
				_canvas.erase(a['id']);
			});			
					
			return true;	
		}
		
		this._objArray.forEach(function(a){
			if(SYS.isUndefined(a['id'])) a['id'] = SYS.getUUID();
			
			var offXY = _frames[t]
		    ,json = {
				id:a['id'], z:a['z']||0, width:_w, height:_h
				,src:_src, x:a['x']||0, y:a['y']||0, offsetX:offXY[0], offsetY:offXY[1]				
			};
		
			if($(a['id'])){
				_canvas.updateImage(json);	
			}else{
				_canvas.drawImage(json);	
			}			
		},this);		
		
		return false;
	}
	
	js.anim.Film.superclass.constructor.call(this, config, _doRun);
} 
SYS.extend(js.anim.Film, js.anim.Anim, {
	/**
	 * Sets the first position(x, y) of the image element by id.
	 * 
	 * @method setPosition
	 * @param {js.math.Point} xyz
	 * @param {String} id:optional
	 */
	setPosition: function(xyz, id){
		var index = this._objArray.indexOf(id, function(a, b){
			return a['id'] === b;
		})
		if (index > -1) {
			this._objArray[index] = {
				id: id,
				x: xyz[0],
				y: xyz[1],
				z: xyz[2]
			};
		}else{
			this._objArray.push({
				id: id,
				x: xyz[0],
				y: xyz[1],
				z: xyz[2]
			});
		}
	}	
});

/**
 * @struct js.anim.Motion$Points {
 * 		"description":""
 * 		,"type":"object"
 * 		,"properties":{
 * 			"from":{"type":"js.math.Point","required":false}
 * 			,"to":{"type":"js.math.Point"}
 * 			,"path":{"type":"js.math.Point[]","required":false}
 * 		}
 * }
 */
/**
 * @struct js.anim.Motion$Config {
 * 		"description":""
 * 		,"type":"object"
 * 		,"properties":{
 * 			,"target":{"type":"string|string[]"}
 * 			,"points":{"type":"js.anim.Motion$Points"}
 * 			,"formula":{"type":"function","required":false}
 * 			,"step":{"type":"number","required":false}
 * 		}
 *      ,"extends":"js.anim.Anim$Config"
 * }
 */
/**
 * @class js.anim.Motion
 * @constructor
 * @extends js.anim.Anim
 * 
 *   
 * @param {js.anim.Motion$Config} config
 * @throws {TypeError} when target or points is null
 */	
js.anim.Motion = function(config){
	var target = config['target'], points = config['points'], to = points['to'];
	if(!target || !points || !to) throw new TypeError("[js.anim.Motion]The arguments invalid.");	
	this._formula = config['formula'] || js.anim.Formulas.linear;
	
	var ps = [points['from']||D.getXY(target)], path = points['path'];
	if(path) ps = ps.concat(path);
	ps.push(to);
	this._ps = ps;
	this._psIndex = 0; 
	
	var _setXY = function(target, x, y){
		D.setStyle(target, 'x', x);
		D.setStyle(target, 'y', y);
	}
			
    var _doRun = function(t){
		var target = this.getConfig('target'), step = this.getConfig('step')||1,
		from = this._ps[this._psIndex], to = this._ps[this._psIndex+1];				
		
		var x = this._formula(t, from[0], to[0]-from[0], step)
		, y = this._formula(t, from[1], to[1]-from[1], step);
		_setXY(target, x, y);
		
		if (G2D.equalsPoint([x,y], this._ps[this._ps.length-1])) {
			this._psIndex = 0;
			return true;
		}
		if (G2D.equalsPoint(to, [x,y])) {
			this._psIndex += 1;
			this.resetCount();
		}
		
		return false;
	}
	
	js.anim.Motion.superclass.constructor.call(this, config, _doRun);
}
SYS.extend(js.anim.Motion, js.anim.Anim, {	
});
/**
 * @struct js.anim.Flicker$Opacity {
 * 		"description":""
 * 		,"type":"object"
 * 		,"properties":{
 * 			"from":{"type":"number"}
 * 			,"to":{"type":"number"}
 * 		}
 * }
 */
/**
 * @struct js.anim.Flicker$Config {
 * 		"description":""
 * 		,"type":"object"
 * 		,"properties":{
 * 			,"target":{"type":"string|string[]"}
 * 			,"opacity":{"type":"js.anim.Flicker$Opacity"}
 * 			,"step":{"type":"number","required":false}
 * 		}
 *      ,"extends":"js.anim.Anim$Config"
 * }
 */
/**
 * @class js.anim.Flicker
 * @constructor
 * @extends js.anim.Anim 
 * 
 * @param {js.anim.Flicker$Config} config
 * @throws {TypeError} when target or opacity is null
 */	
js.anim.Flicker = function(config){
	var target = config['target'], opa = config['opacity'];
	if(!target || !opa) throw new TypeError("[js.anim.Flicker]The arguments invalid.");
	this._from = opa['from'];
	this._to = opa['to'];			
	if(SYS.isUndefined(this._from) || SYS.isUndefined(this._to)) throw new TypeError("[js.anim.Flicker]The arguments invalid.");
	
	var _doRun = function(t){
		var step = this.getConfig('step')||1
		,target = this.getConfig('target')
		,from = this._from, to = this._to;
		
		var opacity = from + t*(to - from)/step;
		D.setStyle(target, 'opacity', opacity);
		
		if(MT.equals(opacity,to)) return true;
	}
	
	js.anim.Flicker.superclass.constructor.call(this, config, _doRun);
}
SYS.extend(js.anim.Flicker, js.anim.Anim, {
	/**
	 * @method start
	 * @override
	 */
	start: function(){
		if (!this.isAnimated()) {
			this._from = SYS.isUndefined(this._from)?Number(D.getStyle(this.getConfig('target'), 'opacity')):this._from;	
		}
		js.anim.Motion.superclass.start.call(this);
	}
});
}());

