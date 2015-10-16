/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.3
 * @author feng.chun
 * @date 2012-03-08
 * 
 * @version 0.2
 * @author feng.chun
 * @date 2010-11-17
 * 
 * @version 0.1
 * @author feng.chun
 * @date 2010-8-15
 * 
 * @requires /core/js-core.js
 * @requires /core/js-reflect.js
 */
js.lang.System.namespace('js.aop');

/**
 * @struct js.aop.AOP$Callback {
 *     "type":"object"
 *     ,"properties":{
 *         "before":{
 *             "type":"function"
 *             ,"description": "fires before the method be invoked"
 *             ,"required":false
 *             ,"arguments":{
 *                 "eType":{"type":"string","required":true}
 *                 ,"mName":{"type":"string","required":true}
 *                 ,"mArgs":{"type":"array","required":false}
 *             }
 *          }
 *          ,"after":{
 *             "type":"function"
 *             ,"description": "fires after the method be invoked"
 *             ,"required":false
 *             ,"arguments":{
 *                 "eType":{"type":"string","required":true}
 *                 ,"mName":{"type":"string","required":true}
 *                 ,"mReturn":{"type":"object","required":false}
 *             }
 *          }
 *          ,"error":{
 *             "type":"function"
 *             ,"description": "fires when the method be invoking throws a error"
 *             ,"required":false
 *             ,"arguments":{
 *                 "eType":{"type":"string","required":true}
 *                 ,"mName":{"type":"string","required":true}
 *                 ,"mError":{"type":"error","required":false}
 *             }
 *          }
 *      }    
 * }
 */

/**
 * @class js.aop.ClassProxy
 * @static
 */
js.aop.ClassProxy = function(){
	return {
		/**
		 * Add advices for the class's method.
		 * 
		 * @method addAdvices
		 * @param {js.reflect.Class|String} clazz a class' name or Class
		 * @param {String} methodName the method name of a class
		 * @param {js.aop.AOP$Callback} callback 
		 * @throws {TypeError} when some arguments invalid or method not exist
		 */
		addAdvices: function(clazz, methodName, callback){
			var cla = null;
			try{
				cla = clazz instanceof js.reflect.Class?clazz:js.reflect.Class.forName(clazz);
			}catch(e){
				throw e;
			}
			var klass = cla.getClass()
			, con = cla.getConstructor()
			, fn = klass.prototype[methodName];
			
			if(!con['_aop']) con['_aop'] = {};
			var _aop = con['_aop'];
			if(!_aop[methodName]) _aop[methodName] = fn;
						
			klass.prototype[methodName] = function(){								
				return function(){
					var args = Array.prototype.slice.call(arguments, 0)
					, rst = null, beforeRst = null, afterRst = null, errorRst = null;
					if (callback['before']) {
						beforeRst = callback['before'].apply(this, ['before', methodName, args]);
					}
					try{						
						rst = fn.apply(this, beforeRst||arguments);
					}catch(e){
						if(callback['error']) {
							errorRst = callback['error'].apply(this, ['error', methodName, e]);
							if(errorRst) throw errorRst;
						}
					}
					if(callback['after']) {
						afterRst = callback['after'].apply(this, ['after', methodName, rst]);
					}
					return afterRst||rst; 
				}				
			}();			
		},
		/**
		 * Remove all advices on the class's method.
		 * 
		 * @method reset
		 * @param {js.reflect.Class|String} clazz a class' name or Class
		 * @param {String} methodName the method name of a class
		 * @throws {TypeError} when some arguments invalid or method not exist
		 */
		reset: function(clazz, methodName){
			var cla = null;
			try{
				cla = clazz instanceof js.reflect.Class?clazz:js.reflect.Class.forName(clazz);
			}catch(e){
				throw e;
			}
			var klass = cla.getClass()
			, con = cla.getConstructor()
			,_aop = con['_aop']
			,fn = _aop?_aop[methodName]:null;			
			if(fn) klass.prototype[methodName] = fn;
		}
	}
}()

/**
 * @class js.aop.InstanceProxy
 * @static
 */
js.aop.InstanceProxy = function(){
	return {
		/**
		 * Add advices for the instance's method.
		 * 
		 * @method addAdvices
		 * @param {Object} obj the instance of a class
		 * @param {String} methodName the method name of a class
		 * @param {js.aop.AOP$Callback} callback 
		 * @throws {TypeError} when some arguments invalid or method not exist
		 */
		addAdvices: function(obj, methodName, callback){
			if(!obj || !methodName || !callback) throw new TypeError("[js.aop.InstanceProxy#addAdvices]Some arguments invalid.");
				
			var fn = obj[methodName];
			if(typeof fn !='function') throw new TypeError('[js.aop.InstanceProxy#addAdvices]The Method<'+methodName+'> not found.');
			
			//cache the real method
			if(!obj.constructor['_aop']) obj.constructor['_aop'] = {};
			var _aop = obj.constructor['_aop'];
			if(!_aop[methodName]) _aop[methodName] = fn;			
			
			obj[methodName] = function(){
				var rst = null, beforeRst = null, afterRst = null, errorRst = null;
				if (callback['before']) {
					beforeRst = callback['before'].apply(obj, ['before', methodName, Array.prototype.slice.call(arguments, 0)]);
				}
				try{
					rst = fn.apply(obj, beforeRst||arguments);
				}catch(e){
					if(callback['error']) {
						errorRst = callback['error'].apply(obj, ['error', methodName, e]);
						if(errorRst) throw errorRst;
					}
				}
				if(callback['after']) {
					afterRst = callback['after'].apply(obj, ['after', methodName, rst]);
				}
				return afterRst||rst; 
			}
		},
		/**
		 * Remove all advices on the instance's method.
		 * 
		 * @method reset
		 * @param {Object} obj the instance of a class
		 * @param {String} methodName the method name of a class
		 * @throws {TypeError} when some arguments invalid or method not exist
		 */
		reset: function(obj, methodName){
			if(!obj || !methodName) throw new TypeError("[js.aop.InstanceProxy#reset]Some arguments invalid.");
			var fn = obj[methodName];
			if(typeof fn !='function') throw new TypeError('[js.aop.InstanceProxy#reset]The Method<'+methodName+'> not found.');
						
			var _aop = obj.constructor['_aop'];
			fn = _aop?_aop[methodName]:null;			
			if(fn) obj[methodName] = fn;
		}
	}
}();