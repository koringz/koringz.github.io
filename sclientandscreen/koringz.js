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
function getElementNode(attr_name, element) {
	element = el(element);
	if(typeof attr_name == "string"){
		if(/^\./g.test(attr_name)){
			return element.getElementsByClassName(attr_class(attr_name))[0]
		}else if(/^\#/g.test(attr_name)){
			return element.getElementById(attr_id(attr_name))
		}else{
			return element.getElementsByTagName(attr_name)[0]
		}
	}
	function attr_class(attr_class){
		return attr_name.replace(/./,"");
	}
	function attr_id(attr_id){
		return attr_name.replace(/#/,"");
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
}
function isFunction(element){
	return typeof element === "function"
}
function isNumber(element){
	return typeof element === "number"
}
function isObject(element){
	return typeof element === "object"
}