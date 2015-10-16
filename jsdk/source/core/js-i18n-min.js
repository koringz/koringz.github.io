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
js.lang.System.namespace("js.i18n");js.i18n.Language={CHINESE:"zh",ENGLISH:"en",FRENCH:"fr",GERMAN:"de",ITALIAN:"it"};js.i18n.Resource=function(a,b){this._txt=a;this._lang=b||js.core.Env.language;};js.i18n.Resource.prototype={setLang:function(a){this._lang=a;},getLang:function(){return this._lang;},get:function(c,d){var a=this._txt[c];if(!a){return"";}if(js.lang.System.isString(a)){return a;}var b=a[d||this._lang];return b?b:"";}};