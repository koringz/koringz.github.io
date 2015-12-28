function getElementNode(attr_name, element) {
	element = el(element);
	if(typeof attr_name == "string"){
		if(/^\./g.test(attr_name)){
			return element.getElementsByClassName(attr_class(attr_name))[0]
		}else if(/^\#/g.test(attr_name)){
			return element.getElementById(attr_id(attr_name))
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
