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
js.lang.System.namespace('js.math');
js.lang.System.namespace('js.phys');

(function(){
	/**
	 * @class js.math.MathTool
	 * @static
	 */
	js.math.MathTool = {
		// 顺时针十六个方向的弧度值
		/** @constant {Number} RADIAN_0 */
		RADIAN_0:0,
		/** @constant {Number} RADIAN_1 */
		RADIAN_1:0.125*Math.PI,
		/** @constant {Number} RADIAN_2 */
		RADIAN_2:0.25*Math.PI,
		/** @constant {Number} RADIAN_3 */
		RADIAN_3:0.375*Math.PI,
		/** @constant {Number} RADIAN_4 */
		RADIAN_4:0.5*Math.PI,
		/** @constant {Number} RADIAN_5 */
		RADIAN_5:0.625*Math.PI,
		/** @constant {Number} RADIAN_6 */
		RADIAN_6:0.75*Math.PI,
		/** @constant {Number} RADIAN_7 */
		RADIAN_7:0.875*Math.PI,
		/** @constant {Number} RADIAN_8 */
		RADIAN_8:Math.PI,
		/** @constant {Number} RADIAN_9 */
		RADIAN_9:1.125*Math.PI,
		/** @constant {Number} RADIAN_10 */
		RADIAN_10:1.25*Math.PI,
		/** @constant {Number} RADIAN_11 */
		RADIAN_11:1.375*Math.PI,
		/** @constant {Number} RADIAN_12 */
		RADIAN_12:1.5*Math.PI,
		/** @constant {Number} RADIAN_13 */
		RADIAN_13:1.625*Math.PI,
		/** @constant {Number} RADIAN_14 */
		RADIAN_14:1.75*Math.PI,
		/** @constant {Number} RADIAN_15 */
		RADIAN_15:1.875*Math.PI,
		/** @constant {Number} RADIAN_16 */
		RADIAN_16:2*Math.PI,
		/**
         * Determine the equals of two float numbers approximatively.
         * 
         * @method equals
         * @param {Number} n1
         * @param {Number} n2
         * @return {Boolean}
         */
        equals: function(n1, n2){
            return Math.abs(n1 - n2) < 0.0001;
        },
		/**
		 * The radian of the Segment P2P1.
		 * 计算两点P2、P1间连线的弧度，即线段P2P1与X轴的夹角
		 * 
		 * @method calcRadian
		 * @param {js.math.Point} p1
		 * @param {js.math.Point} p2:optional If is null then P2 is the origin point.
		 * @return {Number}
		 */
		calcRadian: function(p1, p2){
			if(!p2) p2 = [0,0];
			var x1 = p1[0], y1 = p1[1], x2 = p2[0], y2 = p2[1];
			if(x1==0 && y1==0 && x2==0 && y2==0) return 0;
			
			var rad = Math.atan2(y1-y2, x1-x2);
			return rad<0?this.RADIAN_16+rad:rad;
		},		
		/**
		 * Transfer a radian number to a angle number.
		 * 弧度转角度
		 * 
		 * @method radian2Angle
		 * @param {Number} rad
		 * @return {Number}
		 */
		radian2Angle: function(rad){
			return rad*180/Math.PI;
		},
		/**
		 * Transfer a angle number to a radian number.
		 * 角度转弧度
		 * 
		 * @method angle2Radian
		 * @param {Number} ang
		 * @return {Number}
		 */
		angle2Radian: function(ang){
			return ang*Math.PI/180; 
		},
		/**
		 * Transfer a point from Polar coordinate to Cartesian coordinate.
		 * 极坐标（p,rad）转化为直角坐标（x,y）
		 * 
		 * @method polar2XY
		 * @param {Number} p
		 * @param {Number} rad
		 * @return {js.math.Point}
		 */
		polar2XY: function(p, rad){
			switch(rad/Math.PI) {
				case 0: return [p,0];
				case 0.5: return [0,p];
				case 1: return [-1*p,0];
				case 1.5: return [0,-1*p];
				case 2: return [p,0];				
				default: 
					return [p*Math.cos(rad),p*Math.sin(rad)];
			}
		},
		/**
		 * Transfer a point from Cartesian coordinate to Polar coordinate.
		 * 直角坐标（x,y）转化为极坐标（p,rad）
		 * 
		 * @method xy2Polar
		 * @param {Number} x
		 * @param {Number} y
		 * @return {js.math.Polar}
		 */
		xy2Polar: function(x, y){
			return [Math.sqrt(Math.pow(x,2)+Math.pow(y,2)),this.calcRadian([x,y])]
		},
		/**
		 * Returns a new point by rotate around the origin.
		 * 将某个点围绕坐标原点旋转一定的弧度，得到一个新点坐标。
		 * 
		 * @method rotateAroundOrigin
		 * @param {js.math.Point} point
		 * @param {Number} rad
		 * @return {js.math.Point}
		 */
		rotateAroundOrigin: function(point, rad){
			var x = point[0], y = point[1], sc = this.polar2XY(1,rad);
			return [
				x*sc[0]-y*sc[1],
				x*sc[1]+y*sc[0]
			]
		},
		/**
		 * Return a new coordinates in a new Cartesian Coordinate System(CCS).
		 * 
		 * @method translateCCS
		 * @param {js.math.Point} xy the old coordinates
		 * @param {js.math.Point} origin the coordinates of the old CCS's origin in the new CCS
		 */
		translateCCS: function(xy, origin){
			return [xy[0]+origin[0],xy[1]+origin[1]];
		},
		/**
		 * Return a anti-direction.
		 * @method getAntiDir
		 * @param {Number} rad
		 * @return {Number}
		 */
		getAntiDir: function(rad){
			return rad < Math.PI?rad + Math.PI:rad - Math.PI;
		}
	}
	var MT = js.math.MathTool;	
	
	/**
	 * @class js.math.Vector2D
	 * @static
	 */
	js.math.Vector2D = {
		/**
		 * Judge the equals of v1 and v2.
		 * 
		 * @method equals
		 * @param {js.math.Vector} v1
		 * @param {js.math.vector} v2
		 * @return {Boolean}
		 */
		equals: function(v1, v2){
			return MT.equals(v1.vx,v2.vx) && MT.equals(v1.vy,v2.vy);
		},
		/**
		 * Returns a Vector(p1->p2).
		 * 
		 * @method toVector
		 * @param {js.math.Point} point1
		 * @param {js.math.Point} point2
		 * @return {js.math.Vector}
		 */
		toVector: function(point1, point2){
			if(!point1) point1 = [0,0];
			return {vx:point2[0]-point1[0], vy:point2[1]-point1[1]}
		},
		/**
		 * Returns the point of the vector.
		 * 
		 * @method toPoint
		 * @param {js.math.Vector} v
		 * @return {js.math.Point}
		 */
		toPoint: function(v){
			return [v.vx, v.vy];
		},
		/**
		 * Returns the string representation of a vector.
		 * 
		 * @method toString
		 * @param {js.math.Vector} v
		 * @return {String}
		 */
		toString: function(v){
			return '('+v.vx+','+v.vy+')';
		},
		/**
		 * Returns the mod of the vector.
		 * 
		 * @method getLength
		 * @param {Vector} v
		 * @return {Number}
		 */
		getLength: function(v){
			if(v.vx==0 && v.vy==0) return 0;
			return Math.sqrt(v.vx*v.vx + v.vy*v.vy);
		},
		/**
		 * Sets the new length to a vector.
		 * 
		 * @method setLength
		 * @param {js.math.Vector} v
		 * @param {Number} len
		 */
		setLength: function(v, len){
			var length = this.getLength();
		    if (length!=0) this.mul(len/length);
		},
		/**
		 * Returns the negative of this vector.
		 * 
		 * @method negate
		 * @param {js.math.Vector} v
		 * @return {js.math.Vector}
		 */
		negate: function(v){
			return this.mul(v, -1);
		},
		/**
		 * Adds vector1 by vector2.
		 * 
		 * @method add
		 * @param {js.math.Vector} v1
		 * @param {js.math.Vector} v2
		 * @return {js.math.Vector}
		 */
		add: function(v1, v2){
			return {
				vx: v1.vx + v2.vx,
				vy: v1.vy + v2.vy
			};
		},
		/**
		 * Subtracts vector1 by vector2.
		 * 
		 * @method sub
		 * @param {js.math.Vector} v1
		 * @param {js.math.Vector} v2
		 * @return {js.math.Vector}
		 */
		sub: function(v1, v2){
			return {
				vx: v1.vx - v2.vx,
				vy: v1.vy - v2.vy
			};
		},
		/**
		 * Multiplies a vector by a number.
		 * 
		 * @method mul
		 * @param {js.math.Vector} v
		 * @param {Number} number
		 * @return {js.math.Vector}
		 */
		mul: function(v, number){
			return {
				vx: v.vx*number, vy: v.vy*number
			}
		},
		/**
		 * Divides a vector by a number.
		 * 
		 * @method div
		 * @param {js.math.Vector} v
		 * @param {Number} number
		 * @return {js.math.Vector}
		 * @throws {TypeError} when The argument<number> is zero
		 */
		div: function(v, number){
			if(number==0) throw new TypeError('[js.math.Vector2D#div]The argument<number> is zero.');
			return {
				vx: v.vx/number, vy: v.vy/number
			}
		},
		/**
		 * Calculates the dot product of vector1 with vector2.
		 * 
		 * @method dot
		 * @param {js.math.Vector} v1
		 * @param {js.math.Vector} v2
		 * @return {Number}
		 */
		dot: function(v1, v2){
			return v1.vx*v2.vx + v1.vy*v2.vy;
		},
		/**
		 * Calculates the cross product of vector1 with vector2.
		 * 
		 * @method cross
		 * @param {js.math.Vector} v1
		 * @param {js.math.Vector} v2
		 * @return {Number}
		 */
		cross: function(v1, v2){
			return v1.vx*v2.vy - v2.vx*v1.vy;
		},
		/**
		 * Judge the vector1 perpendicular to the vector2.
		 * 向量1是否垂直于向量2.
		 * 
		 * @method isPerpTo
		 * @param {js.math.Vector} v1
		 * @param {js.math.Vector} v2
		 * @return {Boolean}
		 */
		isPerpTo: function(v1, v2){
			return this.dot(v1,v2)==0;
		},
		/**
	     * Sets this vector to the interpolation by changeAmnt from this to the finalVec. 
	     * = (1-changeAmnt) * beginVec + changeAmnt * finalVec
	     * 
	     * @method interpolate
	     * @param {js.math.Vector} beginVec The begining vector (delta=0)	
	     * @param {js.math.Vector} finalVec The final vector to interpolate towards (delta=1)
	     * @param {Number} changeAmnt An amount between 0.0 - 1.0 representing a percentage change from beginVec towards finalVec
	     * @return {js.math.Vector}
	     */
        interpolate: function(beginVec, finalVec, changeAmnt){
    	    var x = (1 - changeAmnt) * beginVec.vx + changeAmnt * finalVec.vx
        	,y = (1 - changeAmnt) * beginVec.vy + changeAmnt * finalVec.vy;
			return {vx:x,vy:y};
	    },
		/**
		 * Returns the unit vector of this vector.
		 * 
		 * @method normalize
		 * @param {js.math.Vector} v
		 * @return {js.math.Vector} unit vector of this vector.
		 */
		normalize: function(v){
			 var length = this.getLength(v);
             return MT.equals(length,0)? this.div(v, length):{vx:0,vy:0};
		},
		/**
		 * Returns the radian between this and v.
		 * 原点到向量点的连线与X轴的夹角的弧度。
		 * 
		 * @method getRadian
		 * @param {js.math.Vector} v
		 * @return {Number} radian
		 */
		getRadian: function(v){
			return MT.calcRadian([v.vx,v.vy]);
		},
		/**
		 * Sets the radian of this vector.
		 * 
		 * @method setRadian
		 * @param {js.math.Vector} v
		 * @param {Number} rad
		 */
		setRadian: function(v, rad){
			var mod = this.getLength(v);
			if(mod==0) return;
			return MT.polar2XY(mod, rad);
		},
		/**
		 * Returns the radian of v2 relative to v1.
		 * 两个非零向量之间的夹角的弧度。
		 * 
		 * @method radianBetween
		 * @param {js.math.Vector} v1
		 * @param {js.math.Vector} v2
		 * @return {Number} 
		 */
		radianBetween: function(v1, v2){
			var rad = this.getRadian(v2) - this.getRadian(v1);
			return rad<0?Math.abs(rad):rad;
		},
		/**
		 * Returns the vector which V1 projection on V2.
		 * 求向量V1在向量V2上的投影向量：
		 * 用V1和V2的单位向量vu2点积再乘以vu2，并且与V2的方向无关。
		 * 
		 * @method project
		 * @param {js.math.Vector} v1
		 * @param {js.math.Vector} v2
		 * @return {js.math.Vector}
		 */
		project: function(v1, v2){
			var dp = this.dot(v1,v2), vv = v2.vx*v2.vx + v2.vy*v2.vy;
			return {vx:(dp/vv)*v2.vx, vy:(dp/vv)*v2.vy};
		},
		/**
		 * Returns a new rotated vector.
		 * 以某个弧度旋转向量得到一个新向量。
		 * 
		 * @method rotate
		 * @param {js.math.Vector} v
		 * @param {Number} rad
		 * @return {js.math.Vector}
		 */
		rotate: function(v, rad){  
		    var sc = MT.polar2XY(1,rad);    
		    return {
				vx: v.vx * sc[0] - v.vy * sc[1], vy: v.vx * sc[1] + v.vy * sc[0]
			}
		},
		/**
		 * Returns normal vector.
		 * 求向量的法向量。
		 * 
		 * @method getNormal
		 * @param {js.math.Vector} v
		 * @param {Boolean} isLeftSide:optional True: The left side of vector is positive; False: The right side of vector is positive
		 * @return {js.math.Vector}
		 */
		getNormal: function(v, isLeftSide){
			return isLeftSide?{'vx':v.vy,'vy':-1*v.vx}:{'vx':-1*v.vy,'vy':v.vx};
		},
		/**
		 * Returns the rebound vector when v1 move to v2.
		 * 求向量V1碰撞V2后的反弹向量。
		 * 
		 * @method rebound
		 * @param {js.math.Vector} v1
		 * @param {js.math.Vector} v2
		 * @param {Boolean} isLeftSide:optional v1 enter from which side of v2
		 * @return {js.math.Vector}
		 */
		rebound: function(v1, v2, isLeftSide){
			var normal = this.getNormal(v2, isLeftSide);
			if(this.isPerpTo(v1,normal)) return null;
			var n = this.project(v1, normal);
			return this.sub(this.mul(this.add(n, v1),2),v1);
		}
	} 
	var V2D = js.math.Vector2D;
	
	/**
	 * @class js.math.Geom2D
	 * @static
	 */
	js.math.Geom2D = {
		/************************* Triangle Methods *************************/
		
		/**
         * P1 equals P2
         * P1，P2是否为同一点
         *
         * @method equalsPoint
         * @param {js.math.Point} p1
         * @param {js.math.Point} p2
         * @return {Boolean}
         */
        equalsPoint: function(p1, p2){
            return MT.equals(p1[0], p2[0]) && MT.equals(p1[1], p2[1])
        },
		/**
		 * Move point towards the radian.
		 * 
		 * @method movePoint
		 * @param {js.math.Point} p
		 * @param {Number} rad
		 * @param {Number} step
		 * @return {js.math.Point}
		 */
		movePoint: function(p, rad, step){
			var p0 = MT.polar2XY(step, rad);			
			return [p0[0]+p[0],p0[1]+p[1]];
		},		
		/**
         * Caculate the slope of Segment P1P2.
         * 计算线段(p1,p2)的斜率。当线段与X轴垂直时，斜率不存在
         * 
         * @method getSlope
         * @param {js.math.Point} p1
         * @param {js.math.Point} p2
         * @return {Number} when P1P2 perpendicular to the X, then return null.
         */
        getSlope: function(p1, p2){
            var a = p1[0] - p2[0];
            var b = p1[1] - p2[1];
            return a == 0 ? null : b / a;
        },
		/**
         * P1,P2,P3 if collinear.
         * 三点是否共线
         * 
         * @method isCollinear
         * @param {js.math.Point} p1
         * @param {js.math.Point} p2
         * @param {js.math.Point} p3
         * @return {Boolean}
         */
		isCollinear: function(p1, p2, p3){
			if(this.equalsPoint(p1,p2) || this.equalsPoint(p2,p3) || this.equalsPoint(p1,p3)) return true;
            return this.posPointAndLine(p3, [p1,p2])==0;
        },
		/**
		 * Judge a point's position by a line vector.
		 * 判断点与直线的位置关系
		 * 
		 * @method posPointAndLine
		 * @param {js.math.Point} p
		 * @param {js.math.Line} line
		 * @return {Int} -1 is LEFT; 1 is RIGHT; 0 is COLLINEAR; 
		 */
		posPointAndLine: function(p, line){
			var v1 = V2D.toVector(line[0], p), v2 = V2D.toVector(line[1], p)
			, rst = V2D.cross(v1, v2);
			
			if(MT.equals(0,Math.abs(rst))) return 0;
			if(rst<0) return -1;
			if(rst>0) return 1;
		},
		/**
		 * Round the point by four decimal length.
		 * 
		 * @method roundPoint
		 * @param {js.math.Point} p
		 * @return {js.math.Point}
		 */
		roundPoint: function(p){
			return [p[0].toFixed(4),p[1].toFixed(4)];
		},
		//判断p是否在p1p2为对角点的矩形内 
		_isInPointsBound: function(p, p1, p2){
			if(this.equalsPoint(p,p1) || this.equalsPoint(p,p2)) return true;
			
			p = this.roundPoint(p),p1 = this.roundPoint(p1),p2 = this.roundPoint(p2);//bugfix						
			return Math.min(p1[0],p2[0]) <= p[0] && p[0] <= Math.max(p1[0],p2[0])
			 && Math.min(p1[1],p2[1]) <= p[1] && p[1] <= Math.max(p1[1],p2[1]);
		},
		/**
		 * The point if on the segment.
		 * 
		 * @method isPointOnSegment
		 * @param {js.math.Point} p
		 * @param {js.math.Line} segment
		 * @return {Boolean}
		 */
		isPointOnSegment: function(p, segment){
			return this.posPointAndLine(p, segment)==0 && this._isInPointsBound(p, segment[0], segment[1]);
		},
		/**
         * Returns the relation of Line P1P2 and Line P3P4.
         * 直线1与直线2的位置关系。
         * 
         * @method posLines
         * @param {js.math.Line} line1
         * @param {js.math.Line} line2
         * @return {Int} 0 is Parallel;1 is Collinear;2 is Cross and not Vertical；3 is Cross and Vertical.
         */
        posLines: function(line1, line2){
            var p1 = line1[0], p2 = line1[1], p3 = line2[0], p4 = line2[1]
			k1 = this.getSlope(p1, p2), k2 = this.getSlope(p3, p4);
            if (MT.equals(k1, k2)) {//平行
                return this.isCollinear(p1, p2, p3)? 1 : 0;
            }
            else {//相交
                var isVertical = false;
                if (!k1 && MT.equals(k2, 0)) {
                    return 3;
                }
                else 
                    if (!k2 && MT.equals(k1, 0)) {
                        return 3;
                    }
                    else 
                        if (MT.equals(k1 * k2, -1)) {
                            return 3;
                        }
                return 2;
            };
        },
		/**
         * Returns a vertical cross point of Line P1P2 and P3.
         * 求点P3与线段（P1,P2）所在直线的垂直交点
         * 
         * @method getVCPOfPointAndLine
         * @param {js.math.Point} p3
         * @param {js.math.Line} line
         * @return {js.math.Point}
         */
        getVCPOfPointAndLine: function(p3, line){
            var p1 = line[0], p2 = line[1], 
			a = p2[0] - p1[0], b = p2[1] - p1[1];
            if (a != 0 && b != 0) {
                var a2 = Math.pow(a, 2), b2 = Math.pow(b, 2)
                ,x0 = (a2 * p3[0] + b2 * p1[0] + a * b * (p3[1] - p1[1])) / (a2 + b2)
                ,y0 = (b * (x0 - p1[0]) + b * p1[1]) / a;
                return [x0,y0];
            }
            else {
                return p1;
            }
        },
        /**
         * Returns the lastest distance of Line P1P2 and P3.
         * 求点P3与线段（P1,P2）所在直线的最短距离
         * 
         * @method getLDOfPointAndLine
         * @param {js.math.Point} p3
         * @param {js.math.Line} line
         * @return {Number}
         */
        getLDOfPointAndLine: function(p3, line){
            var cp = this.getVCPOfPointAndLine(p3, line);
            return this.getPointsDistance(cp, p3);
        },
		/**
         * Returns a cross point of Line P1P2 and Line P3P4.
         * 直线(p1,p2)与直线(p3,p4)的交点。
         * 
         * @method getCPOfLines
         * @param {js.math.Line} line1
         * @param {js.math.Line} line2
         * @return {js.math.Point} If Line P1P2 is parallel to Line P1P2, then return null.
         */
        getCPOfLines: function(line1, line2){
            var p1 = line1[0], p2 = line1[1], p3 = line2[0], p4 = line2[1],
			x1 = p1[0], y1 = p1[1], x2 = p2[0], y2 = p2[1], x3 = p3[0], y3 = p3[1], x4 = p4[0], y4 = p4[1];
            var d = (y2 - y1)*(x4 - x3) - (y4 - y3)*(x2 - x1);
            if (MT.equals(d, 0)) 
                return null;
            
            var x0 = ((x2 - x1) * (x4 - x3) * (y3 - y1) + (y2 - y1) * (x4 - x3) * x1 - (y4 - y3) * (x2 - x1) * x3) / d
			, y0 = ((y2 - y1) * (y4 - y3) * (x3 - x1) + (x2 - x1) * (y4 - y3) * y1 - (x4 - x3) * (y2 - y1) * y3) / (-d);
            
            return [x0,y0];
        },
		/**
		 * Returns a cross point of Segment P1P2 and Segment P3P4.
         * 线段(p1,p2)与线段(p3,p4)的交点。
         * 
         * @method getCPOfSegments
         * @param {js.math.Line} segment1
         * @param {js.math.Line} segment2
         * @return {js.math.Point} If the cross point is not exist, then return null.
         */
        getCPOfSegments: function(segment1, segment2){
            var p1 = segment1[0], p2 = segment1[1], p3 = segment2[0], p4 = segment2[1],
			p = this.getCPOfLines([p1, p2], [p3, p4]);
            if (!p) 
                return null;
            
            return (this._isInPointsBound(p, p1, p2) && this._isInPointsBound(p, p3, p4))? p : null;
        },
		/**
		 * Returns the cross point between a ray and a segment.
		 * 射线与线段的交点。
		 * 
		 * @method getCPOfRayAndSegment
		 * @param {js.math.Point} p
		 * @param {Number} rad
		 * @param {js.math.Line} segment
		 * @return {js.math.Point}
		 */
		getCPOfRayAndSegment: function(p, rad, segment){
			var cp = this.getCPOfLines([p, this.movePoint(p, rad, 10)], segment);
			if(!cp) return null;
			
			return this._isInPointsBound(cp, segment[0], segment[1])? cp: null;
		},
		/**
		 * Returns the cross point between a ray and a line.
		 * 射线与直线的交点。
		 * 
		 * @method getCPOfRayAndLine
		 * @param {js.math.Point} p
		 * @param {Number} rad
		 * @param {js.math.Line} line
		 * @return {js.math.Point}
		 */
		getCPOfRayAndLine: function(p, rad, line){
			return this.getCPOfLines([p, this.movePoint(p, rad, 10)], line);
		},
		/**
		 * Returns the distance of P1 and P2.
         * 返回两点间的距离
         * 
         * @method getPointsDistance
         * @param {js.math.Point} p1
         * @param {js.math.Point} p2
         * @return {Number}
         */
        getPointsDistance: function(p1, p2){
            return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
        },
		/**
		 * Compare the distances of p to array of points.
		 * 比较点p分别到点p1~点pN的距离。
		 * 
		 * @method getNearestPoint
		 * @param {js.math.Point} point
		 * @param {Array<js.math.Point>} points
		 * @return {Int} 
		 */
		getNearestPoint: function(point, points){
			var index = -1;
			if(!points || points.length<=0) return index;
			if(points.length == 1) return 0;
			
			var d = null;
			points.forEach(function(p, i){
				var dis = Math.pow(p[0] - point[0], 2) + Math.pow(p[1] - point[1], 2);
				if(d==null || dis < d){
					d = dis;
					index = i;
				}				
			});
			
			return index;
		},
		/**
         * Returns the ratio point of Segment P1P2.
         * 定比分点公式
         * 
         * @method getRatioPoint
         * @param {js.math.Line} segment
         * @param {Number} ratio Must not equals -1.
         * @return {js.math.Point}
         */
        getRatioPoint: function(segment, ratio){
            return [(segment[0][0] + ratio * segment[1][0]) / (1 + ratio),
                    (segment[0][1] + ratio * segment[1][1]) / (1 + ratio)];
        },
        /**
         * Returns the middle point of Segment P1P2.
         * 求两点间的中点
         * 
         * @method getMidpoint
         * @param {js.math.Line} segment
         * @return {js.math.Point}
         */
        getMidpoint: function(segment){
            return this.getRatioPoint(segment, 1);
        },
				
		/************************* Triangle Methods *************************/
		
		/**
         * P is in Triangle(P1,P2,P3).
         * P是否在三角形(P1,P2,P3)之内
         * 
         * @method isPointInTri
         * @param {js.math.Point} p
         * @param {js.math.Point} p1
         * @param {js.math.Point} p2
         * @param {js.math.Point} p3
         * @return {Boolean}
         */
        isPointInTri: function(p, p1, p2, p3){
            //向量叉乘法判定
            var v12 = V2D.toVector(p1, p2)
			  , v23 = V2D.toVector(p2, p3)
			  , v31 = V2D.toVector(p3, p1)
              , v12_X_v23 = V2D.cross(v12, v23)
			  , v23_X_v31 = V2D.cross(v23, v31)
			  , v31_X_v12 = V2D.cross(v31, v12);
            
            //如果三组叉乘结果都为正或都为负,则表示P在三条边（向量）的同侧，即P在三角形内部
            return (v12_X_v23 > 0 && v23_X_v31 > 0 && v31_X_v12 > 0) || (v12_X_v23 < 0 && v23_X_v31 < 0 && v31_X_v12 < 0);
        },
		/**
         * Returns the center of gravity.
         * 求三角形的重心
         * 
         * @method getTriCGPoint
         * @param {js.math.Point} p1
         * @param {js.math.Point} p2
         * @param {js.math.Point} p3
         * @return {js.math.Point}
         */
        getTriCGPoint: function(p1, p2, p3){
            return {
                x: (p1[0] + p2[0] + p3[0]) / 3,
                y: (p1[1] + p2[1] + p3[1]) / 3
            };
        },
        /**
         * Returns the length.
         * 求三角形的周长
         * 
         * @method getTriLength
         * @param {js.math.Point} p1
         * @param {js.math.Point} p2
         * @param {js.math.Point} p3
         * @return {Number}
         */
        getTriLength: function(p1, p2, p3){
            var a = G2D.getPointsDistance(p1, p2), b = G2D.getPointsDistance(p2, p3), c = G2D.getPointsDistance(p3, p1);
            return a + b + c;
        },
        /**
         * Returns the area.
         * 求三角形的面积
         * 
         * @method getTriArea
         * @param {js.math.Point} p1
         * @param {js.math.Point} p2
         * @param {js.math.Point} p3
         * @return {Number}
         */
        getTriArea: function(p1, p2, p3){
            var a = G2D.getPointsDistance(p1, p2), b = G2D.getPointsDistance(p2, p3), c = G2D.getPointsDistance(p3, p1)
			, p = (a + b + c) / 2;
            return Math.sqrt(p * (p - a) * (p - b) * (p - c));
        },
		
		/************************* Rectangle Methods *************************/
		/**
         * P if is in the Rectangle.
         * P是否在rect之内
         *
         * @method isPointInRect
         * @param {js.math.Point} p
         * @param {js.math.Rect} rect
         * @return {Boolean}
         */
        isPointInRect: function(p, rect){
            var x = p[0], y = p[1];
            return x >= rect.x && x <= (rect.x + rect.w) && y >= rect.y && y <= (rect.y + rect.h);
        },
        /**
         * P if is on the border of the Rectangle.
         * P是否在Rect的边上
         * 
         * @method isPointOnRect
         * @param {js.math.Point} p
         * @param {js.math.Rect} rect
         * @return {Boolean}
         */
        isPointOnRect: function(p, rect){
            return (p[0] == rect.x && (p[1] >= rect.y || p[1] <= (rect.y + rect.h)) ||
            p[0] == (rect.x + rect.w) && (p[1] >= rect.y || p[1] <= (rect.y + rect.h)) ||
            p[1] == rect.y && (p[0] >= rect.x || p[0] <= (rect.x + rect.w)) ||
            p[1] == (rect.y + rect.h) && (p[0] >= rect.x || p[0] <= (rect.x + rect.w)))
        },    
        /**
         * Rectangle1 if contains Rectangle2.
         * 矩形1是否包含矩形2
         *
         * @method containsRect
         * @param {js.math.Rect} rect1
         * @param {js.math.Rect} rect2
         * @return {Boolean}
         */
        containsRect: function(rect1, rect2){
            return (rect2.x >= rect1.x && rect2.y >= rect1.y &&
            (rect2.x + rect2.w) <= (rect1.x + rect1.w) &&
            (rect2.y + rect2.h) <= (rect1.y + rect1.h));
        },
        /**
         * Returns the intersection rectangle of Rectangle1 and Rectangle2.
         * 矩形1与2的相交区域
         *
         * @method intersectsRect
         * @param {js.math.Rect} rect1
         * @param {js.math.Rect} rect2
         * @return {js.math.Rect} If not intersects, then return null.
         */
        intersectsRect: function(rect1, rect2){
            var t = Math.max(rect1.y, rect2.y), r = Math.min(rect1.x + rect1.w, rect2.x + rect2.w)
            , b = Math.min(rect1.y + rect1.h, rect2.y + rect2.h), l = Math.max(rect1.x, rect2.x);
            
            if (b > t && r > l) {
                return {
                    x: l,
                    y: t,
                    w: r - l,
                    h: b - t
                };
            }
            else {
                return null;
            }
        },
		/**
		 * Returns the center point of a rect.
		 * 
		 * @method getRectCenter
		 * @param {js.math.Rect} rect
		 * @return {js.math.Point}
		 */
		getRectCenter: function(rect){
			return [rect.w/2+rect.x, rect.h/2+rect.y];
		},
		/**
		 * set Rectangle1 center to Rectangle2.
		 * 矩形1相对于矩形2居中
		 * 
		 * @method centerToRect
		 * @param {js.math.Rect} rect1
		 * @param {js.math.Rect} rect2
		 */
		centerToRect: function(rect1, rect2){
			var w1 = rect1['w'], h1 = rect1['h'], w2 = rect2['w'], h2 = rect2['h'];
			rect1.x = rect2.x + (w2-w1)/2;
			rect1.y = rect2.y + (h2-h1)/2;
		},  
		/**
         * Limit Rectangle1 in Rectangle2.
         * 矩形1限制在矩形2的范围内
         * 
         * @method limitInRect
         * @param {js.math.Rect} rect1
         * @param {js.math.Rect} rect2
         * @return {Boolean} Return true when Rectangle1 cross-border
         */
        limitInRect: function(rect1, rect2){
            var isChange = false;
            if (rect1.x < rect2.x) {
                rect1.x = rect2.x;
                isChange = true;
            }
            else 
                if (rect1.x > (rect2.x + rect2.w - rect1.w)) {
                    rect1.x = rect2.x + rect2.w - rect1.w;
                    isChange = true;
                };
            if (rect1.y < rect2.y) {
                rect1.y = rect2.y;
                isChange = true;
            }
            else 
                if (rect1.y > (rect2.y + rect2.h - rect1.h)) {
                    rect1.y = rect2.y + rect2.h - rect1.h;
                    isChange = true;
                };
            return isChange;
        },
		/**
		 * Returns four borders of the Rectangle.
		 * 
		 * @method getRectBorders
		 * @param {js.math.Rect} rect
		 * @return {Array<js.math.Line>}
		 */
		getRectBorders: function(rect){	
			var point4 = this.getRectPoints(rect);
			
			return [
			        [point4[0],point4[1]]
			        ,[point4[1],point4[2]]
			        ,[point4[2],point4[3]]
			        ,[point4[3],point4[0]]
			        ];
		},
		/**
         * Return a new position of Rect1 when Rect1 avoid to Rect2.
         * 矩形1避让矩形2
         * 
         * @method avoidToRect
         * @param {js.math.Rect} rect1
         * @param {js.math.Rect} rect2
         * @param {Number} rad the radian of rect1's movment
         * @return {js.math.Point} new XY of the rect1
         */
        avoidToRect: function(rect1, rect2, rad){
            var iRect = G2D.intersectsRect(rect1, rect2);
			
			if (iRect != null) {
				var center1 = this.getRectCenter(rect1)
				,points = this.getRectPoints(rect2)
				,oldpoint0 = points[0],oldpoint1 = points[1],oldpoint2 = points[2],oldpoint3 = points[3]
				,point0 = [oldpoint0[0]-rect1.w/2, oldpoint0[1]-rect1.h/2]
				,point1 = [oldpoint1[0]+rect1.w/2, oldpoint1[1]-rect1.h/2]
				,point2 = [oldpoint2[0]+rect1.w/2, oldpoint2[1]+rect1.h/2]
				,point3 = [oldpoint3[0]-rect1.w/2, oldpoint3[1]+rect1.h/2]
				,segment4 = [
				    [point0,point1],[point1,point2],[point2,point3],[point3,point0]
				]
				, antiDir = MT.getAntiDir(rad);
				
				var crossPoints = [];
				segment4.some(function(line){
					var cp = this.getCPOfRayAndSegment(center1,antiDir,line);
					if(cp) {//找到rect1的新的中心点
						crossPoints.push(cp);
					}
				},this);
				var index = this.getNearestPoint(center1, crossPoints)
				, crossPoint = crossPoints[index];
				return [crossPoint[0]-rect1.w/2, crossPoint[1]-rect1.h/2];
            } else {
                return null;
            }
        },
		/**
		 * Returns four points of a rect.
		 * 
		 * @method getRectPoints
		 * @param {js.math.Rect} rect
		 * @return {Array<js.math.Point>}
		 */ 
		getRectPoints: function(rect){
			return [
				[rect.x, rect.y], [rect.x+rect.w, rect.y], [rect.x+rect.w, rect.y+rect.h], [rect.x, rect.y+rect.h]
			]
		},
		/**
		 * Returns the positionship of a rect and a line.
		 * @method posRectAndLine
		 * @param {js.math.Rect} rect
		 * @param {js.math.Line} line
		 * @return {Int} -1: is right; 0 is on; 1 is left
		 */       
		posRectAndLine: function(rect, line){
			var points = this.getRectPoints(rect)
			, a1 = this.posPointAndLine(points[0], line)
			, a2 = this.posPointAndLine(points[1], line)
			, a3 = this.posPointAndLine(points[2], line)
			, a4 = this.posPointAndLine(points[3], line)
			
			if(a1==-1 && a2==-1 && a3==-1 && a4==-1) return -1;
			if(a1==1 && a2==1 && a3==1 && a4==1) return 1;
			return 0;
		},
		/************************* Round Methods *************************/		
		/**
		 * Returns the length of a round.
		 * 已知半径，求圆的周长
		 * 
		 * @method getRoundLength
		 * @param {Number} r 半径
		 * @return {Number} 
		 */
		getRoundLength: function(r){return 2*r*Math.PI},
		/**
		 * Returns the area of a round.
		 * 已知半径，求圆的面积
		 * 
		 * @method getRoundArea
		 * @param {Number} r 半径
		 * @return {Number}
		 */
		getRoundArea: function(r){return Math.PI*Math.pow(r,2)},
		/**
		 * Point P if is on the round.
		 * 点P是否在圆上
		 * 
		 * @method isOnRound
		 * @param {js.math.Point} c
		 * @param {Number} r
		 * @param {js.math.Point} p
		 * @return {Boolean}
		 */
		isOnRound: function(c, r, p){
			var v1 = Math.pow(p[0]-c[0],2)
			  , v2 = Math.pow(p[1]-c[1],2)
			  , v3 = Math.pow(r,2);
			return MT.equals(v1+v2-v3,0);  
		},
		/**
		 * Returns the center point of a round.
		 * 已知圆上两点与半径，求圆心坐标
		 * 
		 * @method getRoundCenter
		 * @param {js.math.Point} p1 
		 * @param {js.math.Point} p2 
		 * @param {Number} r 
		 * @return {js.math.Point} 
		 */
		getRoundCenter: function(p1,p2,r){
			var d = G2D.getPointsDistance(p1, p2);
			if(d > 2*r) return null;
			
			var m = G2D.getMidpoint([p1, p2]), a = MT.calcRadian(p1,p2)//p2p1与X轴的夹角
			, c = Math.sqrt(Math.pow(r,2)-Math.pow(d/2,2))//中点到圆心的距离			
			, x1y1 = MT.polar2XY(c, MT.RADIAN_4+a), x2y2 = MT.polar2XY(c, -1*(MT.RADIAN_4+a));//以中点为原点的极坐标系
			return [
				[m[0]+x1y1[0],m[1]+x1y1[1]]
				, [m[0]+x2y2[0],m[1]+x2y2[1]]
			];
		}
	}
	var G2D = js.math.Geom2D;
		
	/**
	 * @class js.phys.Motion2D
	 * @static
	 */
	js.phys.Motion2D = {
		/**
		 * Calc the merge velocity.
		 * 求合速度
		 *
		 * @method mergeVelocity
		 * @param {Number} vx
		 * @param {Number} vy
		 * @return {Number}
		 */
		mergeVelocity: function(vx, vy){
			return (Math.pow(vx, 2) + Math.pow(vy, 2)) / 2;
		}
	}
	/**
	 * @class js.phys.Formulas
	 * @static
	 */
	js.phys.Formulas = {			
		/**
		 * Linear motion formula. 
		 * 直线运动公式
		 * 
		 * @method line
		 * @param {Int} t 计时器
		 * @param {js.math.Point} from 起始点
		 * @param {Number} rad 直线与X轴夹角的弧度
		 * @param {Number} v 速度
		 * @return {js.math.Point} 返回当前时间的点坐标
		 */
		line: function(t, from, rad, v){
			if(!from) throw new Error();
			
			var vxy = MT.polar2XY(v, rad);		
			return [vxy[0]*t+from[0], vxy[1]*t+from[1]];
		},
		/**
		 * Round motion formula.
		 * 圆周运动公式
		 * 
		 * @method round
		 * @param {Number} t 计时器 
		 * @param {js.math.Point} from 起始点
		 * @param {js.math.Point} center 圆心
		 * @param {Number} v 线速度
		 * @param {Int} f 0:Clockwise(顺时针);1:Anticlockwise(逆时针)
		 * @return {js.math.Point} 返回当前时间的点坐标
		 */
		round: function(t, from, center, v, f){
			if(!from || !center) throw new Error();
			if(G2D.equalsPoint(from,center)) return from;			
			
			var r = G2D.getPointsDistance(from, center),w = v/r, wt = w*t+MT.calcRadian(from, center)
			,sc = f?[Math.sin(wt),Math.cos(wt)]:[Math.cos(wt),Math.sin(wt)];
			return [center[0]+r*sc[0], center[1]+r*sc[1]];
		}
	}	
}());