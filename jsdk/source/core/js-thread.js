/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.3
 * @author feng.chun
 * @date 2011-04-08
 * @date 2011-04-14
 * 
 * @version 0.2
 * @author feng.chun
 * @date 2011-03-23
 * 
 * @version 0.1
 * @author feng.chun
 * @date 2007-10-24
 * 
 * @requires /core/js-core.js
 */
js.lang.System.namespace('js.lang');
(function(){
/**
 * Five status: unstart|running|waiting|suspended|stopped.
 * 
 * @class js.lang.ThreadStatus
 * @static
 */		
js.lang.ThreadStatus = {UNSTART:-1,RUNNING:0,WAITING:1,SUSPENDED:2,STOPPED:3}
/** @constant {Int} UNSTART */
/** @constant {Int} RUNNING */
/** @constant {Int} WAITING */
/** @constant {Int} SUSPENDED */
/** @constant {Int} STOPPED */

var SYS = js.lang.System, TS = js.lang.ThreadStatus;

/**
 * @class js.lang.Thread
 * @constructor
 * 
 * @struct js.lang.Thread$Config {
 * 		"description":"the config argument"
 * 		,"type":"object"
 * 		,"properties":{
 * 			"interval":{"description":"the default value is 0", "type":"number", "required":false}
 * 			,"scope":{"description":"", "type":"object", "required":false}
 * 			,"fpsMax":{"description":"the default value is null", "type":"number", "required":false}
 * 			,"fpsCount":{"description":"the default value is 30", "type":"number", "required":false}
 * 		}
 * }
 * 
 * @param {Object|Array<Object>} targets the object must has a method named "run"
 * @param {js.lang.Thread$Config} config
 */
js.lang.Thread = function(targets, config){
	if(!targets) targets = [];
	if(!config) config = {};	
	
	this._targets = SYS.isArray(targets)?targets:[targets];
	this._interval = config['interval']||0;
	this._wait = null;
	this._status = TS.UNSTART;
	this._timer = null;
	this._scope = config['scope'];
	
	var count = config['fpsCount'];
	this._max_count = (typeof count==="number" && isFinite(count) && count>0)?count:30;
	this._skip = false;
	this.setMaxFPS(config['fpsMax']);		
}

js.lang.Thread.prototype = {
	/**
	 * @method setFPSCallback
	 * @param {js.lang.Callback} callback The arguments: [fps, maxFPS]
	 */	
	setFPSCallback: function(callback){
		if(callback){
			this._fnFPS = callback['fn'];
			this._ctxFPS = callback['scope']||this;		
		}else{
			this._fnFPS = null;
			this._ctxFPS = null;
		}
	},
	_clear: function(){
		if (this._timer) window.clearTimeout(this._timer);
		this._timer = null;
		this._wait = null;	
	},
	_run: function(){
		if(this._targets && this._status == TS.RUNNING){
			for(var i=0,len=this._targets.length;i<len;i++){
				var target = this._targets[i];
				if (target && SYS.isFunction(target['run'])) {
					this._watchFPS(target, this._fnFPS, this._ctxFPS);
				}
			}	
		}
		
		if(this._timer) window.clearTimeout(this._timer);		
		if (this._status == TS.RUNNING || this._status == TS.WAITING) {
			var me = this;
			this._timer = window.setTimeout(function(){
				me._run();
				me._wait = null;
			}, this._wait || this._interval);
		}
	},
	_ready: function(){
		this._time = 0, this._frameCount = 0, this._fps = 0;
		this._time = new Date().getTime();
	},
	_watchFPS: function(target, callback, context){
		if(this._max_fps) var cycleStartTime = new Date().getTime();
		
		if(!this._skip) target.run.call(this._scope||target);
		
		if (this._max_fps) {
			var cycleEndTime = new Date().getTime(), cycleTime = cycleEndTime - cycleStartTime, mspf = 1000 / this._max_fps;
			if (cycleTime < mspf) {
				this._skip = false;
				this.wait(Math.ceil(mspf - cycleTime));//为限制帧速，线程休眠一段时间
			}
			else {//如果循环时间过大则跳过下一帧
				this._skip = true;
			}
		}		
		
		if(callback) this._frameCount++; 		
		if (callback && this._frameCount % this._max_count == 0){   
            var now = new Date().getTime();   
            this._fps = Math.round(100000 * this._frameCount / (now - this._time))/100;//保留两位小数   
               
            this._frameCount = 0; 
            this._time = now;
			callback.call(context, this._fps, this._max_fps);   
        }				
	},
	/**
	 * Sets the limited value of FPS.
	 * 
	 * @method setMaxFPS
	 * @param {Number} fps
	 */
	setMaxFPS: function(fps){
		this._max_fps = Number(fps)||null;
	},
	/**
	 * Returns the limited value of FPS.
	 * 
	 * @method getMaxFPS
	 * @return {Number}
	 */
	getMaxFPS: function(){
		return this._max_fps;
	},
	/**
	 * Returns the current FPS.
	 * 
	 * @method getFPS
	 * @return {Number}
	 */
	getFPS: function(){
		return this._fps;
	},
	/**
	 * Sets the interval time(milliseconds) of each cycle.
	 * 
	 * @method setInterval
	 * @param {Int} interval
	 */
	setInterval: function(interval){
		this._interval = interval||0;
	},
	/**
	 * Returns the interval time(milliseconds) of each cycle.
	 * 
	 * @method getInterval
	 * @return {Int}
	 */
	getInterval: function(){
		return this._interval;
	},
	/**
	 * Returns the current status of the thread.
	 * 
	 * @method getStatus
	 * @return {Int}
	 */	
	getStatus: function(){return this._status},
	/**
	 * Returns all targets of the thread.
	 * 
	 * @method getTargets
	 * @return {Object[]}
	 */
	getTargets: function(){return this._targets;},
	/**
	 * Starts the thread.
	 * 
	 * @method start
	 */
	start: function(){
		if(this.isWorking()) return;
		this._status = TS.RUNNING;
		this._clear();
		this._ready();
		this._run();		
	},
	/**
	 * Is working.
	 * 
	 * @method isWorking
	 * @return {Boolean}
	 */	
	isWorking: function(){
		return this._status > TS.UNSTART && this._status < TS.STOPPED;
	},
	/**
	 * Stops the running temporarily.
	 * 
	 * @method suspend
	 */
	suspend: function(){
		if(!this.isWorking()) return;
		this._status = TS.SUSPENDED;			
	},
	/**
	 * Continue the running.
	 * 
	 * @method resume
	 */
	resume: function(){
		if(!this.isWorking()) return;
		this._status = TS.RUNNING;	
		this._clear();
		this._ready();
		this._run();		
	},
	/**
	 * Finish the running.
	 * 
	 * @method stop
	 */
	stop: function(){
		this._status = TS.STOPPED;
		this._clear();	
	},
	/**
	 * Wait some milliseconds and continue.
	 * 
	 * @method wait
	 * @param {Int} n Unit:milliseconds
	 */
	wait: function(n){
		if(this.isWorking()) this._wait = n;
	}
};
})();
