/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.3
 * @author feng.chun
 * @date 2012-03-08
 * 
 * @version 0.2
 * @author feng.chun
 * @date 2010-11-17
 * 
 * @version 0.1
 * @author feng.chun
 * @date 2010-8-15
 * 
 * @requires /core/js-core.js
 * @requires /core/js-reflect.js
 */
js.lang.System.namespace("js.aop");js.aop.ClassProxy=function(){return{addAdvices:function(b,i,j){var f=null;try{f=b instanceof js.reflect.Class?b:js.reflect.Class.forName(b);}catch(c){throw c;}var d=f.getClass(),a=f.getConstructor(),g=d.prototype[i];if(!a["_aop"]){a["_aop"]={};}var h=a["_aop"];if(!h[i]){h[i]=g;}d.prototype[i]=function(){return function(){var l=Array.prototype.slice.call(arguments,0),o=null,p=null,k=null,m=null;if(j["before"]){p=j["before"].apply(this,["before",i,l]);}try{o=g.apply(this,p||arguments);}catch(n){if(j["error"]){m=j["error"].apply(this,["error",i,n]);if(m){throw m;}}}if(j["after"]){k=j["after"].apply(this,["after",i,o]);}return k||o;};}();},reset:function(d,c){var i=null;try{i=d instanceof js.reflect.Class?d:js.reflect.Class.forName(d);}catch(h){throw h;}var a=i.getClass(),b=i.getConstructor(),g=b["_aop"],f=g?g[c]:null;if(f){a.prototype[c]=f;}}};}();js.aop.InstanceProxy=function(){return{addAdvices:function(d,a,e){if(!d||!a||!e){throw new TypeError("[js.aop.InstanceProxy#addAdvices]Some arguments invalid.");}var b=d[a];if(typeof b!="function"){throw new TypeError("[js.aop.InstanceProxy#addAdvices]The Method<"+a+"> not found.");}if(!d.constructor["_aop"]){d.constructor["_aop"]={};}var c=d.constructor["_aop"];if(!c[a]){c[a]=b;}d[a]=function(){var i=null,j=null,f=null,g=null;if(e["before"]){j=e["before"].apply(d,["before",a,Array.prototype.slice.call(arguments,0)]);}try{i=b.apply(d,j||arguments);}catch(h){if(e["error"]){g=e["error"].apply(d,["error",a,h]);if(g){throw g;}}}if(e["after"]){f=e["after"].apply(d,["after",a,i]);}return f||i;};},reset:function(d,a){if(!d||!a){throw new TypeError("[js.aop.InstanceProxy#reset]Some arguments invalid.");}var b=d[a];if(typeof b!="function"){throw new TypeError("[js.aop.InstanceProxy#reset]The Method<"+a+"> not found.");}var c=d.constructor["_aop"];b=c?c[a]:null;if(b){d[a]=b;}}};}();