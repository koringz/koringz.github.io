/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.1
 * @author feng.chun
 * @date 2011-9-28
 * 
 * @browsers FF 4+;Chrome 8+
 */
js.lang.System.namespace("js.html5");js.html5.Worker=function(a){if(!window.Worker){throw new Error("[js.html5.Worker]The browser not support HTML5's Worker");}if(a.endsWith(".js")){this._target=a;}else{var b=new BlobBuilder();b.append(a.toString());this._target=window.URL.createObjectURL(b.getBlob());}this._worker=new Worker(this._target);this._started=false;};js.html5.Worker.onSelf=function(a,b){self.addEventListener(a,b,false);};js.html5.Worker.closeSelf=function(){self.close();};js.html5.Worker.postSelf=function(a){self.postMessage(a);};js.html5.Worker.prototype={start:function(a){this._worker.postMessage(a);this._started=true;},on:function(a,b){if(a!="message"||a!="error"){return;}this._worker.addEventListener(a,b,false);},stop:function(){this._worker.terminate();this._started=false;}};