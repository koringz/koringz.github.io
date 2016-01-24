/* 
 *
 * $author koringz
 * $date 2015-9-27
 * $version 0.1
 *
 * $author koringz
 * $date 2015-9-29
 * $version 0.1
 *
 */
function getElementNode(attr_name, node, element) {
	element = el(element);
	if(isString(attr_name)){
		if(/^\./g.test(attr_name)){
			if(element.getElementsByClassName){
				return element.getElementsByClassName((new callback(attr_name)).attr_class())[0]
			}else{
				var a = [];
				node = element;
				if(node.ownerDocument === '[object HTMLDocument]') node.all;
				for(var i = 0;i<node.length;i++){
					if(node[i].className == (new callback(attr_name)).attr_class()) a.push(node[i]);
				}
				return a
			}
		}else if(/^\#/g.test(attr_name)){
			return element.getElementById((new callback(attr_name)).attr_id())
		}else{
			return element.getElementsByTagName(attr_name)[0]
		}
	}
};
function callback (element) {
	reg.apply(this,arguments)
};
function reg (options) {
	this.attr_class = function () {
		return options.replace(/./,"");
	};
	this.attr_id =  function () {
		return options.replace(/#/,"");
	}
};
function addLister(domnode,eventType,handler){
	el();
	if(el().all){
		domnode.attachEvent("on"+eventType,handler)
	}else{
		domnode.addEventListener(eventType,handler,false)
	}
};
function el(element){
	if(!element){element = document}
	return element 
};
function isString(element){
	return typeof element === "string"
};
function isFunction(element){
	return typeof element === "function"
};
function isNumber(element){
	return typeof element === "number"
};
function isObject(element){
	return typeof element === "object"
};
function isArray(element){
	return typeof element === "array"
};
function isBoolean(element){
	return typeof element === "boolean"
};



function arr(argument) {
	this.createarr = []
}
arr.prototype =  {
	method_name:function (argument) {
		if(this.createarr.length == 0){
			this.eventmap = this.enresized.bindAsEventListener(as);	
		}
	}
};

































