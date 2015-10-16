/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.3
 * @author feng.chun
 * @date 2011-01-05
 * @date 2011-05-25
 * 
 * @version 0.2
 * @author feng.chun
 * @date 2010-11-15
 *
 * @version 0.1
 * @author feng.chun
 * @date 2010-9-20
 * 
 * @requires /core/js-core.js
 * 
 * 
 * @struct js.math.Point {
 * 		"description":"a cartesian coordinate, like: [x, y]"
 * 		,"type":"array"
 * 		,"items":[
 * 			{"id":"x","type":"number"}
 *          {"id":"y","type":"number"}
 * 		]
 * }
 * 
 * @struct js.math.Polar {
 * 		"description":"a polar coordinate, like: [len, rad]"
 * 		,"type":"array"
 * 		,"items":[
 * 			{"id":"length","type":"number"}
 *          {"id":"radian","type":"number"}
 * 		]
 * }
 * 
 * @struct js.math.Line {
 * 		"description":"a line from (x1,y1) to (x2,y2), like: [[x1,y1], [x2,y2]]"
 * 		,"type":"array"
 * 		,"items":[
 * 			{"id":"p1","type":"js.math.Point"}
 *          {"id":"p2","type":"js.math.Point"}
 * 		]
 * }
 * 
 * @struct js.math.Rect {
 * 		"description":"a rectangle, like: {x:111,y:222,w:333,h:444}"
 * 		,"type":"object"
 * 		,"properties":{
 * 			"x":{"type":"number","required":true}
 * 			,"y":{"type":"number","required":true}
 * 			,"w":{"type":"number","required":true}
 * 			,"h":{"type":"number","required":true}
 * 		}
 * }
 * 
 * @struct js.math.Vector {
 * 		"description":"a vector, like: {vx:111, vy:111}"
 * 		,"type":"object"
 * 		,"properties":{
 * 			"vx":{"type":"number","required":true}
 * 			,"vy":{"type":"number","required":true}
 * 		}
 * }
 * 
 * 
 */
js.lang.System.namespace("js.math");js.lang.System.namespace("js.phys");(function(){js.math.MathTool={RADIAN_0:0,RADIAN_1:0.125*Math.PI,RADIAN_2:0.25*Math.PI,RADIAN_3:0.375*Math.PI,RADIAN_4:0.5*Math.PI,RADIAN_5:0.625*Math.PI,RADIAN_6:0.75*Math.PI,RADIAN_7:0.875*Math.PI,RADIAN_8:Math.PI,RADIAN_9:1.125*Math.PI,RADIAN_10:1.25*Math.PI,RADIAN_11:1.375*Math.PI,RADIAN_12:1.5*Math.PI,RADIAN_13:1.625*Math.PI,RADIAN_14:1.75*Math.PI,RADIAN_15:1.875*Math.PI,RADIAN_16:2*Math.PI,equals:function(e,d){return Math.abs(e-d)<0.0001;},calcRadian:function(j,i){if(!i){i=[0,0];}var f=j[0],h=j[1],e=i[0],g=i[1];if(f==0&&h==0&&e==0&&g==0){return 0;}var d=Math.atan2(h-g,f-e);return d<0?this.RADIAN_16+d:d;},radian2Angle:function(d){return d*180/Math.PI;},angle2Radian:function(d){return d*Math.PI/180;},polar2XY:function(e,d){switch(d/Math.PI){case 0:return[e,0];case 0.5:return[0,e];case 1:return[-1*e,0];case 1.5:return[0,-1*e];case 2:return[e,0];default:return[e*Math.cos(d),e*Math.sin(d)];}},xy2Polar:function(d,e){return[Math.sqrt(Math.pow(d,2)+Math.pow(e,2)),this.calcRadian([d,e])];},rotateAroundOrigin:function(f,e){var d=f[0],h=f[1],g=this.polar2XY(1,e);return[d*g[0]-h*g[1],d*g[1]+h*g[0]];},translateCCS:function(e,d){return[e[0]+d[0],e[1]+d[1]];},getAntiDir:function(d){return d<Math.PI?d+Math.PI:d-Math.PI;}};var b=js.math.MathTool;js.math.Vector2D={equals:function(e,d){return b.equals(e.vx,d.vx)&&b.equals(e.vy,d.vy);},toVector:function(e,d){if(!e){e=[0,0];}return{vx:d[0]-e[0],vy:d[1]-e[1]};},toPoint:function(d){return[d.vx,d.vy];},toString:function(d){return"("+d.vx+","+d.vy+")";},getLength:function(d){if(d.vx==0&&d.vy==0){return 0;}return Math.sqrt(d.vx*d.vx+d.vy*d.vy);},setLength:function(e,d){var f=this.getLength();if(f!=0){this.mul(d/f);}},negate:function(d){return this.mul(d,-1);},add:function(e,d){return{vx:e.vx+d.vx,vy:e.vy+d.vy};},sub:function(e,d){return{vx:e.vx-d.vx,vy:e.vy-d.vy};},mul:function(d,e){return{vx:d.vx*e,vy:d.vy*e};},div:function(d,e){if(e==0){throw new TypeError("[js.math.Vector2D#div]The argument<number> is zero.");}return{vx:d.vx/e,vy:d.vy/e};},dot:function(e,d){return e.vx*d.vx+e.vy*d.vy;},cross:function(e,d){return e.vx*d.vy-d.vx*e.vy;},isPerpTo:function(e,d){return this.dot(e,d)==0;},interpolate:function(f,e,g){var d=(1-g)*f.vx+g*e.vx,h=(1-g)*f.vy+g*e.vy;return{vx:d,vy:h};},normalize:function(d){var e=this.getLength(d);return b.equals(e,0)?this.div(d,e):{vx:0,vy:0};},getRadian:function(d){return b.calcRadian([d.vx,d.vy]);},setRadian:function(e,d){var f=this.getLength(e);if(f==0){return;}return b.polar2XY(f,d);},radianBetween:function(f,e){var d=this.getRadian(e)-this.getRadian(f);return d<0?Math.abs(d):d;},project:function(g,e){var f=this.dot(g,e),d=e.vx*e.vx+e.vy*e.vy;return{vx:(f/d)*e.vx,vy:(f/d)*e.vy};},rotate:function(e,d){var f=b.polar2XY(1,d);return{vx:e.vx*f[0]-e.vy*f[1],vy:e.vx*f[1]+e.vy*f[0]};},getNormal:function(d,e){return e?{"vx":d.vy,"vy":-1*d.vx}:{"vx":-1*d.vy,"vy":d.vx};},rebound:function(h,f,d){var e=this.getNormal(f,d);if(this.isPerpTo(h,e)){return null;}var g=this.project(h,e);return this.sub(this.mul(this.add(g,h),2),h);}};var c=js.math.Vector2D;js.math.Geom2D={equalsPoint:function(e,d){return b.equals(e[0],d[0])&&b.equals(e[1],d[1]);},movePoint:function(f,d,e){var g=b.polar2XY(e,d);return[g[0]+f[0],g[1]+f[1]];},getSlope:function(g,f){var e=g[0]-f[0];var d=g[1]-f[1];return e==0?null:d/e;},isCollinear:function(f,e,d){if(this.equalsPoint(f,e)||this.equalsPoint(e,d)||this.equalsPoint(f,d)){return true;}return this.posPointAndLine(d,[f,e])==0;},posPointAndLine:function(e,d){var h=c.toVector(d[0],e),g=c.toVector(d[1],e),f=c.cross(h,g);if(b.equals(0,Math.abs(f))){return 0;}if(f<0){return -1;}if(f>0){return 1;}},roundPoint:function(d){return[d[0].toFixed(4),d[1].toFixed(4)];},_isInPointsBound:function(e,f,d){if(this.equalsPoint(e,f)||this.equalsPoint(e,d)){return true;}e=this.roundPoint(e),f=this.roundPoint(f),d=this.roundPoint(d);return Math.min(f[0],d[0])<=e[0]&&e[0]<=Math.max(f[0],d[0])&&Math.min(f[1],d[1])<=e[1]&&e[1]<=Math.max(f[1],d[1]);},isPointOnSegment:function(e,d){return this.posPointAndLine(e,d)==0&&this._isInPointsBound(e,d[0],d[1]);},posLines:function(e,d){var j=e[0],h=e[1],g=d[0],f=d[1];k1=this.getSlope(j,h),k2=this.getSlope(g,f);if(b.equals(k1,k2)){return this.isCollinear(j,h,g)?1:0;}else{var i=false;if(!k1&&b.equals(k2,0)){return 3;}else{if(!k2&&b.equals(k1,0)){return 3;}else{if(b.equals(k1*k2,-1)){return 3;}}}return 2;}},getVCPOfPointAndLine:function(j,m){var l=m[0],k=m[1],h=k[0]-l[0],g=k[1]-l[1];if(h!=0&&g!=0){var d=Math.pow(h,2),f=Math.pow(g,2),e=(d*j[0]+f*l[0]+h*g*(j[1]-l[1]))/(d+f),i=(g*(e-l[0])+g*l[1])/h;return[e,i];}else{return l;}},getLDOfPointAndLine:function(e,d){var f=this.getVCPOfPointAndLine(e,d);return this.getPointsDistance(f,e);},getCPOfLines:function(s,q){var t=s[0],r=s[1],p=q[0],m=q[1],g=t[0],n=t[1],f=r[0],l=r[1],e=p[0],k=p[1],u=m[0],j=m[1];var i=(l-n)*(u-e)-(j-k)*(f-g);if(b.equals(i,0)){return null;}var h=((f-g)*(u-e)*(k-n)+(l-n)*(u-e)*g-(j-k)*(f-g)*e)/i,o=((l-n)*(j-k)*(e-g)+(f-g)*(j-k)*n-(u-e)*(l-n)*k)/(-i);return[h,o];},getCPOfSegments:function(e,d){var j=e[0],i=e[1],g=d[0],f=d[1],h=this.getCPOfLines([j,i],[g,f]);if(!h){return null;}return(this._isInPointsBound(h,j,i)&&this._isInPointsBound(h,g,f))?h:null;},getCPOfRayAndSegment:function(g,d,e){var f=this.getCPOfLines([g,this.movePoint(g,d,10)],e);if(!f){return null;}return this._isInPointsBound(f,e[0],e[1])?f:null;},getCPOfRayAndLine:function(f,d,e){return this.getCPOfLines([f,this.movePoint(f,d,10)],e);},getPointsDistance:function(e,d){return Math.sqrt(Math.pow(d[0]-e[0],2)+Math.pow(d[1]-e[1],2));},getNearestPoint:function(e,g){var f=-1;if(!g||g.length<=0){return f;}if(g.length==1){return 0;}var h=null;g.forEach(function(k,j){var d=Math.pow(k[0]-e[0],2)+Math.pow(k[1]-e[1],2);if(h==null||d<h){h=d;f=j;}});return f;},getRatioPoint:function(e,d){return[(e[0][0]+d*e[1][0])/(1+d),(e[0][1]+d*e[1][1])/(1+d)];},getMidpoint:function(d){return this.getRatioPoint(d,1);},isPointInTri:function(f,m,l,k){var h=c.toVector(m,l),d=c.toVector(l,k),j=c.toVector(k,m),e=c.cross(h,d),g=c.cross(d,j),i=c.cross(j,h);return(e>0&&g>0&&i>0)||(e<0&&g<0&&i<0);},getTriCGPoint:function(f,e,d){return{x:(f[0]+e[0]+d[0])/3,y:(f[1]+e[1]+d[1])/3};},getTriLength:function(h,g,f){var e=a.getPointsDistance(h,g),d=a.getPointsDistance(g,f),i=a.getPointsDistance(f,h);return e+d+i;},getTriArea:function(i,h,f){var e=a.getPointsDistance(i,h),d=a.getPointsDistance(h,f),j=a.getPointsDistance(f,i),g=(e+d+j)/2;return Math.sqrt(g*(g-e)*(g-d)*(g-j));},isPointInRect:function(f,e){var d=f[0],g=f[1];return d>=e.x&&d<=(e.x+e.w)&&g>=e.y&&g<=(e.y+e.h);},isPointOnRect:function(e,d){return(e[0]==d.x&&(e[1]>=d.y||e[1]<=(d.y+d.h))||e[0]==(d.x+d.w)&&(e[1]>=d.y||e[1]<=(d.y+d.h))||e[1]==d.y&&(e[0]>=d.x||e[0]<=(d.x+d.w))||e[1]==(d.y+d.h)&&(e[0]>=d.x||e[0]<=(d.x+d.w)));},containsRect:function(e,d){return(d.x>=e.x&&d.y>=e.y&&(d.x+d.w)<=(e.x+e.w)&&(d.y+d.h)<=(e.y+e.h));},intersectsRect:function(g,f){var h=Math.max(g.y,f.y),i=Math.min(g.x+g.w,f.x+f.w),d=Math.min(g.y+g.h,f.y+f.h),e=Math.max(g.x,f.x);if(d>h&&i>e){return{x:e,y:h,w:i-e,h:d-h};}else{return null;}},getRectCenter:function(d){return[d.w/2+d.x,d.h/2+d.y];},centerToRect:function(g,f){var e=g["w"],i=g["h"],d=f["w"],h=f["h"];g.x=f.x+(d-e)/2;g.y=f.y+(h-i)/2;},limitInRect:function(e,d){var f=false;if(e.x<d.x){e.x=d.x;f=true;}else{if(e.x>(d.x+d.w-e.w)){e.x=d.x+d.w-e.w;f=true;}}if(e.y<d.y){e.y=d.y;f=true;}else{if(e.y>(d.y+d.h-e.h)){e.y=d.y+d.h-e.h;f=true;}}return f;},getRectBorders:function(e){var d=this.getRectPoints(e);return[[d[0],d[1]],[d[1],d[2]],[d[2],d[3]],[d[3],d[0]]];},avoidToRect:function(t,s,v){var e=a.intersectsRect(t,s);if(e!=null){var j=this.getRectCenter(t),u=this.getRectPoints(s),r=u[0],q=u[1],p=u[2],o=u[3],i=[r[0]-t.w/2,r[1]-t.h/2],h=[q[0]+t.w/2,q[1]-t.h/2],g=[p[0]+t.w/2,p[1]+t.h/2],f=[o[0]-t.w/2,o[1]+t.h/2],d=[[i,h],[h,g],[g,f],[f,i]],m=b.getAntiDir(v);var l=[];d.some(function(w){var x=this.getCPOfRayAndSegment(j,m,w);if(x){l.push(x);}},this);var k=this.getNearestPoint(j,l),n=l[k];return[n[0]-t.w/2,n[1]-t.h/2];}else{return null;}},getRectPoints:function(d){return[[d.x,d.y],[d.x+d.w,d.y],[d.x+d.w,d.y+d.h],[d.x,d.y+d.h]];},posRectAndLine:function(h,f){var g=this.getRectPoints(h),e=this.posPointAndLine(g[0],f),d=this.posPointAndLine(g[1],f),j=this.posPointAndLine(g[2],f),i=this.posPointAndLine(g[3],f);if(e==-1&&d==-1&&j==-1&&i==-1){return -1;}if(e==1&&d==1&&j==1&&i==1){return 1;}return 0;},getRoundLength:function(d){return 2*d*Math.PI;},getRoundArea:function(d){return Math.PI*Math.pow(d,2);},isOnRound:function(i,d,f){var h=Math.pow(f[0]-i[0],2),g=Math.pow(f[1]-i[1],2),e=Math.pow(d,2);return b.equals(h+g-e,0);},getRoundCenter:function(n,l,e){var i=a.getPointsDistance(n,l);if(i>2*e){return null;}var g=a.getMidpoint([n,l]),k=b.calcRadian(n,l),j=Math.sqrt(Math.pow(e,2)-Math.pow(i/2,2)),f=b.polar2XY(j,b.RADIAN_4+k),h=b.polar2XY(j,-1*(b.RADIAN_4+k));return[[g[0]+f[0],g[1]+f[1]],[g[0]+h[0],g[1]+h[1]]];}};var a=js.math.Geom2D;js.phys.Motion2D={mergeVelocity:function(e,d){return(Math.pow(e,2)+Math.pow(d,2))/2;}};js.phys.Formulas={line:function(f,h,d,e){if(!h){throw new Error();}var g=b.polar2XY(e,d);return[g[0]*f+h[0],g[1]*f+h[1]];},round:function(m,j,e,l,g){if(!j||!e){throw new Error();}if(a.equalsPoint(j,e)){return j;}var d=a.getPointsDistance(j,e),k=l/d,h=k*m+b.calcRadian(j,e),i=g?[Math.sin(h),Math.cos(h)]:[Math.cos(h),Math.sin(h)];return[e[0]+d*i[0],e[1]+d*i[1]];}};}());