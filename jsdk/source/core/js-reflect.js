/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.1
 * @author feng.chun
 * @date 2007-7-20
 * 
 * @requires /core/js-core.js
 */
js.lang.System.namespace('js.reflect');

/**
 * @class js.reflect.Class
 * @final
 * @constructor
 * @param {String} className
 * @param {Object} instance:optional
 * @throws {TypeError} when the class name not found
 */
js.reflect.Class = function(className, instance){
	if(!js.lang.System.isString(className)) 
		throw new TypeError('[js.reflect.Class]The reflect className not a string.');
	
	this._name = className||'';	
	this._simpleName = this._name.slice(this._name.lastIndexOf('.')+1);
	this._namespace = this._name.slice(0, this._name.lastIndexOf('.'));
	if(this._namespace.startsWith('js.reflect')) 
		throw new TypeError('[js.reflect.Class]The reflect classes not be reflected.');
	
	this._class = eval(className);
	if(!this._name || !this._class || typeof this._class != 'function') 
		throw new TypeError('[js.reflect.Class]The Class<'+this._name+'> not found.');
	
	try{
		this._instance = instance||this.newInstance();
	} catch(e) {		
		this._instance = {}, this._mode = 'mock';
		
		var string = this._class.toString()
        , matches = string.match(/this.\S+\s*=\s*function|this.\S+\s*=/gi);
		
		if(matches){
			for (var i=0, len = matches.length;i < len ; i++) {				
	            this._instance[matches[i].between('this.','=').trim()] = matches[i].endsWith('function')?'function':'field';
	       }
		}
		
		var pt = this._class.prototype;
		for (k in pt){
			if (k != 'constructor') {
				this._instance[k] = typeof pt[k] == 'function'?'function':'field';
			}
  		}
	}	
};

js.reflect.Class.prototype = (function(){	
	return {
		/**
		 * Returns the full class name.
		 * 
		 * @method getName
		 * @return {String} classname
		 */
		getName: function(){return this._name},
		/**
		 * Returns the simple class name.
		 * 
		 * @method getSimpleName
		 * @return {String} classname
		 */		
		getSimpleName: function(){return this._simpleName},
		/**
		 * Returns the package name.
		 * 
		 * @method getNamespace
		 * @return {String} packagename
		 */	
		getNamespace: function(){return this._namespace},
		/**
		 * Returns the super class.
		 * 
		 * @method getSuperclass
		 * @return {Function} superclass
		 */
		getSuperclass: function(){
			return this._class.superclass;
		},
		/**
		 * Returns the constructor function.
		 * 
		 * @method getConstructor
		 * @return {Function} constructor function
		 */
		getConstructor: function(){
			return this._class.constructor;
		},
		/**
		 * Returns this class.
		 * 
		 * @method getClass
		 * @return {Function}
		 */
		getClass: function(){return this._class;},
		/**
		 * Returns a new instance of the class.
		 * 
		 * @method newInstance
		 * @return {Object}
		 * @throws {Error} when create new instance failure
		 */
		newInstance: function(){		
			var f = function(){};
			f.prototype = this._class.prototype;
			var obj = new f();
			this._class.apply(obj, arguments);
			return obj;
		},
		/**
		 * Returns the Field by name. If the name not exist return null.
		 * 
		 * @method getField
		 * @param {String} name
		 * @return {js.reflect.Field}
		 * @throws {TypeError} when the field not be found
		 */
		getField: function(name){
			if(!this.isField(name)) throw new TypeError('[js.reflect.Class#getField]The Field<'+name+'> not be found.');
			return new js.reflect.Field(name, this);
		},
		/**
		 * Return all Fields.
		 * 
		 * @method getFields
		 * @return {Array<js.reflect.Field>}
		 */
		getFields: function(){
			var arr = [];
			for(k in this._instance){
				if(this._isField(k)){
					arr.push(new js.reflect.Field(k, this));
				}
			}
			return arr;
		},
		/**
		 * Returns the Method by name. If the name not exist return null.
		 * 
		 * @method getMethod
		 * @param {String} name
		 * @return {js.reflect.Method}
		 * @throws {TypeError} when the method not be found
		 */
		getMethod: function(name){
			if(!this.isMethod(name)) throw new TypeError('[js.reflect.Class#getMethod]The Method<'+name+'> not be found.');
			return new js.reflect.Method(name, this);
		},
		/**
		 * Return all Methods.
		 * 
		 * @method getMethods
		 * @return {Array<js.reflect.Method>}
		 */
		getMethods: function(){
			var arr = [];
			for(k in this._instance){
				if(this._isMethod(k)){
					arr.push(new js.reflect.Method(k, this));
				}
			}
			return arr;
		},
		/**
		 * Is a method or field of the class.
		 * 
		 * @method isMember
		 * @param {String} name
		 * @return {Boolean}
		 */	
		isMember: function(name){
			if(!name || name=='constructor') return false;
			return name in this._instance;
		},
		_isField: function(name){
			return this._mode == 'mock'? this._instance[name]=='field':typeof this._instance[name]!='function';
		},
		_isMethod: function(name){
			if(name=='constructor') return false;
			return this._mode == 'mock'? this._instance[name]=='function':typeof this._instance[name]=='function';
		},
		/**
		 * Is a field of the class.
		 * 
		 * @method isField
		 * @param {String} name
		 * @return {Boolean}
		 */
		isField: function(name){
			if(!this.isMember(name)) return false;			
			return this._isField(name);
		},
		/**
		 * Is a method of the class.
		 * 
		 * @method isMethod
		 * @param {String} name
		 * @return {Boolean}
		 */
		isMethod: function(name){
			if(!this.isMember(name)) return false;
			return this._isMethod(name);
		}
	}
})();
/**
 * Returns a Class by name.
 * 
 * @static
 * @method forName
 * @param {String} name
 * @return {js.reflect.Class}
 */
js.reflect.Class.forName = function(name){
	return new js.reflect.Class(name);
}

/**
 * @class js.reflect.Method
 * @final
 * @constructor
 * @param {String} name
 * @throws {TypeError} if the name is empty  
 */
js.reflect.Method = function(name){
	if(!name) 
		throw new TypeError('[js.reflect.Method]The Method must not empty.');
	this._name = name;
};
js.reflect.Method.prototype = {
	/**
	 * Returns the name.
	 * 
	 * @method getName
	 * @return {String}
	 */
	getName: function(){return this._name},
	/**
	 * Invoke the method. 
	 * 
	 * @method invoke
	 * @param {Object} obj the instance
	 * @param {Object..} args
	 * @throws {TypeError} when the object is null or the method not be found
	 */	
	invoke: function(obj, args){
		if(!obj) throw new TypeError('[js.reflect.Method#invoke]The object is null.');
		if(!this._name in obj) throw new TypeError('[js.reflect.Method#invoke]The Method<'+this._name+'> not be found.');
		return obj[this._name].apply(obj, [].slice.call(arguments, 1));
	}
};
/**
 * @class js.reflect.Field
 * @final
 * @constructor
 * @param {String} name
 * @throws {TypeError} if the name is empty 
 */
js.reflect.Field = function(name){
	if(!name) 
		throw new TypeError('[js.reflect.Field]The Field must not empty.');
	this._name = name;
};
js.reflect.Field.prototype = {
	/**
	 * Returns the name.
	 * 
	 * @method getName
	 * @return {String}
	 */
	getName: function(){return this._name},
	/**
	 * Sets the field. 
	 * 
	 * @method set
	 * @param {Object} obj the instance
	 * @param {Object} value
	 * @throws {TypeError} when the object is null or the field not be found
	 */
	set: function(obj, value){
		if(!obj) throw new TypeError('[js.reflect.Field#set]The object is null.');
		if(!this._name in obj) throw new TypeError('[js.reflect.Field#set]The Field<'+this._name+'> not be found.');
		obj[this._name] = value;
	},
	/**
	 * Gets the field. 
	 * 
	 * @method get
	 * @param {Object} obj
	 * @return {Object} value
	 * @throws {TypeError} when the object is null or the field not be found
	 */
	get: function(obj){
		if(!obj) throw new TypeError('[js.reflect.Field#get]The object is null.');
		if(!this._name in obj) throw new TypeError('[js.reflect.Field#set]The Field<'+this._name+'> not be found.');
		return obj[this._name];
	}
};
