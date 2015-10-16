/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.1
 * @author feng.chun
 * @date 2011-09-26
 * 
 * @requires /core/js-core.js
 */
/*!
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.8.1
*/
if(!YAHOO.util.DragDropMgr){YAHOO.util.DragDropMgr=function(){var A=YAHOO.util.Event,B=YAHOO.util.Dom;return{useShim:false,_shimActive:false,_shimState:false,_debugShim:false,_createShim:function(){var C=document.createElement("div");C.id="yui-ddm-shim";if(document.body.firstChild){document.body.insertBefore(C,document.body.firstChild);}else{document.body.appendChild(C);}C.style.display="none";C.style.backgroundColor="red";C.style.position="absolute";C.style.zIndex="99999";B.setStyle(C,"opacity","0");this._shim=C;A.on(C,"mouseup",this.handleMouseUp,this,true);A.on(C,"mousemove",this.handleMouseMove,this,true);A.on(window,"scroll",this._sizeShim,this,true);},_sizeShim:function(){if(this._shimActive){var C=this._shim;C.style.height=B.getDocumentHeight()+"px";C.style.width=B.getDocumentWidth()+"px";C.style.top="0";C.style.left="0";}},_activateShim:function(){if(this.useShim){if(!this._shim){this._createShim();}this._shimActive=true;var C=this._shim,D="0";if(this._debugShim){D=".5";}B.setStyle(C,"opacity",D);this._sizeShim();C.style.display="block";}},_deactivateShim:function(){this._shim.style.display="none";this._shimActive=false;},_shim:null,ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initialized:false,locked:false,interactionInfo:null,init:function(){this.initialized=true;},POINT:0,INTERSECT:1,STRICT_INTERSECT:2,mode:0,_execOnAll:function(E,D){for(var F in this.ids){for(var C in this.ids[F]){var G=this.ids[F][C];if(!this.isTypeOfDD(G)){continue;}G[E].apply(G,D);}}},_onLoad:function(){this.init();A.on(document,"mouseup",this.handleMouseUp,this,true);A.on(document,"mousemove",this.handleMouseMove,this,true);A.on(window,"unload",this._onUnload,this,true);A.on(window,"resize",this._onResize,this,true);},_onResize:function(C){this._execOnAll("resetConstraints",[]);},lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isLocked:function(){return this.locked;},locationCache:{},useCache:true,clickPixelThresh:3,clickTimeThresh:1000,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,fromTimeout:false,regDragDrop:function(D,C){if(!this.initialized){this.init();}if(!this.ids[C]){this.ids[C]={};}this.ids[C][D.id]=D;},removeDDFromGroup:function(E,C){if(!this.ids[C]){this.ids[C]={};}var D=this.ids[C];if(D&&D[E.id]){delete D[E.id];}},_remove:function(E){for(var D in E.groups){if(D){var C=this.ids[D];if(C&&C[E.id]){delete C[E.id];}}}delete this.handleIds[E.id];},regHandle:function(D,C){if(!this.handleIds[D]){this.handleIds[D]={};}this.handleIds[D][C]=C;},isDragDrop:function(C){return(this.getDDById(C))?true:false;},getRelated:function(H,D){var G=[];for(var F in H.groups){for(var E in this.ids[F]){var C=this.ids[F][E];if(!this.isTypeOfDD(C)){continue;}if(!D||C.isTarget){G[G.length]=C;}}}return G;},isLegalTarget:function(G,F){var D=this.getRelated(G,true);for(var E=0,C=D.length;E<C;++E){if(D[E].id==F.id){return true;}}return false;},isTypeOfDD:function(C){return(C&&C.__ygDragDrop);},isHandle:function(D,C){return(this.handleIds[D]&&this.handleIds[D][C]);},getDDById:function(D){for(var C in this.ids){if(this.ids[C][D]){return this.ids[C][D];}}return null;},handleMouseDown:function(E,D){this.currentTarget=YAHOO.util.Event.getTarget(E);this.dragCurrent=D;var C=D.getEl();this.startX=YAHOO.util.Event.getPageX(E);this.startY=YAHOO.util.Event.getPageY(E);this.deltaX=this.startX-C.offsetLeft;this.deltaY=this.startY-C.offsetTop;this.dragThreshMet=false;this.clickTimeout=setTimeout(function(){var F=YAHOO.util.DDM;F.startDrag(F.startX,F.startY);F.fromTimeout=true;},this.clickTimeThresh);},startDrag:function(C,E){if(this.dragCurrent&&this.dragCurrent.useShim){this._shimState=this.useShim;this.useShim=true;}this._activateShim();clearTimeout(this.clickTimeout);var D=this.dragCurrent;if(D&&D.events.b4StartDrag){D.b4StartDrag(C,E);D.fireEvent("b4StartDragEvent",{x:C,y:E});}if(D&&D.events.startDrag){D.startDrag(C,E);D.fireEvent("startDragEvent",{x:C,y:E});}this.dragThreshMet=true;},handleMouseUp:function(C){if(this.dragCurrent){clearTimeout(this.clickTimeout);if(this.dragThreshMet){if(this.fromTimeout){this.fromTimeout=false;this.handleMouseMove(C);}this.fromTimeout=false;this.fireEvents(C,true);}else{}this.stopDrag(C);this.stopEvent(C);}},stopEvent:function(C){if(this.stopPropagation){YAHOO.util.Event.stopPropagation(C);}if(this.preventDefault){YAHOO.util.Event.preventDefault(C);}},stopDrag:function(E,D){var C=this.dragCurrent;if(C&&!D){if(this.dragThreshMet){if(C.events.b4EndDrag){C.b4EndDrag(E);C.fireEvent("b4EndDragEvent",{e:E});}if(C.events.endDrag){C.endDrag(E);C.fireEvent("endDragEvent",{e:E});}}if(C.events.mouseUp){C.onMouseUp(E);C.fireEvent("mouseUpEvent",{e:E});}}if(this._shimActive){this._deactivateShim();if(this.dragCurrent&&this.dragCurrent.useShim){this.useShim=this._shimState;this._shimState=false;}}this.dragCurrent=null;this.dragOvers={};},handleMouseMove:function(F){var C=this.dragCurrent;if(C){if(YAHOO.util.Event.isIE&&!F.button){this.stopEvent(F);return this.handleMouseUp(F);}else{if(F.clientX<0||F.clientY<0){}}if(!this.dragThreshMet){var E=Math.abs(this.startX-YAHOO.util.Event.getPageX(F));var D=Math.abs(this.startY-YAHOO.util.Event.getPageY(F));if(E>this.clickPixelThresh||D>this.clickPixelThresh){this.startDrag(this.startX,this.startY);}}if(this.dragThreshMet){if(C&&C.events.b4Drag){C.b4Drag(F);C.fireEvent("b4DragEvent",{e:F});}if(C&&C.events.drag){C.onDrag(F);C.fireEvent("dragEvent",{e:F});}if(C){this.fireEvents(F,false);}}this.stopEvent(F);}},fireEvents:function(V,L){var a=this.dragCurrent;if(!a||a.isLocked()||a.dragOnly){return;}var N=YAHOO.util.Event.getPageX(V),M=YAHOO.util.Event.getPageY(V),P=new YAHOO.util.Point(N,M),K=a.getTargetCoord(P.x,P.y),F=a.getDragEl(),E=["out","over","drop","enter"],U=new YAHOO.util.Region(K.y,K.x+F.offsetWidth,K.y+F.offsetHeight,K.x),I=[],D={},Q=[],c={outEvts:[],overEvts:[],dropEvts:[],enterEvts:[]};for(var S in this.dragOvers){var d=this.dragOvers[S];if(!this.isTypeOfDD(d)){continue;
}if(!this.isOverTarget(P,d,this.mode,U)){c.outEvts.push(d);}I[S]=true;delete this.dragOvers[S];}for(var R in a.groups){if("string"!=typeof R){continue;}for(S in this.ids[R]){var G=this.ids[R][S];if(!this.isTypeOfDD(G)){continue;}if(G.isTarget&&!G.isLocked()&&G!=a){if(this.isOverTarget(P,G,this.mode,U)){D[R]=true;if(L){c.dropEvts.push(G);}else{if(!I[G.id]){c.enterEvts.push(G);}else{c.overEvts.push(G);}this.dragOvers[G.id]=G;}}}}}this.interactionInfo={out:c.outEvts,enter:c.enterEvts,over:c.overEvts,drop:c.dropEvts,point:P,draggedRegion:U,sourceRegion:this.locationCache[a.id],validDrop:L};for(var C in D){Q.push(C);}if(L&&!c.dropEvts.length){this.interactionInfo.validDrop=false;if(a.events.invalidDrop){a.onInvalidDrop(V);a.fireEvent("invalidDropEvent",{e:V});}}for(S=0;S<E.length;S++){var Y=null;if(c[E[S]+"Evts"]){Y=c[E[S]+"Evts"];}if(Y&&Y.length){var H=E[S].charAt(0).toUpperCase()+E[S].substr(1),X="onDrag"+H,J="b4Drag"+H,O="drag"+H+"Event",W="drag"+H;if(this.mode){if(a.events[J]){a[J](V,Y,Q);a.fireEvent(J+"Event",{event:V,info:Y,group:Q});}if(a.events[W]){a[X](V,Y,Q);a.fireEvent(O,{event:V,info:Y,group:Q});}}else{for(var Z=0,T=Y.length;Z<T;++Z){if(a.events[J]){a[J](V,Y[Z].id,Q[0]);a.fireEvent(J+"Event",{event:V,info:Y[Z].id,group:Q[0]});}if(a.events[W]){a[X](V,Y[Z].id,Q[0]);a.fireEvent(O,{event:V,info:Y[Z].id,group:Q[0]});}}}}}},getBestMatch:function(E){var G=null;var D=E.length;if(D==1){G=E[0];}else{for(var F=0;F<D;++F){var C=E[F];if(this.mode==this.INTERSECT&&C.cursorIsOver){G=C;break;}else{if(!G||!G.overlap||(C.overlap&&G.overlap.getArea()<C.overlap.getArea())){G=C;}}}}return G;},refreshCache:function(D){var F=D||this.ids;for(var C in F){if("string"!=typeof C){continue;}for(var E in this.ids[C]){var G=this.ids[C][E];if(this.isTypeOfDD(G)){var H=this.getLocation(G);if(H){this.locationCache[G.id]=H;}else{delete this.locationCache[G.id];}}}}},verifyEl:function(D){try{if(D){var C=D.offsetParent;if(C){return true;}}}catch(E){}return false;},getLocation:function(H){if(!this.isTypeOfDD(H)){return null;}var F=H.getEl(),K,E,D,M,L,N,C,J,G;try{K=YAHOO.util.Dom.getXY(F);}catch(I){}if(!K){return null;}E=K[0];D=E+F.offsetWidth;M=K[1];L=M+F.offsetHeight;N=M-H.padding[0];C=D+H.padding[1];J=L+H.padding[2];G=E-H.padding[3];return new YAHOO.util.Region(N,C,J,G);},isOverTarget:function(K,C,E,F){var G=this.locationCache[C.id];if(!G||!this.useCache){G=this.getLocation(C);this.locationCache[C.id]=G;}if(!G){return false;}C.cursorIsOver=G.contains(K);var J=this.dragCurrent;if(!J||(!E&&!J.constrainX&&!J.constrainY)){return C.cursorIsOver;}C.overlap=null;if(!F){var H=J.getTargetCoord(K.x,K.y);var D=J.getDragEl();F=new YAHOO.util.Region(H.y,H.x+D.offsetWidth,H.y+D.offsetHeight,H.x);}var I=F.intersect(G);if(I){C.overlap=I;return(E)?true:C.cursorIsOver;}else{return false;}},_onUnload:function(D,C){this.unregAll();},unregAll:function(){if(this.dragCurrent){this.stopDrag();this.dragCurrent=null;}this._execOnAll("unreg",[]);this.ids={};},elementCache:{},getElWrapper:function(D){var C=this.elementCache[D];if(!C||!C.el){C=this.elementCache[D]=new this.ElementWrapper(YAHOO.util.Dom.get(D));}return C;},getElement:function(C){return YAHOO.util.Dom.get(C);},getCss:function(D){var C=YAHOO.util.Dom.get(D);return(C)?C.style:null;},ElementWrapper:function(C){this.el=C||null;this.id=this.el&&C.id;this.css=this.el&&C.style;},getPosX:function(C){return YAHOO.util.Dom.getX(C);},getPosY:function(C){return YAHOO.util.Dom.getY(C);},swapNode:function(E,C){if(E.swapNode){E.swapNode(C);}else{var F=C.parentNode;var D=C.nextSibling;if(D==E){F.insertBefore(E,C);}else{if(C==E.nextSibling){F.insertBefore(C,E);}else{E.parentNode.replaceChild(C,E);F.insertBefore(E,D);}}}},getScroll:function(){var E,C,F=document.documentElement,D=document.body;if(F&&(F.scrollTop||F.scrollLeft)){E=F.scrollTop;C=F.scrollLeft;}else{if(D){E=D.scrollTop;C=D.scrollLeft;}else{}}return{top:E,left:C};},getStyle:function(D,C){return YAHOO.util.Dom.getStyle(D,C);},getScrollTop:function(){return this.getScroll().top;},getScrollLeft:function(){return this.getScroll().left;},moveToEl:function(C,E){var D=YAHOO.util.Dom.getXY(E);YAHOO.util.Dom.setXY(C,D);},getClientHeight:function(){return YAHOO.util.Dom.getViewportHeight();},getClientWidth:function(){return YAHOO.util.Dom.getViewportWidth();},numericSort:function(D,C){return(D-C);},_timeoutCount:0,_addListeners:function(){var C=YAHOO.util.DDM;if(YAHOO.util.Event&&document){C._onLoad();}else{if(C._timeoutCount>2000){}else{setTimeout(C._addListeners,10);if(document&&document.body){C._timeoutCount+=1;}}}},handleWasClicked:function(C,E){if(this.isHandle(E,C.id)){return true;}else{var D=C.parentNode;while(D){if(this.isHandle(E,D.id)){return true;}else{D=D.parentNode;}}}return false;}};}();YAHOO.util.DDM=YAHOO.util.DragDropMgr;YAHOO.util.DDM._addListeners();}(function(){var A=YAHOO.util.Event;var B=YAHOO.util.Dom;YAHOO.util.DragDrop=function(E,C,D){if(E){this.init(E,C,D);}};YAHOO.util.DragDrop.prototype={events:null,on:function(){this.subscribe.apply(this,arguments);},id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:false,lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isTarget:true,padding:null,dragOnly:false,useShim:false,_domRef:null,__ygDragDrop:true,constrainX:false,constrainY:false,minX:0,maxX:0,minY:0,maxY:0,deltaX:0,deltaY:0,maintainOffset:false,xTicks:null,yTicks:null,primaryButtonOnly:true,available:false,hasOuterHandles:false,cursorIsOver:false,overlap:null,b4StartDrag:function(C,D){},startDrag:function(C,D){},b4Drag:function(C){},onDrag:function(C){},onDragEnter:function(C,D){},b4DragOver:function(C){},onDragOver:function(C,D){},b4DragOut:function(C){},onDragOut:function(C,D){},b4DragDrop:function(C){},onDragDrop:function(C,D){},onInvalidDrop:function(C){},b4EndDrag:function(C){},endDrag:function(C){},b4MouseDown:function(C){},onMouseDown:function(C){},onMouseUp:function(C){},onAvailable:function(){},getEl:function(){if(!this._domRef){this._domRef=B.get(this.id);
}return this._domRef;},getDragEl:function(){return B.get(this.dragElId);},init:function(F,C,D){this.initTarget(F,C,D);A.on(this._domRef||this.id,"mousedown",this.handleMouseDown,this,true);for(var E in this.events){this.createEvent(E+"Event");}},initTarget:function(E,C,D){this.config=D||{};this.events={};this.DDM=YAHOO.util.DDM;this.groups={};if(typeof E!=="string"){this._domRef=E;E=B.generateId(E);}this.id=E;this.addToGroup((C)?C:"default");this.handleElId=E;A.onAvailable(E,this.handleOnAvailable,this,true);this.setDragElId(E);this.invalidHandleTypes={A:"A"};this.invalidHandleIds={};this.invalidHandleClasses=[];this.applyConfig();},applyConfig:function(){this.events={mouseDown:true,b4MouseDown:true,mouseUp:true,b4StartDrag:true,startDrag:true,b4EndDrag:true,endDrag:true,drag:true,b4Drag:true,invalidDrop:true,b4DragOut:true,dragOut:true,dragEnter:true,b4DragOver:true,dragOver:true,b4DragDrop:true,dragDrop:true};if(this.config.events){for(var C in this.config.events){if(this.config.events[C]===false){this.events[C]=false;}}}this.padding=this.config.padding||[0,0,0,0];this.isTarget=(this.config.isTarget!==false);this.maintainOffset=(this.config.maintainOffset);this.primaryButtonOnly=(this.config.primaryButtonOnly!==false);this.dragOnly=((this.config.dragOnly===true)?true:false);this.useShim=((this.config.useShim===true)?true:false);},handleOnAvailable:function(){this.available=true;this.resetConstraints();this.onAvailable();},setPadding:function(E,C,F,D){if(!C&&0!==C){this.padding=[E,E,E,E];}else{if(!F&&0!==F){this.padding=[E,C,E,C];}else{this.padding=[E,C,F,D];}}},setInitPosition:function(F,E){var G=this.getEl();if(!this.DDM.verifyEl(G)){if(G&&G.style&&(G.style.display=="none")){}else{}return;}var D=F||0;var C=E||0;var H=B.getXY(G);this.initPageX=H[0]-D;this.initPageY=H[1]-C;this.lastPageX=H[0];this.lastPageY=H[1];this.setStartPosition(H);},setStartPosition:function(D){var C=D||B.getXY(this.getEl());this.deltaSetXY=null;this.startPageX=C[0];this.startPageY=C[1];},addToGroup:function(C){this.groups[C]=true;this.DDM.regDragDrop(this,C);},removeFromGroup:function(C){if(this.groups[C]){delete this.groups[C];}this.DDM.removeDDFromGroup(this,C);},setDragElId:function(C){this.dragElId=C;},setHandleElId:function(C){if(typeof C!=="string"){C=B.generateId(C);}this.handleElId=C;this.DDM.regHandle(this.id,C);},setOuterHandleElId:function(C){if(typeof C!=="string"){C=B.generateId(C);}A.on(C,"mousedown",this.handleMouseDown,this,true);this.setHandleElId(C);this.hasOuterHandles=true;},unreg:function(){A.removeListener(this.id,"mousedown",this.handleMouseDown);this._domRef=null;this.DDM._remove(this);},isLocked:function(){return(this.DDM.isLocked()||this.locked);},handleMouseDown:function(J,I){var D=J.which||J.button;if(this.primaryButtonOnly&&D>1){return;}if(this.isLocked()){return;}var C=this.b4MouseDown(J),F=true;if(this.events.b4MouseDown){F=this.fireEvent("b4MouseDownEvent",J);}var E=this.onMouseDown(J),H=true;if(this.events.mouseDown){H=this.fireEvent("mouseDownEvent",J);}if((C===false)||(E===false)||(F===false)||(H===false)){return;}this.DDM.refreshCache(this.groups);var G=new YAHOO.util.Point(A.getPageX(J),A.getPageY(J));if(!this.hasOuterHandles&&!this.DDM.isOverTarget(G,this)){}else{if(this.clickValidator(J)){this.setStartPosition();this.DDM.handleMouseDown(J,this);this.DDM.stopEvent(J);}else{}}},clickValidator:function(D){var C=YAHOO.util.Event.getTarget(D);return(this.isValidHandleChild(C)&&(this.id==this.handleElId||this.DDM.handleWasClicked(C,this.id)));},getTargetCoord:function(E,D){var C=E-this.deltaX;var F=D-this.deltaY;if(this.constrainX){if(C<this.minX){C=this.minX;}if(C>this.maxX){C=this.maxX;}}if(this.constrainY){if(F<this.minY){F=this.minY;}if(F>this.maxY){F=this.maxY;}}C=this.getTick(C,this.xTicks);F=this.getTick(F,this.yTicks);return{x:C,y:F};},addInvalidHandleType:function(C){var D=C.toUpperCase();this.invalidHandleTypes[D]=D;},addInvalidHandleId:function(C){if(typeof C!=="string"){C=B.generateId(C);}this.invalidHandleIds[C]=C;},addInvalidHandleClass:function(C){this.invalidHandleClasses.push(C);},removeInvalidHandleType:function(C){var D=C.toUpperCase();delete this.invalidHandleTypes[D];},removeInvalidHandleId:function(C){if(typeof C!=="string"){C=B.generateId(C);}delete this.invalidHandleIds[C];},removeInvalidHandleClass:function(D){for(var E=0,C=this.invalidHandleClasses.length;E<C;++E){if(this.invalidHandleClasses[E]==D){delete this.invalidHandleClasses[E];}}},isValidHandleChild:function(F){var E=true;var H;try{H=F.nodeName.toUpperCase();}catch(G){H=F.nodeName;}E=E&&!this.invalidHandleTypes[H];E=E&&!this.invalidHandleIds[F.id];for(var D=0,C=this.invalidHandleClasses.length;E&&D<C;++D){E=!B.hasClass(F,this.invalidHandleClasses[D]);}return E;},setXTicks:function(F,C){this.xTicks=[];this.xTickSize=C;var E={};for(var D=this.initPageX;D>=this.minX;D=D-C){if(!E[D]){this.xTicks[this.xTicks.length]=D;E[D]=true;}}for(D=this.initPageX;D<=this.maxX;D=D+C){if(!E[D]){this.xTicks[this.xTicks.length]=D;E[D]=true;}}this.xTicks.sort(this.DDM.numericSort);},setYTicks:function(F,C){this.yTicks=[];this.yTickSize=C;var E={};for(var D=this.initPageY;D>=this.minY;D=D-C){if(!E[D]){this.yTicks[this.yTicks.length]=D;E[D]=true;}}for(D=this.initPageY;D<=this.maxY;D=D+C){if(!E[D]){this.yTicks[this.yTicks.length]=D;E[D]=true;}}this.yTicks.sort(this.DDM.numericSort);},setXConstraint:function(E,D,C){this.leftConstraint=parseInt(E,10);this.rightConstraint=parseInt(D,10);this.minX=this.initPageX-this.leftConstraint;this.maxX=this.initPageX+this.rightConstraint;if(C){this.setXTicks(this.initPageX,C);}this.constrainX=true;},clearConstraints:function(){this.constrainX=false;this.constrainY=false;this.clearTicks();},clearTicks:function(){this.xTicks=null;this.yTicks=null;this.xTickSize=0;this.yTickSize=0;},setYConstraint:function(C,E,D){this.topConstraint=parseInt(C,10);this.bottomConstraint=parseInt(E,10);this.minY=this.initPageY-this.topConstraint;this.maxY=this.initPageY+this.bottomConstraint;if(D){this.setYTicks(this.initPageY,D);
}this.constrainY=true;},resetConstraints:function(){if(this.initPageX||this.initPageX===0){var D=(this.maintainOffset)?this.lastPageX-this.initPageX:0;var C=(this.maintainOffset)?this.lastPageY-this.initPageY:0;this.setInitPosition(D,C);}else{this.setInitPosition();}if(this.constrainX){this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize);}if(this.constrainY){this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize);}},getTick:function(I,F){if(!F){return I;}else{if(F[0]>=I){return F[0];}else{for(var D=0,C=F.length;D<C;++D){var E=D+1;if(F[E]&&F[E]>=I){var H=I-F[D];var G=F[E]-I;return(G>H)?F[D]:F[E];}}return F[F.length-1];}}},toString:function(){return("DragDrop "+this.id);}};YAHOO.augment(YAHOO.util.DragDrop,YAHOO.util.EventProvider);})();YAHOO.util.DD=function(C,A,B){if(C){this.init(C,A,B);}};YAHOO.extend(YAHOO.util.DD,YAHOO.util.DragDrop,{scroll:true,autoOffset:function(C,B){var A=C-this.startPageX;var D=B-this.startPageY;this.setDelta(A,D);},setDelta:function(B,A){this.deltaX=B;this.deltaY=A;},setDragElPos:function(C,B){var A=this.getDragEl();this.alignElWithMouse(A,C,B);},alignElWithMouse:function(C,G,F){var E=this.getTargetCoord(G,F);if(!this.deltaSetXY){var H=[E.x,E.y];YAHOO.util.Dom.setXY(C,H);var D=parseInt(YAHOO.util.Dom.getStyle(C,"left"),10);var B=parseInt(YAHOO.util.Dom.getStyle(C,"top"),10);this.deltaSetXY=[D-E.x,B-E.y];}else{YAHOO.util.Dom.setStyle(C,"left",(E.x+this.deltaSetXY[0])+"px");YAHOO.util.Dom.setStyle(C,"top",(E.y+this.deltaSetXY[1])+"px");}this.cachePosition(E.x,E.y);var A=this;setTimeout(function(){A.autoScroll.call(A,E.x,E.y,C.offsetHeight,C.offsetWidth);},0);},cachePosition:function(B,A){if(B){this.lastPageX=B;this.lastPageY=A;}else{var C=YAHOO.util.Dom.getXY(this.getEl());this.lastPageX=C[0];this.lastPageY=C[1];}},autoScroll:function(J,I,E,K){if(this.scroll){var L=this.DDM.getClientHeight();var B=this.DDM.getClientWidth();var N=this.DDM.getScrollTop();var D=this.DDM.getScrollLeft();var H=E+I;var M=K+J;var G=(L+N-I-this.deltaY);var F=(B+D-J-this.deltaX);var C=40;var A=(document.all)?80:30;if(H>L&&G<C){window.scrollTo(D,N+A);}if(I<N&&N>0&&I-N<C){window.scrollTo(D,N-A);}if(M>B&&F<C){window.scrollTo(D+A,N);}if(J<D&&D>0&&J-D<C){window.scrollTo(D-A,N);}}},applyConfig:function(){YAHOO.util.DD.superclass.applyConfig.call(this);this.scroll=(this.config.scroll!==false);},b4MouseDown:function(A){this.setStartPosition();this.autoOffset(YAHOO.util.Event.getPageX(A),YAHOO.util.Event.getPageY(A));},b4Drag:function(A){this.setDragElPos(YAHOO.util.Event.getPageX(A),YAHOO.util.Event.getPageY(A));},toString:function(){return("DD "+this.id);}});YAHOO.util.DDProxy=function(C,A,B){if(C){this.init(C,A,B);this.initFrame();}};YAHOO.util.DDProxy.dragElId="ygddfdiv";YAHOO.extend(YAHOO.util.DDProxy,YAHOO.util.DD,{resizeFrame:true,centerFrame:false,createFrame:function(){var B=this,A=document.body;if(!A||!A.firstChild){setTimeout(function(){B.createFrame();},50);return;}var F=this.getDragEl(),E=YAHOO.util.Dom;if(!F){F=document.createElement("div");F.id=this.dragElId;var D=F.style;D.position="absolute";D.visibility="hidden";D.cursor="move";D.border="2px solid #aaa";D.zIndex=999;D.height="25px";D.width="25px";var C=document.createElement("div");E.setStyle(C,"height","100%");E.setStyle(C,"width","100%");E.setStyle(C,"background-color","#ccc");E.setStyle(C,"opacity","0");F.appendChild(C);A.insertBefore(F,A.firstChild);}},initFrame:function(){this.createFrame();},applyConfig:function(){YAHOO.util.DDProxy.superclass.applyConfig.call(this);this.resizeFrame=(this.config.resizeFrame!==false);this.centerFrame=(this.config.centerFrame);this.setDragElId(this.config.dragElId||YAHOO.util.DDProxy.dragElId);},showFrame:function(E,D){var C=this.getEl();var A=this.getDragEl();var B=A.style;this._resizeProxy();if(this.centerFrame){this.setDelta(Math.round(parseInt(B.width,10)/2),Math.round(parseInt(B.height,10)/2));}this.setDragElPos(E,D);YAHOO.util.Dom.setStyle(A,"visibility","visible");},_resizeProxy:function(){if(this.resizeFrame){var H=YAHOO.util.Dom;var B=this.getEl();var C=this.getDragEl();var G=parseInt(H.getStyle(C,"borderTopWidth"),10);var I=parseInt(H.getStyle(C,"borderRightWidth"),10);var F=parseInt(H.getStyle(C,"borderBottomWidth"),10);var D=parseInt(H.getStyle(C,"borderLeftWidth"),10);if(isNaN(G)){G=0;}if(isNaN(I)){I=0;}if(isNaN(F)){F=0;}if(isNaN(D)){D=0;}var E=Math.max(0,B.offsetWidth-I-D);var A=Math.max(0,B.offsetHeight-G-F);H.setStyle(C,"width",E+"px");H.setStyle(C,"height",A+"px");}},b4MouseDown:function(B){this.setStartPosition();var A=YAHOO.util.Event.getPageX(B);var C=YAHOO.util.Event.getPageY(B);this.autoOffset(A,C);},b4StartDrag:function(A,B){this.showFrame(A,B);},b4EndDrag:function(A){YAHOO.util.Dom.setStyle(this.getDragEl(),"visibility","hidden");},endDrag:function(D){var C=YAHOO.util.Dom;var B=this.getEl();var A=this.getDragEl();C.setStyle(A,"visibility","");C.setStyle(B,"visibility","hidden");YAHOO.util.DDM.moveToEl(B,A);C.setStyle(A,"visibility","hidden");C.setStyle(B,"visibility","");},toString:function(){return("DDProxy "+this.id);}});YAHOO.util.DDTarget=function(C,A,B){if(C){this.initTarget(C,A,B);}};YAHOO.extend(YAHOO.util.DDTarget,YAHOO.util.DragDrop,{toString:function(){return("DDTarget "+this.id);}});YAHOO.register("dragdrop",YAHOO.util.DragDropMgr,{version:"2.8.1",build:"19"});

js.util.DragDropMgr = YAHOO.util.DragDropMgr;
js.util.DragDropMgr.getLocation = function(oDD) {
	var rg = YAHOO.util.DragDropMgr.getLocation(oDD);
	if(rg!=null) {
		return {x:rg.x,y:rg.y,w:rg.width,h:rg.height};
	}else{
		return null;
	}
}

js.util.DragDrop = YAHOO.util.DragDrop;

js.util.DD = YAHOO.util.DD;
js.util.DDProxy = YAHOO.util.DDProxy;
js.util.DDTarget = YAHOO.util.DDTarget;

/**
 * Defines the interface and base operation of items that that can be 
 * dragged or can be drop targets.  It was designed to be extended, overriding
 * the event handlers for startDrag, onDrag, onDragOver, onDragOut.
 * 
 * This class should not be instantiated until the onload event to ensure that
 * the associated elements are available.
 * The following would define a DragDrop obj that would interact with any 
 * other DragDrop obj in the "group1" group:
 * <pre>
 *  dd = new js.util.DragDrop("div1", "group1");
 * </pre>
 * Since none of the event handlers have been implemented, nothing would 
 * actually happen if you were to run the code above.  Normally you would 
 * override this class or one of the default implementations, but you can 
 * also override the methods you want on an instance of the class...
 * <pre>
 *  dd.onDragDrop = function(e, id) {
 *  &nbsp;&nbsp;alert("dd was dropped on " + id);
 *  }
 * </pre>
 * @class js.util.DragDrop
 * @abstract
 * @constructor
 * @param {String} id of the element that is linked to this instance
 * @param {String} sGroup:optional the group of related DragDrop objects
 * @param {object} config:optional an object containing configurable attributes
 *                Valid properties for DragDrop: 
 *                    padding, isTarget, maintainOffset, primaryButtonOnly,
 */

/**
 * The availabe property is false until the linked dom element is accessible. 
 * @field {boolean} available
 */
/**
 * Configuration attributes passed into the constructor
 * @field {object} config
 */
/**
 * Property that is assigned to a drag and drop object when testing to see if it is being targeted by another
 *  dd object. This property can be used in intersect mode to help determine the focus of the mouse interaction. 
 * DDM.getBestMatch uses this property first to determine the closest match in INTERSECT mode when multiple targets are part of the same interaction.
 * @field {boolean} cursorIsOver
 */
/**
 * If this flag is true, do not fire drop events. The element is a drag only element (for movement not dropping) 
 * @field {boolean} dragOnly
 */
/**
 * An Object Literal containing the events that we will be using: mouseDown, b4MouseDown, mouseUp, b4StartDrag
 * , startDrag, b4EndDrag, endDrag, mouseUp, drag, b4Drag, invalidDrop, b4DragOut, dragOut, dragEnter, b4DragOver
 * , dragOver, b4DragDrop, dragDrop By setting any of these to false, then event will not be fired. 
 * @field {object} events
 */
/**
 * The group defines a logical collection of DragDrop objects that are related. Instances only get events 
 * when interacting with other DragDrop object in the same group. This lets us define multiple groups using a single DragDrop subclass if we want. 
 * @field {string[]} groups
 */
/**
 * By default, drags can only be initiated if the mousedown occurs in the region the linked element is. 
 * This is done in part to work around a bug in some browsers that mis-report the mousedown if the previous 
 * mouseup happened outside of the window. This property is set to true if outer handles are defined. 
 * Default Value: false 
 * @field {boolean} hasOuterHandles
 */
/**
 * The id of the element associated with this object. This is what we refer to as the "linked element" 
 * because the size and position of this element is used to determine when the drag and drop objects have interacted. 
 * @field {string} id
 */
/**
 * By default, all instances can be a drop target. This can be disabled by setting isTarget to false.
 * @field {boolean} isTarget
 */
/**
 * Maintain offsets when we resetconstraints. Set to true when you want the position of the element relative 
 * to its parent to stay the same when the page changes 
 * @field {boolean} maintainOffset
 */
/**
 * The padding configured for this drag and drop object for calculating the drop zone intersection with this object. 
 * @field {int[]} padding
 */
/**
 * If this flag is true, a shim will be placed over the screen/viewable area to track mouse events. 
 * Should help with dragging elements over iframes and other controls. 
 * @field {boolean} useShim
 */
/**
 * Array of pixel locations the element will snap to if we specified a horizontal graduation/interval. 
 * This array is generated automatically when you define a tick interval. 
 * @field {int[]} xTicks
 */
/**
 * Array of pixel locations the element will snap to if we specified a vertical graduation/interval. 
 * This array is generated automatically when you define a tick interval. 
 * @field {int[]} yTicks
 */

/**
 * Add this instance to a group of related drag/drop objects.  All 
 * instances belong to at least one group, and can belong to as many 
 * groups as needed.
 * @method addToGroup
 * @param {string} sGroup the name of the group
 */
/**
 * Applies the configuration parameters that were passed into the constructor.
 * This is supposed to happen at each level through the inheritance chain.  So
 * a DDProxy implentation will execute apply config on DDProxy, DD, and 
 * DragDrop in order to get all of the parameters that are available in
 * each object.
 * @method applyConfig
 */
/**
 * Clears any constraints applied to this instance.  Also clears ticks
 * since they can't exist independent of a constraint at this time.
 * @method clearConstraints
 */
/**
 * Clears any tick interval defined for this instance
 * @method clearTicks
 */
/**
 * Returns a reference to the actual element to drag.  By default this is
 * the same as the html element, but it can be assigned to another 
 * element. An example of this can be found in js.util.DDProxy
 * @method getDragEl
 * @return {HTMLElement} the html element 
 */
/**
 * Returns a reference to the linked element
 * @method getEl
 * @return {HTMLElement} the html element 
 */
/**
 * Sets up the DragDrop object.  Must be called in the constructor of any js.util.DragDrop subclass
 * @method init
 * @param {string} id the id of the linked element
 * @param {string} sGroup:optional the group of related items
 * @param {object} config:optional configuration attributes
 */
/**
 * Initializes Targeting functionality only... the object does not
 * get a mousedown handler.
 * @method initTarget
 * @param {string} id the id of the linked element
 * @param {String} sGroup:optional the group of related items
 * @param {object} config:optional configuration attributes
 */
/**
 * Returns true if this instance is locked, or the drag drop mgr is locked
 * (meaning that all drag/drop is disabled on the page.)
 * @method isLocked
 * @return {boolean} true if this obj or all drag/drop is locked, else false
 */
/**
 * Lock this instance
 * @method lock
 */
/**
 * Unlock this instace
 * @method unlock
 */
/**
 * Shortcut for EventProvider.subscribe, see <a href="js.core.EventProvider.html#subscribe">js.core.EventProvider.subscribe</a>
 * @method on
 */
/**
 * Abstract method called during the onMouseMove event while dragging an object.
 * @method onDrag
 * @abstract
 * @param {Event} e the mousemove event
 */
/**
 * Abstract method called after a drag/drop object is clicked
 * and the drag or mousedown time thresholds have beeen met.
 * @method startDrag
 * @abstract
 * @param {int} X click location
 * @param {int} Y click location
 */
/**
 * Fired when we are done dragging the object
 * @method endDrag
 * @abstract
 * @param {Event} e the mouseup event
 */
/**
 * Abstract method called when this element fist begins hovering over 
 * another DragDrop obj
 * @method onDragEnter
 * @abstract
 * @param {Event} e the mousemove event
 * @param {String|js.util.DragDrop[]} id In POINT mode, the element
 * id this is hovering over.  In INTERSECT mode, an array of one or more 
 * dragdrop items being hovered over.
 */
/**
 * Abstract method called when this element is hovering over another 
 * DragDrop obj
 * @method onDragOver
 * @abstract
 * @param {Event} e the mousemove event
 * @param {String|DragDrop[]} id In POINT mode, the element
 * id this is hovering over.  In INTERSECT mode, an array of dd items 
 * being hovered over.
 */
/**
 * Abstract method called when we are no longer hovering over an element
 * @method onDragOut
 * @abstract
 * @param {Event} e the mousemove event
 * @param {String|js.util.DragDrop[]} id In POINT mode, the element
 * id this was hovering over.  In INTERSECT mode, an array of dd items 
 * that the mouse is no longer over.
 */
/**
 * Abstract method called when this item is dropped on another DragDrop 
 * obj
 * @method onDragDrop
 * @abstract
 * @param {Event} e the mouseup event
 * @param {String|js.util.DragDrop[]} id In POINT mode, the element
 * id this was dropped on.  In INTERSECT mode, an array of dd items this 
 * was dropped on.
 */
/**
 * Abstract method called when this item is dropped on an area with no
 * drop target
 * @method onInvalidDrop
 * @abstract
 * @param {Event} e the mouseup event
 */
/**
 * Event handler that fires when a drag/drop obj gets a mouseup
 * @method onMouseUp
 * @abstract
 * @param {Event} e the mouseup event
 */
/**
 * Event handler that fires when a drag/drop obj gets a mousedown
 * @method onMouseDown
 * @abstract
 * @param {Event} e the mousedown event
 */
/**
 * Remove's this instance from the supplied interaction group
 * @method removeFromGroup
 * @param {string}  sGroup  The group to drop
 */
/**
 * resetConstraints must be called if you manually reposition a dd element.
 * @method resetConstraints
 */
/**
 * Allows you to specify that an element other than the linked element 
 * will be moved with the cursor during a drag
 * @method setDragElId
 * @param id {string} the id of the element that will be used to initiate the drag
 */
/**
 * Allows you to specify a child of the linked element that should be 
 * used to initiate the drag operation.  An example of this would be if 
 * you have a content div with text and links.  Clicking anywhere in the 
 * content area would normally start the drag operation.  Use this method
 * to specify that an element inside of the content div is the element 
 * that starts the drag operation.
 * @method setHandleElId
 * @param {string} id the id of the element that will be used to 
 * initiate the drag.
 */
/**
 * Allows you to set an element outside of the linked element as a drag handle
 * @method setOuterHandleElId
 * @param {string} id the id of the element that will be used to initiate the drag
 */
/**
 * Configures the padding for the target zone in px.  Effectively expands
 * (or reduces) the virtual object size for targeting calculations.  
 * Supports css-style shorthand; if only one parameter is passed, all sides
 * will have that padding, and if only two are passed, the top and bottom
 * will have the first param, the left and right the second.
 * @method setPadding
 * @param {int} iTop    Top pad
 * @param {int} iRight  Right pad
 * @param {int} iBot    Bot pad
 * @param {int} iLeft   Left pad
 */
/**
 * By default, the element can be dragged any place on the screen.  Use 
 * this method to limit the horizontal travel of the element.  Pass in 
 * 0,0 for the parameters if you want to lock the drag to the y axis.
 * @method setXConstraint
 * @param {int} iLeft the number of pixels the element can move to the left
 * @param {int} iRight the number of pixels the element can move to the 
 * right
 * @param {int} iTickSize:optional optional parameter for specifying that the 
 * element
 * should move iTickSize pixels at a time.
 */
/**
 * By default, the element can be dragged any place on the screen.  Set 
 * this to limit the vertical travel of the element.  Pass in 0,0 for the
 * parameters if you want to lock the drag to the x axis.
 * @method setYConstraint
 * @param {int} iUp the number of pixels the element can move up
 * @param {int} iDown the number of pixels the element can move down
 * @param {int} iTickSize:optional optional parameter for specifying that the 
 * element should move iTickSize pixels at a time.
 */
/**
 * toString method
 * @method toString
 * @return {string} string representation of the dd obj
 */
/**
 * Remove all drag and drop hooks for this element
 * @method unreg
 */


/**
 * A DragDrop implementation where the linked element follows the 
 * mouse cursor during a drag.
 * @class js.util.DD
 * @extends js.util.DragDrop
 * @constructor
 * @param {String} id the id of the linked element 
 * @param {String} sGroup:optional the group of related DragDrop items
 * @param {object} config:optional an object containing configurable attributes
 *                Valid properties for DD: scroll
 */
/**
 * When set to true, the utility automatically tries to scroll the browser
 * window when a drag and drop element is dragged near the viewport boundary.
 * Defaults to true.
 * @field {boolean} scroll
 */
/**
 * Sets the pointer offset to the distance between the linked element's top 
 * left corner and the location the element was clicked
 * @method autoOffset
 * @param {int} iPageX the X coordinate of the click
 * @param {int} iPageY the Y coordinate of the click
 */
/** 
 * Sets the pointer offset.  You can call this directly to force the 
 * offset to be in a particular location (e.g., pass in 0,0 to set it 
 * to the center of the object, as done in YAHOO.widget.Slider)
 * @method setDelta
 * @param {int} iDeltaX the distance from the left
 * @param {int} iDeltaY the distance from the top
 */
/**
 * Sets the drag element to the location of the mousedown or click event, 
 * maintaining the cursor location relative to the location on the element 
 * that was clicked.  Override this if you want to place the element in a 
 * location other than where the cursor is.
 * @method setDragElPos
 * @param {int} iPageX the X coordinate of the mousedown or drag event
 * @param {int} iPageY the Y coordinate of the mousedown or drag event
 */
/**
 * Sets the element to the location of the mousedown or click event, 
 * maintaining the cursor location relative to the location on the element 
 * that was clicked.  Override this if you want to place the element in a 
 * location other than where the cursor is.
 * @method alignElWithMouse
 * @param {HTMLElement} el the element to move
 * @param {int} iPageX the X coordinate of the mousedown or drag event
 * @param {int} iPageY the Y coordinate of the mousedown or drag event
 */


/**
 * A DragDrop implementation that inserts an empty, bordered div into
 * the document that follows the cursor during drag operations.  At the time of
 * the click, the frame div is resized to the dimensions of the linked html
 * element, and moved to the exact location of the linked element.
 *
 * References to the "frame" element refer to the single proxy element that
 * was created to be dragged in place of all DDProxy elements on the
 * page.
 *
 * @class js.util.DDProxy
 * @extends js.util.DD
 * @constructor
 * @param {String} id the id of the linked html element
 * @param {String} sGroup:optional the group of related DragDrop objects
 * @param {object} config:optional an object containing configurable attributes
 *                Valid properties for DDProxy in addition to those in DragDrop: 
 *                   resizeFrame, centerFrame, dragElId
 */
/**
 * The id of the element that will be dragged.  By default this is same 
 * as the linked element , but could be changed to another element.
 * @field {boolean} dragElId
 */
/**
 * By default we resize the drag frame to be the same size as the element
 * we want to drag (this is to get the frame effect).  We can turn it off
 * if we want a different behavior.
 * @field {boolean} resizeFrame
 */
/**
 * By default the frame is positioned exactly where the drag element is, so
 * we use the cursor offset provided by YAHOO.util.DD.  Another option that works only if
 * you do not have constraints on the obj is to have the drag frame centered
 * around the cursor.  Set centerFrame to true for this effect.
 * @field {boolean} centerFrame
 */

/**
 * Creates the proxy element if it does not yet exist
 * @method createFrame
 */
/**
 * Initialization for the drag frame element.  Must be called in the
 * constructor of all subclasses
 * @method initFrame
 */


/**
 * A DragDrop implementation that does not move, but can be a drop 
 * target.  You would get the same result by simply omitting implementation 
 * for the event callbacks, but this way we reduce the processing cost of the 
 * event listener and the callbacks.
 * @class js.util.DDTarget
 * @extends js.util.DragDrop 
 * @constructor
 * @param {String} id the id of the element that is a drop target
 * @param {String} sGroup:optional the group of related DragDrop objects
 * @param {object} config:optional an object containing configurable attributes
 *                 Valid properties for DDTarget in addition to those in DragDrop: none
 */


/**
 * DragDropMgr is a singleton that tracks the element interaction for 
 * all DragDrop items in the window.  Generally, you will not call 
 * this class directly, but it does have helper methods that could 
 * be useful in your DragDrop implementations.
 * @class js.util.DragDropMgr
 * @static
 */
/**
 * This property is used to turn on global use of the shim element on all DragDrop instances, 
 * defaults to false for backcompat. (Use: YAHOO.util.DDM.useShim = true)
 * @field {Boolean} useShim
 */
/**
 * Flag to determine if we should prevent the default behavior of the
 * events we define. By default this is true, but this can be set to 
 * false if you need the default behavior (not recommended)
 * @field {Boolean} preventDefault
 */
/**
 * Flag to determine if we should stop the propagation of the events 
 * we generate. This is true by default but you may want to set it to
 * false if the html element contains other features that require the
 * mouse click.
 * @field {Boolean} stopPropagation
 */
/**
 * Provides additional information about the the current set of
 * interactions.  Can be accessed from the event handlers. It
 * contains the following properties:
 *
 *       out:       onDragOut interactions
 *       enter:     onDragEnter interactions
 *       over:      onDragOver interactions
 *       drop:      onDragDrop interactions
 *       point:     The location of the cursor
 *       draggedRegion: The location of dragged element at the time
 *                      of the interaction
 *       sourceRegion: The location of the source elemtn at the time
 *                     of the interaction
 *       validDrop: boolean
 * @field {Object} interactionInfo
 */

/**
 * In point mode, drag and drop interaction is defined by the 
 * location of the cursor during the drag/drop
 * @constant {int} POINT
 */
/**
 * In intersect mode, drag and drop interaction is defined by the 
 * cursor position or the amount of overlap of two or more drag and 
 * drop objects.
 * @constant {int} INTERSECT
 */
/**
 * In intersect mode, drag and drop interaction is defined only by the 
 * overlap of two or more drag and drop objects.
 * @constant {int} STRICT_INTERSECT
 */
/**
 * The current drag and drop mode.  Default: POINT
 * @field {int} mode
 */
/**
 * Set useCache to false if you want to force object the lookup of each
 * drag and drop linked element constantly during a drag.
 * @field {boolean} useCache
 */
/**
 * The number of pixels that the mouse needs to move after the 
 * mousedown before the drag is initiated.  Default=3
 * @field {int} clickPixelThresh
 */
/**
 * The number of milliseconds after the mousedown event to initiate the
 * drag if we don't get a mouseup event. Default=1000
 * @field {int} clickTimeThresh
 */

/**
 * Helper function for getting the best match from the list of drag 
 * and drop objects returned by the drag and drop events when we are 
 * in INTERSECT mode.  It returns either the first object that the 
 * cursor is over, or the object that has the greatest overlap with 
 * the dragged element.
 * @method getBestMatch
 * @param  {js.util.DragDrop[]} dds The array of drag and drop objects targeted
 * @return {js.util.DragDrop}       The best single match
 */
/**
 * Returns the DragDrop instance for a given id
 * @method getDDById
 * @param {String} id the id of the DragDrop object
 * @return {js.util.DragDrop} the drag drop object, null if it is not found
 */
/**
 * Returns a Region object containing the drag and drop element's position
 * and size, including the padding configured for it
 * @method getLocation
 * @param {js.util.DragDrop} oDD the drag and drop object to get the 
 *                       location for
 * @return {js.math.Rect} a Region object representing the total area
 *                             the element occupies, including any padding
 *                             the instance is configured for.
 */
/**
 * Returns the drag and drop instances that are in all groups the
 * passed in instance belongs to.
 * @method getRelated
 * @param {js.util.DragDrop} p_oDD the obj to get related data for
 * @param {boolean} bTargetsOnly if true, only return targetable objs
 * @return {js.util.DragDrop[]} the related instances
 */
/**
 * Utility function to determine if a given element has been 
 * registered as a drag drop item.
 * @method isDragDrop
 * @param {String} id the element id to check
 * @return {boolean} true if this element is a DragDrop item, false otherwise
 */
/**
 * Utility function to determine if a given element has been 
 * registered as a drag drop handle for the given Drag Drop object.
 * @method isHandle
 * @param {String} id the element id to check
 * @return {boolean} true if this element is a DragDrop handle, false otherwise
 */
/**
 * Returns true if the specified dd target is a legal target for 
 * the specifice drag obj
 * @method isLegalTarget
 * @param {js.util.DragDrop} the drag obj
 * @param {js.util.DragDrop} the target
 * @return {boolean} true if the target is a legal target for the dd obj
 */
/**
 * Is drag and drop locked?
 * @method isLocked
 * @return {boolean} True if drag and drop is locked, false otherwise.
 */
/**
 * My goal is to be able to transparently determine if an object is
 * typeof DragDrop, and the exact subclass of DragDrop.  typeof 
 * returns "object", oDD.constructor.toString() always returns
 * "DragDrop" and not the name of the subclass.  So for now it just
 * evaluates a well-known variable in DragDrop.
 * @method isTypeOfDD
 * @param {Object} the object to evaluate
 * @return {boolean} true if typeof oDD = js.util.DragDrop
 */
/**
 * Lock all drag and drop functionality
 * @method lock
 */
/**
 * Unlock all drag and drop functionality
 * @method unlock
 */
/**
 * Each DragDrop instance must be registered with the DragDropMgr.  
 * This is executed in DragDrop.init()
 * @method regDragDrop
 * @param {js.util.DragDrop} oDD the DragDrop object to register
 * @param {String} sGroup the name of the group this element belongs to
 */
/**
 * Each DragDrop handle element must be registered.  This is done
 * automatically when executing DragDrop.setHandleElId()
 * @method regHandle
 * @param {String} sDDId the DragDrop id this element is a handle for
 * @param {String} sHandleId the id of the element that is the drag handle
 */
/**
 * Fired when either the drag pixel threshold or the mousedown hold 
 * time threshold has been met.
 * @method startDrag
 * @param x {int} the X position of the original mousedown
 * @param y {int} the Y position of the original mousedown
 */
/** 
 * Ends the current drag, cleans up the state, and fires the endDrag
 * and mouseUp events.  Called internally when a mouseup is detected
 * during the drag.  Can be fired manually during the drag by passing
 * either another event (such as the mousemove event received in onDrag)
 * or a fake event with pageX and pageY defined (so that endDrag and
 * onMouseUp have usable position data.).  Alternatively, pass true
 * for the silent parameter so that the endDrag and onMouseUp events
 * are skipped (so no event data is needed.)
 *
 * @method stopDrag
 * @param {Event} e the mouseup event, another event (or a fake event) 
 *                  with pageX and pageY defined, or nothing if the 
 *                  silent parameter is true
 * @param {boolean} silent:optional skips the enddrag and mouseup events if true
 */
/**
 * Utility to stop event propagation and event default, if these 
 * features are turned on.
 * @method stopEvent
 * @param {Event} e the event as returned by this.getEvent()
 */