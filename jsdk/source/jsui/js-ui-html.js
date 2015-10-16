/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.2
 * @author feng.chun
 * @date 2011-09-05
 * @date 2011-09-14
 * 
 * @version 0.1
 * @author feng.chun
 * @date 2010-8-15
 */

/**
 * @class js.ui.HTMLButton
 * @constructor
 * @extends js.ui.Widget
 * 
 * @param {js.ui.Widget$Config} config
 */
js.ui.HTMLButton = function(config){
	config = config||{};
	config['widgetClass'] = 'js.ui.HTMLButton';
	js.ui.HTMLButton.superclass.constructor.apply(this, [config]);		
};  
js.lang.System.extend(js.ui.HTMLButton, js.ui.Widget, {
	/**
	 * @method render
	 * @override
	 */
	render: function(){
		this.fireEvent('rendering');
		this.set('type','button'); //fix auto submit in form by FF
		this.set('html',this.get('text')); 
		this._renderHTMLWidget('button');
		this.fireEvent('rendered');		
	}
});

/**
 * @class js.ui.HTMLImage
 * @constructor
 * @extends js.ui.Widget
 * 
 * @struct js.ui.HTMLImage$Config {
 * 		"description":""
 * 		,"type":"object"
 * 		,"properties":{
 * 			"src":{"type":"string"}				
 * 		}
 *      ,"extends":"js.ui.Widget$Config"
 * }
 * @param {js.ui.HTMLImage$Config} config
 */
js.ui.HTMLImage = function(config){
	config = config||{};
	config['widgetClass'] = 'js.ui.HTMLImage';
	js.ui.HTMLImage.superclass.constructor.apply(this, [config]);		
};  
js.lang.System.extend(js.ui.HTMLImage, js.ui.Widget, {
	DOM_ATTRIBUTES: {
		id:1,
		name:1,
		title:1,
		type:1,
		cssName:1,
		cssText:1,
		src:1,
		widgetClass:1
	},
	/**
	 * @method render
	 * @override
	 */
	render: function(){
		this.fireEvent('rendering');
		this._renderHTMLWidget('img');
		this.fireEvent('rendered');		
	}
});

/**
 * @class js.ui.HTMLTextbox
 * @constructor
 * @extends js.ui.Widget 
 * @param {js.ui.Widget$Config} config
 */
js.ui.HTMLTextbox = function(config){ 
	config = config||{};
	config['widgetClass'] = 'js.ui.HTMLTextbox';
	js.ui.HTMLTextbox.superclass.constructor.apply(this, [config]);
};  
js.lang.System.extend(js.ui.HTMLTextbox, js.ui.Widget, {
	/**
	 * @method render
	 * @override
	 */
	render: function(){
		this.fireEvent('rendering');
		this.set('type','text');
		this._renderHTMLWidget('input');
		this.fireEvent('rendered');		
	}
});

/**
 * @class js.ui.HTMLPassword
 * @constructor
 * @extends js.ui.Widget 
 * @param {js.ui.Widget$Config} config
 */
js.ui.HTMLPassword = function(config){ 
	config = config||{};
	config['widgetClass'] = 'js.ui.HTMLPassword';
	js.ui.HTMLPassword.superclass.constructor.apply(this, [config]);
};  
js.lang.System.extend(js.ui.HTMLPassword, js.ui.Widget, {
	/**
	 * @method render
	 * @override
	 */
	render: function(){
		this.fireEvent('rendering');
		this.set('type','password');
		this._renderHTMLWidget('input');
		this.fireEvent('rendered');		
	}
});

/**
 * @class js.ui.HTMLHidden
 * @constructor
 * @extends js.ui.Widget 
 * @param {js.ui.Widget$Config} config
 */
js.ui.HTMLHidden = function(config){ 
	config = config||{};
	config['widgetClass'] = 'js.ui.HTMLHidden';
	js.ui.HTMLHidden.superclass.constructor.apply(this, [config]);
};  
js.lang.System.extend(js.ui.HTMLHidden, js.ui.Widget, {
	/**
	 * @method render
	 * @override
	 */
	render: function(){
		this.fireEvent('rendering');
		this.set('type','hidden');
		this._renderHTMLWidget('input');
		this.fireEvent('rendered');		
	}
});

/**
 * @class js.ui.HTMLRadio
 * @constructor
 * @extends js.ui.Widget 
 * @param {js.ui.Widget$Config} config
 */
js.ui.HTMLRadio = function(config){ 
	config = config||{};
	config['widgetClass'] = 'js.ui.HTMLRadio';
	js.ui.HTMLRadio.superclass.constructor.apply(this, [config]);
};  
js.lang.System.extend(js.ui.HTMLRadio, js.ui.Widget, {
	/**
	 * @method render
	 * @override
	 */
	render: function(){
		this.fireEvent('rendering');
		this.set('type','radio');
		this._renderHTMLWidget('input');
		this.fireEvent('rendered');		
	},
	/**
	 * @method select
	 */
	select:function(){
		var el = this.getEl();
		if(!el) return;
		
		this.set('checked', true);
		el.checked = true;
	},
	/**
	 * @method unselect
	 */
	unselect:function(){
		var el = this.getEl();
		if(!el) return;
		
		this.set('checked', false);
		el.checked = false;
	},
	/**
	 * @method isSelected
	 * @return {Boolean}
	 */
	isSelected:function(){
		var el = this.getEl();
		if(!el) return null;
		
		return el.checked;
	},
	/**
	 * @method getSelectedValue
	 * @return {String}
	 */
	getSelectedValue:function(){
		var el = this.getEl();
		if(!el) return null;
		
		return this.isSelected()?this.getValue():null;
	}
});

/**
 * @class js.ui.HTMLCheckbox
 * @constructor
 * @extends js.ui.Widget 
 * @param {js.ui.Widget$Config} config
 */
js.ui.HTMLCheckbox = function(config){ 
	config = config||{};
	config['widgetClass'] = 'js.ui.HTMLCheckbox';
	js.ui.HTMLCheckbox.superclass.constructor.apply(this, [config]);	
};  
js.lang.System.extend(js.ui.HTMLCheckbox, js.ui.Widget, {
	/**
	 * @method render
	 * @override
	 */
	render: function(){
		this.fireEvent('rendering');
		this.set('type','checkbox');
		this._renderHTMLWidget('input');
		this.fireEvent('rendered');		
	},
	/**
	 * @method select
	 */
	select:function(){
		var el = this.getEl();
		if(!el) return;
		
		this.set('checked', true);
		el.checked = true;
	},
	/**
	 * @method unselect
	 */
	unselect:function(){
		var el = this.getEl();
		if(!el) return;
		
		this.set('checked', false);
		el.checked = false;
	},
	/**
	 * @method isSelected
	 * @return {Boolean}
	 */
	isSelected:function(){
		var el = this.getEl();
		if(!el) return null;
		
		return el.checked;
	},
	/**
	 * @method getSelectedValue
	 * @return {Boolean}
	 */
	getSelectedValue:function(){
		var el = this.getEl();
		if(!el) return null;
		
		return this.isSelected()?this.getValue():null;
	}
});

/**
 * @class js.ui.HTMLSelect
 * @constructor
 * @extends js.ui.Widget 
 * 
 * @struct js.ui.HTMLSelect$Config {
 * 		"description":""
 * 		,"type":"object"
 * 		,"properties":{
 * 			,"multiple":{"type":"boolean"}
 * 			,"size":{"type":"string"} * 			  				
 * 		}
 *      ,"extends":"js.ui.Widget$Config"
 * }
 * @param {js.ui.HTMLSelect$Config} config
 */
js.ui.HTMLSelect = function(config){ 
	config = config||{};
	config['widgetClass'] = 'js.ui.HTMLSelect';
	js.ui.HTMLSelect.superclass.constructor.apply(this, [config]);	
};  
js.lang.System.extend(js.ui.HTMLSelect, js.ui.Widget, {
	DOM_ATTRIBUTES: {
		id:1,
		name:1,
		title:1,
		cssName:1,
		cssText:1,
		multiple:1,
		size:1,
		validate:1,
		widgetClass:1
	},
	/**
	 * @method render
	 * @override
	 */
	render: function(){
		this.fireEvent('rendering');
		this._renderHTMLWidget('select');		
		this.addOption(this.get('options'));
		this.fireEvent('rendered');		
	},
	/**
	 * @method getSelectedValue
	 * @return {String}
	 */
	getSelectedValue: function(){
		var el = this.getEl();
		if(!el) return null;
		
		var sIndex = el.selectedIndex;
		if(sIndex < 0) return null;
		
		if(!this.get('multiple')) return [el.options[sIndex].value];
		
		var v = [], options = el.options;
		for(var i=0, len=options.length;i<len;i++){
			var opt = options[i];
			if(opt.selected) v.push(opt.value);
		}
		return v;
	},
	_addOption: function(el, optionGroup, optData){
		if (optionGroup) {
			var option = new Option(); 
			option.value = optData['value']; 
			option.innerHTML = optData['text']; 
			optionGroup.appendChild(option);
		}else{
			el.options.add(new Option(optData['text'], optData['value'])); 
		}
	},
	_addOptionGroup: function(el, group, label){
		var optionGroup = null;
		if(label){
			optionGroup = document.createElement('optgroup'); 
			optionGroup.label = label; 
			el.appendChild(optionGroup);	
		};
		
		for (var i = 0, len = group.length; i < len; i++) {
			this._addOption(el, optionGroup, group[i]);
		}
	},
	/**
	 * @method addOption
	 * 
	 * @struct js.ui.HTMLSelect$Option {
	 * 		"description":""
	 * 		,"type":"object"
	 * 		,"properties":{
	 * 			"label":{"type":"string"}
	 * 			,"group":{
	 * 				"type":"array"
	 * 				,"items":[{
	 * 					"type":"object"
	 * 					,"properties":{
	 * 						"text":{"type":"string"}
	 * 						,"value":{"type":"string"}
	 * 					}
	 * 				}]
	 * 			} 				
	 * 		}
	 * }
	 * @param {js.ui.HTMLSelect$Option|js.ui.HTMLSelect$Option[]} opts
	 */
	addOption: function(opts){
		if(!opts) return;
		var el = this.getEl();
		if(!el) return;
		
		if(js.lang.System.isArray(opts)) {
			for(var i=0, len=opts.length;i<len;i++){
				var opt = opts[i];
				this._addOptionGroup(el, opt['group'], opt['label']);
			}
		}else{
			this._addOptionGroup(el, opts['group'], opts['label']);
		}		
	},
	/**
	 * @method removeAt
	 * @param {Int} i
	 */
	removeAt: function(i){
		var el = this.getEl();
		if(!el) return false;
		
		var options = el.options;
		if(i<0 || i>options.length) return false;
		
		if(js.core.Env.ie){
			options.remove(i);
		}else {
			options[i] = null;
		}
		return true; 
	},
	/**
	 * @method removeBy
	 * @param {String} value
	 */
	removeBy: function(value){
		var el = this.getEl();
		if(!el) return false;
		
		if(js.lang.System.isUndefined(value)) return false;
		
		var options = el.options;
		for(var i=0, len=options.length;i<len;i++){
			if(options[i].value==value) {
				if(js.core.Env.ie){
					options.remove(i);
				}else {
					options[i] = null;
				}
				return true;
			}
		}
		return false;
	}
});

/**
 * @class js.ui.HTMLFile
 * @constructor
 * @extends js.ui.Widget 
 * 
 * @param {js.ui.Widget$Config} config
 */
js.ui.HTMLFile = function(config){ 
	config = config||{};
	config['widgetClass'] = 'js.ui.HTMLFile';
	js.ui.HTMLFile.superclass.constructor.apply(this, [config]);	
}
js.lang.System.extend(js.ui.HTMLFile, js.ui.Widget, {
	STYLE_ATTRIBUTES: {
		display:1
	},
	/**
	 * @method render
	 * @override
	 */
	render: function(){
		this.fireEvent('rendering');		
		this.set('type','file');
		this._renderHTMLWidget('input');
		this.fireEvent('rendered');		
	}	
});

/**
 * @class js.ui.HTMLTextarea
 * @constructor
 * @extends js.ui.Widget 
 * 
 * @param {js.ui.Widget$Config} config
 */
js.ui.HTMLTextarea = function(config){
	config = config||{};
	config['widgetClass'] = 'js.ui.HTMLTextarea';
	js.ui.HTMLTextarea.superclass.constructor.apply(this, [config]);		
};  
js.lang.System.extend(js.ui.HTMLTextarea, js.ui.Widget, {
	/**
	 * @method render
	 * @override
	 */
	render: function(){
		this.fireEvent('rendering');		
		this._renderHTMLWidget('textarea');
		this.fireEvent('rendered');		
	}
});

/**
 * @class js.ui.HTMLForm
 * @constructor
 * @extends js.ui.Widget 
 * 
 * @struct js.ui.HTMLForm$Config {
 * 		"description":""
 * 		,"type":"object"
 * 		,"properties":{
 * 			"method":{"type":"string"}
 * 			,"action":{"type":"string"}
 * 			,"target":{"type":"string"}
 * 			,"enctype":{"type":"string"}		
 * 		}
 *      "extends":"js.ui.Widget$Config"
 * }
 * @param {js.ui.HTMLForm$Config} config
 */
js.ui.HTMLForm = function(config){
	config = config||{};
	config['widgetClass'] = 'js.ui.HTMLForm';	
	js.ui.HTMLForm.superclass.constructor.apply(this, [config]);	
}
/**
 * @constant {String} NORMAL_TYPE
 */
js.ui.HTMLForm.NORMAL_TYPE = 'application/x-www-form-urlencoded';
/**
 * @constant {String} UPLOAD_TYPE
 */
js.ui.HTMLForm.UPLOAD_TYPE = 'multipart/form-data';
/**
 * @constant {String} GET_METHOD
 */
js.ui.HTMLForm.GET_METHOD = 'get';
/**
 * @constant {String} POST_METHOD
 */
js.ui.HTMLForm.POST_METHOD = 'post';

js.lang.System.extend(js.ui.HTMLForm, js.ui.Widget, {
	DOM_ATTRIBUTES: {
		id:1,
		name:1,
		title:1,
		type:1,
		cssName:1,
		cssText:1,
		method:1,
		action:1,
		target:1,
		enctype:1,
		widgetClass:1
	},
	/**
	 * @method render
	 * @override
	 */
	render: function(){
		this.fireEvent('rendering');
		
		if(!this.get().hasOwnProperty('method')) this.set('method',js.ui.HTMLForm.GET_METHOD);	
		if(!this.get().hasOwnProperty('enctype')) this.set('enctype',js.ui.HTMLForm.NORMAL_TYPE);	
		this._renderHTMLWidget('form');
		
		this.fireEvent('rendered');		
	},
	/**
	 * @method submit
	 */
	submit: function(){
		var el = this.getEl();
		if(el) el.submit();
	}
});

/**
 * @class js.ui.HTMLRadioGroup
 * @constructor
 * @extends js.ui.Widget 
 * @param {js.ui.Widget$Config} config
 */
js.ui.HTMLRadioGroup = function(){ 	
	config = config||{};
	config['widgetClass'] = 'js.ui.HTMLRadioGroup';
	js.ui.HTMLRadioGroup.superclass.constructor.apply(this, [config]);
};  
js.lang.System.extend(js.ui.HTMLRadioGroup, js.ui.Widget, {
	/**
	 * @method addChildWidget
	 * @override
	 * @param {js.ui.HTMLRadio|js.ui.HTMLRadio[]} wgts
	 */
	addChildWidget: function(wgts){
		var arr = js.lang.System.isArray(wgts)?wgts:[wgts], name = this.get('name');
		arr.forEach(function(a){
			a.set('name', name);
		});
		
		this.addChildWidget(wgts, 'js.ui.HTMLRadio');	
	},
	/**
	 * @method render
	 * @override
	 */
	render: function(){
		this.fireEvent('rendering');
		
		var chidren = this.getChildWidget();
		for(k in chidren){
			chidren[k].render();
		}
		this.fireEvent('rendered');		
	},
	/**
	 * @method select
	 * @param {String} id
	 */
	select:function(id){
		var wgt = this.getChildWidget(id);
		if(!wgt) return;		
		wgt.select();
	},
	/**
	 * @method unselect
	 * @param {String} id:optional
	 */
	unselect:function(id){
		if(id){
			var wgt = this.getChildWidget(id);
			if(!wgt) return;		
			wgt.unselect();
		}else{
			var wgts = this.getChildWidget();
			if(!wgts) return;		
			for(k in wgts){
				wgts[k].unselect();
			}	
		}
	},
	/**
	 * @method isSelected
	 * @param {String} id:optional
	 * @return {Boolean}
	 */
	isSelected:function(id){
		if(id){
			var wgt = this.getChildWidget(id);
			return wgt && wgt.isSelected();
		}else{
			var chidren = this.getChildWidget();
			if(!chidren) return false;
			
			for(k in chidren){
				if (chidren[k].isSelected()) {
					return true;
				}
			}		
			return false;
		}
	},
	/**
	 * @method getSelectedValue
	 * @return {String}
	 */
	getSelectedValue:function(){
		var chidren = this.getChildWidget();
		for(k in chidren){
			var v = chidren[k].getSelectedValue();
			if(v!=null) return v;
		}		
		return null;
	}
});

/**
 * @class js.ui.HTMLCheckboxGroup
 * @constructor
 * @extends js.ui.Widget 
 * @param {js.ui.Widget$Config} config
 */
js.ui.HTMLCheckboxGroup = function(){ 	
	config = config||{};
	config['widgetClass'] = 'js.ui.HTMLCheckboxGroup';
	js.ui.HTMLCheckboxGroup.superclass.constructor.apply(this, [config]);
};  
js.lang.System.extend(js.ui.HTMLCheckboxGroup, js.ui.Widget, {
	/**
	 * @method addChildWidget
	 * @override
	 * @param {js.ui.HTMLCheckbox|js.ui.HTMLCheckbox[]} wgts
	 */
	addChildWidget: function(wgts){
		var arr = js.lang.System.isArray(wgts)?wgts:[wgts], name = this.get('name');
		arr.forEach(function(a){
			a.set('name', name);
		});
		
		this.addChildWidget(wgts, 'js.ui.HTMLCheckbox');	
	},
	/**
	 * @method render
	 * @override
	 */
	render: function(){
		this.fireEvent('rendering');
		
		var chidren = this.getChildWidget();
		for(k in chidren){
			chidren[k].render();
		}
		this.fireEvent('rendered');		
	},
	/**
	 * @method select
	 * @param {String} id:optional
	 */
	select:function(id){
		if(id){
			var wgt = this.getChildWidget(id);
			if(!wgt) return;		
			wgt.select();
		}else{
			var wgts = this.getChildWidget();
			if(!wgts) return;		
			for(k in wgts){
				wgts[k].unselect();
			}
		}		
	},
	/**
	 * @method unselect
	 * @param {String} id:optional
	 */
	unselect:function(id){
		if(id){
			var wgt = this.getChildWidget(id);
			if(!wgt) return;		
			wgt.unselect();
		}else{
			var wgts = this.getChildWidget();
			if(!wgts) return;		
			for(k in wgts){
				wgts[k].unselect();
			}	
		}
	},
	/**
	 * @method isSelected
	 * @param {String} id:optional
	 * @return {Boolean}
	 */
	isSelected:function(id){
		if(id){
			var wgt = this.getChildWidget(id);
			return wgt && wgt.isSelected();
		}else{
			var chidren = this.getChildWidget();
			if(!chidren) return false;
			
			for(k in chidren){
				if (chidren[k].isSelected()) {
					return true;
				}
			}		
			return false;
		}		
	},
	/**
	 * @method getSelectedValue
	 * @return {Array<String>}
	 */
	getSelectedValue:function(){
		var chidren = this.getChildWidget(), v = null;
		if(!chidren) return v;
		
		for(k in chidren){
			var ch = chidren[k];
			if (ch.isSelected()) {
				if (!v) v = [];
				v.push(ch.getValue());
			}
		}		
		return v;
	}
});
