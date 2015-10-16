/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.1
 * @author feng.chun
 * @date 2011-7-28
 * 
 * @browsers FF 4+;Chrome 8+
 */
js.lang.System.namespace("js.html5");(function(){var a=function(b){this.type=b;this._storage=window[b+"Storage"];if(!this._storage){throw new Error("[js.html5."+b+"Storage"+"]The browser not support HTML5's WebStorage");}this.createEvent("changed");this.createEvent("removed");this.createEvent("cleared");};a.prototype={get:function(b){return this._storage.getItem(b);},set:function(d,c){var b=this.get(d);this._storage.setItem(d,c);this.fireEvent("changed",d,b,c);},remove:function(c){var b=this.get(c);this._storage.removeItem(c);this.fireEvent("removed",c,b);},clear:function(){this._storage.clear();this.fireEvent("cleared");},getLength:function(){return this._storage.length;}};js.lang.System.augment(a,js.core.EventProvider);js.html5.SessionStorage=new a("session");js.html5.LocalStorage=new a("local");}());