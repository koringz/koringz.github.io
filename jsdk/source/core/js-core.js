/*!
 * @project JSDK <a target="_blank" href="http://jsdk2.sourceforge.net/website/index.html">JSDK</a>'s full name is JavaScript Development Kit, which is a full OO style JavaScript Framework. 
 * It has a small core file and many extension libraries, support such features: System, DOM, Event, Reflect, AOP, I18n, Thread, JS2D, JSGF, JSUI and Utils. 
 * 
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.6.2
 * @author feng.chun
 * @date 2012-04-28
 * @date 2012-05-02
 * 
 * @version 0.6.1
 * @author feng.chun
 * @date 2012-04-18
 * 
 * @version 0.6
 * @author feng.chun
 * @date 2011-09-28
 * @date 2011-10-11
 * @date 2012-02-27
 * @date 2012-03-08
 * @date 2012-04-15
 *  
 * @version 0.5
 * @author feng.chun
 * @date 2011-09-19
 * @date 2011-09-26
 * @date 2011-09-27
 * 
 * @version 0.4
 * @author feng.chun
 * @date 2011-09-04
 * 
 * @version 0.3
 * @author feng.chun
 * @date 2011-01-05
 * @date 2011-03-22
 * @date 2011-04-26
 * @date 2011-05-18
 * 
 * @version 0.2
 * @author feng.chun
 * @date 2010-11-15
 * 
 * @version 0.1
 * @author feng.chun
 * @date 2007-7-20
 * @date 2010-8-15
 */
/*!
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
yahoo-dom-event.js
*/
if(typeof YAHOO=="undefined"||!YAHOO){var YAHOO={};}YAHOO.namespace=function(){var b=arguments,g=null,e,c,f;for(e=0;e<b.length;e=e+1){f=(""+b[e]).split(".");g=YAHOO;for(c=(f[0]=="YAHOO")?1:0;c<f.length;c=c+1){g[f[c]]=g[f[c]]||{};g=g[f[c]];}}return g;};YAHOO.log=function(d,a,c){var b=YAHOO.widget.Logger;if(b&&b.log){return b.log(d,a,c);}else{return false;}};YAHOO.register=function(a,f,e){var k=YAHOO.env.modules,c,j,h,g,d;if(!k[a]){k[a]={versions:[],builds:[]};}c=k[a];j=e.version;h=e.build;g=YAHOO.env.listeners;c.name=a;c.version=j;c.build=h;c.versions.push(j);c.builds.push(h);c.mainClass=f;for(d=0;d<g.length;d=d+1){g[d](c);}if(f){f.VERSION=j;f.BUILD=h;}else{YAHOO.log("mainClass is undefined for module "+a,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(a){return YAHOO.env.modules[a]||null;};YAHOO.env.parseUA=function(d){var e=function(i){var j=0;return parseFloat(i.replace(/\./g,function(){return(j++==1)?"":".";}));},h=navigator,g={ie:0,opera:0,gecko:0,webkit:0,chrome:0,mobile:null,air:0,ipad:0,iphone:0,ipod:0,ios:null,android:0,webos:0,caja:h&&h.cajaVersion,secure:false,os:null},c=d||(navigator&&navigator.userAgent),f=window&&window.location,b=f&&f.href,a;g.secure=b&&(b.toLowerCase().indexOf("https")===0);if(c){if((/windows|win32/i).test(c)){g.os="windows";}else{if((/macintosh/i).test(c)){g.os="macintosh";}else{if((/rhino/i).test(c)){g.os="rhino";}}}if((/KHTML/).test(c)){g.webkit=1;}a=c.match(/AppleWebKit\/([^\s]*)/);if(a&&a[1]){g.webkit=e(a[1]);if(/ Mobile\//.test(c)){g.mobile="Apple";a=c.match(/OS ([^\s]*)/);if(a&&a[1]){a=e(a[1].replace("_","."));}g.ios=a;g.ipad=g.ipod=g.iphone=0;a=c.match(/iPad|iPod|iPhone/);if(a&&a[0]){g[a[0].toLowerCase()]=g.ios;}}else{a=c.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);if(a){g.mobile=a[0];}if(/webOS/.test(c)){g.mobile="WebOS";a=c.match(/webOS\/([^\s]*);/);if(a&&a[1]){g.webos=e(a[1]);}}if(/ Android/.test(c)){g.mobile="Android";a=c.match(/Android ([^\s]*);/);if(a&&a[1]){g.android=e(a[1]);}}}a=c.match(/Chrome\/([^\s]*)/);if(a&&a[1]){g.chrome=e(a[1]);}else{a=c.match(/AdobeAIR\/([^\s]*)/);if(a){g.air=a[0];}}}if(!g.webkit){a=c.match(/Opera[\s\/]([^\s]*)/);if(a&&a[1]){g.opera=e(a[1]);a=c.match(/Version\/([^\s]*)/);if(a&&a[1]){g.opera=e(a[1]);}a=c.match(/Opera Mini[^;]*/);if(a){g.mobile=a[0];}}else{a=c.match(/MSIE\s([^;]*)/);if(a&&a[1]){g.ie=e(a[1]);}else{a=c.match(/Gecko\/([^\s]*)/);if(a){g.gecko=1;a=c.match(/rv:([^\s\)]*)/);if(a&&a[1]){g.gecko=e(a[1]);}}}}}}return g;};YAHOO.env.ua=YAHOO.env.parseUA();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var b=YAHOO_config.listener,a=YAHOO.env.listeners,d=true,c;if(b){for(c=0;c<a.length;c++){if(a[c]==b){d=false;break;}}if(d){a.push(b);}}}})();YAHOO.lang=YAHOO.lang||{};(function(){var f=YAHOO.lang,a=Object.prototype,c="[object Array]",h="[object Function]",i="[object Object]",b=[],g={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;","`":"&#x60;"},d=["toString","valueOf"],e={isArray:function(j){return a.toString.apply(j)===c;},isBoolean:function(j){return typeof j==="boolean";},isFunction:function(j){return(typeof j==="function")||a.toString.apply(j)===h;},isNull:function(j){return j===null;},isNumber:function(j){return typeof j==="number"&&isFinite(j);},isObject:function(j){return(j&&(typeof j==="object"||f.isFunction(j)))||false;},isString:function(j){return typeof j==="string";},isUndefined:function(j){return typeof j==="undefined";},_IEEnumFix:(YAHOO.env.ua.ie)?function(l,k){var j,n,m;for(j=0;j<d.length;j=j+1){n=d[j];m=k[n];if(f.isFunction(m)&&m!=a[n]){l[n]=m;}}}:function(){},escapeHTML:function(j){return j.replace(/[&<>"'\/`]/g,function(k){return g[k];});},extend:function(m,n,l){if(!n||!m){throw new Error("extend failed, please check that "+"all dependencies are included.");}var k=function(){},j;k.prototype=n.prototype;m.prototype=new k();m.prototype.constructor=m;m.superclass=n.prototype;if(n.prototype.constructor==a.constructor){n.prototype.constructor=n;}if(l){for(j in l){if(f.hasOwnProperty(l,j)){m.prototype[j]=l[j];}}f._IEEnumFix(m.prototype,l);}},augmentObject:function(n,m){if(!m||!n){throw new Error("Absorb failed, verify dependencies.");}var j=arguments,l,o,k=j[2];if(k&&k!==true){for(l=2;l<j.length;l=l+1){n[j[l]]=m[j[l]];}}else{for(o in m){if(k||!(o in n)){n[o]=m[o];}}f._IEEnumFix(n,m);}return n;},augmentProto:function(m,l){if(!l||!m){throw new Error("Augment failed, verify dependencies.");}var j=[m.prototype,l.prototype],k;for(k=2;k<arguments.length;k=k+1){j.push(arguments[k]);}f.augmentObject.apply(this,j);return m;},dump:function(j,p){var l,n,r=[],t="{...}",k="f(){...}",q=", ",m=" => ";if(!f.isObject(j)){return j+"";}else{if(j instanceof Date||("nodeType" in j&&"tagName" in j)){return j;}else{if(f.isFunction(j)){return k;}}}p=(f.isNumber(p))?p:3;if(f.isArray(j)){r.push("[");for(l=0,n=j.length;l<n;l=l+1){if(f.isObject(j[l])){r.push((p>0)?f.dump(j[l],p-1):t);}else{r.push(j[l]);}r.push(q);}if(r.length>1){r.pop();}r.push("]");}else{r.push("{");for(l in j){if(f.hasOwnProperty(j,l)){r.push(l+m);if(f.isObject(j[l])){r.push((p>0)?f.dump(j[l],p-1):t);}else{r.push(j[l]);}r.push(q);}}if(r.length>1){r.pop();}r.push("}");}return r.join("");},substitute:function(x,y,E,l){var D,C,B,G,t,u,F=[],p,z=x.length,A="dump",r=" ",q="{",m="}",n,w;for(;;){D=x.lastIndexOf(q,z);if(D<0){break;}C=x.indexOf(m,D);if(D+1>C){break;}p=x.substring(D+1,C);G=p;u=null;B=G.indexOf(r);if(B>-1){u=G.substring(B+1);G=G.substring(0,B);}t=y[G];if(E){t=E(G,t,u);}if(f.isObject(t)){if(f.isArray(t)){t=f.dump(t,parseInt(u,10));}else{u=u||"";n=u.indexOf(A);if(n>-1){u=u.substring(4);}w=t.toString();if(w===i||n>-1){t=f.dump(t,parseInt(u,10));}else{t=w;}}}else{if(!f.isString(t)&&!f.isNumber(t)){t="~-"+F.length+"-~";F[F.length]=p;}}x=x.substring(0,D)+t+x.substring(C+1);if(l===false){z=D-1;}}for(D=F.length-1;D>=0;D=D-1){x=x.replace(new RegExp("~-"+D+"-~"),"{"+F[D]+"}","g");}return x;},trim:function(j){try{return j.replace(/^\s+|\s+$/g,"");}catch(k){return j;
}},merge:function(){var n={},k=arguments,j=k.length,m;for(m=0;m<j;m=m+1){f.augmentObject(n,k[m],true);}return n;},later:function(t,k,u,n,p){t=t||0;k=k||{};var l=u,s=n,q,j;if(f.isString(u)){l=k[u];}if(!l){throw new TypeError("method undefined");}if(!f.isUndefined(n)&&!f.isArray(s)){s=[n];}q=function(){l.apply(k,s||b);};j=(p)?setInterval(q,t):setTimeout(q,t);return{interval:p,cancel:function(){if(this.interval){clearInterval(j);}else{clearTimeout(j);}}};},isValue:function(j){return(f.isObject(j)||f.isString(j)||f.isNumber(j)||f.isBoolean(j));}};f.hasOwnProperty=(a.hasOwnProperty)?function(j,k){return j&&j.hasOwnProperty&&j.hasOwnProperty(k);}:function(j,k){return !f.isUndefined(j[k])&&j.constructor.prototype[k]!==j[k];};e.augmentObject(f,e,true);YAHOO.util.Lang=f;f.augment=f.augmentProto;YAHOO.augment=f.augmentProto;YAHOO.extend=f.extend;})();YAHOO.register("yahoo",YAHOO,{version:"2.9.0",build:"2800"});(function(){YAHOO.env._id_counter=YAHOO.env._id_counter||0;var e=YAHOO.util,k=YAHOO.lang,L=YAHOO.env.ua,a=YAHOO.lang.trim,B={},F={},m=/^t(?:able|d|h)$/i,w=/color$/i,j=window.document,v=j.documentElement,C="ownerDocument",M="defaultView",U="documentElement",S="compatMode",z="offsetLeft",o="offsetTop",T="offsetParent",x="parentNode",K="nodeType",c="tagName",n="scrollLeft",H="scrollTop",p="getBoundingClientRect",V="getComputedStyle",y="currentStyle",l="CSS1Compat",A="BackCompat",E="class",f="className",i="",b=" ",R="(?:^|\\s)",J="(?= |$)",t="g",O="position",D="fixed",u="relative",I="left",N="top",Q="medium",P="borderLeftWidth",q="borderTopWidth",d=L.opera,h=L.webkit,g=L.gecko,s=L.ie;e.Dom={CUSTOM_ATTRIBUTES:(!v.hasAttribute)?{"for":"htmlFor","class":f}:{"htmlFor":"for","className":E},DOT_ATTRIBUTES:{checked:true},get:function(aa){var ac,X,ab,Z,W,G,Y=null;if(aa){if(typeof aa=="string"||typeof aa=="number"){ac=aa+"";aa=j.getElementById(aa);G=(aa)?aa.attributes:null;if(aa&&G&&G.id&&G.id.value===ac){return aa;}else{if(aa&&j.all){aa=null;X=j.all[ac];if(X&&X.length){for(Z=0,W=X.length;Z<W;++Z){if(X[Z].id===ac){return X[Z];}}}}}}else{if(e.Element&&aa instanceof e.Element){aa=aa.get("element");}else{if(!aa.nodeType&&"length" in aa){ab=[];for(Z=0,W=aa.length;Z<W;++Z){ab[ab.length]=e.Dom.get(aa[Z]);}aa=ab;}}}Y=aa;}return Y;},getComputedStyle:function(G,W){if(window[V]){return G[C][M][V](G,null)[W];}else{if(G[y]){return e.Dom.IE_ComputedStyle.get(G,W);}}},getStyle:function(G,W){return e.Dom.batch(G,e.Dom._getStyle,W);},_getStyle:function(){if(window[V]){return function(G,Y){Y=(Y==="float")?Y="cssFloat":e.Dom._toCamel(Y);var X=G.style[Y],W;if(!X){W=G[C][M][V](G,null);if(W){X=W[Y];}}return X;};}else{if(v[y]){return function(G,Y){var X;switch(Y){case"opacity":X=100;try{X=G.filters["DXImageTransform.Microsoft.Alpha"].opacity;}catch(Z){try{X=G.filters("alpha").opacity;}catch(W){}}return X/100;case"float":Y="styleFloat";default:Y=e.Dom._toCamel(Y);X=G[y]?G[y][Y]:null;return(G.style[Y]||X);}};}}}(),setStyle:function(G,W,X){e.Dom.batch(G,e.Dom._setStyle,{prop:W,val:X});},_setStyle:function(){if(!window.getComputedStyle&&j.documentElement.currentStyle){return function(W,G){var X=e.Dom._toCamel(G.prop),Y=G.val;if(W){switch(X){case"opacity":if(Y===""||Y===null||Y===1){W.style.removeAttribute("filter");}else{if(k.isString(W.style.filter)){W.style.filter="alpha(opacity="+Y*100+")";if(!W[y]||!W[y].hasLayout){W.style.zoom=1;}}}break;case"float":X="styleFloat";default:W.style[X]=Y;}}else{}};}else{return function(W,G){var X=e.Dom._toCamel(G.prop),Y=G.val;if(W){if(X=="float"){X="cssFloat";}W.style[X]=Y;}else{}};}}(),getXY:function(G){return e.Dom.batch(G,e.Dom._getXY);},_canPosition:function(G){return(e.Dom._getStyle(G,"display")!=="none"&&e.Dom._inDoc(G));},_getXY:function(W){var X,G,Z,ab,Y,aa,ac=Math.round,ad=false;if(e.Dom._canPosition(W)){Z=W[p]();ab=W[C];X=e.Dom.getDocumentScrollLeft(ab);G=e.Dom.getDocumentScrollTop(ab);ad=[Z[I],Z[N]];if(Y||aa){ad[0]-=aa;ad[1]-=Y;}if((G||X)){ad[0]+=X;ad[1]+=G;}ad[0]=ac(ad[0]);ad[1]=ac(ad[1]);}else{}return ad;},getX:function(G){var W=function(X){return e.Dom.getXY(X)[0];};return e.Dom.batch(G,W,e.Dom,true);},getY:function(G){var W=function(X){return e.Dom.getXY(X)[1];};return e.Dom.batch(G,W,e.Dom,true);},setXY:function(G,X,W){e.Dom.batch(G,e.Dom._setXY,{pos:X,noRetry:W});},_setXY:function(G,Z){var aa=e.Dom._getStyle(G,O),Y=e.Dom.setStyle,ad=Z.pos,W=Z.noRetry,ab=[parseInt(e.Dom.getComputedStyle(G,I),10),parseInt(e.Dom.getComputedStyle(G,N),10)],ac,X;ac=e.Dom._getXY(G);if(!ad||ac===false){return false;}if(aa=="static"){aa=u;Y(G,O,aa);}if(isNaN(ab[0])){ab[0]=(aa==u)?0:G[z];}if(isNaN(ab[1])){ab[1]=(aa==u)?0:G[o];}if(ad[0]!==null){Y(G,I,ad[0]-ac[0]+ab[0]+"px");}if(ad[1]!==null){Y(G,N,ad[1]-ac[1]+ab[1]+"px");}if(!W){X=e.Dom._getXY(G);if((ad[0]!==null&&X[0]!=ad[0])||(ad[1]!==null&&X[1]!=ad[1])){e.Dom._setXY(G,{pos:ad,noRetry:true});}}},setX:function(W,G){e.Dom.setXY(W,[G,null]);},setY:function(G,W){e.Dom.setXY(G,[null,W]);},getRegion:function(G){var W=function(X){var Y=false;if(e.Dom._canPosition(X)){Y=e.Region.getRegion(X);}else{}return Y;};return e.Dom.batch(G,W,e.Dom,true);},getClientWidth:function(){return e.Dom.getViewportWidth();},getClientHeight:function(){return e.Dom.getViewportHeight();},getElementsByClassName:function(ab,af,ac,ae,X,ad){af=af||"*";ac=(ac)?e.Dom.get(ac):null||j;if(!ac){return[];}var W=[],G=ac.getElementsByTagName(af),Z=e.Dom.hasClass;for(var Y=0,aa=G.length;Y<aa;++Y){if(Z(G[Y],ab)){W[W.length]=G[Y];}}if(ae){e.Dom.batch(W,ae,X,ad);}return W;},hasClass:function(W,G){return e.Dom.batch(W,e.Dom._hasClass,G);},_hasClass:function(X,W){var G=false,Y;if(X&&W){Y=e.Dom._getAttribute(X,f)||i;if(Y){Y=Y.replace(/\s+/g,b);}if(W.exec){G=W.test(Y);}else{G=W&&(b+Y+b).indexOf(b+W+b)>-1;}}else{}return G;},addClass:function(W,G){return e.Dom.batch(W,e.Dom._addClass,G);},_addClass:function(X,W){var G=false,Y;if(X&&W){Y=e.Dom._getAttribute(X,f)||i;if(!e.Dom._hasClass(X,W)){e.Dom.setAttribute(X,f,a(Y+b+W));G=true;}}else{}return G;},removeClass:function(W,G){return e.Dom.batch(W,e.Dom._removeClass,G);},_removeClass:function(Y,X){var W=false,aa,Z,G;if(Y&&X){aa=e.Dom._getAttribute(Y,f)||i;e.Dom.setAttribute(Y,f,aa.replace(e.Dom._getClassRegex(X),i));Z=e.Dom._getAttribute(Y,f);if(aa!==Z){e.Dom.setAttribute(Y,f,a(Z));W=true;if(e.Dom._getAttribute(Y,f)===""){G=(Y.hasAttribute&&Y.hasAttribute(E))?E:f;Y.removeAttribute(G);}}}else{}return W;},replaceClass:function(X,W,G){return e.Dom.batch(X,e.Dom._replaceClass,{from:W,to:G});},_replaceClass:function(Y,X){var W,ab,aa,G=false,Z;if(Y&&X){ab=X.from;aa=X.to;if(!aa){G=false;}else{if(!ab){G=e.Dom._addClass(Y,X.to);}else{if(ab!==aa){Z=e.Dom._getAttribute(Y,f)||i;W=(b+Z.replace(e.Dom._getClassRegex(ab),b+aa).replace(/\s+/g,b)).split(e.Dom._getClassRegex(aa));W.splice(1,0,b+aa);e.Dom.setAttribute(Y,f,a(W.join(i)));G=true;}}}}else{}return G;},generateId:function(G,X){X=X||"yui-gen";var W=function(Y){if(Y&&Y.id){return Y.id;}var Z=X+YAHOO.env._id_counter++;
if(Y){if(Y[C]&&Y[C].getElementById(Z)){return e.Dom.generateId(Y,Z+X);}Y.id=Z;}return Z;};return e.Dom.batch(G,W,e.Dom,true)||W.apply(e.Dom,arguments);},isAncestor:function(W,X){W=e.Dom.get(W);X=e.Dom.get(X);var G=false;if((W&&X)&&(W[K]&&X[K])){if(W.contains&&W!==X){G=W.contains(X);}else{if(W.compareDocumentPosition){G=!!(W.compareDocumentPosition(X)&16);}}}else{}return G;},inDocument:function(G,W){return e.Dom._inDoc(e.Dom.get(G),W);},_inDoc:function(W,X){var G=false;if(W&&W[c]){X=X||W[C];G=e.Dom.isAncestor(X[U],W);}else{}return G;},getElementsBy:function(W,af,ab,ad,X,ac,ae){af=af||"*";ab=(ab)?e.Dom.get(ab):null||j;var aa=(ae)?null:[],G;if(ab){G=ab.getElementsByTagName(af);for(var Y=0,Z=G.length;Y<Z;++Y){if(W(G[Y])){if(ae){aa=G[Y];break;}else{aa[aa.length]=G[Y];}}}if(ad){e.Dom.batch(aa,ad,X,ac);}}return aa;},getElementBy:function(X,G,W){return e.Dom.getElementsBy(X,G,W,null,null,null,true);},batch:function(X,ab,aa,Z){var Y=[],W=(Z)?aa:null;X=(X&&(X[c]||X.item))?X:e.Dom.get(X);if(X&&ab){if(X[c]||X.length===undefined){return ab.call(W,X,aa);}for(var G=0;G<X.length;++G){Y[Y.length]=ab.call(W||X[G],X[G],aa);}}else{return false;}return Y;},getDocumentHeight:function(){var W=(j[S]!=l||h)?j.body.scrollHeight:v.scrollHeight,G=Math.max(W,e.Dom.getViewportHeight());return G;},getDocumentWidth:function(){var W=(j[S]!=l||h)?j.body.scrollWidth:v.scrollWidth,G=Math.max(W,e.Dom.getViewportWidth());return G;},getViewportHeight:function(){var G=self.innerHeight,W=j[S];if((W||s)&&!d){G=(W==l)?v.clientHeight:j.body.clientHeight;}return G;},getViewportWidth:function(){var G=self.innerWidth,W=j[S];if(W||s){G=(W==l)?v.clientWidth:j.body.clientWidth;}return G;},getAncestorBy:function(G,W){while((G=G[x])){if(e.Dom._testElement(G,W)){return G;}}return null;},getAncestorByClassName:function(W,G){W=e.Dom.get(W);if(!W){return null;}var X=function(Y){return e.Dom.hasClass(Y,G);};return e.Dom.getAncestorBy(W,X);},getAncestorByTagName:function(W,G){W=e.Dom.get(W);if(!W){return null;}var X=function(Y){return Y[c]&&Y[c].toUpperCase()==G.toUpperCase();};return e.Dom.getAncestorBy(W,X);},getPreviousSiblingBy:function(G,W){while(G){G=G.previousSibling;if(e.Dom._testElement(G,W)){return G;}}return null;},getPreviousSibling:function(G){G=e.Dom.get(G);if(!G){return null;}return e.Dom.getPreviousSiblingBy(G);},getNextSiblingBy:function(G,W){while(G){G=G.nextSibling;if(e.Dom._testElement(G,W)){return G;}}return null;},getNextSibling:function(G){G=e.Dom.get(G);if(!G){return null;}return e.Dom.getNextSiblingBy(G);},getFirstChildBy:function(G,X){var W=(e.Dom._testElement(G.firstChild,X))?G.firstChild:null;return W||e.Dom.getNextSiblingBy(G.firstChild,X);},getFirstChild:function(G,W){G=e.Dom.get(G);if(!G){return null;}return e.Dom.getFirstChildBy(G);},getLastChildBy:function(G,X){if(!G){return null;}var W=(e.Dom._testElement(G.lastChild,X))?G.lastChild:null;return W||e.Dom.getPreviousSiblingBy(G.lastChild,X);},getLastChild:function(G){G=e.Dom.get(G);return e.Dom.getLastChildBy(G);},getChildrenBy:function(W,Y){var X=e.Dom.getFirstChildBy(W,Y),G=X?[X]:[];e.Dom.getNextSiblingBy(X,function(Z){if(!Y||Y(Z)){G[G.length]=Z;}return false;});return G;},getChildren:function(G){G=e.Dom.get(G);if(!G){}return e.Dom.getChildrenBy(G);},getDocumentScrollLeft:function(G){G=G||j;return Math.max(G[U].scrollLeft,G.body.scrollLeft);},getDocumentScrollTop:function(G){G=G||j;return Math.max(G[U].scrollTop,G.body.scrollTop);},insertBefore:function(W,G){W=e.Dom.get(W);G=e.Dom.get(G);if(!W||!G||!G[x]){return null;}return G[x].insertBefore(W,G);},insertAfter:function(W,G){W=e.Dom.get(W);G=e.Dom.get(G);if(!W||!G||!G[x]){return null;}if(G.nextSibling){return G[x].insertBefore(W,G.nextSibling);}else{return G[x].appendChild(W);}},getClientRegion:function(){var X=e.Dom.getDocumentScrollTop(),W=e.Dom.getDocumentScrollLeft(),Y=e.Dom.getViewportWidth()+W,G=e.Dom.getViewportHeight()+X;return new e.Region(X,Y,G,W);},setAttribute:function(W,G,X){e.Dom.batch(W,e.Dom._setAttribute,{attr:G,val:X});},_setAttribute:function(X,W){var G=e.Dom._toCamel(W.attr),Y=W.val;if(X&&X.setAttribute){if(e.Dom.DOT_ATTRIBUTES[G]&&X.tagName&&X.tagName!="BUTTON"){X[G]=Y;}else{G=e.Dom.CUSTOM_ATTRIBUTES[G]||G;X.setAttribute(G,Y);}}else{}},getAttribute:function(W,G){return e.Dom.batch(W,e.Dom._getAttribute,G);},_getAttribute:function(W,G){var X;G=e.Dom.CUSTOM_ATTRIBUTES[G]||G;if(e.Dom.DOT_ATTRIBUTES[G]){X=W[G];}else{if(W&&"getAttribute" in W){if(/^(?:href|src)$/.test(G)){X=W.getAttribute(G,2);}else{X=W.getAttribute(G);}}else{}}return X;},_toCamel:function(W){var X=B;function G(Y,Z){return Z.toUpperCase();}return X[W]||(X[W]=W.indexOf("-")===-1?W:W.replace(/-([a-z])/gi,G));},_getClassRegex:function(W){var G;if(W!==undefined){if(W.exec){G=W;}else{G=F[W];if(!G){W=W.replace(e.Dom._patterns.CLASS_RE_TOKENS,"\\$1");W=W.replace(/\s+/g,b);G=F[W]=new RegExp(R+W+J,t);}}}return G;},_patterns:{ROOT_TAG:/^body|html$/i,CLASS_RE_TOKENS:/([\.\(\)\^\$\*\+\?\|\[\]\{\}\\])/g},_testElement:function(G,W){return G&&G[K]==1&&(!W||W(G));},_calcBorders:function(X,Y){var W=parseInt(e.Dom[V](X,q),10)||0,G=parseInt(e.Dom[V](X,P),10)||0;if(g){if(m.test(X[c])){W=0;G=0;}}Y[0]+=G;Y[1]+=W;return Y;}};var r=e.Dom[V];if(L.opera){e.Dom[V]=function(W,G){var X=r(W,G);if(w.test(G)){X=e.Dom.Color.toRGB(X);}return X;};}if(L.webkit){e.Dom[V]=function(W,G){var X=r(W,G);if(X==="rgba(0, 0, 0, 0)"){X="transparent";}return X;};}if(L.ie&&L.ie>=8){e.Dom.DOT_ATTRIBUTES.type=true;}})();YAHOO.util.Region=function(d,e,a,c){this.top=d;this.y=d;this[1]=d;this.right=e;this.bottom=a;this.left=c;this.x=c;this[0]=c;this.width=this.right-this.left;this.height=this.bottom-this.top;};YAHOO.util.Region.prototype.contains=function(a){return(a.left>=this.left&&a.right<=this.right&&a.top>=this.top&&a.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(f){var d=Math.max(this.top,f.top),e=Math.min(this.right,f.right),a=Math.min(this.bottom,f.bottom),c=Math.max(this.left,f.left);
if(a>=d&&e>=c){return new YAHOO.util.Region(d,e,a,c);}else{return null;}};YAHOO.util.Region.prototype.union=function(f){var d=Math.min(this.top,f.top),e=Math.max(this.right,f.right),a=Math.max(this.bottom,f.bottom),c=Math.min(this.left,f.left);return new YAHOO.util.Region(d,e,a,c);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+", height: "+this.height+", width: "+this.width+"}");};YAHOO.util.Region.getRegion=function(e){var g=YAHOO.util.Dom.getXY(e),d=g[1],f=g[0]+e.offsetWidth,a=g[1]+e.offsetHeight,c=g[0];return new YAHOO.util.Region(d,f,a,c);};YAHOO.util.Point=function(a,b){if(YAHOO.lang.isArray(a)){b=a[1];a=a[0];}YAHOO.util.Point.superclass.constructor.call(this,b,a,b,a);};YAHOO.extend(YAHOO.util.Point,YAHOO.util.Region);(function(){var b=YAHOO.util,a="clientTop",f="clientLeft",j="parentNode",k="right",w="hasLayout",i="px",u="opacity",l="auto",d="borderLeftWidth",g="borderTopWidth",p="borderRightWidth",v="borderBottomWidth",s="visible",q="transparent",n="height",e="width",h="style",t="currentStyle",r=/^width|height$/,o=/^(\d[.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz|%){1}?/i,m={get:function(x,z){var y="",A=x[t][z];if(z===u){y=b.Dom.getStyle(x,u);}else{if(!A||(A.indexOf&&A.indexOf(i)>-1)){y=A;}else{if(b.Dom.IE_COMPUTED[z]){y=b.Dom.IE_COMPUTED[z](x,z);}else{if(o.test(A)){y=b.Dom.IE.ComputedStyle.getPixel(x,z);}else{y=A;}}}}return y;},getOffset:function(z,E){var B=z[t][E],x=E.charAt(0).toUpperCase()+E.substr(1),C="offset"+x,y="pixel"+x,A="",D;if(B==l){D=z[C];if(D===undefined){A=0;}A=D;if(r.test(E)){z[h][E]=D;if(z[C]>D){A=D-(z[C]-D);}z[h][E]=l;}}else{if(!z[h][y]&&!z[h][E]){z[h][E]=B;}A=z[h][y];}return A+i;},getBorderWidth:function(x,z){var y=null;if(!x[t][w]){x[h].zoom=1;}switch(z){case g:y=x[a];break;case v:y=x.offsetHeight-x.clientHeight-x[a];break;case d:y=x[f];break;case p:y=x.offsetWidth-x.clientWidth-x[f];break;}return y+i;},getPixel:function(y,x){var A=null,B=y[t][k],z=y[t][x];y[h][k]=z;A=y[h].pixelRight;y[h][k]=B;return A+i;},getMargin:function(y,x){var z;if(y[t][x]==l){z=0+i;}else{z=b.Dom.IE.ComputedStyle.getPixel(y,x);}return z;},getVisibility:function(y,x){var z;while((z=y[t])&&z[x]=="inherit"){y=y[j];}return(z)?z[x]:s;},getColor:function(y,x){return b.Dom.Color.toRGB(y[t][x])||q;},getBorderColor:function(y,x){var z=y[t],A=z[x]||z.color;return b.Dom.Color.toRGB(b.Dom.Color.toHex(A));}},c={};c.top=c.right=c.bottom=c.left=c[e]=c[n]=m.getOffset;c.color=m.getColor;c[g]=c[p]=c[v]=c[d]=m.getBorderWidth;c.marginTop=c.marginRight=c.marginBottom=c.marginLeft=m.getMargin;c.visibility=m.getVisibility;c.borderColor=c.borderTopColor=c.borderRightColor=c.borderBottomColor=c.borderLeftColor=m.getBorderColor;b.Dom.IE_COMPUTED=c;b.Dom.IE_ComputedStyle=m;})();(function(){var c="toString",a=parseInt,b=RegExp,d=YAHOO.util;d.Dom.Color={KEYWORDS:{black:"000",silver:"c0c0c0",gray:"808080",white:"fff",maroon:"800000",red:"f00",purple:"800080",fuchsia:"f0f",green:"008000",lime:"0f0",olive:"808000",yellow:"ff0",navy:"000080",blue:"00f",teal:"008080",aqua:"0ff"},re_RGB:/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,re_hex:/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,re_hex3:/([0-9A-F])/gi,toRGB:function(e){if(!d.Dom.Color.re_RGB.test(e)){e=d.Dom.Color.toHex(e);}if(d.Dom.Color.re_hex.exec(e)){e="rgb("+[a(b.$1,16),a(b.$2,16),a(b.$3,16)].join(", ")+")";}return e;},toHex:function(f){f=d.Dom.Color.KEYWORDS[f]||f;if(d.Dom.Color.re_RGB.exec(f)){f=[Number(b.$1).toString(16),Number(b.$2).toString(16),Number(b.$3).toString(16)];for(var e=0;e<f.length;e++){if(f[e].length<2){f[e]="0"+f[e];}}f=f.join("");}if(f.length<6){f=f.replace(d.Dom.Color.re_hex3,"$1$1");}if(f!=="transparent"&&f.indexOf("#")<0){f="#"+f;}return f.toUpperCase();}};}());YAHOO.register("dom",YAHOO.util.Dom,{version:"2.9.0",build:"2800"});YAHOO.util.CustomEvent=function(d,c,b,a,e){this.type=d;this.scope=c||window;this.silent=b;this.fireOnce=e;this.fired=false;this.firedWith=null;this.signature=a||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}var f="_YUICEOnSubscribe";if(d!==f){this.subscribeEvent=new YAHOO.util.CustomEvent(f,this,true);}this.lastError=null;};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(b,c,d){if(!b){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}if(this.subscribeEvent){this.subscribeEvent.fire(b,c,d);}var a=new YAHOO.util.Subscriber(b,c,d);if(this.fireOnce&&this.fired){this.notify(a,this.firedWith);}else{this.subscribers.push(a);}},unsubscribe:function(d,f){if(!d){return this.unsubscribeAll();}var e=false;for(var b=0,a=this.subscribers.length;b<a;++b){var c=this.subscribers[b];if(c&&c.contains(d,f)){this._delete(b);e=true;}}return e;},fire:function(){this.lastError=null;var h=[],a=this.subscribers.length;var d=[].slice.call(arguments,0),c=true,f,b=false;if(this.fireOnce){if(this.fired){return true;}else{this.firedWith=d;}}this.fired=true;if(!a&&this.silent){return true;}if(!this.silent){}var e=this.subscribers.slice();for(f=0;f<a;++f){var g=e[f];if(!g||!g.fn){b=true;}else{c=this.notify(g,d);if(false===c){if(!this.silent){}break;}}}return(c!==false);},notify:function(g,c){var b,i=null,f=g.getScope(this.scope),a=YAHOO.util.Event.throwErrors;if(!this.silent){}if(this.signature==YAHOO.util.CustomEvent.FLAT){if(c.length>0){i=c[0];}try{b=g.fn.call(f,i,g.obj);}catch(h){this.lastError=h;if(a){throw h;}}}else{try{b=g.fn.call(f,this.type,c,g.obj);}catch(d){this.lastError=d;if(a){throw d;}}}return b;},unsubscribeAll:function(){var a=this.subscribers.length,b;for(b=a-1;b>-1;b--){this._delete(b);}this.subscribers=[];return a;},_delete:function(a){var b=this.subscribers[a];if(b){delete b.fn;delete b.obj;}this.subscribers.splice(a,1);},toString:function(){return"CustomEvent: "+"'"+this.type+"', "+"context: "+this.scope;}};YAHOO.util.Subscriber=function(a,b,c){this.fn=a;this.obj=YAHOO.lang.isUndefined(b)?null:b;this.overrideContext=c;};YAHOO.util.Subscriber.prototype.getScope=function(a){if(this.overrideContext){if(this.overrideContext===true){return this.obj;}else{return this.overrideContext;}}return a;};YAHOO.util.Subscriber.prototype.contains=function(a,b){if(b){return(this.fn==a&&this.obj==b);}else{return(this.fn==a);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", overrideContext: "+(this.overrideContext||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var g=false,h=[],j=[],a=0,e=[],b=0,c={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9},d=YAHOO.env.ua.ie,f="focusin",i="focusout";return{POLL_RETRYS:500,POLL_INTERVAL:40,EL:0,TYPE:1,FN:2,WFN:3,UNLOAD_OBJ:3,ADJ_SCOPE:4,OBJ:5,OVERRIDE:6,CAPTURE:7,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:d,_interval:null,_dri:null,_specialTypes:{focusin:(d?"focusin":"focus"),focusout:(d?"focusout":"blur")},DOMReady:false,throwErrors:false,startInterval:function(){if(!this._interval){this._interval=YAHOO.lang.later(this.POLL_INTERVAL,this,this._tryPreloadAttach,null,true);}},onAvailable:function(q,m,o,p,n){var k=(YAHOO.lang.isString(q))?[q]:q;for(var l=0;l<k.length;l=l+1){e.push({id:k[l],fn:m,obj:o,overrideContext:p,checkReady:n});}a=this.POLL_RETRYS;this.startInterval();},onContentReady:function(n,k,l,m){this.onAvailable(n,k,l,m,true);},onDOMReady:function(){this.DOMReadyEvent.subscribe.apply(this.DOMReadyEvent,arguments);},_addListener:function(m,k,v,p,t,y){if(!v||!v.call){return false;}if(this._isValidCollection(m)){var w=true;for(var q=0,s=m.length;q<s;++q){w=this.on(m[q],k,v,p,t)&&w;}return w;}else{if(YAHOO.lang.isString(m)){var o=this.getEl(m);if(o){m=o;}else{this.onAvailable(m,function(){YAHOO.util.Event._addListener(m,k,v,p,t,y);});return true;}}}if(!m){return false;}if("unload"==k&&p!==this){j[j.length]=[m,k,v,p,t];return true;}var l=m;if(t){if(t===true){l=p;}else{l=t;}}var n=function(z){return v.call(l,YAHOO.util.Event.getEvent(z,m),p);};var x=[m,k,v,n,l,p,t,y];var r=h.length;h[r]=x;try{this._simpleAdd(m,k,n,y);}catch(u){this.lastError=u;this.removeListener(m,k,v);return false;}return true;},_getType:function(k){return this._specialTypes[k]||k;},addListener:function(m,p,l,n,o){var k=((p==f||p==i)&&!YAHOO.env.ua.ie)?true:false;return this._addListener(m,this._getType(p),l,n,o,k);},addFocusListener:function(l,k,m,n){return this.on(l,f,k,m,n);},removeFocusListener:function(l,k){return this.removeListener(l,f,k);},addBlurListener:function(l,k,m,n){return this.on(l,i,k,m,n);},removeBlurListener:function(l,k){return this.removeListener(l,i,k);},removeListener:function(l,k,r){var m,p,u;k=this._getType(k);if(typeof l=="string"){l=this.getEl(l);}else{if(this._isValidCollection(l)){var s=true;for(m=l.length-1;m>-1;m--){s=(this.removeListener(l[m],k,r)&&s);}return s;}}if(!r||!r.call){return this.purgeElement(l,false,k);}if("unload"==k){for(m=j.length-1;m>-1;m--){u=j[m];if(u&&u[0]==l&&u[1]==k&&u[2]==r){j.splice(m,1);return true;}}return false;}var n=null;var o=arguments[3];if("undefined"===typeof o){o=this._getCacheIndex(h,l,k,r);}if(o>=0){n=h[o];}if(!l||!n){return false;}var t=n[this.CAPTURE]===true?true:false;try{this._simpleRemove(l,k,n[this.WFN],t);}catch(q){this.lastError=q;return false;}delete h[o][this.WFN];delete h[o][this.FN];h.splice(o,1);return true;},getTarget:function(m,l){var k=m.target||m.srcElement;return this.resolveTextNode(k);},resolveTextNode:function(l){try{if(l&&3==l.nodeType){return l.parentNode;}}catch(k){return null;}return l;},getPageX:function(l){var k=l.pageX;if(!k&&0!==k){k=l.clientX||0;if(this.isIE){k+=this._getScrollLeft();}}return k;},getPageY:function(k){var l=k.pageY;if(!l&&0!==l){l=k.clientY||0;if(this.isIE){l+=this._getScrollTop();}}return l;},getXY:function(k){return[this.getPageX(k),this.getPageY(k)];},getRelatedTarget:function(l){var k=l.relatedTarget;
if(!k){if(l.type=="mouseout"){k=l.toElement;}else{if(l.type=="mouseover"){k=l.fromElement;}}}return this.resolveTextNode(k);},getTime:function(m){if(!m.time){var l=new Date().getTime();try{m.time=l;}catch(k){this.lastError=k;return l;}}return m.time;},stopEvent:function(k){this.stopPropagation(k);this.preventDefault(k);},stopPropagation:function(k){if(k.stopPropagation){k.stopPropagation();}else{k.cancelBubble=true;}},preventDefault:function(k){if(k.preventDefault){k.preventDefault();}else{k.returnValue=false;}},getEvent:function(m,k){var l=m||window.event;if(!l){var n=this.getEvent.caller;while(n){l=n.arguments[0];if(l&&Event==l.constructor){break;}n=n.caller;}}return l;},getCharCode:function(l){var k=l.keyCode||l.charCode||0;if(YAHOO.env.ua.webkit&&(k in c)){k=c[k];}return k;},_getCacheIndex:function(n,q,r,p){for(var o=0,m=n.length;o<m;o=o+1){var k=n[o];if(k&&k[this.FN]==p&&k[this.EL]==q&&k[this.TYPE]==r){return o;}}return -1;},generateId:function(k){var l=k.id;if(!l){l="yuievtautoid-"+b;++b;k.id=l;}return l;},_isValidCollection:function(l){try{return(l&&typeof l!=="string"&&l.length&&!l.tagName&&!l.alert&&typeof l[0]!=="undefined");}catch(k){return false;}},elCache:{},getEl:function(k){return(typeof k==="string")?document.getElementById(k):k;},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",YAHOO,0,0,1),_load:function(l){if(!g){g=true;var k=YAHOO.util.Event;k._ready();k._tryPreloadAttach();}},_ready:function(l){var k=YAHOO.util.Event;if(!k.DOMReady){k.DOMReady=true;k.DOMReadyEvent.fire();k._simpleRemove(document,"DOMContentLoaded",k._ready);}},_tryPreloadAttach:function(){if(e.length===0){a=0;if(this._interval){this._interval.cancel();this._interval=null;}return;}if(this.locked){return;}if(this.isIE){if(!this.DOMReady){this.startInterval();return;}}this.locked=true;var q=!g;if(!q){q=(a>0&&e.length>0);}var p=[];var r=function(t,u){var s=t;if(u.overrideContext){if(u.overrideContext===true){s=u.obj;}else{s=u.overrideContext;}}u.fn.call(s,u.obj);};var l,k,o,n,m=[];for(l=0,k=e.length;l<k;l=l+1){o=e[l];if(o){n=this.getEl(o.id);if(n){if(o.checkReady){if(g||n.nextSibling||!q){m.push(o);e[l]=null;}}else{r(n,o);e[l]=null;}}else{p.push(o);}}}for(l=0,k=m.length;l<k;l=l+1){o=m[l];r(this.getEl(o.id),o);}a--;if(q){for(l=e.length-1;l>-1;l--){o=e[l];if(!o||!o.id){e.splice(l,1);}}this.startInterval();}else{if(this._interval){this._interval.cancel();this._interval=null;}}this.locked=false;},purgeElement:function(p,q,s){var n=(YAHOO.lang.isString(p))?this.getEl(p):p;var r=this.getListeners(n,s),o,k;if(r){for(o=r.length-1;o>-1;o--){var m=r[o];this.removeListener(n,m.type,m.fn);}}if(q&&n&&n.childNodes){for(o=0,k=n.childNodes.length;o<k;++o){this.purgeElement(n.childNodes[o],q,s);}}},getListeners:function(n,k){var q=[],m;if(!k){m=[h,j];}else{if(k==="unload"){m=[j];}else{k=this._getType(k);m=[h];}}var s=(YAHOO.lang.isString(n))?this.getEl(n):n;for(var p=0;p<m.length;p=p+1){var u=m[p];if(u){for(var r=0,t=u.length;r<t;++r){var o=u[r];if(o&&o[this.EL]===s&&(!k||k===o[this.TYPE])){q.push({type:o[this.TYPE],fn:o[this.FN],obj:o[this.OBJ],adjust:o[this.OVERRIDE],scope:o[this.ADJ_SCOPE],index:r});}}}}return(q.length)?q:null;},_unload:function(s){var m=YAHOO.util.Event,p,o,n,r,q,t=j.slice(),k;for(p=0,r=j.length;p<r;++p){n=t[p];if(n){try{k=window;if(n[m.ADJ_SCOPE]){if(n[m.ADJ_SCOPE]===true){k=n[m.UNLOAD_OBJ];}else{k=n[m.ADJ_SCOPE];}}n[m.FN].call(k,m.getEvent(s,n[m.EL]),n[m.UNLOAD_OBJ]);}catch(w){}t[p]=null;}}n=null;k=null;j=null;if(h){for(o=h.length-1;o>-1;o--){n=h[o];if(n){try{m.removeListener(n[m.EL],n[m.TYPE],n[m.FN],o);}catch(v){}}}n=null;}try{m._simpleRemove(window,"unload",m._unload);m._simpleRemove(window,"load",m._load);}catch(u){}},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var k=document.documentElement,l=document.body;if(k&&(k.scrollTop||k.scrollLeft)){return[k.scrollTop,k.scrollLeft];}else{if(l){return[l.scrollTop,l.scrollLeft];}else{return[0,0];}}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(m,n,l,k){m.addEventListener(n,l,(k));};}else{if(window.attachEvent){return function(m,n,l,k){m.attachEvent("on"+n,l);};}else{return function(){};}}}(),_simpleRemove:function(){if(window.removeEventListener){return function(m,n,l,k){m.removeEventListener(n,l,(k));};}else{if(window.detachEvent){return function(l,m,k){l.detachEvent("on"+m,k);};}else{return function(){};}}}()};}();(function(){var a=YAHOO.util.Event;a.on=a.addListener;a.onFocus=a.addFocusListener;a.onBlur=a.addBlurListener;
/*! DOMReady: based on work by: Dean Edwards/John Resig/Matthias Miller/Diego Perini */
if(a.isIE){if(self!==self.top){document.onreadystatechange=function(){if(document.readyState=="complete"){document.onreadystatechange=null;a._ready();}};}else{YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var b=document.createElement("p");a._dri=setInterval(function(){try{b.doScroll("left");clearInterval(a._dri);a._dri=null;a._ready();b=null;}catch(c){}},a.POLL_INTERVAL);}}else{if(a.webkit&&a.webkit<525){a._dri=setInterval(function(){var c=document.readyState;if("loaded"==c||"complete"==c){clearInterval(a._dri);a._dri=null;a._ready();}},a.POLL_INTERVAL);}else{a._simpleAdd(document,"DOMContentLoaded",a._ready);}}a._simpleAdd(window,"load",a._load);a._simpleAdd(window,"unload",a._unload);a._tryPreloadAttach();})();}YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(a,c,f,e){this.__yui_events=this.__yui_events||{};var d=this.__yui_events[a];if(d){d.subscribe(c,f,e);}else{this.__yui_subscribers=this.__yui_subscribers||{};var b=this.__yui_subscribers;if(!b[a]){b[a]=[];}b[a].push({fn:c,obj:f,overrideContext:e});}},unsubscribe:function(c,e,g){this.__yui_events=this.__yui_events||{};var a=this.__yui_events;if(c){var f=a[c];if(f){return f.unsubscribe(e,g);}}else{var b=true;for(var d in a){if(YAHOO.lang.hasOwnProperty(a,d)){b=b&&a[d].unsubscribe(e,g);
}}return b;}return false;},unsubscribeAll:function(a){return this.unsubscribe(a);},createEvent:function(b,g){this.__yui_events=this.__yui_events||{};var e=g||{},d=this.__yui_events,f;if(d[b]){}else{f=new YAHOO.util.CustomEvent(b,e.scope||this,e.silent,YAHOO.util.CustomEvent.LIST,e.fireOnce);d[b]=f;if(e.onSubscribeCallback){f.subscribeEvent.subscribe(e.onSubscribeCallback);}this.__yui_subscribers=this.__yui_subscribers||{};var a=this.__yui_subscribers[b];if(a){for(var c=0;c<a.length;++c){f.subscribe(a[c].fn,a[c].obj,a[c].overrideContext);}}}return d[b];},fireEvent:function(b){this.__yui_events=this.__yui_events||{};var d=this.__yui_events[b];if(!d){return null;}var a=[];for(var c=1;c<arguments.length;++c){a.push(arguments[c]);}return d.fire.apply(d,a);},hasEvent:function(a){if(this.__yui_events){if(this.__yui_events[a]){return true;}}return false;}};(function(){var a=YAHOO.util.Event,c=YAHOO.lang;YAHOO.util.KeyListener=function(d,i,e,f){if(!d){}else{if(!i){}else{if(!e){}}}if(!f){f=YAHOO.util.KeyListener.KEYDOWN;}var g=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(c.isString(d)){d=document.getElementById(d);}if(c.isFunction(e)){g.subscribe(e);}else{g.subscribe(e.fn,e.scope,e.correctScope);}function h(o,n){if(!i.shift){i.shift=false;}if(!i.alt){i.alt=false;}if(!i.ctrl){i.ctrl=false;}if(o.shiftKey==i.shift&&o.altKey==i.alt&&o.ctrlKey==i.ctrl){var j,m=i.keys,l;if(YAHOO.lang.isArray(m)){for(var k=0;k<m.length;k++){j=m[k];l=a.getCharCode(o);if(j==l){g.fire(l,o);break;}}}else{l=a.getCharCode(o);if(m==l){g.fire(l,o);}}}}this.enable=function(){if(!this.enabled){a.on(d,f,h);this.enabledEvent.fire(i);}this.enabled=true;};this.disable=function(){if(this.enabled){a.removeListener(d,f,h);this.disabledEvent.fire(i);}this.enabled=false;};this.toString=function(){return"KeyListener ["+i.keys+"] "+d.tagName+(d.id?"["+d.id+"]":"");};};var b=YAHOO.util.KeyListener;b.KEYDOWN="keydown";b.KEYUP="keyup";b.KEY={ALT:18,BACK_SPACE:8,CAPS_LOCK:20,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,META:224,NUM_LOCK:144,PAGE_DOWN:34,PAGE_UP:33,PAUSE:19,PRINTSCREEN:44,RIGHT:39,SCROLL_LOCK:145,SHIFT:16,SPACE:32,TAB:9,UP:38};})();YAHOO.register("event",YAHOO.util.Event,{version:"2.9.0",build:"2800"});YAHOO.register("yahoo-dom-event", YAHOO, {version: "2.9.0", build: "2800"});


var js = YAHOO;
js.core = {};

/**
 * @class js.core.Version
 * @final
 * @static
 */
js.core.Version = {
	/**
	 * @constant {Int} major
	 */
	major: 0,
	/**
	 * @constant {Int} minor
	 */
	minor: 6,
	/**
	 * @constant {Int} update
	 */
	update: 2,
	/**
	 * @constant {String} stage AL|BT|RC|GA
	 */
	stage: 'RC',
	/**
	 * @constant {Int} night
	 */
	night : 20120502,
	/**
	 * @constant {String} mainVersion
	 */
	mainVersion : this.major + '.' + this.minor + '.' + this.update, 
	/**
	 * @constant {String} fullVersion
	 */
	fullVersion: this.mainVersion + '-' + this.stage + '-' + this.night	
};

/**
 * @class js.lang.System
 * @static
 */
js.lang.System = js.lang;

/**
 * Alias as package. Must starts with: "a-z".
 * 
 * @method namespace
 * @param {String} pkg
 */
js.lang.System.namespace = function(pkg) {
    var p = pkg.split('.'), len = p.length;
	if (len < 1) return;
	
	var p0 = p[0];
	if(typeof window[p0]=="undefined") window[p0] = {};
	var b = window[p0];
    for (var i=1; i<len; i++) {
		var pi = p[i]; if(!pi) break;	             
		b[pi] = b[pi]||{};
		b = b[pi];
    }
	return b;
};

/**
 * Returns a random number in [n,m).
 * 
 * @method random
 * @param {Number} n
 * @param {Number} m
 * @param {Boolean} isFloat:optional
 * @return {Number} The default is Integer
 */
js.lang.System.random = function(n, m, isFloat){
		var x = Math.random()*(m-n)+n;
		return isFloat?x:Math.floor(x);
};
/**
 * Returns a random item in a array.
 * 
 * @method randomEnum
 * @param {Array} array
 * @return {Object}
 */
js.lang.System.randomEnum = function(array){
	if(!array || array.length<=0) return null;
	if(array.length < 2) return array[0];
	
	return array[this.random(0, array.length)];
};
/**
 * Returns a random True or False.
 * 
 * @method randomBoolean
 * @return {Boolean}
 */
js.lang.System.randomBoolean = function(){
	return this.randomEnum([true, false]);
};
/**
 * Returns a random color RGB value.
 * 
 * @method randomColor
 * @return {String}
 */
js.lang.System.randomColor = function(){
	var a = '0123456789abcdef'.split('');
	var c = [];
	for ( var i=0; i < 6; ++i ) {
		c.push(this.randomEnum(a));
	}	
	return '#'+c.join('');
};

/**
 * Returns a new generating UUID.
 * 
 * @method getUUID
 * @return {String} uuid
 */
js.lang.System.getUUID = function(){
	var t = new Date().getTime();
	return t+''+Math.floor(Math.random()*t);
};

/**
 * Encode the JSONObject to a JSON String.
 * 
 * @method toJSONString
 * @param {Object} o
 * @return {String} json
 */
js.lang.System.toJSONString = function(o){
	if(typeof o == "undefined" || o === null){
		return "null";
    }else if(o.toJSONString){
        return o.toJSONString();
    }else if(typeof o == "boolean"){
        return String(o);
    }else {
        var a = ["{"], b, i, v;
        for (i in o) {
            if(!({}.hasOwnProperty ? true : false) || o.hasOwnProperty(i)) {
                v = o[i];
                switch (typeof v) {
                case "undefined":
                case "function":
                case "unknown":
                    break;
                default:
                    if(b){
                        a.push(',');
                    }
                    a.push(this.encode(i), ":",
                            v === null ? "null" : this.encode(v));
                    b = true;
                }
            }
        }
        a.push("}");
        return a.join("");
    }
}

/**
 * Returns a JSON Object
 * 
 * @method parseJSON
 * @param {String} json
 * @return {Object}
 */
js.lang.System.parseJSON = function(json){
	return eval("(" + json + ')');
}

/**
 * Returns a simple string representation of the object or array.
 * Other types of objects will be returned unprocessed.  Arrays
 * are expected to be indexed.  Use object notation for
 * associative arrays.
 * @method dump
 * @param {Object} o The object to dump
 * @param {int} d:optional How deep to recurse child objects, default 3
 * @return {String} the dump result
 */
/**
 * Utility to set up the prototype, constructor and superclass properties to
 * support an inheritance strategy that can chain constructors and methods.
 * Static members will not be inherited.
 *
 * @method extend
 * @param {Function} subc   the object to modify
 * @param {Function} superc the object to inherit
 * @param {Object} overrides:optional  additional properties/methods to add to the
 *                              subclass prototype.  These will override the
 *                              matching items obtained from the superclass 
 *                              if present.
 */
/**
 * Applies all prototype properties in the supplier to the receiver if the receiver does not have these properties yet.
 * @method augment
 * @param {Function} r  the object to receive the augmentation
 * @param {Function} s  the object that supplies the properties to augment
 * @param {String..} arguments:optional zero or more properties methods to 
 *        augment the receiver with.  If none specified, everything
 *        in the supplier will be used unless it would
 *        overwrite an existing property in the receiver
 */
/**
 * Determines whether or not the property was added
 * to the object instance.  Returns false if the property is not present
 * in the object, or was inherited from the prototype.
 * <code>
 * var A = function() {};
 * A.prototype.foo = 'foo';
 * var a = new A();
 * a.foo = 'foo';
 * alert(a.hasOwnProperty('foo')); // true
 * </code>
 * @method hasOwnProperty
 * @param {Object} o The object being testing
 * @param {String} prop the name of the property to test
 * @return {Boolean} the result
 */
/**
 * Determines wheather or not the provided object is an array.
 * @method isArray
 * @param {Object} o The object being testing
 * @return {Boolean} the result
 */
/**
 * Determines whether or not the provided object is a boolean
 * @method isBoolean
 * @param {Object} o The object being testing
 * @return {Boolean} the result
 */
/**
 * Determines whether or not the provided object is a function.
 * Note: Internet Explorer thinks certain functions are objects:
 *
 * var obj = document.createElement("object");
 * js.lang.System.isFunction(obj.getAttribute) // reports false in IE
 *
 * var input = document.createElement("input"); // append to body
 * js.lang.System.isFunction(input.focus) // reports false in IE
 *
 * You will have to implement additional tests if these functions
 * matter to you.
 *
 * @method isFunction
 * @param {Object} o The object being testing
 * @return {Boolean} the result
 */
/**
 * Determines whether or not the provided object is null
 * @method isNull
 * @param {Object} o The object being testing
 * @return {Boolean} the result
 */
/**
 * Determines whether or not the provided object is a legal number
 * @method isNumber
 * @param {Object} o The object being testing
 * @return {Boolean} the result
 */
/**
 * Determines whether or not the provided object is of type object
 * or function
 * @method isObject
 * @param {Object} o The object being testing
 * @return {Boolean} the result
 */ 
/**
 * Determines whether or not the provided object is a string
 * @method isString
 * @param {Object} o The object being testing
 * @return {Boolean} the result
 */
/**
 * Determines whether or not the provided object is undefined
 * @method isUndefined
 * @param {Object} o The object being testing
 * @return {Boolean} the result
 */
/**
 * A convenience method for detecting a legitimate non-null value.
 * Returns false for null/undefined/NaN, true for other values, 
 * including 0/false/''
 * @method isValue
 * @param {Object} o  the item to test
 * @return {Boolean} true if it is not null/undefined/NaN || false
 */

/**
 * @class js.core.Env
 * @static
 */
js.core.Env = js.env.ua;

if(js.core.Env.ie==6){//bugfix: IE6 background image cache bug
	document.execCommand('BackgroundImageCache', false, true);
}

/**
 * The operating system. Currently only detecting windows or macintosh 
 * @field {String} os
 */
/**
 * The mobile property will be set to a string containing any relevant user agent information when a modern mobile browser is detected. Currently limited to Safari on the iPhone/iPod Touch, Nokia N-series devices with the WebKit-based browser, and Opera Mini. 
 * @field {String} mobile
 */
/**
 * Detects Googles Android OS version 
 * @field {float} android 
 */
/**
 * General truthy check for iPad, iPhone or iPod 
 * @field {float} ios  
 */
/**
 * Detects Apple iPad's OS version 
 * @field {float} ipad   
 */
/**
 * Detects Apple iPhone's OS version 
 * @field {float} iphone    
 */
/**
 * Detects Apples iPod's OS version  
 * @field {float} ipod     
 */
/**
 * Set to true if the page appears to be in SSL 
 * @field {Boolean} secure
 */

/**
 * Internet Explorer version number or 0.  Example: 6
 * @field {float} ie
 */
/**
 * Opera version number or 0.  Example: 9.2
 * @field {float} opera
 */
/**
 * Gecko engine revision number.  Will evaluate to 1 if Gecko 
 * is detected but the revision could not be found. Other browsers
 * will be 0.  Example: 1.8
 * <pre>
 * Firefox 1.0.0.4: 1.7.8   <-- Reports 1.7
 * Firefox 1.5.0.9: 1.8.0.9 <-- Reports 1.8
 * Firefox 2.0.0.3: 1.8.1.3 <-- Reports 1.8
 * Firefox 3 alpha: 1.9a4   <-- Reports 1.9
 * </pre>
 * @field {float} gecko
 */
/**
 * AppleWebKit version.  KHTML browsers that are not WebKit browsers 
 * will evaluate to 1, other browsers 0.  Example: 418.9.1
 * <pre>
 * Safari 1.3.2 (312.6): 312.8.1 <-- Reports 312.8 -- currently the 
 *                                   latest available for Mac OSX 10.3.
 * Safari 2.0.2:         416     <-- hasOwnProperty introduced
 * Safari 2.0.4:         418     <-- preventDefault fixed
 * Safari 2.0.4 (419.3): 418.9.1 <-- One version of Safari may run
 *                                   different versions of webkit
 * Safari 2.0.4 (419.3): 419     <-- Tiger installations that have been
 *                                   updated, but not updated
 *                                   to the latest patch.
 * Webkit 212 nightly:   522+    <-- Safari 3.0 precursor (with native SVG
 *                                   and many major issues fixed).  
 * 3.x yahoo.com, flickr:422     <-- Safari 3.x hacks the user agent
 *                                   string when hitting yahoo.com and 
 *                                   flickr.com.
 * Safari 3.0.4 (523.12):523.12  <-- First Tiger release - automatic update
 *                                   from 2.x via the 10.4.11 OS patch
 * Webkit nightly 1/2008:525+    <-- Supports DOMContentLoaded event.
 *                                   yahoo.com user agent hack removed.
 * </pre>
 * http://developer.apple.com/internet/safari/uamatrix.html
 * @field {float} webkit
 */

/**
 * Chrome version number
 * @field {Float} chrome
 */
/**
 * The current browser's name
 * @field {String} browserName
 */
/**
 * The current browser's version
 * @field {String} browserVersion
 */
/**
 * LowerCase.
 * The format is: <language code>-<country code>
 * @field {String} locale 
 */
/**
 * LowerCase.
 * Language codes are defined by ISO 639, an international standard that assigns two- and three-letter codes to most languages of the world.
 * @field {String} language
 */
/**
 * LowerCase.
 * Country codes are defined by ISO 3166, another international standard. It defines two- and three-letter abbreviations for each country or major region in the world. 
 * @field {String} country
 */
(function(){
	var numberify = function(s) {
		var c = 0;
		return parseFloat(s.replace(/\./g, function() {
			return (c++ == 1) ? '' : '.';
		}));
	}
	js.core.Env.chrome = 0;
	var m = navigator.userAgent.match(/Chrome\/([^\s]*)/);
	if (m && m[1]) {
		js.core.Env.chrome = numberify(m[1]); // Chrome
		js.core.Env.webkit = 0; //Reset to 0
	}

	if(js.core.Env.gecko > 0){
		js.core.Env.browserName = 'Firefox';
		js.core.Env.browserVersion = js.core.Env.gecko;
	}else if(js.core.Env.webkit > 0){
		js.core.Env.browserName = 'Safari';
		js.core.Env.browserVersion = js.core.Env.gecko;
	}else if(js.core.Env.ie > 0){
		js.core.Env.browserName = 'Internet Explorer';
		js.core.Env.browserVersion = js.core.Env.ie;
	}else if(js.core.Env.opera > 0){
		js.core.Env.browserName = 'Opera';
		js.core.Env.browserVersion = js.core.Env.opera;
	}else if(js.core.Env.chrome > 0){
		js.core.Env.browserName = 'Chrome';
		js.core.Env.browserVersion = js.core.Env.chrome;
	}
	
	var locale = (navigator.language || navigator.browserLanguage).toLowerCase();
	if(locale && locale.indexOf('-')>0) {
		var _localeArr = locale.split('-');
		js.core.Env.language = _localeArr[0];
		js.core.Env.country  = _localeArr[1];
		js.core.Env.locale = locale;
	}	
})();


/**
 * @class js.core.Dom
 * @static
 */
js.core.Dom = js.util.Dom;

/**
 * Returns an HTMLElement reference.
 * @method $
 * @param {String | HTMLElement |Array} el Accepts a string to use as an ID for getting a DOM reference, an actual DOM reference, or an Array of IDs and/or HTMLElements.
 * @return {HTMLElement | Array} A DOM reference to an HTML element or an array of HTMLElements.
 */
js.core.Dom.$ = function(el){
	return js.core.Dom.get(el);
}
/**
 * Better performance than "innerHTML".
 * 
 * @method replaceHtml
 * @param {String|HTMLElement} el
 * @param {String} html
 * @return {HTMLElement}
 */
js.core.Dom.replaceHtml = function(el, html) {   
    var oldEl = typeof el === "string" ? document.getElementById(el) : el;   
    if(js.core.Env.ie > 0){// Pure innerHTML is slightly faster in IE 
		oldEl.innerHTML = html;  
        return oldEl;
	}else{
		if(oldEl.parentNode){
			var newEl = oldEl.cloneNode(false);   
	    	newEl.innerHTML = html;   
	    	oldEl.parentNode.replaceChild(newEl, oldEl);   
	    	return newEl;			
		}else{
			oldEl.innerHTML = html;   
	    	return oldEl;
		}		
	}      
}

,
/**
 * @method setCursorStyle
 * @param {String|HTMLElement} el
 * @param {String} style 
 */
js.core.Dom.setCursorStyle = function(el, style){
	if(!style) {
		style = 'default';
	} else if (style.endsWith('.cur') || style.endsWith('.ani') || style.endsWith('.gif') || style.endsWith('.png')) {
		style = 'url("'+style+'"),auto';
	}
	this.updateEl(el, null, {cursor: style});
}

/**
 * Returns the height of the window.
 * 
 * @method getDocumentHeight
 * @param {HTMLElement} win:optional the window object
 * @return {Int} The height of the actual document (which includes the body and its margin).
 */
js.core.Dom.getDocumentHeight = function(win) {
    var doc = win?win['document']:document 
	, scrollHeight = (doc['compatMode'] != 'CSS1Compat' || js.core.Env.webkit) ? doc.body.scrollHeight : doc['documentElement'].scrollHeight
	, h = Math.max(scrollHeight, js.core.Dom.getViewportHeight(win));
    return h;
}

        
/**
 * Returns the width of the window.
 * 
 * @method getDocumentWidth
 * @param {HTMLElement} win:optional the window object
 * @return {Int} The width of the actual document (which includes the body and its margin).
 */
js.core.Dom.getDocumentWidth = function(win) {
    var doc = win?win['document']:document
	, scrollWidth = (doc['compatMode'] != 'CSS1Compat' || js.core.Env.webkit) ? doc.body.scrollWidth : doc['documentElement'].scrollWidth
	, w = Math.max(scrollWidth, js.core.Dom.getViewportWidth(win));
    return w;
}

/**
 * Returns the current view height of the window.
 * 
 * @method getViewportHeight
 * @param {HTMLElement} win:optional the window object
 * @return {Int} The height of the viewable area of the page (excludes scrollbars).
 */
js.core.Dom.getViewportHeight = function(win) {
    var doc = win?win['document']:document
	, height = win?win.innerHeight:self.innerHeight // Safari, Opera
    , mode = doc['compatMode'];

    if ( (mode || js.core.Env.ie) && !js.core.Env.opera ) { // IE, Gecko
        height = (mode == 'CSS1Compat') ?
                doc['documentElement'].clientHeight : // Standards
                doc.body.clientHeight; // Quirks
    }

    return height;
}
        
/**
 * Returns the current view width of the window.
 * 
 * @method getViewportWidth
 * @param {HTMLElement} win:optional the window object
 * @return {Int} The width of the viewable area of the page (excludes scrollbars).
 */
js.core.Dom.getViewportWidth = function(win) {
    var doc = win?win['document']:document
	, width = win?win.innerWidth:self.innerWidth // Safari
    , mode = doc['compatMode'];
    
    if (mode || js.core.Env.ie) { // IE, Gecko, Opera
        width = (mode == 'CSS1Compat') ?
                doc['documentElement'].clientWidth : // Standards
                doc.body.clientWidth; // Quirks
    }
    return width;
}

js.core.Dom.DOT_ATTRIBUTES = {
	className: true,
	name:      true,
	disabled:  true,
	checked:   true,
	value:     true,
	action:    true,
	method:    true
};

/**
 * Set the elements 's attribute. 
 * 
 * @method setAttribute
 * @param {String|Array<HTMLElement>} el the elements
 * @param {String} attr the attribute name
 * @param {String} val the attribute value
 */				
js.core.Dom.setAttribute = function(el, attr, val) {
	if(js.lang.System.isUndefined(val)) return;
	
	if(attr == 'checked') {
		attr = js.core.Env.ie?'defaultChecked':'checked';				
	}else if(attr == 'cssName'){
		attr = js.core.Env.ie?'className':'class';
	}else if(attr == 'cssText'){
		if(js.core.Env.ie) {
			js.core.Dom.setStyle(el,'cssText', val);
			return;
		}else{
			attr = 'style';
		}
	}
	
	js.core.Dom.batch(el, function(el, args) {
        var attr = js.core.Dom._toCamel(args.attr),
            val = args.val;

        if (el && el.setAttribute) {
            if (js.core.Dom.DOT_ATTRIBUTES[attr]) {
                el[attr] = val;
            } else {
                attr = js.core.Dom.CUSTOM_ATTRIBUTES[attr] || attr;
                el.setAttribute(attr, val);
            }
        } 
    }, { attr: attr, val: val });
},

/**
 * Set many attributes of the element.
 * 
 * @method setAttributes
 * @param {String|Array<HTMLElement>} el the elements
 * @param {Object} attrs
 */
js.core.Dom.setAttributes = function(el, attrs){
	if(attrs) { 
		for (var k in attrs) {
        	js.core.Dom.setAttribute(el, k, attrs[k]);				
        } 		
    }	
}

/**
 * Set the elements 's style.
 * 
 * @method setStyle
 * @param {String|Array<HTMLElement>} el the elements
 * @param {String} k the style's key
 * @param {String|Number} val the style's value
 */
js.core.Dom.setStyle = function(el, k, val) {
	var SYS = js.lang.System;
	if(SYS.isUndefined(val)) return;
	
	if(k=='x' || k=='left'){
		k = 'left';
		if (SYS.isNumber(val)) val+= 'px';
	}else if(k=='y' || k=='top'){
		k = 'top';
		if (SYS.isNumber(val)) val+= 'px';
	}else if(k=='width' || k=='height' || k=='marginLeft' || k=='marginTop' || k=='lineHeight'){
		if (SYS.isNumber(val)) val+= 'px';
	}else if(k=='opacity'){
		if(js.core.Env.ie>0){
			k = 'filter';
			val = 'alpha(opacity:' + val * 100 + ')';
		}				
	}else if(k=='visible'){
		k = 'visibility';
		val = val?'visible':'hidden';
	}else if(k=='z'){
		k = 'zIndex';
	}	
	
    this.batch(el, this._setStyle, { prop: k, val: val });
}
/**
 * Normalizes currentStyle and ComputedStyle.
 * @method getStyle
 * @param {String | HTMLElement |Array} el Accepts a string to use as an ID, an actual DOM reference, or an Array of IDs and/or HTMLElements.
 * @param {String} property The style property whose value is returned.
 * @return {String | Array} The current value of the style property for the element(s).
 */
js.core.Dom.getStyle = function(el, property) {
	if(property=='x'){
		property = 'left';
	}else if(property=='y'){
		property = 'top';			
	}else if(property=='visible'){
		property = 'visibility';
	}else if(property=='z'){
		property = 'zIndex';
	}	
	
	return this.batch(el, this._getStyle, property);
}
/**
 * Set many styles of the element.
 * 
 * @method setStyles
 * @param {String|Array<HTMLElement>} el the elements 
 * @param {Object} styles
 */
js.core.Dom.setStyles = function(el, styles){
	if(styles) { 
        for (var k in styles) {
			js.core.Dom.setStyle(el, k, styles[k]);  	
        } 
    } 
}
/**
 * Update the element's attributs, styles and innerHTML.
 * 
 * @method updateEl
 * @param {String|HTMLElement} el
 * @param {Object} attrs:optional
 * @param {Object} styles:optional
 * @param {String} html:optional
 * @return {HTMLElement} 
 * @throws {TypeError} when the element not exist
 */
js.core.Dom.updateEl = function(el, attrs, styles, html){
	var ele = this.$(el);
	if(!ele) throw new TypeError("[js.core.Dom#updateEl]The element not exist.");
	
	this.setAttributes(ele, attrs);
	this.setStyles(ele, styles);
    if (html) this.replaceHtml(ele, html);
	return ele;
}
/**
 * Creates a new element by attributs, styles and innerHTML.
 * 
 * @method createEl
 * @param {String} tag the created element's tag name
 * @param {Object} attrs:optional
 * @param {Object} styles:optional
 * @param {String} html:optional
 * @return {HTMLElement} 
 * @throws {TypeError} when The tag is empty
 */
js.core.Dom.createEl = function(tag, attrs, styles, html){
	if(!tag) throw new TypeError("[js.core.Dom#createEl]The tag is empty.");
	
	var el = null;
	if(tag == 'input' && js.core.Env.ie){//fix ie bug: input's name and value
		el = document.createElement('<INPUT name="'+attrs['name']+'" value="'+attrs['value']+'"/>');
	}else{
		el = document.createElement(tag);
		if(attrs && attrs['name']) el.name = attrs['name'];
	}
	
	this.updateEl(el, attrs, styles, html);   
    return el;
}

/**
 * Adds a class name to a given element or collection of elements. 
 * @method addClass
 * @param {String|HTMLElement|Array} el The element or collection to add the class to 
 * @param {String} className the class name to add to the class attribute 
 * @return {Boolean|Array} A pass/fail boolean or array of booleans 
 */
/**
 * Removes a class name from a given element or collection of elements.
 * @method removeClass         
 * @param {String | HTMLElement | Array} el The element or collection to remove the class from
 * @param {String} className the class name to remove from the class attribute
 * @return {Boolean | Array} A pass/fail boolean or array of booleans
 */
/**
 * Replace a class with another class for a given element or collection of elements.
 * If no oldClassName is present, the newClassName is simply added.
 * @method replaceClass  
 * @param {String | HTMLElement | Array} el The element or collection to remove the class from
 * @param {String} oldClassName the class name to be replaced
 * @param {String} newClassName the class name that will be replacing the old class name
 * @return {Boolean | Array} A pass/fail boolean or array of booleans
 */
/**
 * Determines whether an HTMLElement has the given className.
 * @method hasClass
 * @param {String | HTMLElement | Array} el The element or collection to test
 * @param {String} className the class name to search for
 * @return {Boolean | Array} A boolean value or array of boolean values
 */
/**
 * Provides a normalized attribute interface. 
 * @method getAttribute
 * @param {String | HTMLElement} el The target element for the attribute.
 * @param {String} attr The attribute to get.
 * @return {String} The current value of the attribute. 
 */
/**
 * Returns an array of HTMLElement childNodes. 
 * @method getChildren
 * @param {String | HTMLElement} node The HTMLElement or an ID to use as the starting point 
 * @return {Array} A static array of HTMLElements
 */
/**
 * Returns an array of HTMLElement childNodes that pass the test method. 
 * @method getChildrenBy
 * @param {HTMLElement} node The HTMLElement to start from
 * @param {Function} method A boolean function used to test children that receives the node being tested as its only argument
 * @return {Array} A static array of HTMLElements
 */
/**
 * Returns the left scroll value of the document 
 * @method getDocumentScrollLeft
 * @param {HTMLElement} document:optional The document to get the scroll value of
 * @return {Int}  The amount that the document is scrolled to the left
 */
/**
 * Returns the top scroll value of the document 
 * @method getDocumentScrollTop
 * @param {HTMLElement} document:optional The document to get the scroll value of
 * @return {Int}  The amount that the document is scrolled to the top
 */
/**
 * Returns the first HTMLElement that passes the test applied by the supplied boolean method.
 * @method getElementBy
 * @param {Function} method - A boolean method for testing elements which receives the element as its only argument.
 * @param {String} tag:optional The tag name of the elements being collected
 * @param {String | HTMLElement} root:optional The HTMLElement or an ID to use as the starting point 
 * @return {HTMLElement}
 */
/**
 * Returns an array of HTMLElements that pass the test applied by supplied boolean method.
 * For optimized performance, include a tag and/or root node when possible.
 * Note: This method operates against a live collection, so modifying the 
 * collection in the callback (removing/appending nodes, etc.) will have
 * side effects.  Instead you should iterate the returned nodes array,
 * as you would with the native "getElementsByTagName" method. 
 * @method getElementsBy
 * @param {Function} method - A boolean method for testing elements which receives the element as its only argument.
 * @param {String} tag:optional The tag name of the elements being collected
 * @param {String | HTMLElement} root:optional The HTMLElement or an ID to use as the starting point 
 * @param {Function} apply:optional A function to apply to each element when found 
 * @param {Object} o:optional An optional arg that is passed to the supplied method
 * @param {Boolean} overrides:optional Whether or not to override the scope of "method" with "o"
 * @return {Array} Array of HTMLElements
 */
/**
 * Returns an array of HTMLElements with the given class.
 * For optimized performance, include a tag and/or root node when possible.
 * Note: This method operates against a live collection, so modifying the 
 * collection in the callback (removing/appending nodes, etc.) will have
 * side effects.  Instead you should iterate the returned nodes array,
 * as you would with the native "getElementsByTagName" method. 
 * @method getElementsByClassName
 * @param {String} className The class name to match against
 * @param {String} tag:optional The tag name of the elements being collected
 * @param {String | HTMLElement} root:optional The HTMLElement or an ID to use as the starting point. This element is not included in the className scan.
 * @param {Function} apply:optional A function to apply to each element when found 
 * @param {Object} o:optional An optional arg that is passed to the supplied method
 * @param {Boolean} overrides:optional Whether or not to override the scope of "method" with "o"
 * @return {Array} An array of elements that have the given class name
 */
/**
 * Gets the current position of an element based on page coordinates. 
 * Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
 * @method getXY
 * @param {String | HTMLElement | Array} el Accepts a string to use as an ID, an actual DOM
 * reference, or an Array of IDs and/or HTMLElements
 * @return {Array} The XY position of the element(s)
 */
/**
 * Gets the current X position of an element based on page coordinates.  The element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
 * @method getX
 * @param {String | HTMLElement | Array} el Accepts a string to use as an ID, an actual DOM reference, or an Array of IDs and/or HTMLElements
 * @return {Number | Array} The X position of the element(s)
 */
/**
 * Gets the current Y position of an element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
 * @method getY
 * @param {String | HTMLElement | Array} el Accepts a string to use as an ID, an actual DOM reference, or an Array of IDs and/or HTMLElements
 * @return {Number | Array} The Y position of the element(s)
 */
/**
 * Set the position of an html element in page coordinates, regardless of how the element is positioned.
 * The element(s) must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
 * @method setXY
 * @param {String | HTMLElement | Array} el Accepts a string to use as an ID, an actual DOM reference, or an Array of IDs and/or HTMLElements
 * @param {Array} pos Contains X & Y values for new position (coordinates are page-based)
 * @param {Boolean} noRetry By default we try and set the position a second time if the first fails
 */
/**
 * Set the X position of an html element in page coordinates, regardless of how the element is positioned.
 * The element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
 * @method setX
 * @param {String | HTMLElement | Array} el Accepts a string to use as an ID, an actual DOM reference, or an Array of IDs and/or HTMLElements.
 * @param {Int} x The value to use as the X coordinate for the element(s).
 */
/**
 * Set the Y position of an html element in page coordinates, regardless of how the element is positioned.
 * The element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
 * @method setY
 * @param {String | HTMLElement | Array} el Accepts a string to use as an ID, an actual DOM reference, or an Array of IDs and/or HTMLElements.
 * @param {Int} x To use as the Y coordinate for the element(s).
 */
/**
 * Determines whether an HTMLElement is present in the current document.
 * @method inDocument         
 * @param {String | HTMLElement} el The element to search for
 * @param {Object} doc:optional An optional document to search, defaults to element's owner document 
 * @return {Boolean} Whether or not the element is present in the current document
 */
/**
 * Inserts the new node as the next sibling of the reference node 
 * @method insertAfter
 * @param {String | HTMLElement} newNode The node to be inserted
 * @param {String | HTMLElement} referenceNode The node to insert the new node after 
 * @return {HTMLElement} The node that was inserted (or null if insert fails) 
 */
/**
 * Inserts the new node as the previous sibling of the reference node 
 * @method insertBefore
 * @param {String | HTMLElement} newNode The node to be inserted
 * @param {String | HTMLElement} referenceNode The node to insert the new node before 
 * @return {HTMLElement} The node that was inserted (or null if insert fails) 
 */
/**
 * Determines whether an HTMLElement is an ancestor of another HTML element in the DOM hierarchy.
 * @method isAncestor
 * @param {String | HTMLElement} haystack The possible ancestor
 * @param {String | HTMLElement} needle The possible descendent
 * @return {Boolean} Whether or not the haystack is an ancestor of needle
 */



/**********************************************
 * The Native Object Extension
 * 
 * Note:
 * 1: Don't expand "Object"
 * 
 * 2: Traversal a Array using "for in...", should write like this:
 * 	    for (k in arr){	
 * 			if (arr.hasOwnProperty(k)) {...}
 * 		}
 *    Or use the "forEach" function.
 *  
 *********************************************/

/**
 * @native String 
 */
var __WHITESPACE = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
/**
 * Trim the String's left and right empty chars.
 * 
 * @method trim
 * @see http://blog.stevenlevithan.com/archives/faster-trim-javascript
 * @return {String}
 */
String.prototype.trim = String.prototype.trim || function() {		
    var str = this.trimLeft();
	str = this.trimRight();
    return __WHITESPACE.indexOf(str.charAt(0)) === -1 ? str : '';
}
/**
 * Trim the String's left empty chars.
 * 
 * @method trimLeft
 * @return {String}
 */
String.prototype.trimLeft = function() {		
	var str = this;
	for (var i = 0,len = str.length; i < len; i++) {
      if (__WHITESPACE.indexOf(str.charAt(i)) === -1) {
        str = str.substring(i);
        break;
      }
    }
    return str;
}
/**
 * Trim the String's right empty chars.
 * 
 * @method trimRight
 * @return {String}
 */
String.prototype.trimRight = function() {		
	var str = this;
	for (i = str.length - 1; i >= 0; i--) {
      if (__WHITESPACE.indexOf(str.charAt(i)) === -1) {
        str = str.substring(0, i + 1);
        break;
      }
    }
    return str;
}
/**
 * Returns the text between start word and end word.
 * 
 * @method between
 * @param {String} startWord:optional
 * @param {String} endWord:optional
 * @return {String}
 */	
String.prototype.between = function(startWord, endWord) {		
	var pos1 = 0, pos2 = this.length;
	
	if(startWord){
		var p1 = this.indexOf(startWord);
		if (p1 >= 0) {			
			pos1 = p1 + startWord.length;
		}
	}
	
	if(endWord){
		var p2 = this.indexOf(endWord);
		if (p2 >= 0) {			
			pos2 = p2;
		}
	}
	
    return this.substring(pos1,pos2);
}	
/**
 * Ends with the string.
 * 
 * @method endsWith
 * @param {String} str
 * @return {Boolean}
 */
String.prototype.endsWith = function(str){	
	if(this.length==0 || !str || typeof str !='string') return false;
	if(str.length > this.length) return false;
	
  	return (this.substring(this.length-str.length)==str)?true:false;
}
/**
 * Starts with the string.
 * 
 * @method startsWith
 * @param {String} str
 * @return {Boolean}
 */
String.prototype.startsWith = function(str){	
	if(this.length==0 || !str || typeof str !='string') return false;
	if(str.length > this.length) return false;
	
  	return this.substr(0,str.length)==str?true:false;  
}
/**
 * Returns the byte length in UTF-8 encoding. If the byteSize is null then the default byteSize is 3. 
 * 
 * UTF-8  
 * The 8-bit encoding of Unicode. It is a variable-width encoding. 
 * One Unicode character can be 1 byte, 2 bytes, 3 bytes, or 4 bytes in UTF-8 encoding. 
 * Characters from the European scripts are represented in either 1 or 2 bytes. 
 * Characters from most Asian scripts are represented in 3 bytes. 
 * Supplementary characters are represented in 4 bytes.
 * 
 * @method byteLength
 * @param {Int} byteSize:optional
 * @return {Int}
 */
String.prototype.byteLength = function(byteSize){
	if(this.length==0) return 0; 
	if(!byteSize || byteSize<=0 || byteSize>4) byteSize = 3;
	return this.replace(/[^\x00-\xff]/g, ''+Math.pow(10,byteSize-1)).length;
};
/**
 * Transfer the string to a number. The default number is Zero when failed. 
 * 
 * @method toNumber
 * @param {Number} defaultNum:optional
 * @return {Number}
 */
String.prototype.toNumber = function(defaultNum){	
	return isNaN(this)?(defaultNum?Number(defaultNum):0):Number(this);
};

/**
 * Returns a json string.
 * 
 * @method toJSONString
 * @return {String}
 */
String.prototype.toJSONString = function(){
	var s = this;	
	if (/["\\\x00-\x1f]/.test(s)) {
        return '"' + s.replace(/([\x00-\x1f\\"])/g, function(a, b) {
            var c = {
		        "\b": '\\b',
		        "\t": '\\t',
		        "\n": '\\n',
		        "\f": '\\f',
		        "\r": '\\r',
		        '"' : '\\"',
		        "\\": '\\\\'
		    }[b];
            if(c){
                return c;
            }
            c = b.charCodeAt();
            return "\\u00" +
                Math.floor(c / 16).toString(16) +
                (c % 16).toString(16);
        }) + '"';
    }
    return '"' + s + '"';
}

/**
 * @native Array 
 */
/**
 * Returns the index of a item in the array by asc order. 
 * 
 * @method indexOf
 * @param {Object} elt
 * @param {Function} fn:optional The compare function
 * @param {Object} thisp:optional The function's this
 * @param {Int} from:optional The default is Zero
 * @return {Int} returns -1 when not found
 */
Array.prototype.indexOf = function(elt, fn, thisp, from) {   
    var len = this.length >>> 0, thisP = thisp||this, fun = (fn && typeof fn == "function")?fn:null;   
  
    from = isNaN(from)? 0:Math.round(from); 
    if (from < 0) {
		from += len;
	}else if(from > len){
		from = len;
	}   
  
    for (; from < len; from++){
		if(fun){
			if(fun.call(thisP, elt, this[from], this, from)) return from;
		}else{
			if(this[from] === elt) return from;
		}
    }   
    return -1;     
};  
/**
 * Returns the index of a item in the array by desc order. 
 * 
 * @method lastIndexOf
 * @param {Object} elt
 * @param {Function} fn:optional The equals function
 * @param {Object} thisp:optional The function's this
 * @param {Int} from:optional The default is length-1
 * @return {Int} returns -1 when not found
 */
Array.prototype.lastIndexOf = function(elt, fn, thisp, from){
    var len = this.length, thisP = thisp||this, fun = (fn && typeof fn == "function")?fn:null;

    from = isNaN(from)? len-1:Math.round(from);
	if (from < 0) {
		from = Math.abs(from);
	}else if(from > len){
		from = len;
	}
    
    for (; from > -1; from--){
      	if(fun){
			if(fun.call(thisP, elt, this[from], this, from)) return from;
		}else{
			if(this[from] === elt) return from;
		}
    }
    return -1;
};
/**
 * Execute the callback function for every item.
 * 
 * @method forEach
 * @param {Function} fn
 * @param {Object}   thisp:optional the function's this
 * @throws {TypeError} The argument<fn> is not function
 */
Array.prototype.forEach = function(fn, thisp){
    var len = this.length >>> 0, thisP = thisp||this;
    if (typeof fn != "function")
        throw new TypeError('[Array#forEach]The argument<fn> is not function.');

    for (var i = 0; i < len; i++){
    	fn.call(thisP, this[i], i, this);
    }	
};
/**
 * Returns a JSONObject of all items for callback.
 * 
 * @method toMap
 * @param {Function} fn returns a array like [key,value]
 * @param {Object} thisp:optional the function's this
 * @return {Object}
 * @throws {TypeError} The argument<fn> is not function
 */
Array.prototype.toMap = function(fn, thisp){
    var len = this.length >>> 0, thisP = thisp||this;
    if (typeof fn != "function")
      throw new TypeError('[Array#toMap]The argument<fn> is not function.');

    var res = {};
	for (var i = 0; i < len; i++){
		var rst = fn.call(thisP, this[i], i, this);
      	if(rst && rst.length>1) res[rst[0]] = rst[1];
    }

    return res;
};

/**
 * If all items passed the function's test, then return true.
 * 
 * @method every
 * @param {Function} fn
 * @param {Object} thisp:optional the function's this
 * @return {Boolean}
 * @throws {TypeError} The argument<fn> is not function
 */
Array.prototype.every = function(fn, thisp){   
    var len = this.length >>> 0, thisP = thisp||this;   
    if (typeof fn != "function")   
      throw new TypeError('[Array#every]The argument<fn> is not function.');   
  
    for (var i = 0; i < len; i++) {   
      if (!fn.call(thisP, this[i], i, this))   
        return false;   
    }        
  
    return true;   
};   

/**
 * If one item passed the function's test, then return true.
 * 
 * @method some
 * @param {Function} fn
 * @param {Object} thisp:optional the function's this
 * @return {Boolean}
 * @throws {TypeError} The argument<fn> is not function
 */
Array.prototype.some = function(fn, thisp){
    var len = this.length >>> 0, thisP = thisp||this;
    if (typeof fn != "function")
      throw new TypeError('[Array#some]The argument<fn> is not function.');

    for (var i = 0; i < len; i++){
      if (fn.call(thisP, this[i], i, this))
        return true;
    }   

    return false;
};

/**
 * Filter all items to a new Array by the function's test.
 * 
 * @method filter
 * @param {Function} fn
 * @param {Object} thisp:optional the function's this
 * @return {Array}
 * @throws {TypeError} The argument<fn> is not function
 */
Array.prototype.filter = function(fn, thisp){   
    var len = this.length >>> 0, thisP = thisp||this;   
    if (typeof fn != "function")   
      throw new TypeError('[Array#filter]The argument<fn> is not function.');   
  
    var res = [];  
	for (var i = 0; i < len; i++){   
      var val = this[i];   
      if (fn.call(thisP, val, i, this)) res.push(val);  
    }       
  
    return res;   
};   
/**
 * Clear all items to empty.
 * 
 * @method clear
 */
Array.prototype.clear = function() {   
    this.length = 0;
}
/**
 * Clone to a new Array.
 * 
 * @method clone
 * @return {Array}
 */  
Array.prototype.clone = function() {   
    return this.slice(0);;   
}
/**
 * Determines whether or not the item be contains in the array.
 * 
 * @method contains
 * @param {Object} item
 * @param {Function} fn:optional the compare function
 * @param {Object} thisp:optional the function's this
 * @param {Int} from:optional the from index
 * @return {Boolean}
 */
Array.prototype.contains = function(item, fn, thisp, from) {  
	return this.indexOf(item, fn, thisp, from)==-1?false:true;
}
/**
 * Insert some items after the position.
 * 
 * @method splice
 * @param {Object} index
 * @param {Object...} item
 */
Array.prototype.insertAt = function(index, item){
    this.splice(index,0,item);
}
/**
 * If contains the item in the array, then removes it.
 * 
 * @method remove
 * @param {Object} item
 * @param {Function} fn:optional the compare function
 * @param {Object} thisp:optional the function's this
 * @param {Int} from:optional the from index
 * @return {Boolean}
 */
Array.prototype.remove = function(item, fn, thisp, from) {
	var index = this.indexOf(item, fn, thisp, from);
	if (index >= 0) {
		this.splice(index, 1);
		return true;
	}
	return false;
}
/**
 * Removes one item on the index position.
 * 
 * @method removeAt
 * @param {Int} index
 * @return {Boolean}
 */
Array.prototype.removeAt = function(index) {   
    if (index >= 0 && index < this.length) {
		this.splice(index, 1);
		return true;
	}
	return false;
} 
/**
 * Returns a new version of the array, without any null/undefined values.
 * 
 * @method compact
 * @return {Array}
 */
Array.prototype.compact = function() {   
    return this.filter(function(v){
		return !(v==null || typeof v=="undefined"); 
	});   
}     
/**
 * Returns a new array without repeat items.
 * 
 * @method uniq
 * @param {Function} fn:optional the equals function
 * @param {Object} thisp:optional the function's this
 * @return {Array}
 */
Array.prototype.uniq = function(fn, thisp) {   
    if(this.length < 2) return this.clone();
	
	var temp = this.clone(), thisp = thisp||this;   
    for(var i=0;i < temp.length;i++){   
		for(var j=i+1;j < temp.length;){   
			if(fn && fn.call(thisp, temp[i], temp[j], this)){
				temp.splice(j,1);
			}else if(temp[i] === temp[j]) {
				temp.splice(j,1);
			} else{j++;} 
		}   
	}   
	return temp;
}

/**
 * Returns a JSON String of the array.
 * 
 * @method toJSONString
 * @return {String}
 */
Array.prototype.toJSONString = function(){
	var a = ["["], b, i, l = this.length, v;
        for (i = 0; i < l; i++) {
            v = this[i];
            switch (typeof v) {
                case "undefined":
                case "function":
                case "unknown":
                    break;
                default:
                    if (b) a.push(',');
                    a.push(v === null ? "null" : js.lang.System.toJSONString(v));
                    b = true;
            }
        }
    a.push("]");
    return a.join("");
}

/**
 * @native Number  
 */
/**
 * Determines whether or not the object is a number. 
 * 
 * @static
 * @method isNumber
 * @param {String|Number} s
 * @return {Boolean}
 */
Number.isNumber = function(s){
	if(s==null || typeof s == 'undefined') return false;
	if(typeof s == 'number'){
		return true;
	}else if(typeof s == 'string'){
		var n = s.replace(/,/g, '');
		return (!n || isNaN(n))?false:true;
	}
	return false;
}

/**
 * Transfer a number. The default number is Zero.
 * 
 * @static
 * @method toNumber
 * @param {String|Number} s
 * @return {Number} 
 */
Number.toNumber = function(s){
	if(!Number.isNumber(s)) return 0;
	if(typeof s == 'string') {
		var f = parseFloat(s.replace(/,/g, ''));
		return isNaN(f)?0:f;
	}else{
		return Number(s);
	}		
}

/**
 * Transfer a integer. The default number is Zero.
 *
 * @static
 * @method toInt
 * @param {String|Number} s
 * @param {Int} mode:optional rounding mode: (default)0 is round down; 1 is ceil; 2 is floor
 * @return {Int}
 */
Number.toInt = function(s, mode){
	if(this.isInt(s)) return s;
	if(!mode) mode = 0;
	
	switch(mode){
		case 0: return Math.round(Number.toNumber(s));break;
		case 1: return Math.ceil(Number.toNumber(s));break;
		case 2: return Math.floor(Number.toNumber(s));break;
	} 		
}

/**
 * Determines whether or not the object is a float.
 * 
 * @static
 * @method isFloat
 * @param {String|Number} s
 * @return {Boolean}
 */
Number.isFloat = function(s){
	if(!Number.isNumber(s)) return false;
	var n = Number.toNumber(s).toString();		
	return n.indexOf('.') >= 0;
}
/**
 * Determines whether or not the object is a Integer.
 * 
 * @static
 * @method isInt
 * @param {String|Number} s
 * @return {Boolean}
 */
Number.isInt = function(){
	if(!Number.isNumber(s)) return false;
	var n = Number.toNumber(s).toString();		
	return n.indexOf('.') < 0;
}

/**
 * Determines whether or not the object is a negative number, excludes Zero.
 * 
 * @static
 * @method isNegative
 * @param {String|Number} s
 * @return {Boolean}
 */
Number.isNegative = function(s){
	if(!this.isNumber(s)) return false;
	var n = Number.toNumber(s);
	return n!==0 && Math.abs(n)!=n;
},
/**
 * Determines whether or not the object is a positive number, excludes Zero.
 * 
 * @static
 * @method isPositive
 * @param {String|Number} s
 * @return {Boolean}
 */
Number.isPositive = function(s){
	if(!this.isNumber(s)) return false;
	var n = Number.toNumber(s);
	return n!==0 && Math.abs(n)==n;
}

/**
 * Returns the length of decimal bit.
 * 
 * @method decLength
 * @return {Int}
 */
Number.prototype.decLength = function(){
	var s = Math.abs(this).toString();	
	var p = s.indexOf('.');
	
	return (p<0||p>s.length-1)?0:s.length-p-1;
}
/**
 * Returns the length of integer bit.
 * 
 * @method intLength
 * @return {Int}
 */
Number.prototype.intLength = function(){
	var s = Math.abs(this).toString();		
	var p = s.indexOf('.');
	
	return p<0?s.length:p;
}
/**
 * Precision multiplication.
 * 
 * @method mul
 * @param {Number|String} s 
 * @return {Number} 
 * @throws {TypeError} when The argument is null or not a number
 */
Number.prototype.mul = function(s){
	if(s==null || isNaN(s)) {
		throw new TypeError('[Number#mul]The argument is null or not a number.');
	}
	var n = (typeof s == 'string')?s.toNumber():s;
	
	if(n==0) return 0;
	if(n==1) return Number(this);
	
	if(this.isInt() && n.isInt()) {
		return Number(this*n);
	}
	
	var n1=Number(this.toString().replace('.','')), n2=Number(n.toString().replace('.',''));
	return n1*n2/Math.pow(10,this.decLength()+n.decLength());		
}
/**
 * Precision division.
 * 
 * @method div
 * @param {Number|String} s but Zero
 * @return {Number} 
 * @throws {TypeError} when The argument is zero or not a number
 */
Number.prototype.div = function(s){
	if(s==null || s==0 || isNaN(s)) {
		throw new TypeError('[Number#div]The argument is zero or not a number.');
	}
	
	if(this==0) return 0;
	var n = (typeof s == 'string')?s.toNumber():s;
	
	var n1 = Number(this.toString().replace('.','')), n2 = Number(n.toString().replace('.',''));	
	return Math.pow(10,n.decLength()-this.decLength()).mul(n1/n2);		
},	
/**
 * Precision addition.
 * 
 * @method add
 * @param {Number|String} s 
 * @return {Number}
 * @throws {TypeError} when The argument is not a number
 */
Number.prototype.add = function(s){
	if(s==null || isNaN(s)) {
		throw new TypeError('[Number#add]The argument is not a number.');
	}
	
	var n = (typeof s == 'string')?s.toNumber():s;
	
	if(n==0) return Number(this);
	if(this.isInt() && n.isInt()) {
		return Number(this+n);
	}
	
	var m = Math.pow(10,Math.max(this.decLength(),n.decLength()));	
	var n1=this.mul(m), n2=n.mul(m);		
	
	return (n1+n2)/m;
}
/**
 * Precision subtraction.
 * 
 * @method sub
 * @param {Number|String} s 
 * @return {Number} 
 * @throws {TypeError} when The argument is not a number
 */
Number.prototype.sub = function(s){
	if(s==null || isNaN(s)) {
		throw new TypeError('[Number#sub]The argument is not a number.');
	}
	
	var n = (typeof s == 'string')?s.toNumber():s;
	if(n==0) return Number(this);
	if(this.isInt() && n.isInt()) {
		return Number(this-n);
	}
	
	var m = Math.pow(10,Math.max(this.decLength(),n.decLength()));
	var n1=this.mul(m), n2=n.mul(m);		
	
	return (n1-n2)/m;
}
/**
 * Arithmetic such as '+ - * /'.
 * <code>
 * 3.1415.calc('*', 1, '/', 1, '+', 0, '-', 0) = 3.1415;
 * </code>
 * 
 * @method calc
 * @param {Number|String} s
 * @return {Number} 
 * @throws {TypeError} when The arguments is null or empty
 */
Number.prototype.calc = function(){
	if(arguments==null || arguments.length<=0) throw new TypeError('[Number#calc]The arguments is null or empty.');
	
	var n = Number(this);
	for (var i = 0, len = arguments.length; i < len; i+=2){
		if(i+1==len) break;
		
		var s = arguments[i+1];
		if (s != null && !isNaN(s)) {
			switch (arguments[i]) {
				case '+':
					n = n.add(s);
					break;
				case '-':
					n = n.sub(s);
					break;
				case '*':
					n = n.mul(s);
					break;
				case '/':
					n = n.div(s);
					break;
			}
		}
	}
	
	return n;
}
/**
 * Return a JSON String of the number.
 * 
 * @method toJSONString
 * @return {String}
 */
Number.prototype.toJSONString = function(){
	return isFinite(this) ? String(this) : "null";
}

/**
 * @native Date 
 */
/**
 * Determines whether or not a year is leap year.
 * 
 * @static
 * @method isLeapYear
 * @param {Int} year
 * @return {Boolean}
 */
Date.isLeapYear = function(year){return (((year%4===0)&&(year%100!==0))||(year%400===0));};
/**
 * Returns the max day number in the month and the year.
 * 
 * @static
 * @method getDaysInMonth
 * @param {Int} year
 * @param {Int} month 0~11
 * @return {Int}
 */
Date.getDaysInMonth = function(year, month){
	return new Date(year, month + 1, 0).getDate();
}
/**
 * Parse a String to a Date.
 * 
 * @static
 * @method parseDate
 * @param {String} sDate
 * @return {Date}
 * @throws {TypeError} when Arguments is null or bad-format
 */
Date.parseDate = function(sDate){
	if(!js.lang.System.isString(sDate)) throw new TypeError("[Date#parseDate]Arguments is null or bad-format.");
	
	if(/\s*(\d{1,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})/.test(sDate)){//start with yyyy-mm-dd or yyyy/mm/dd
		var m = sDate.match(/\d+/g);
		if(m){
			if(m.length>1) m[1] = parseInt(m[1])-1; 
			return eval('new Date('+m.join(',')+')');
		}
	} else {
		var ms = Date.parse(sDate);
		if (ms) {
			var d1970 = new Date(1970, 1, 1, 0, 0, 0, 000);
			d1970.setTime(ms);
			return d1970;
		}
	}
	throw new Error();			
}

/**
 * Determines whether or not a day equals this day.
 * 
 * @method equals
 * @param {Date} date
 * @param {String} type:optional values: "y"|"m"|"d"|"ymd"|"t"; the default value is "t"
 * @return {Boolean} 
 * @throws {TypeError} when Arguments is not date
 */
Date.prototype.equals = function(date,type){return this.compare(date,type)==0;};
/**
 * Add one day or month or year to this date.
 * 
 * @method add
 * @param {Int} n
 * @param {String} type values:"y"|"m"|"w"|"d"|"h"|"mi"|"s"|"ms"; the default value is "d"
 * @throws {TypeError} when The argument<n> is not integer
 */
Date.prototype.add = function(n, type){
	if(n.isFloat()) throw new TypeError('[Date#add]The argument<n> is not integer.');
	
	switch (type) {
		case 'y':
			this.add(n*12, 'm');break;
		case 'm':
			var d = this.getDate();
			this.setDate(1);
			this.setMonth(this.getMonth()+n);
			this.setDate(Math.min(d, Date.getDaysInMonth(this.getFullYear(),this.getMonth())));
			break;
		case 'd':
			this.add(n*86400000, 'ms');break;
		case 'h':
			this.add(n*3600000, 'ms');break;	
		case 'mi':
			this.add(n*60000, 'ms');break;	
		case 's':
			this.add(n*1000, 'ms');break;	
		case 'ms':
			this.setMilliseconds(this.getMilliseconds()+n);break;	
		case 'w':
			this.add(n*604800000, 'ms');break;
		default:
			this.add(n,'d');
	}
};

(function(){
var _compare = function(a,b){return (a>b)?1:(a<b?-1:0)};
var _compareYear = function(a,b){return _compare(a.getFullYear(), b.getFullYear())};
var _compareMonth = function(a,b){return _compare(a.getMonth(), b.getMonth())};
var _compareDate = function(a,b){return _compare(a.getDate(), b.getDate())};
/**
 * Compare this date with a date.
 * 
 * @method compare
 * @param {Date} date
 * @param {String} type:optional values: "y"|"m"|"d"|"ymd"|"t"; the default value is "t"
 * @return {Number} values: -1 is before the date; 0 is equals the date; 1 is after the date
 * @throws {TypeError} when The argument<date> is not date
 */	
Date.prototype.compare = function(date, type){
	if(!date || !(date instanceof Date)) throw new TypeError('[Date#compare]The argument<date> is not date.');
	
	switch (type) {
		case 'y':
			return _compareYear(this,date);
		case 'm':
			return _compareMonth(this,date);
		case 'd':
			return _compareDate(this,date);
		case 'ymd':
			var i = _compareYear(this,date);
			if(i!=0) return i;
			i = _compareMonth(this,date);
			if(i!=0) return i;
			i = _compareDate(this,date);
			return i;
		default:
			return _compare(this.getTime(), date.getTime());
	}		
}	
	
var _format = function(i){
    var str = i.toString();
    return (str.length < 2) ? '0' + str : str;
}
var _ymdString = function(date, split){
    return date.getFullYear() + split + _format(date.getMonth() + 1) + split + _format(date.getDate());
}
var _hmsString = function(date, split){
    return _format(date.getHours()) + split + _format(date.getMinutes()) + split + _format(date.getSeconds());
}  

/** 
 * Format the date to a String.
 * 
 * @method format
 * @param {String|Function} a String values: "hh:mm:ss"|"yyyy-MM-dd"|"yyyy-MM-dd hh:mm:ss"|"yyyy/MM/dd"|"yyyy/MM/dd hh:mm:ss"; or a function with arguments this date
 * @param {Object} thisP:optional the callback function's "this"
 * @return {String} 
 */	
Date.prototype.format = function(arg, thisP){
	if(!arg || js.lang.System.isString(arg)){
		switch(arg){
			case 'hh:mm:ss': return _hmsString(this, ':');
			case 'yyyy-MM-dd': return _ymdString(this, '-');
			case 'yyyy-MM-dd hh:mm:ss': return _ymdString(this, '-')+' '+_hmsString(this, ':');
			case 'yyyy/MM/dd': return _ymdString(this, '/');
			case 'yyyy/MM/dd hh:mm:ss': return _ymdString(this, '/')+' '+_hmsString(this, ':');
			default: return _ymdString(this, '-');
		}
	}else if(js.lang.System.isFunction(arg)){
		try{
			return arg.apply(thisP, [this]);
		}catch(e){return this.toLocaleString();}
	}else {
		return this.toLocaleString();
	}	
}

/** 
 * Format this date to a JSON String.
 * 
 * @method toJSONString
 * @return {String} 
 */
Date.prototype.toJSONString = function() {
  return '"' + _ymdString(this, '-') + "T" + _hmsString(this, ':') + '"';
}
})();

(function(){
/**
 * Returns the root dir of the JSDK source. 
 * The script search the dir by URL if not be setup manually.
 */
var _root = function(){
	var scripts = document.getElementsByTagName('script');
	if(!scripts) return '';
	for(var i=0,len=scripts.length;i<len;i++){
		var src = scripts[i].src;		
		if(src.indexOf('/core/js-core') > 0){
			return src.substring(0,src.indexOf('/core/js-core'));
		}
	}
	return '';	
}()

/**
 * @class js.lang.Loader
 * @static
 */
js.lang.Loader = function(){
	var L = js.lang.System, $ = js.core.Dom.$, head = document.head||document.getElementsByTagName('head')[0];
	
	var _loadImage = function(len, index, url, onload, onerror, loadContext, errorContext){
		var imgObj = new Image();
		if(L.isFunction(onload)) imgObj.onload = function(){
			onload.call(loadContext||imgObj, imgObj, len, index);
		}
		if(L.isFunction(onerror)) imgObj.onerror = function(){
			onerror.call(errorContext||imgObj, imgObj, len, index);
		}
		imgObj.src = url;
	}		
	
	return {
		/**
		 * @field {String} SOURCE_ROOT_DIR
		 */
		SOURCE_ROOT_DIR: _root,
		/**
		 * Load many images from URL.
		 * 
		 * @struct js.lang.Callback {
		 *      "description": "a common json callback object"
		 *      ,"type":"object"
		 *      ,"properties":{
		 *           "fn":{"type":"string","required":true}
		 *           ,"scope":{"type":"object","required":false}
		 *           ,"args":{"type":"array","required":false}
		 *      }
		 * }
		 * 
		 * @method loadImage
		 * @param {String|Array} url the images's url
		 * @param {js.lang.Callback} loadHandler:optional 
		 * @param {js.lang.Callback} errorHandler:optional 
		 */
		loadImage: function(url, loadHandler, errorHandler){
			var onload = loadHandler?loadHandler['fn']:null, loadContext = loadHandler?loadHandler['scope']:null
			, onerror = errorHandler?errorHandler['fn']:null, errorContext = errorHandler?errorHandler['scope']:null;
			
			var urls = (L.isArray(url))?url:[url];
			for (var i = 0, len = urls.length; i < len; i++){
		        _loadImage(len, i, urls[i], onload, onerror, loadContext, errorContext);
		    }
		},
		_reloadHandle: function(head, child, reload){
			if (child) {
				if(reload) {
					head.removeChild(child);
					return false;
				}else{
					return true;
				}				
			}
			return false; 
		},
		_setupOnload: function(obj, fn, scope){
			if(!fn) return; 
			
			var loadFn = function () {
				fn.call(scope||window, obj);
			}, errorFn = function(){
				throw new Error();
			}
			obj.onerror = errorFn;
			
			obj.onload = loadFn;
			obj.onreadystatechange = function() {//compatible fix
                if (this.readyState === 'loaded' || this.readyState === 'complete') {
                	loadFn();
                }
            };          		
		},
		/**
		 * Load css from URL.
		 * 
		 * @struct js.lang.Loader$cssConfig {
		 *      "description": "a css file's config"
		 *      ,"type":"object"
		 *      ,"properties":{
		 *           "src":{"type":"string","required":true}
		 *           ,"id":{"type":"string","required":false}
		 *           ,"reload":{"type":"boolean","required":false}
		 *      }
		 * }
		 * @method loadCss
		 * @param {js.lang.Loader$cssConfig} cssConfig 
		 * @return {Boolean}
		 */		
		loadCss: function(cssConfig){
			var cssObj = $(cssConfig['id']);
			if(this._reloadHandle(head, cssObj, cssConfig['reload'])) return true;
			
		    try {
				cssObj = document.createElement('link');
				cssObj.href = cssConfig['src'];
				cssObj.rel = 'stylesheet';
				cssObj.type = 'text/css';
				cssObj.id = cssConfig['id'];				
				head.appendChild(cssObj);				
			}catch(e){
				return false;
			}
			return true;
		},
		/**
		 * Load js from URL.
		 * 
		 * @struct js.lang.Loader$jsConfig {
		 *      "description": "a js file's config"
		 *      ,"type":"object"
		 *      ,"properties":{
		 *           "src":{"type":"string","required":true}
		 *           ,"id":{"type":"string","required":false}
		 *           ,"reload":{"type":"boolean","required":false}
		 *           ,"charset":{"type":"string","required":false}
		 *           ,"defer":{"type":"boolean","required":false}
		 *           ,"onloaded":{"type":"function","required":false}
		 *           ,"scope":{"type":"object","required":false}
		 *      }
		 * }
		 * @method loadJs
		 * @param {js.lang.Loader$jsConfig} jsConfig 
		 * @return {Boolean}
		 */
		loadJs: function(jsConfig){
			var jsObj = $(jsConfig['id']);
			//if(this._reloadHandle(head, jsObj, jsConfig['reload'])) return true;
			
			try {
				jsObj = document.createElement('script');
				jsObj.setAttribute('id', jsConfig['id']);
				jsObj.setAttribute('charset', jsConfig['charset']||'utf-8');
				if (jsConfig['defer']) jsObj.setAttribute('defer', jsConfig['defer']);
				jsObj.type = 'text/javascript';
				jsObj.src = jsConfig['src'];
				
				this._setupOnload(jsObj, jsConfig['onloaded'], jsConfig['scope']);
				head.appendChild(jsObj);
			}catch(e){
				return false;
			}
			return true;			
		},
		_loadLib: function(a, fn){
			if(a.endsWith('js')) {
				return this.loadJs({'src':this.SOURCE_ROOT_DIR+a,'onloaded':fn})
			}else{
				return this.loadCss({'src':this.SOURCE_ROOT_DIR+a})
			}
		},
		_loadLibs: function(list, fn){
			if(js.lang.System.isArray(list)){
				return list.every(function(a, i, arr){
					if(i==arr.length-1){
						return this._loadLib(a, fn);
					}else{
						return this._loadLib(a);
					}					
				}, this);				
			}else{
				return this._loadLib(list, fn);
			}
		},
		/**
		 * Load js or css from URL.
		 * 
		 * @struct js.lang.Loader$resList {
		 *      "description": "a css or js files list"
		 *      ,"type":"object"
		 *      ,"properties":{
		 *           "css":{"type":"array","required":false}
		 *           ,"js":{"type":"array","required":false}
		 *      }
		 * }
		 * 
		 * @method loadLib
		 * @param {js.lang.Loader$resList} resList 
		 * @param {Function} fnLoad
		 * @throws {Error} when loading failure
		 */
		loadLib: function(resList, fnLoad){
			var cssList = resList['css'], jsList = resList['js'];			
			if(cssList) this._loadLibs(cssList);
			if(jsList) this._loadLibs(jsList, fnLoad);
		}		
	}
}();	
})()

js.core.Event = js.util.Event;
js.core.CustomEvent = js.util.CustomEvent;
js.core.EventProvider = js.util.EventProvider;
/**
 * EventProvider is designed to be used with js.lang.System.augment to wrap 
 * CustomEvents in an interface that allows events to be subscribed to 
 * and fired by name.  This makes it possible for implementing code to
 * subscribe to an event that either has not been created yet, or will
 * not be created at all.
 *
 * @class js.core.EventProvider
 */
/**
 * Subscribe to a CustomEvent by event type
 *
 * @method subscribe
 * @param {String}   p_type  the type, or name of the event
 * @param {Function} p_fn    the function to exectute when the event fires
 * @param {Object}   p_obj:optional   An object to be passed along when the event 
 *                              fires
 * @param {boolean}  overrideContext:optional If true, the obj passed in becomes the 
 *                              execution scope of the listener
 */
/**
 * Unsubscribes one or more listeners the from the specified event
 * @method unsubscribe
 * @param  {String} p_type  The type, or name of the event.  If the type
 *                          is not specified, it will attempt to remove
 *                          the listener from all hosted events.
 * @param  {Function} p_fn:optional The subscribed function to unsubscribe, if not
 *                          supplied, all subscribers will be removed.
 * @param  {Object}  p_obj:optional The custom object passed to subscribe.  This is
 *                        optional, but if supplied will be used to
 *                        disambiguate multiple listeners that are the same
 *                        (e.g., you subscribe many object using a function
 *                        that lives on the prototype)
 * @return {Boolean} true if the subscriber was found and detached.
 */
/**
 * Removes all listeners from the specified event.  If the event type
 * is not specified, all listeners from all hosted custom events will
 * be removed.
 * @method unsubscribeAll
 * @param {string} p_type:optional  The type, or name of the event
 */
/**
 * Creates a new custom event of the specified type.  If a custom event
 * by that name already exists, it will not be re-created.  In either
 * case the custom event is returned. 
 *
 * @method createEvent
 *
 * @param  {string} p_type the type, or name of the event
 * @param  {object} p_config:optional config params.  Valid properties are:
 *
 *  <ul>
 *    <li>
 *      scope: defines the default execution scope.  If not defined
 *      the default scope will be this instance.
 *    </li>
 *    <li>
 *      silent: if true, the custom event will not generate log messages.
 *      This is false by default.
 *    </li>
 *    <li>
 *      fireOnce: if true, the custom event will only notify subscribers
 *      once regardless of the number of times the event is fired.  In
 *      addition, new subscribers will be executed immediately if the
 *      event has already fired.
 *      This is false by default.
 *    </li>
 *    <li>
 *      onSubscribeCallback: specifies a callback to execute when the
 *      event has a new subscriber.  This will fire immediately for
 *      each queued subscriber if any exist prior to the creation of
 *      the event.
 *    </li>
 *  </ul>
 *
 *  @return {js.core.CustomEvent} the custom event
 */
/**
 * Fire a custom event by name.  The callback functions will be executed
 * from the scope specified when the event was created, and with the 
 * following parameters:
 *   <ul>
 *   <li>The first argument fire() was executed with</li>
 *   <li>The custom object (if any) that was passed into the subscribe() 
 *       method</li>
 *   </ul>
 * @method fireEvent
 * @param {String} p_type the type, or name of the event
 * @param {Object..} arguments an arbitrary set of parameters to pass to 
 *                            the handler.
 * @return {Boolean} the return value from CustomEvent.fire
 */
/**
 * Returns true if the custom event of the provided type has been created
 * with createEvent.
 * @method hasEvent
 * @param {String} type name of the event
 */

/**
 * The CustomEvent class lets you define events for your application
 * that can be subscribed to by one or more independent component.
 *
 * @class js.core.CustomEvent
 * @constructor
 * @param {String}  type The type of event, which is passed to the callback
 *                  when the event fires
 * @param {Object}  context The context the event will fire from.  "this" will
 *                  refer to this object in the callback.  Default value: 
 *                  the window object.  The listener can override this.
 * @param {boolean} silent pass true to prevent the event from writing to
 *                  the debugsystem
 * @param {int}     signature the signature that the custom event subscriber
 *                  will receive. js.core.CustomEvent.LIST or 
 *                  js.core.CustomEvent.FLAT.  The default is
 *                  js.core.CustomEvent.LIST.
 * @param {boolean} fireOnce  If configured to fire once, the custom event 
 * will only notify subscribers a single time regardless of how many times 
 * the event is fired.  In addition, new subscribers will be notified 
 * immediately if the event has already been fired.
 */
/**
 * The type of event, returned to subscribers when the event fires
 * @field {string} type
 */
/**
 * The context the event will fire from by default. Defaults to the window obj.
 * @field {object} scope
 */
/**
 * By default all custom events are logged in the debug build. Set silent to true 
 * to disable debug output for this event.
 * @field {boolean} silent
 */
/**
 * If configured to fire once, the custom event will only notify subscribers
 * a single time regardless of how many times the event is fired.  In addition,
 * new subscribers will be notified immediately if the event has already been
 * fired.
 * @field {boolean} fireOnce
 */
/**
 * Indicates whether or not this event has ever been fired.
 * @field {boolean} fired
 */
/**
 * Custom events support two styles of arguments provided to the event
 * subscribers.  
 * <ul>
 * <li>js.core.CustomEvent.LIST: 
 *   <ul>
 *   <li>param1: event name</li>
 *   <li>param2: array of arguments sent to fire</li>
 *   <li>param3: <optional> a custom object supplied by the subscriber</li>
 *   </ul>
 * </li>
 * <li>js.core.CustomEvent.FLAT
 *   <ul>
 *   <li>param1: the first argument passed to fire.  If you need to
 *           pass multiple parameters, use and array or object literal</li>
 *   <li>param2: <optional> a custom object supplied by the subscriber</li>
 *   </ul>
 * </li>
 * </ul>
 * @field {int} signature
 */
/**
 * In order to make it possible to execute the rest of the subscriber
 * stack when one thows an exception, the subscribers exceptions are
 * caught.  The most recent exception is stored in this property
 * @field {Error} lastError
 */
/**
 * Subscriber listener sigature constant.  The LIST type returns three
 * parameters: the event type, the array of args passed to fire, and
 * the optional custom object
 * @constant {int} LIST
 */
/**
 * Subscriber listener sigature constant.  The FLAT type returns two
 * parameters: the first argument passed to fire and the optional 
 * custom object
 * @constant {int} FLAT
 */
/**
 * Subscribes the caller to this event
 * @method subscribe
 * @param {Function} fn        The function to execute
 * @param {Object}   obj       An object to be passed along when the event fires.
 * @param {boolean|Object} overrideContext:optional If true, the obj passed in becomes the execution 
 * context of the listener. If an object, that object becomes the execution context.
 */
/**
 * Unsubscribes subscribers.
 * @method unsubscribe
 * @param {Function} fn  The subscribed function to remove, if not supplied
 *                       all will be removed
 * @param {Object}   obj:optional  The custom object passed to subscribe.  This is
 *                        optional, but if supplied will be used to
 *                        disambiguate multiple listeners that are the same
 *                        (e.g., you subscribe many object using a function
 *                        that lives on the prototype)
 * @return {boolean} True if the subscriber was found and detached.
 */
/**
 * Notifies the subscribers.  The callback functions will be executed
 * from the context specified when the event was created, and with the 
 * following parameters:
 *   <ul>
 *   <li>The type of event</li>
 *   <li>All of the arguments fire() was executed with as an array</li>
 *   <li>The custom object (if any) that was passed into the subscribe() 
 *       method</li>
 *   </ul>
 * @method fire 
 * @param {Object..} arguments:optional an arbitrary set of parameters to pass to 
 *                            the handler.
 * @return {boolean} if one of the subscribers returned false, true otherwise
 */
/**
 * Removes all listeners
 * @method unsubscribeAll
 * @return {int} The number of listeners unsubscribed
 */
/**
 * @method toString
 * @return {String}
 */

/**
 * The event utility provides functions to add and remove event listeners,
 * event cleansing.  It also tries to automatically remove listeners it
 * registers during the unload event.
 *
 * @class js.core.Event
 * @static
 */
/**
 * addListener/removeListener can throw errors in unexpected scenarios.
 * These errors are suppressed, the method returns false, and this property is set.
 * @field {Error} lastError
 */
/**
 * True when the document is initially usable.
 * @field {boolean} DOMReady
 */
/**
 * Errors thrown by subscribers of custom events are caught
 * and the error message is written to the debug console.  If
 * this property is set to true, it will also re-throw the
 * error. The default is false.
 * @field {boolean} throwErrors
 */
/**
 * Executes the supplied callback when the item with the supplied
 * id is found.  This is meant to be used to execute behavior as
 * soon as possible as the page loads.  If you use this after the
 * initial page load it will poll for a fixed time for the element.
 * The number of times it will poll and the frequency are
 * configurable.  By default it will poll for 10 seconds.
 *
 * <p>The callback is executed with a single parameter:
 * the custom object parameter, if provided.</p>
 *
 * @method onAvailable
 *
 * @param {string|string[]}   id the id of the element, or an array of ids to look for.
 * @param {function} fn what to execute when the element is found.
 * @param {object}   obj:optional an optional object to be passed back as a parameter to fn.
 * @param {boolean|object}  overrideContext:optional If set to true, fn will execute
 *                   in the context of obj, if set to an object it
 *                   will execute in the context of that object
 * @param {boolean} checkContent:optional check child node readiness (onContentReady)
 */
/**
 * Works the same way as onAvailable, but additionally checks the
 * state of sibling elements to determine if the content of the
 * available element is safe to modify.
 *
 * <p>The callback is executed with a single parameter:
 * the custom object parameter, if provided.</p>
 *
 * @method onContentReady
 *
 * @param {string}   id the id of the element to look for.
 * @param {function} fn what to execute when the element is ready.
 * @param {object}   obj:optional an optional object to be passed back as
 *                   a parameter to fn.
 * @param {boolean|object}  overrideContext:optional If set to true, fn will execute
 *                   in the context of obj.  If an object, fn will
 *                   exectute in the context of that object
 */
/**
 * Executes the supplied callback when the DOM is first usable.  This
 * will execute immediately if called after the DOMReady event has
 * fired.   @todo the DOMContentReady event does not fire when the
 * script is dynamically injected into the page.  This means the
 * DOMReady custom event will never fire in FireFox or Opera when the
 * library is injected.  It _will_ fire in Safari, and the IE 
 * implementation would allow for us to fire it if the defered script
 * is not available.  We want this to behave the same in all browsers.
 * Is there a way to identify when the script has been injected 
 * instead of included inline?  Is there a way to know whether the 
 * window onload event has fired without having had a listener attached 
 * to it when it did so?
 *
 * <p>The callback is a CustomEvent, so the signature is:</p>
 * <p>type &lt;string&gt;, args &lt;array&gt;, customobject &lt;object&gt;</p>
 * <p>For DOMReady events, there are no fire argments, so the
 * signature is:</p>
 * <p>"DOMReady", [], obj</p>
 *
 * @method onDOMReady
 *
 * @param {function} fn what to execute when the element is found.
 * @param {object}   obj:optional an optional object to be passed back as
 *                   a parameter to fn.
 * @param {boolean|object}  overrideContext:optional If set to true, fn will execute
 *                   in the context of obj, if set to an object it
 *                   will execute in the context of that object
 */
/**
 * Appends an event handler
 *
 * @method addListener
 *
 * @param {String|HTMLElement|Array<HTMLElement>} el An id, an element 
 *  reference, or a collection of ids and/or elements to assign the 
 *  listener to.
 * @param {String}   sType     The type of event to append
 * @param {Function} fn        The method the event invokes
 * @param {Object}   obj:optional    An arbitrary object that will be 
 *                             passed as a parameter to the handler
 * @param {Boolean|object}  overrideContext:optional  If true, the obj passed in becomes
 *                             the execution context of the listener. If an
 *                             object, this object becomes the execution
 *                             context.
 * @return {Boolean} True if the action was successful or defered,
 *                        false if one or more of the elements 
 *                        could not have the listener attached,
 *                        or if the operation throws an exception.
 */
/**
 * an alias for addListener 
 * @method on
 */
/**
 * Returns the charcode for an event
 * @method getCharCode
 * @param {Event} ev the dom event
 * @return {int} the event's charCode
 */
/**
 * Returns all listeners attached to the given element via addListener.
 * Optionally, you can specify a specific type of event to return.
 * @method getListeners
 * @param {HTMLElement|string} el the element or element id to inspect 
 * @param {string} sType:optional type of listener to return. If
 * left out, all listeners will be returned
 * @return {Object} Contains the following fields:
 * &nbsp;&nbsp;type:   (string)   the type of event
 * &nbsp;&nbsp;fn:     (function) the callback supplied to addListener
 * &nbsp;&nbsp;obj:    (object)   the custom object supplied to addListener
 * &nbsp;&nbsp;adjust: (boolean|object)  whether or not to adjust the default context
 * &nbsp;&nbsp;scope: (boolean)  the derived context based on the adjust parameter
 * &nbsp;&nbsp;index:  (int)      its position in the Event util listener cache
 */  
/**
 * Returns the event's pageX
 * @method getPageX
 * @param {Event} ev the dom event
 * @return {int} the event's pageX
 */
/**
 * Returns the event's pageY
 * @method getPageY
 * @param {Event} ev the dom event
 * @return {int} the event's pageY
 */
/**
 * Returns the pageX and pageY properties as an indexed array.
 * @method getXY
 * @param {Event} ev the dom event
 * @return {Array} the pageX and pageY properties of the event
 */
/**
 * Returns the event's related target 
 * @method getRelatedTarget
 * @param {Event} ev the dom event
 * @return {HTMLElement} the event's relatedTarget
 */
/**
 * Returns the event's target element.  Safari sometimes provides
 * a text node, and this is automatically resolved to the text
 * node's parent so that it behaves like other browsers.
 * @method getTarget
 * @param {Event} ev the event
 * @return {HTMLElement} the event's target
 */
/**
 * Returns the time of the event.  If the time is not included, the
 * event is modified using the current time.
 * @method getTime
 * @param {Event} ev the dom event
 * @return {Date} the time of the event
 */
/**
 * Prevents the default behavior of the event
 * @method preventDefault
 * @param {Event} ev the dom event
 */
/**
 * Removes all listeners attached to the given element via addListener.
 * Optionally, the node's children can also be purged.
 * Optionally, you can specify a specific type of event to remove.
 * @method purgeElement
 * @param {HTMLElement} el the element to purge
 * @param {boolean} recurse:optional recursively purge this element's children
 * as well.  Use with caution.
 * @param {string} sType:optional type of listener to purge. If
 * left out, all listeners will be removed
 */
/**
 * Removes an event listener
 *
 * @method removeListener
 *
 * @param {String|HTMLElement|Array|HTMLElement[]} el An id, an element 
 *  reference, or a collection of ids and/or elements to remove
 *  the listener from.
 * @param {String} sType the type of event to remove.
 * @param {Function} fn:optional the method the event invokes.  If fn is
 *  undefined, then all event handlers for the type of event are 
 *  removed.
 * @return {boolean} true if the unbind was successful, false 
 *  otherwise.
 */
/**
 * Convenience method for stopPropagation + preventDefault
 * @method stopEvent
 * @param {Event} ev the dom event 
 */
/**
 * Stops event propagation
 * @method stopPropagation
 * @param {Event} ev the dom event
 */

