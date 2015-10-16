/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.1
 * @author feng.chun
 * @date 2010-8-15
 * 
 * @requires /core/js-core.js
 */
js.lang.System.namespace('js.i18n');

/**
 * @class js.i18n.Language
 * @static
 */
js.i18n.Language = {
	/**
	 * @constant {String} CHINESE
	 */
	CHINESE: 'zh',
	/**
	 * @constant {String} ENGLISH
	 */
	ENGLISH: 'en',
	/**
	 * @constant {String} FRENCH
	 */
	FRENCH: 'fr',
	/**
	 * @constant {String} GERMAN
	 */
	GERMAN: 'de',
	/**
	 * @constant {String} ITALIAN
	 */
	ITALIAN: 'it'	
}

/**
 * @class js.i18n.Resource
 * 
 * @constructor
 * @param {Object} obj
 * @param {String} lang:optional
 */
js.i18n.Resource = function(obj, lang){
	this._txt = obj;
	this._lang = lang||js.core.Env.language;
}
js.i18n.Resource.prototype = {
	/**
	 * Sets the default language.
	 * 
	 * @method setLang
	 * @param {String} lang
	 */
	setLang:function(lang){
		this._lang = lang;
	},
	/**
	 * Returns the current language.
	 * 
	 * @method getLang
	 * @return {String}
	 */
	getLang: function(){return this._lang},
	/**
	 * Returns the value of the key in the language.
	 * 
	 * @method get
	 * @param {String} key
	 * @param {String} lang:optional 
	 * @return {String}
	 */
	get: function(key, lang){
		var k = this._txt[key];
		if(!k) return '';
		if(js.lang.System.isString(k)) return k;
		
		var t = k[lang||this._lang];
	    return t?t:'';
	}
}
