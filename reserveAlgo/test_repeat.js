(function  (wins) {

var doc = wins.document || document,
	vir = [],
	results = [];

function b () {};

function dom(options) {

	return doc.querySelector(options);

};

function isObj (options) {
	if(typeof(options) === 'object'){
		return true;
	}
	return false;
};


function extend (prop, options) {

	for(var pop in options){
		if(pop in prop){
			prop[pop] = options[pop];
		}
		prop[pop] = options[pop];
	}
	
	return prop;
}

function conversionOrders () {
	var 
		F = [],
		H = [],
		L = [];

	function  defaultLister ( options ) {

	 	this.options = options;
	 	F.push(this);

	};

	// this options is the user's force input string.
	function getContents(options) {

		var words =  this.options ? this.options  : "g y"; //give you a line of words
		
		// If it is't space and ' '. you need to replace the Boolean -1 .
		if ( words.search(/' '/) ) {

			var a = [],
				str = '',
				restr='';

			// foreach the words content.
			for (var i = 0, len = words.length; i < len; i++) {

				var k=[],
					s = [],
					p = null;

				s.push(words[i]);

				p = s[0];

				if (p !== ' ') {

					str += ''+ words[i];
					continue;

				}
				else if(p === ' '){

					if(str !== ''){

						a.push(str);

					}

					str = '';
					continue;

				}
				else { break; }

			}

			a.push(str);

			var j = [],i=0;

			for(var g = a.length-1; g < a.length; g--){

				if(g >= 0){

					j.push(a[g]);

					restr += j[i++] + ' ';

				}
				else{ break; }

			}


		}
		else{ return; }

		// clear cache.
		delete this.options;

		H.push(this);

		return restr;

	};

	return {
		getContents : getContents, // get content.
		defaultLister : defaultLister // output user owns content or value.
	};

};

function conversion (element, userContent ) {
	return new order(element, userContent );
}


// Add a value in the method. it is Okay.
var order = function ( element, userContent ) {
	this.element = element;
	this.content = userContent;
	this.accessinfo = null;
	this.words = {
		writable : true,
		readable : false,
		text : 'writer non supported!' || null,
		enable :false
	};
	this.other = {
		getContainers : null
	};

	// dynamic array
	this.dynamic = [];
	this.insides = [];

	// defined a viod object.
	this.useToExtend = {};
	this.isWords = {};

	// orders
	this.orders = [];
	this.defaultOrders = [];

	results.push(this);

	this.listener();
};

order.prototype = {
	// when the calling conversionOrders method is save to the transfer station getOrders().
	// instance object method. 
	getConversionOrders :function  () {

		var virtualOrder = new conversionOrders();

		if( typeof(virtualOrder) === 'object' ){
			return virtualOrder;
		}
		else if( typeof(virtualOrder) === 'function' ){
			return virtualOrder();
		}
		else{
			return;
		}

		vir.push(virtualOrder);

		return virtualOrder;
	},

	// Receiving user's container.
	access : function  ( options ) {
		if (typeof(options) === 'object') {

			/*
				不确定对象的属性是那一个的情况下先赋值 
				然后存储外部属性进getWords
			*/
			var getWords = extend(this.words, options);
			this.defaultOrders.push(getWords);

			// if there writable.
			// this is default writable status.
			if ( this.words.writable
				 && !(this.words.enable) // default false
				 && !(this.words.readable) ) { // default false

				// if there are object prototype contains 'text' and 'value'. 
				// options = { text : '' , value : ''}
				for(var prop in options){

					// if there. save value and text information.
					if(/text|value/i.test(prop)){

						// copy text|value as key value.
						this.useToExtend[prop] = options[prop];
						continue;

					}

					else{ break; }

				}

				// get a new this.words object.
				// filters value and text.
				var cutting = extend(this.words, this.useToExtend);
				this.insides.push(cutting);

				// rebulid this.words object of prototype.
				/*

				this.words = {
					writable : true,
					readable : false,
					enable :false,

					text : 'new',  // inside
					value : 'new'  // inside
				}
				*/
				this.words = this.insides[0];

				// changed the text from the people input or write content.
				// we also got this.text from him.
				// access (object or text) by this.accessinfo.
				this.accessinfo = this.words.value ? this.words.value : this.words.text;
				// if this is an array.
				// this.accessinfo = [ 'a', 'b', 'c', 'd',...];
				if( typeof(this.accessinfo) === 'array' ){

					order.debug('this.accessinfo');

					/*

						后续优化 数组的返回值

						this.accessinfo = ['a','b'...]

					*/
				}
				// else it is String.
				else{
					this.dynamic.push(this.accessinfo);
				}
				// ******** call changed  ********
				this.changedValue( this.dynamic[0] );
				this.orders.push(this);
				// order.debug('disable write!');
			}
			// else it is no writable. user's only input an object. 
			/*
				options { value : array | object | string | other}
				there is a value also json styles.
			*/
			else{
				// default false, disable write.
				this.accessinfo = this[words].text;
				this.dynamic.push(this.accessinfo);

				// ******** call changed  ********
				this.changedValue( this.dynamic[0] );
				this.orders.push(this);
			}

		}
		else if(typeof(options) === 'string'){

			this.accessinfo = options;

			this.dynamic.push(this.accessinfo);

			// ******** call changed  ********
			this.changedValue( this.dynamic[0] );
		}


		
		return this;
	},

	// callback listener data the method.
	// it is current there are receiving input content.
	// addlistener .
	listener : function  () {

		var dynamics = this.dynamic;

	},

	// there must be parameter.
	changedValue : function  ( options ) {

		var getVirtualOrders = this.getConversionOrders();

		// receiving status.
		// if there is an array value. 
		if(this.dynamic.length > 0){

			// if there is more than return value.
			for (var i = 0; i < this.dynamic.length; i++) {

				var dynamic = this.dynamic[i];

			};
			var receive = this.dynamic[0];

		}
		// if on exist an array.
		else{
			// return null or undefined. 
			// accessinfo = null.
			var accessinfo = this.accessinfo ? this.accessinfo : null;
			getVirtualOrders.defaultLister( accessinfo );
		}

		
		getVirtualOrders.defaultLister( receive );
		/* getVirtualOrders push array*/
		this.orders.push(getVirtualOrders);
		return this;
	},

	// get the container of the inhirt prototype in the method.	
	getContainer : function  ( options, callbak ) {

		var getVirtualOrders = this.orders[0];


		// if the options is't within the method arguments.
		// options = null || undefined.
		if ( !options ) {
			return getVirtualOrders.getContents();
		}
		// else there.
		else{
			// if there are boolear true.
			// options = true && false
			if((options === options) && options){
				// there are a string.
				if( String(options) ){
					return getVirtualOrders.getContents( );
				}
				// this (options) by invoked.
				// enable call parameters.

			}
			// or the existence other parameters.
			/*
			options = {a:f} || 'string' || number(123)
			*/
			else{

				var options = this.other.getContainers = options;

				return getVirtualOrders.getContents( );

			}

		}

		if(callbak){
			// this maybe receiving output parameter.
			// callbak( 'accept request something' ) or receiving results and rebuild return value.
			callbak();
		}

		// default prevent function. when receiving parameter.
		return null;
	}
};

function consoleLog (options, log) {
	return options.call(this, log);
};

order.debug = consoleLog(function  (options) {
	window.console.log(options)
},'disable write.');



wins.Conversion = conversion;

})(window);
