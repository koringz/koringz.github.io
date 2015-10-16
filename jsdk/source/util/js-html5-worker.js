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
 * @class js.html5.Worker
 * @constructor
 * @param {String} target
 * @throws {Error} when the browser not support HTML5's Worker
 */
js.html5.Worker = function(target){
	if(!window.Worker) throw new Error("[js.html5.Worker]The browser not support HTML5's Worker");
	
	if(target.endsWith('.js')){
		this._target = target;		
	}else {
		var bb = new BlobBuilder();
		bb.append(target.toString());
		this._target = window.URL.createObjectURL(bb.getBlob());;
	}
	
	this._worker = new Worker(this._target);
	this._started = false;
}	
/**
 * @method onSelf
 * @static
 * @param {String} eName
 * @param {Function} fn
 */
js.html5.Worker.onSelf = function(eName, fn){
	self.addEventListener(eName, fn, false);
}
/**
 * @method closeSelf
 * @static
 */
js.html5.Worker.closeSelf = function(){
	self.close();
}
/**
 * @method postSelf
 * @static
 * @param {String} msg
 */
js.html5.Worker.postSelf = function(msg){
	self.postMessage(msg);
}

js.html5.Worker.prototype = {
	/**
	 * @method start
	 * @param {String} msg
	 */
	start: function(msg){		
		this._worker.postMessage(msg); // Start the worker.
		this._started = true;
	},
	/**
	 * @method on
	 * @param {String} eName
	 * @param {Function} fn
	 */
	on: function(eName, fn){
		if(eName!='message' || eName!='error') return;
		this._worker.addEventListener(eName, fn, false);
	},
	/**
	 * @method stop
	 */
	stop: function(){		
		this._worker.terminate(); // Stop the worker.
		this._started = false;
	}	
}