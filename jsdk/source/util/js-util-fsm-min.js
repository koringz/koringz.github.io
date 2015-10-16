/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.1
 * @author feng.chun
 * @date 2011-05-09
 * 
 * @requires /core/js-core.js
 */
js.util.FSM=function(a,b){this._initState=a;this._currentState=a;this._trans_table=b;};js.util.FSM.prototype={reset:function(){this._currentState=this._initState;},getState:function(){return this._currentState;},_errorMsg:function(a,b){return"[js.util.FSM#handle]Not found the "+a+"<"+b+"> when transit.";},fire:function(c,b){var d=this._trans_table[this._currentState];if(!d){throw new Error(this._errorMsg("from-state",this._currentState));}var a=d[c];if(!a){throw new Error(this._errorMsg("event",c));}var e=a.call(b,this._currentState,c);if(!e){throw new Error(this._errorMsg("to-state of the event",c));}this._currentState=e;}};