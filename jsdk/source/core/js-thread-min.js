/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.3
 * @author feng.chun
 * @date 2011-04-08
 * @date 2011-04-14
 * 
 * @version 0.2
 * @author feng.chun
 * @date 2011-03-23
 * 
 * @version 0.1
 * @author feng.chun
 * @date 2007-10-24
 * 
 * @requires /core/js-core.js
 */
js.lang.System.namespace("js.lang");(function(){js.lang.ThreadStatus={UNSTART:-1,RUNNING:0,WAITING:1,SUSPENDED:2,STOPPED:3};var a=js.lang.System,b=js.lang.ThreadStatus;js.lang.Thread=function(c,d){if(!c){c=[];}if(!d){d={};}this._targets=a.isArray(c)?c:[c];this._interval=d["interval"]||0;this._wait=null;this._status=b.UNSTART;this._timer=null;this._scope=d["scope"];var e=d["fpsCount"];this._max_count=(typeof e==="number"&&isFinite(e)&&e>0)?e:30;this._skip=false;this.setMaxFPS(d["fpsMax"]);};js.lang.Thread.prototype={setFPSCallback:function(c){if(c){this._fnFPS=c["fn"];this._ctxFPS=c["scope"]||this;}else{this._fnFPS=null;this._ctxFPS=null;}},_clear:function(){if(this._timer){window.clearTimeout(this._timer);}this._timer=null;this._wait=null;},_run:function(){if(this._targets&&this._status==b.RUNNING){for(var d=0,c=this._targets.length;d<c;d++){var f=this._targets[d];if(f&&a.isFunction(f["run"])){this._watchFPS(f,this._fnFPS,this._ctxFPS);}}}if(this._timer){window.clearTimeout(this._timer);}if(this._status==b.RUNNING||this._status==b.WAITING){var e=this;this._timer=window.setTimeout(function(){e._run();e._wait=null;},this._wait||this._interval);}},_ready:function(){this._time=0,this._frameCount=0,this._fps=0;this._time=new Date().getTime();},_watchFPS:function(i,j,f){if(this._max_fps){var e=new Date().getTime();}if(!this._skip){i.run.call(this._scope||i);}if(this._max_fps){var h=new Date().getTime(),c=h-e,g=1000/this._max_fps;if(c<g){this._skip=false;this.wait(Math.ceil(g-c));}else{this._skip=true;}}if(j){this._frameCount++;}if(j&&this._frameCount%this._max_count==0){var d=new Date().getTime();this._fps=Math.round(100000*this._frameCount/(d-this._time))/100;this._frameCount=0;this._time=d;j.call(f,this._fps,this._max_fps);}},setMaxFPS:function(c){this._max_fps=Number(c)||null;},getMaxFPS:function(){return this._max_fps;},getFPS:function(){return this._fps;},setInterval:function(c){this._interval=c||0;},getInterval:function(){return this._interval;},getStatus:function(){return this._status;},getTargets:function(){return this._targets;},start:function(){if(this.isWorking()){return;}this._status=b.RUNNING;this._clear();this._ready();this._run();},isWorking:function(){return this._status>b.UNSTART&&this._status<b.STOPPED;},suspend:function(){if(!this.isWorking()){return;}this._status=b.SUSPENDED;},resume:function(){if(!this.isWorking()){return;}this._status=b.RUNNING;this._clear();this._ready();this._run();},stop:function(){this._status=b.STOPPED;this._clear();},wait:function(c){if(this.isWorking()){this._wait=c;}}};})();