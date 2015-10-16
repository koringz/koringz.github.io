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
 * @requires /library/blackbirdjs-1.0/blackbird.js
 * @requires /library/blackbirdjs-1.0/blackbird.css
 */
js.lang.Loader.loadLib({css:"/library/blackbirdjs-1.0/blackbird-min.css",js:"/library/blackbirdjs-1.0/blackbird-min.js"},function(){js.util.Logger={_isV:false,toggle:function(){if(this._isV){this._isV=false;}else{this._isV=true;}log.toggle();},hide:function(){if(this._isV){this.toggle();}this._isV=false;},show:function(){if(!this._isV){this.toggle();}this._isV=true;},resize:log["resize"],clear:log["clear"],move:log["move"],debug:log["debug"],warn:log["warn"],info:log["info"],error:log["error"],profile:log["profile"]};});