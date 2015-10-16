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

/**
 * Event-driven Finite-State Machine
 * 
 * @class js.util.FSM 
 * @constructor
 * 
 * @struct js.util.FSM$Transtable {
 * 		"type":"object"
 * 		,"properties":{
 * 			"?state_name":{
 * 				"type":"object"
 * 				,"properties":{
 * 					"?event_name":{"type":"function"}
 * 				}
 * 			}
 * 		} 
 * }
 * 
 * @param {String} initState
 * @param {js.util.FSM$Transtable} table 
 */
js.util.FSM = function(initState, table){
	this._initState = initState;
	this._currentState = initState;
	this._trans_table = table;
} 
js.util.FSM.prototype = {
	/**
	 * Reset the current state to the init state.
	 * @method reset
	 */
	reset: function(){
		this._currentState = this._initState;
	},
	/**
	 * Returns the current state.
	 * @method getState
	 * @return {String}
	 */
	getState: function(){
		return this._currentState;
	},
	_errorMsg: function(name, value){
		return '[js.util.FSM#handle]Not found the '+name+'<'+value+'> when transit.';
	},
	/**
	 * Fire when the new event happened. 
	 * 
	 * @method fire
	 * @param {String} event
	 * @param {Object} scope:optional
	 * @throws {Error} not found the state's setting when transit
	 */
	fire: function(event, scope){
		var state = this._trans_table[this._currentState];
		if(!state) throw new Error(this._errorMsg('from-state', this._currentState));
		var fn = state[event];
		if(!fn) throw new Error(this._errorMsg('event', event));
		var to = fn.call(scope, this._currentState, event);
		if(!to) throw new Error(this._errorMsg('to-state of the event', event));
		
		this._currentState = to;	
	}
}
