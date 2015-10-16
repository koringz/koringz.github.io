/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.1
 * @author feng.chun
 * @date 2007-8-30
 * 
 * @requires /core/js-core.js
 */

/**
 * @class js.util.Validator
 * @static
 * @final
 */
js.util.Validator = function(){
	
	return {
		REGS: {
			FULL_NUMBER :  /^\d+$/,
			ENGLISH : /^[A-Za-z]+$/,
			ENGLISH_NUMBER: /^[A-Za-z\d]+$/,
			EMAIL :/^\w+(((-|&)\w*)|(\.\w+))*\@[A-Za-z0-9]+((\-)[A-Za-z0-9]*|(\.)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
			EMAIL_DOMAIN:/^@[A-Za-z0-9]+((\-)[A-Za-z0-9]*|(\.)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
			DATE :/^(\d{1,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})$/,
			DATE_TIME :/^(\d{1,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})\s(\d{1,2}):(\d{1,2}):(\d{1,2})$/,
			TIME :/^(\d{1,2}):(\d{1,2}):(\d{1,2})$/,
			HALF_ANGLE: /^[\u0000-\u00FF]+$/,
			ENTIRE_ANGLE_NOCHINESE: /^[\uFF00-\uFFFF]+$/,
			ENTIRE_ANGLE : /^[\u0391-\uFFE5]+$/,
			IP : /^(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5])$/	
		},
		/**
		 * @method isNotEmpty
		 * @param {String} str
		 * @return {Boolean}
		 */
		isNotEmpty :function (str){
			if(!str || !str instanceof String) return false;
			return str.length > 0;
		},
		/**
		 * @method isEmpty
		 * @param {String} str
		 * @return {Boolean}
		 */
		isEmpty : function (str){
			return !this.isNotEmpty(str);
		},
		/**
		 * @method isNull
		 * @param {String} str
		 * @return {Boolean}
		 */
		isNull: function(str){
			return js.lang.System.isNull(str) || js.lang.System.isUndefined(str);
		},
		/**
		 * @method validateWith
		 * @param {String} str
		 * @param {String} reg
		 * @param {Boolean} emptyOK:optional True is return true when str is empty. default is false.
		 */
		validateWith: function (str, reg, emptyOK){
			if(this.isNull(str.trim())) return emptyOK?true:false;
			str = str.trim();					
			if(this.isEmpty(str)) return emptyOK?true:false;
			return (str && (new RegExp (reg)).test(str));
		},
		/**
		 * @method isDate
		 * @param {String} str format：'yyyy-mm-dd' or 'yyyy/mm/dd'
		 * @param {Boolean} emptyOK:optional True is return true when str is empty. default is false.
		 * @return {Boolean}
		 */
		isDate : function (str, emptyOK){
			return  this.validateWith(str, this.REGS.DATE, emptyOK);			
		},
		/**
		 * @method isDateTime
		 * @param {String} str format：'yyyy-mm-dd hh:mm:ss' or 'yyyy/mm/dd hh:mm:ss'
		 * @param {Boolean} emptyOK:optional True is return true when str is empty. default is false.
		 * @return {Boolean}
		 */
		isDateTime : function (str, emptyOK){
			return  this.validateWith(str, this.REGS.DATE_TIME, emptyOK);			
		},
		/**
		 * @method isTime
		 * @param {String} str format：'hh:mm:ss' 
		 * @param {Boolean} emptyOK:optional True is return true when str is empty. default is false.
		 * @return {Boolean}
		 */
		isTime : function (str, emptyOK){
			return  this.validateWith(str, this.REGS.TIME, emptyOK);			
		},
		/**
		 * @method isIP
		 * @param {String} str format：'255.255.255.255' 
		 * @param {Boolean} emptyOK:optional True is return true when str is empty. default is false.
		 * @return {Boolean}
		 */
		isIP: function(str, emptyOK){
			return  this.validateWith(str, this.REGS.IP, emptyOK);
		},
		/**
		 * @method isEmail
		 * @param {String} str format：'xxx@yyy.zzz' 
		 * @param {Boolean} emptyOK:optional True is return true when str is empty. default is false.
		 * @return {Boolean}
		 */
		isEmail : function (str, emptyOK){
			return  this.validateWith(str, this.REGS.EMAIL, emptyOK);						
		},
		/**
		 * @method isEmailDomain
		 * @param {String} str format：'@yyy.zzz' 
		 * @param {Boolean} emptyOK:optional True is return true when str is empty. default is false.
		 * @return {Boolean}
		 */
		isEmailDomain : function (str, emptyOK){
			return  this.validateWith(str, this.REGS.EMAIL_DOMAIN, emptyOK);	
		},
		/**
		 * @method isFullNumber
		 * @param {String} str format：'123456' 
		 * @param {Boolean} emptyOK:optional True is return true when str is empty. default is false.
		 * @return {Boolean}
		 */
		isFullNumber : function (str, emptyOK) {
			return  this.validateWith(str, this.REGS.FULL_NUMBER, emptyOK);				
		},
		_isNumber : function (method, str, emptyOK) {
			if(this.isNull(str.trim())) return emptyOK?true:false;
			str = str.trim();					
			if(this.isEmpty(str)) return emptyOK?true:false;
			return Number[method](str);				
		},
		/**
		 * @method isNumber
		 * @param {String} str format：'-21.33','+6,700.','0.0' 
		 * @param {Boolean} emptyOK:optional True is return true when str is empty. default is false.
		 * @return {Boolean}
		 */
		isNumber : function (str, emptyOK) {
			return this._isNumber('isNumber', str, emptyOK);				
		},
		/**
		 * @method isFloat
		 * @param {String} str 
		 * @param {Boolean} emptyOK:optional True is return true when str is empty. default is false.
		 * @return {Boolean}
		 */
		isFloat : function (str, emptyOK) {
			return this._isNumber('isFloat', str, emptyOK);				
		},
		/**
		 * @method isInt
		 * @param {String} str 
		 * @param {Boolean} emptyOK return value when str is empty. default is false.
		 * @return {Boolean}
		 */
		isInt : function (str, emptyOK) {
			return this._isNumber('isInt', str, emptyOK);				
		},
		/**
		 * @method isNegative
		 * @param {String} str 
		 * @param {Boolean} emptyOK:optional True is return true when str is empty. default is false.
		 * @return {Boolean}
		 */
		isNegative : function (str, emptyOK) {
			return this._isNumber('isNegative', str, emptyOK);				
		},
		/**
		 * @method isPositive
		 * @param {String} str 
		 * @param {Boolean} emptyOK:optional True is return true when str is empty. default is false.
		 * @return {Boolean}
		 */
		isPositive : function (str, emptyOK) {
			return this._isNumber('isPositive', str, emptyOK);				
		},
		/**
		 * @method isNumberFormat
		 * @param {String} str
		 * @param {String} format 格式："{整数位长度}.{小数位长度}"。例如：".2","5.3"
		 * @param {Boolean} emptyOK:optional True is return true when str is empty. default is false.
		 * @return {Boolean} 
		 */
		isNumberFormat: function(str, format, emptyOK){
			if(this.isNull(str.trim())) return emptyOK?true:false;
			str = str.trim();					
			if(this.isEmpty(str)) return emptyOK?true:false;
			
			if(!format || !this.isNumber(str)) return false;
			var f = format.split('.'), n = Number.toNumber(str), iLength = n.intLength(), dLength = n.decLength();
			
			//检查整数位
			if(iLength >0 && f[0]){
				if(iLength > parseInt(f[0])) return false;
			}
			//检查小数位
			if(dLength >0 && f[1]){
				if(dLength > parseInt(f[1])) return false;
			}
			return true;
		},
		/**
		 * @method isTextLength
		 * @param {String} str
		 * @param {String} format 最小长度,最大长度的闭区间表达式。例如："[2,5]","[0,10]"
		 * @param {Boolean} emptyOK:optional True is return true when str is empty. default is false.
		 * @return {Boolean}
		 */
		isTextLength:function(str, format, emptyOK){
			if(this.isNull(str.trim())) return emptyOK?true:false;
			if(!format || !/^[(\d,\d]$)/.test(format)) return false;
			
			var len = str.length, f = format.match(/\d+/g);
			if(len < f[0]) return false;
			if(f.length > 1){
				if(f[1] < f[0]) return false;
				if(len > f[1]) return false;
			}
			return true;
		},		
		/**
		 * @method isSBC
		 * @param {String} str  
		 * @param {Boolean} emptyOK:optional True is return true when str is empty. default is false.
		 * @return {Boolean}
		 */
		isSBC : function (str, emptyOK) {
			return  this.validateWith(str, this.REGS.HALF_ANGLE, emptyOK);				
		},
		/**
		 * @method isDBC
		 * @param {String} str  
		 * @param {Boolean} emptyOK:optional True is return true when str is empty. default is false.
		 * @return {Boolean}
		 */
		isDBC : function (str, emptyOK) {
			return  this.validateWith(str, this.REGS.ENTIRE_ANGLE, emptyOK);				
		},
		/**
		 * @method isDBCWithoutChinese
		 * @param {String} str  
		 * @param {Boolean} emptyOK:optional True is return true when str is empty. default is false.
		 * @return {Boolean}
		 */
		isDBCWithoutChinese : function (str, emptyOK) {
			return  this.validateWith(str, this.REGS.ENTIRE_ANGLE_NOCHINESE, emptyOK);				
		},
		/**
		 * @method isEnglish
		 * @param {String} str  
		 * @param {Boolean} emptyOK:optional True is return true when str is empty. default is false.
		 * @return {Boolean}
		 */
		isEngish : function (str, emptyOK) {
			return  this.validateWith(str, this.REGS.ENGLISH, emptyOK);				
		},
		/**
		 * @method isEnglishOrNumber
		 * @param {String} str  
		 * @param {Boolean} emptyOK:optional True is return true when str is empty. default is false.
		 * @return {Boolean}
		 */
		isEngishOrNumber : function (str, emptyOK) {
			return  this.validateWith(str, this.REGS.ENGLISH_NUMBER, emptyOK);				
		}
	}
}();
/**
 * @class js.util.HTMLCheckor
 * @static
 * @final
 */
js.util.HTMLCheckor = function(){
	
	/**
	 * 取得各类HTML标签控件的值。
	 * 1）支持的HTML标签控件:<text>,<hidden>,<radio>,<checkbox>,<select>,<textarea>,<password>,<file>
	 * 2）当type=radio|checkbox，对象必须有name属性
	 * 
	 * param {HTMLElement} oElement  对象
	 * return (String|Array) 如为单选控件，返回String；如为多选控件，返回Array[]；
	 */
	var _getInputValue = function(oElement){
		var tagName = oElement.tagName?oElement.tagName.toLowerCase():null; 
		if(!tagName) return null;
		
		var v = '';		
		switch(tagName){
			case 'input':if(oElement.type=='radio'){
					oElement = document.getElementsByName(oElement.name);
					for (var i=0;i<oElement.length ;i++){
						if(oElement[i].checked) v = oElement[i].value;
					}
				}else if(oElement.type=='checkbox'){
					oElement = document.getElementsByName(oElement.name);
					v = [];
					for (var i=0;i<oElement.length ;i++){
						if(oElement[i].checked) v[v.length] = oElement[i].value;
					}
				}else{v = oElement.value;};break;
			case 'select':if(oElement.type=='select-one'){
					if (oElement.selectedIndex!=-1) v = oElement.options[oElement.selectedIndex].value;
				}else if(oElement.type=='select-multiple'){
					v = [];
					for (var i=0;i<oElement.length ;i++){
						if(oElement[i].selected) v[v.length] = oElement[i].value;
					}
				};break;
			case 'textarea':v = oElement.value;break;
		}
		return v;
	}
	//校验INPUT
	//@param {Object|String} ipt
	//@param {Function} onError
	var _validateInput = function (ipt, onError){
		var oInput = js.core.Dom.$(ipt);
		if(!oInput) return true;
		
		var eps = oInput.getAttribute('validate');
		if(!eps) return true;
				
		var value = _getInputValue(oInput);
		if(!value) return true;
		
		var rules = js.lang.System.parseJSON(eps);
		if(!rules) return true;
		
		if(!js.lang.System.isArray(rules)){
			throw new Error('[js.util.HTMLCheckor]The validate rules invalid format.');
		}
		
		return rules.every(function(rule){
			if(rule && rule.name){
				var is = true, callback = js.util.Validator[rule.name];
				if(callback){
					try{
						is = callback.apply(js.util.Validator, [value].concat(rule.args||[]));
					}catch(e){}
				}
				if(!is){
					try{
						if(onError) onError.call(oInput, rule, oldValue);
					}catch(e){						
					}finally{
						return is;
					}					
				}
			}
		});
	};

	return {
		/**
		 * Setup validate rules for one HTML elements
		 * @method setRule
		 * 
		 * @struct js.util.HTMLCheckor$Rules{
		 * 		"type":"array"
		 * 		,"items":[{
		 * 			"type":"object"
		 * 			,"properties":{
		 * 				"name":{"type":"string"}
		 * 				"args":{"type":"array"}
		 * 			}
		 * 		}]
		 * }
		 * 
		 * @param {String|HTMLElement} input 控件Id或对象
		 * @param {js.util.HTMLCheckor$Rules} rules 
		 */
		setRule: function(input, rules){
			var oInput = js.core.Dom.$(input);
			if(oInput) oInput.setAttribute('validate',rules);
		},
		/**
		 * Check one HTML element
		 * @method checkInput
		 * @param {String|HTMLElement} input
		 * @param {Function} onFailure:optional listening function on checking failure
		 * @return {Boolean} return true if all checkings success
		 * @throws {Error} when the validate rules invalid format
		 */
		checkInput :function(input, onFailure){
			return _validateInput(input, onFailure);
		},
		/**
		 * Check all HTML elements in a form such types：text,hidden,radio,checkbox,select,textarea,password,file
		 * @method checkForm
		 * @param {String|HTMLElement} form 
		 * @param {Function} onFailure:optional listening function on checking failure
		 * @return {Boolean} return true if all checks success
		 * @throws {Error} when the validate rules invalid format
		 */
		checkForm : function (form, onFailure){
			var oForm = js.core.Dom.$(form), els = oForm.elements, rst = true;

			for (var i=0,len=els.length;i<len;i++){
				if(!this.checkInput(els[i], onFailure)) rst = false;
			}			
			return rst;
		}
	}
}();
