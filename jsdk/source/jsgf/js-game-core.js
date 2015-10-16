/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.2
 * @author feng.chun
 * @date 2010-11-15
 * @date 2011-04-14
 * @date 2011-10-19
 * 
 * @version 0.1
 * @author feng.chun
 * @date 2010-10-6
 * 
 * @requires /core/js-core.js
 * @requires /core/js-mathphys.js
 * @requires /core/js-thread.js
 * @requires /core/js-input.js
 * @requires /js2d/js-2d-core.js
 */
js.lang.System.namespace('js.game.collision');

(function() {
var SYS = js.lang.System,
    D = js.core.Dom,
	$ = js.core.Dom.$,
	E = js.core.Event,
	MT = js.math.MathTool,
	G2D = js.math.Geom2D;

/**
 * @class js.game.Sprite
 * @abstract
 * @extends js.d2.View
 * @constructor
 * 
 * @struct js.game.SpriteFrame {
 * 		"description":""
 * 		,"type":"object"
 * 		,"properties":{
 * 			"id":{"type":"string"}
 * 			,"src":{"type":"string"}
 * 			,"x":{"type":"number"}
 * 			,"y":{"type":"number"}
 * 			,"offsetX":{"type":"number"}
 * 			,"offsetY":{"type":"number"}
 * 			,"opacity":{"type":"number","default":1,"required":false}
 * 			,"width":{"type":"number"}
 * 			,"height":{"type":"number"}
 * 			,"visible":{"type":"boolean","default":false,"required":false}	
 * 		}
 * }
 * 
 * @struct js.game.SpriteFrameSeq {
 * 		"description":""
 * 		,"type":"array"
 * 		,"items":[
 *         {"description":"format is [offsetX,offsetY]","type":"js.math.Point"}
 *      ]
 * }
 *  
 * @struct js.game.Sprite$Config {
 * 		"description":""
 * 		,"type":"object"
 * 		,"properties":{
 * 			"dir":{"type":"number"}
 * 			,"imageSrc":{"type":"string"}
 * 			,"frameSeqs":{"type":"object<string,js.game.SpriteFrameSeq>"}
 * 			,"frameSeqKey":{"type":"string"}	
 * 		}
 * 		,"extends":"js.d2.View$Config"
 * }
 * 
 * @param {js.game.Sprite$Config} config
 */
js.game.Sprite = function(config){
	js.game.Sprite.superclass.constructor.apply(this, arguments);
	/**
	 * 方向:弧度计量
	 * @field {Number} _dir 
	 * @private
	 */
	this._dir = config['dir']||MT.RADIAN_0;
	/**
	 * 精灵帧的图片源URL
	 * @field {String} _imageSrc 
	 * @private
	 */
	this._imageSrc = config['imageSrc'];
	/**
	 * 多个精灵帧序列的集合
	 * @field {object<string,js.game.SpriteFrameSeq>} _frameSeqs
	 * @private
	 */
	this._frameSeqs = config['frameSeqs'];
	/**
	 * 当前帧序列的Key
	 * @field {String} _frameKey 
	 * @private
	 */
	this._frameKey = config['frameSeqKey'];
	/**
	 * 当前帧数组的索引指针
	 * @field {Int} _frameIndex 
	 * @private
	 */
	this._frameIndex = 0;	
	/**
	 * 碰撞用的AABB矩形，其X,Y坐标为相对于精灵帧图砖的坐标
	 * @field {Object<js.game.collision.AABB>} _aabbs
	 * @private
	 */
	this._aabbs = {};
	
	/**@event turning */
	this.createEvent('turning');
	/**@event turned */
	this.createEvent('turned');
};
SYS.extend(js.game.Sprite, js.d2.View,{
	/**
	 * Return the image's url.
	 * 
	 * @method getImageSrc
	 * @return {String} 
	 */
	getImageSrc: function(){
		return this._imageSrc;
	},
	/**
	 * Paint the sprite on the canvas.
	 * 在画布上绘制精灵
	 * 
	 * @method paint
	 * @override
	 * @param {js.d2.Canvas} canvas
	 */
	paint: function(canvas){
		if(this._isD) return;
				
		this.fireEvent('painting');
		canvas.drawImage(this.getFrame());
		this.fireEvent('painted');		
	},
	/**
	 * Returns the current frame.
	 * 
	 * @method getFrame
	 * @param {Int} i:optional
	 * @param {String} key:optional
	 * @return {js.game.SpriteFrame} 
	 */
	getFrame: function(/*i, key*/){
		var i = SYS.isUndefined(arguments[0])? this._frameIndex:arguments[0]
		, key = arguments[1]||this._frameKey;
		
		var d = this._frameSeqs[key];
		if(!d) throw new Error();
		
		var offset = d[i];
		if(!offset) throw new Error();	
		
		if(!this._isV){
			return {
				id: this._id, visible:false
			}
		}else{
			return {
				id: this._id, x: this._x, y: this._y, z: this._z, opacity: this._opacity
				, src: this._imageSrc, offsetX: offset[0], offsetY: offset[1]
				, width: this._w, height: this._h, visible:true
			}
		}
	},
	/**
	 * Sets the current frame queue's index.
	 * 
	 * @method setFrameIndex
	 * @param {Int} i default value is zero
	 */
	setFrameIndex: function(i){
		if (i in this._frameSeqs[this._frameKey]) {
			this._frameIndex = i;
		}else {
			this._frameIndex = 0;
		}
	},
	/**
	 * Sets the key of the current frame queue.
	 * 
	 * @method setFrameSeqKey
	 * @param {String} key
	 */
	setFrameSeqKey: function(key){
		if(key in this._frameSeqs) this._frameKey = key;
	},
	/**
	 * Returns the key of the current frame queue.
	 * 
	 * @method getFrameSeqKey
	 * @return {String}
	 */
	getFrameSeqKey: function(){
		return this._frameKey;
	},
	/**
	 * Goto next frame.
	 * 
	 * @method nextFrame
	 */
	nextFrame: function(){
		var f = this._frameSeqs[this._frameKey];
		if(!f) throw new Error();
		this._frameIndex = this._frameIndex>=(f.length-1)?0:this._frameIndex+1;
	},
	/**
	 * Goto prev frame.
	 * 
	 * @method prevFrame
	 */
	prevFrame: function(){
		var f = this._frameSeqs[this._frameKey];
		if(!f) throw new Error();
		this._frameIndex = this._frameIndex<=0?f.length-1:this._frameIndex-1;
	},
	/**
	 * Returns the frame queue data by the key.
	 * 
	 * @method getFrameSeq
	 * @param {String} key 
	 * @return {js.game.SpriteFrameSeq} 
	 */
	getFrameSeq: function(key){return key?this._frameSeqs[key]:this._frameSeqs},
	/**
	 * Sets the frame queue data, like: [[offsetX1,offsetY1],...,[offsetXn,offsetYn]].
	 * 
	 * @method setFrameSeq
	 * @param {String} key 
	 * @param {js.game.SpriteFrameSeq} data 
	 */
	setFrameSeq: function(key, data){return this._frameSeqs[key] = data}, 	
	/**
	 * Return the diretory of the sprite.
	 * 
	 * @method getDir
	 * @return {Number} 弧度 
	 */
	getDir: function(){return this._dir},
	/**
	 * Turn the diretory of the sprite.
	 * 
	 * @method turn
	 * @param {Number} dir 弧度 
	 */
	turn: function(dir){
		if(SYS.isUndefined(dir)) return;
		this.fireEvent('turning', dir);
		this._dir = dir;
		this.fireEvent('turned', dir);		
	},
	/**
	 * Move the sprite with a step by the diretory.
	 * 
	 * @method moveWith
	 * @param {Number} step
	 */
	moveWith: function(step){
		var xy = MT.polar2XY(step, this.getDir());
		this.move(xy[0],xy[1]);
	},
	/**
	 * Sets a new AABB rectangle.
	 * 
	 * @method setAABB
	 * @param {String} key the name of the AABB
	 * @param {js.math.Rect} collisionRect relative to the sprite's frame
	 */
	setAABB: function(key, collisionRect){
		this._aabbs[key] = new js.game.collision.AABB(this, collisionRect);
	},
	/**
	 * Returns a AABB by name
	 * 
	 * @method getAABB
	 * @param {String} key
	 * @return {js.game.collision.AABB}
	 */
	getAABB: function(key){
		return this._aabbs[key];
	}
});

/**
 * @class js.game.TiledLayer 
 * @extends js.d2.View
 * @constructor 
 * 
 * @struct js.game.TiledLayer$Config {
 * 		"description":""
 * 		,"type":"object"
 * 		,"properties":{
 * 			"src":{"type":"string"}
 * 			,"cell_size":{"type":"array", "items":[{"type":"number"}]}
 * 			,"tile_set":{"type":"array", "items":[{"type":"js.math.Point"}]}
 * 		}
 * 		,"extends":"js.d2.View$Config"
 * }
 * 
 * @param {js.game.TiledLayer$Config} config
 */	
js.game.TiledLayer = function(config){
	js.game.TiledLayer.superclass.constructor.apply(this, arguments);
	//@field {String} 图砖的图像源文件路径
	this._src = config['src'];	
	//@field {Array} 图砖的尺寸
	this._cellSize = config['cell_size'];
	//@field {Array<Point>} 图砖的定义集合
	this._tileSet = config['tile_set'];
	//@field {Array[][]} 地图数据（二维数组）
	this._data = null;
	//@field {Rect} 当前绘制区域
	this._paintRect = null;
	
	/**  
	 * @event painted {
	 * 		"description":"fires after paint every cell"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.game.TiledLayer"}
	 *      ,"arguments":{
	 *          "type":"array"
	 *          ,"items":[
	 *              {"type":"HTMLElement", "description":"cell's element"}
	 *              ,{"type":"string|number", "description":"cell's value"}
	 *              ,{"type":"js.math.Point", "description":"cell's (x,y)"}
	 *          ]
	 *      }
	 * }
	 */
	this.createEvent('painted');
}	
SYS.extend(js.game.TiledLayer, js.d2.View,{
	_check: function(col, row, a){
		if(!a || a.length<1 || isNaN(col) || isNaN(row)) return false;
		var size = [a[0].length, a.length];
		return (col<0 || col>=size[0] || row<0 || row>=size[1])?false:true;
	},
	_getCellId: function(mapX,mapY){return this.getId()+'_'+mapX+'_'+mapY;},
	_getImage: function(mapX,mapY,tileIndex){
		var tile = this._tileSet?this._tileSet[tileIndex]:String(tileIndex).split(',')
			,w = this._cellSize[0]
			,h = this._cellSize[1];
		
		return {
			id: this._getCellId(mapX,mapY)
			,src: this._src	,width: w,height: h
			,offsetX:tile[0],offsetY:tile[1]
			,x: this._x+w*mapX, y: this._y+h*mapY
		};
	},
	/**
	 * Paint the layer on the canvas.
	 * 
	 * @method paint
	 * @override
	 * @param {js.d2.Canvas} canvas
	 */	
	paint: function(canvas){
		if(!this.isVisible() || !this._data) return;
		//仅仅绘制指定区域
		var rect = G2D.intersectsRect(this.getPaintRect(),{x:0,y:0,w:this._data[0].length,h:this._data.length})
		if(!rect) return;
		var px = rect.x,py = rect.y,pw = rect.w,ph = rect.h;
		
		var layer = $(this.getId());
		if(!layer) {
			layer = canvas.drawElement('div',{id:this.getId()});
		}
		
		var frag = document.createDocumentFragment();
		for(var i=py,len1=py+ph;i<len1;i++){
			for(var j=px,len2=px+pw;j<len2;j++){
				var tileIndex = this.getCell(j,i);
				var el = canvas.createImage(this._getImage(j,i,tileIndex));
				el.setAttribute('jsdk_jsgf_tileIndex', tileIndex);				
				frag.appendChild(el);
				this.fireEvent('painted', el, tileIndex, [j,i]);
			}
		}
		layer.appendChild(frag);
	},
	/**
	 * Returns the bound of the cell(x,y).
	 * 
	 * @method getCellBound
	 * @param {Int} mapX 地图X坐标
	 * @param {Int} mapY 地图Y坐标
	 * @return {js.math.Rect} 
	 */
	getCellBound: function(mapX, mapY){
		var wUint = this._cellSize[0], hUnit = this._cellSize[1];
		return {
			x:this._x+mapX*wUint,
			y:this._y+mapY*hUnit,
			w:wUint,
			h:hUnit}
	},
	/**
	 * Return the cell's size.
	 * 
	 * @method getCellSize
	 * @return {Array} [width,height]
	 */
	getCellSize: function(){return this._cellSize},	
	/**
	 * Returns the cell's value.
	 * 返回单元格的值
	 * 
	 * @method getCell
	 * @param {Int} col 列号：地图X坐标
	 * @param {Int} row 行号：地图Y坐标
	 * @return {String|Int} 
	 */	
	getCell: function(mapX, mapY){
		if (!this._check(mapX, mapY, this._data)) {
			var cell = $(this._getCellId(mapX,mapY));
			if(cell){
				return cell.getAttribute('jsdk_jsgf_tileIndex');
			}else{
				return null;
			}
		}
		
		return this._data[mapY][mapX];
	},
	/**
	 * The cell if is visible.
	 * 
	 * @method isVisibleCell
	 * @param {Int} mapX 地图X坐标
	 * @param {Int} mapY 地图Y坐标
	 * @return {Boolean}
	 */	
	isVisibleCell: function(mapX, mapY){
		var cell = $(this._getCellId(mapX,mapY));
		return cell?true:false;
	},
	/**
	 * Sets the cell's value.
	 * 
	 * @method setCell
	 * @param {Int} mapX       地图X坐标
	 * @param {Int} mapY       地图Y坐标
	 * @param {Int} tileIndex  图砖索引
	 */
	setCell: function(mapX, mapY, tileIndex){
		if(!this._check(mapX,mapY,this._data)) throw new Error();
		this._data[mapY][mapX] = tileIndex;
	},
	/**
	 * Fill many of cells.
	 * 
	 * @method fillCells
	 * @param {Int} mapX      地图X坐标
	 * @param {Int} mapY      地图Y坐标
	 * @param {Int} numCols   列数
	 * @param {Int} numRows   行数
	 * @param {Int} tileIndex 图砖索引
	 */
	fillCells: function(mapX, mapY,numCols,numRows,tileIndex){
		if(!this._check(mapX+numCols,mapY+numRows,this._data)) throw new Error();
		for(var i = mapX; i<numCols; i++){
			for(var j = mapY; i<numRows; i++){
				this.setCell(i, j, tileIndex);
			}	
		}
	},
	/**
	 * Returns the current paint rect of the layer.
	 * 
	 * @method getPaintRect
	 * @return {js.math.Rect}
	 */
	getPaintRect: function(){
		if(!this._paintRect) this._paintRect = {x:0,y:0,w:this._w,h:this._h};		
		return this._paintRect;
	},
	_setNumber: function(k, n, min, max){
		if(!SYS.isUndefined(n)) this._paintRect[k] = n;
	},
	/**
	 * Sets the current paint rect of the layer.
	 * 
	 * @method setPaintRect
	 * @param {Int} mapX 地图X坐标
	 * @param {Int} mapY 地图Y坐标
	 * @param {Int} cols 列数
	 * @param {Int} rows 行数
	 */
	setPaintRect: function(mapX, mapY, cols, rows){
		if(!this._paintRect) this._paintRect = {x:0,y:0,w:this._w,h:this._h};
		
		var size = this.getSize();
		this._setNumber('x', mapX);
		this._setNumber('y', mapY);
		this._setNumber('w', cols);
		this._setNumber('h', rows);
	},
	/**
	 * Moves the current paint rect of the layer.
	 * 
	 * @method movePaintRect
	 * @param {Number} dx 
	 * @param {Number} dy 
	 */
	movePaintRect: function(dx, dy){
		var rect = this.getPaintRect();
		this.setPaintRect(rect.x+dx,rect.y+dy);
	},
	/**
	 * Sets the map data.
	 * 
	 * @method setData
	 * @param {Array[][]} data
	 */	
	setData: function(data){
		if(!data || data.length<1 || SYS.isUndefined(data[0][0])){
			this._data = null;
			this.setSize(0,0);	
		}else{
			this._data = data;
			this.setSize(data[0].length, data.length);		
		} 		
	},
	/**
	 * Returns the map data.
	 * 
	 * @method getData
	 * @return {Array[][]} data
	 */
	getData: function(){return this._data;},		
	/**
	 * Returns the cell' x and y by the canvas's X and Y
	 * 
	 * @method getCellXY
	 * @param {Number} x 画布x坐标
	 * @param {Number} y 画布y坐标
	 * @return {Array} [col,row]
	 */
	getCellXY: function(x, y){
		var mapX = Math.floor((x-this._x)/this._cellSize[0])
		, mapY = Math.floor((y-this._y)/this._cellSize[1]);
		return [mapX,mapY];
	},
	/**
	 * Returns the cell' value by the canvas's X and Y
	 * 
	 * @method getCellByXY
	 * @param {Number} x 画布x坐标
	 * @param {Number} y 画布y坐标
	 * @return {String|Number} 
	 */
	getCellByXY: function(x, y){
		var xy = this.getCellXY(x,y);
		return this.getCell(xy[0],xy[1]);
	}
});
/**
 * @mix js.core.EventProvider
 */
SYS.augment(js.game.TiledLayer, js.core.EventProvider);

/**
 * AABB is Axis-Aligned Bounding Box, used by collision detection.
 * 
 * @class js.game.collision.AABB
 * @constructor
 * 
 * @param {js.game.Sprite} sprite
 * @param {js.math.Rect} collisionRect
 */
js.game.collision.AABB = function(sprite, collisionRect){
	this.sprite = sprite;
	this.collisionRect = collisionRect?collisionRect:{x:0,y:0,w:sprite.getWidth(),h:sprite.getHeight()};
};

js.game.collision.AABB.prototype = {
	/**
	 * Returns the bounding box rectangle of the sprite.
	 * 
	 * @method getBoundingBox
	 * @return {js.math.Rect}
	 */
	getBoundingBox: function(){
		var bound = this.sprite.getBound();
		return {
			x: bound.x+this.collisionRect.x, y: bound.y+this.collisionRect.y,
			w: this.collisionRect.w, h: this.collisionRect.h
		}
	},
	/**
	 * @method isDestoryed
	 * @return {boolean}
	 */
	isDestoryed: function(){return this.sprite.isDestoryed()},
	/**
	 * Collision detection with an AABB or a Rect.
	 * 
	 * @method collidesWith
	 * @param {js.math.Rect|js.game.collision.AABB} aabb
	 * @return {Boolean}
	 */
	collidesWith: function(aabb){
		if(!aabb || this.isDestoryed() || (aabb.isDestoryed && aabb.isDestoryed())) return false;
		var bb = (aabb instanceof js.game.collision.AABB)?aabb.getBoundingBox():aabb;		
		return G2D.intersectsRect(this.getBoundingBox(), bb)!=null;
	},
	/**
	 * Collision detection with a tiled layer.
	 * 
	 * @method collidesWithTiles
	 * @param {js.game.TiledLayer} tiledLayer
	 * @param {Array} blockCells
	 * @return {Boolean}
	 */
	collidesWithTiles: function(tiledLayer, blockCells){
		if(!tiledLayer || !blockCells || this.isDestoryed() || tiledLayer.isDestoryed()) return false;
		
		var bb = this.getBoundingBox(), dir = this.sprite.getDir()
		   ,points = G2D.getRectPoints(bb);
		   
		return points.some(function(p, i){
			var cellXY = tiledLayer.getCellXY(p[0],p[1]);
			if(!tiledLayer.isVisibleCell(cellXY[0],cellXY[1])) return false;
			
			var cell = tiledLayer.getCell(cellXY[0],cellXY[1]);
			return !SYS.isUndefined(cell) && blockCells.indexOf(cell)>=0;									
		}, this);
	},
	/**
	 * Avoid to an AABB.
	 * 
	 * @method avoidTo
	 * @param {js.game.collision.AABB} aabb
	 * @return {Boolean}
	 */
	avoidTo: function(aabb){
		if(!(aabb instanceof js.game.collision.AABB) || aabb.isDestoryed()) return false;
		
		var newXY = G2D.avoidToRect(this.getBoundingBox(), aabb.getBoundingBox(), this.sprite.getDir());
		if (newXY) {
			this.sprite.setXY(newXY[0]-this.collisionRect.x, newXY[1]-this.collisionRect.y);
			return true;
		}
		return false;
	},
	/**
	 * Avoid to a tiled layer.
	 * 
	 * @method avoidToTiles
	 * @param {js.game.TiledLayer} tiledLayer
	 * @param {Array} blockCells
	 * @return {Boolean}
	 */
	avoidToTiles: function(tiledLayer, blockCells){
		if(!tiledLayer || !blockCells || this.isDestoryed() || tiledLayer.isDestoryed()) return false;
		
		var bb = this.getBoundingBox(), dir = this.sprite.getDir()
		   ,points = G2D.getRectPoints(bb);		
		   
		return points.some(function(p, i){
			var cellXY = tiledLayer.getCellXY(p[0],p[1]);
			if(!tiledLayer.isVisibleCell(cellXY[0],cellXY[1])) return false;
			
			var cell = tiledLayer.getCell(cellXY[0],cellXY[1]);
			if(SYS.isUndefined(cell) || blockCells.indexOf(cell)<0) return false;
						
			var newXY = G2D.avoidToRect(bb, tiledLayer.getCellBound(cellXY[0],cellXY[1]), dir);//避让CELL
			if(newXY){
				this.sprite.setXY(newXY[0]-this.collisionRect.x, newXY[1]-this.collisionRect.y);
				return true;
			}						
		}, this);
	},
	/**
	 * Movement be limited in a rectangle.
	 * 
	 * @method limitIn
	 * @param {js.math.Rect} rect
	 * @return {Boolean}
	 */
	limitIn: function(rect){
		if(!rect || this.isDestoryed()) return false;
		
		var bb = this.getBoundingBox();
		
		if(G2D.limitInRect(bb, rect)){
			this.sprite.setXY(bb.x-this.collisionRect.x, bb.y-this.collisionRect.y);
			return true;
		};
		return false;	
	},
	/**
	 * @method isInBox
	 * @param {js.math.Rect|js.game.collision.AABB} rect
	 * @return {Boolean}
	 */
	isInBox: function(rect){
		if(!rect || this.isDestoryed() || (rect.isDestoryed && rect.isDestoryed())) return false;
		
		var bb1 = this.getBoundingBox(), bb2 = (rect instanceof js.game.collision.AABB)?rect.getBoundingBox():rect;
		return G2D.containsRect(bb2, bb1);
	}
}


/**
 * @class js.game.GameStatus
 * @static
 * @final
 */
js.game.GameStatus = {
	/**
	 * @constant {Int} UNSTART -1
	 */
	UNSTART:-1
	/**
	 * @constant {Int} RUNNING 1
	 */
	, RUNNING:1
	/**
	 * @constant {Int} PAUSED 2
	 */
	, PAUSED:2
	/**
	 * @constant {Int} ENDED 3
	 */
	, ENDED:3}
/**
 * The base class of a game.
 * 
 * @class js.game.Game 
 * @abstract
 * @constructor
 * 
 * @struct js.game.Game$Config {
 * 		"description":""
 * 		,"type":"object"
 * 		,"properties":{
 * 			"id":{"type":"string"}
 * 			,"background":{"type":"string","required":false}
 * 			,"viewWindow":{"type":"js.math.Rect","required":false}
 * 			,"x":{"type":"number"}
 * 			,"y":{"type":"number"}
 * 			,"width":{"type":"number"}
 * 			,"height":{"type":"number"}	
 * 		}
 * }
 *  
 * @param {js.game.Game$Config} config
 */
js.game.Game = function(config){
	//@field {String} 游戏类的ID
	this._id = config['id']||SYS.getUUID();
	//@field {Int} 游戏的状态
	this._status = js.game.GameStatus.UNSTART;
	//@field {JSONObject} 游戏类的配置参数
	this._config = config;
	
	//创建事件
	/**  
	 * @event starting {
	 * 		"description":"fires before start the game"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.game.Game"}
	 *      ,"arguments":{
	 *          "type":"null"
	 *      }
	 * }
	 */
	this.createEvent('starting');
	/**
	 * @event started {
	 * 		"description":"fires after start the game"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.game.Game"}
	 *      ,"arguments":{
	 *          "type":"null"
	 *      }
	 * }
	 */
	this.createEvent('started');
	/**
	 * @event resuming {
	 * 		"description":"fires before resume the game to running"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.game.Game"}
	 *      ,"arguments":{
	 *          "type":"null"
	 *      }
	 * }
	 */
	this.createEvent('resuming');
	/**
	 * @event resumed {
	 * 		"description":"fires after resume the game to running"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.game.Game"}
	 *      ,"arguments":{
	 *          "type":"null"
	 *      }
	 * }
	 */
	this.createEvent('resumed');
	/**
	 * @event pausing {
	 * 		"description":"fires before pause the game"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.game.Game"}
	 *      ,"arguments":{
	 *          "type":"null"
	 *      }
	 * }
	 */
	this.createEvent('pausing');
	/**
	 * @event paused {
	 * 		"description":"fires after pause the game"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.game.Game"}
	 *      ,"arguments":{
	 *          "type":"null"
	 *      }
	 * }
	 */
	this.createEvent('paused');
	/**
	 * @event ending {
	 * 		"description":"fires before finish the game"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.game.Game"}
	 *      ,"arguments":{
	 *          "type":"null"
	 *      }
	 * }
	 */
	this.createEvent('ending');
	/**
	 * @event ended {
	 * 		"description":"fires after finish the game"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.game.Game"}
	 *      ,"arguments":{
	 *          "type":"null"
	 *      }
	 * }
	 */
	this.createEvent('ended');
	this._initCanvas();
};
js.game.Game.prototype = {
	_initCanvas: function(){
		if($(this.getId()+'_canvas')) return;		
		this._canvas = new js.d2.Canvas({
				id:this.getId()+'_canvas',background:this._config['background'],viewWindow:this._config['viewWindow']
				,x:this._config['x'],y:this._config['y'],width:this._config['width'],height:this._config['height']
			});													
	},
	/**
	 * Returns the main thread.
	 * 
	 * @method getThread
	 * @return {js.lang.Thread}
	 */
	getThread: function(){return this._thread;},
	/**
	 * Returns the value by the key.
	 * 
	 * @method getConfig
	 * @param {String} k
	 * @return {js.game.Game$Config}
	 */
	getConfig: function(k){return SYS.isUndefined(k)?this._config:this._config[k]},
	/**
	 * Sets the context of the FPS callback function.
	 * 
	 * @method watchFPS
	 * @param {Boolean|js.d2.Canvas} canvas
	 */
	watchFPS: function(canvas){
		var callback = {};
		if(SYS.isBoolean(canvas)){
			if(canvas){
				callback['scope'] = this._canvas;
				callback['fn'] = function(fps){this.printFPS(fps)};
			}else{
				callback = null;
			}
		}else{
			callback['scope'] = canvas||this._canvas;
			callback['fn'] = function(fps){this.printFPS(fps)};
		}
		this._config['fpsCallback'] = callback;
		if(this._thread!=null) this._thread.setFPSCallback(callback);
	},
	/**
	 * Returns the ID.
	 * 返回游戏ID
	 * 
	 * @method getId
	 * @return {String}
	 */
	getId: function(){return this._id;},
	/**
	 * Returns the main canvas.
	 * 返回游戏画布
	 * 
	 * @method getCanvas
	 * @return {js.d2.Canvas}
	 */
	getCanvas: function(){return this._canvas;},
	/**
	 * Return the status.
	 * 返回游戏状态
	 * 
	 * @method getStatus
	 * @return {Int}
	 */
	getStatus: function(){return this._status;},
	/**
	 * Determines whether or not the game is running.
	 * 是否在游戏运行中
	 * 
	 * @method isRunning
	 * @return {Boolean}
	 */
	isRunning: function(){return this.getStatus()==js.game.GameStatus.RUNNING},
	/**
	 * If paused.
	 * 是否在游戏已暂停
	 * 
	 * @method isPaused
	 * @return {Boolean}
	 */
	isPaused: function(){return this.getStatus()==js.game.GameStatus.PAUSED},
	/**
	 * If ended.
	 * 是否在游戏已结束
	 * 
	 * @method isEnded
	 * @return {Boolean}
	 */
	isEnded: function(){return this.getStatus()==js.game.GameStatus.ENDED},
	/**
	 * Starts the game.
	 * 开始游戏
	 * 
	 * @method start
	 */
	start: function(){
		this._initCanvas();
		
		this.fireEvent('starting');	
		this._thread = new SYS.Thread(this,{
			interval:this._config['interval'],fpsMax:this._config['fpsMax']
		});
		this._thread.setFPSCallback(this._config['fpsCallback']);
		this._thread.start();
		this._status = js.game.GameStatus.RUNNING;
		this.fireEvent('started');
	},
	/**
	 * Resumes the running.
	 * 恢复运行
	 * 
	 * @method resume
	 */
	resume: function(){
		this.fireEvent('resuming');	
		this._status = js.game.GameStatus.RUNNING;
		this._thread.resume();
		this.fireEvent('resumed');	
	},
	/**
	 * Pause the game.
	 * 暂停游戏
	 * 
	 * @method pause
	 */
	pause: function(){
		this.fireEvent('pausing');	
		this._status = js.game.GameStatus.PAUSED;
		this._thread.suspend();
		this.fireEvent('paused');	
	},
	/**
	 * End the game.
	 * 结束游戏
	 * 
	 * @method end
	 */
	end: function(){
		this.fireEvent('ending');	
		this._status = js.game.GameStatus.ENDED;
		this._thread.stop();this._thread = null;
		this.fireEvent('ended');					
	},
	/**
	 * Main running method. 
	 * 游戏的主线程方法
	 * 
	 * @method run
	 * @abstract 
	 */
	run: function(){}
}
/**
 * @mix js.core.EventProvider
 */
SYS.augment(js.game.Game, js.core.EventProvider);
/**
 * @mix js.input.KeyBufferProvider
 */
SYS.augment(js.game.Game, js.input.KeyBufferProvider);
/**
 * @mix js.input.MouseProvider
 */
SYS.augment(js.game.Game, js.input.MouseProvider);

/**
 * A base class of mission.
 * 
 * @class js.game.Mission 
 * @abstract
 * @constructor
 * 
 * @param {object} config
 */
js.game.Mission = function(config){
	//@field {Object}
	this._config = config;
	this._s = false;
	
	//创建事件
	/**
	 * @event starting {
	 * 		"description":"fires before start the mission"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.game.Mission"}
	 *      ,"arguments":{
	 *          "type":"null"
	 *      }
	 * }
	 */
	this.createEvent('starting');
	/**
	 * @event started {
	 * 		"description":"fires after start the mission"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.game.Mission"}
	 *      ,"arguments":{
	 *          "type":"null"
	 *      }
	 * }
	 */
	this.createEvent('started');	
	/**
	 * @event running {
	 * 		"description":"fires before run every cycle of the mission"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.game.Mission"}
	 *      ,"arguments":{
	 *          "type":"null"
	 *      }
	 * }
	 */
	this.createEvent('running');
	/**
	 * @event completed {
	 * 		"description":"fires after finish the mission"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.game.Mission"}
	 *      ,"arguments":{
	 *          "type":"null"
	 *      }
	 * }
	 */
	this.createEvent('completed');
	/**
	 * @event failed {
	 * 		"description":"fires after failure the mission"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.game.Mission"}
	 *      ,"arguments":{
	 *          "type":"null"
	 *      }
	 * }
	 */
	this.createEvent('failed');
};
js.game.Mission.prototype = {
	/**
	 * Returns the value by the key.
	 * 返回关卡配置参数
	 * 
	 * @method getConfig
	 * @param {String} k 参数的KEY
	 * @return {Object} 参数的Value
	 */
	getConfig: function(k){return k?this._config[k]:this._config},
	/**
	 * Mission if started.
	 * 
	 * @method isStarted
	 * @return {Boolean}
	 */
	isStarted: function(){return this._s},
	/**
	 * Sets the flag of start.
	 * 
	 * @method setStarted
	 * @param {Boolean} f
	 */
	setStarted: function(f){return this._s = f;},
	/**
	 * Start the mission.
	 * @abstarct
	 * @method start
	 * @param {js.game.Game} game
	 */
	start: function(game){	
	},
	/**
	 * Running the mission.
	 * 
	 * @abstarct
	 * @method run
	 * @param {js.game.Game} game
	 */
	run: function(game){},
	/**
	 * Fail the mission.
	 * 
	 * @method fail
	 */
	fail: function(){
		this._s = false;
		this.fireEvent('failed');		
	},
	/**
	 * Complete the mission.
	 * 
	 * @method complete
	 */
	complete: function(){
		this._s = false;
		this.fireEvent('completed');		
	}
}
/**
 * @mix js.core.EventProvider
 */
SYS.augment(js.game.Mission, js.core.EventProvider);

/**
 * Manage all missions.
 * 
 * @class js.game.MissionManager 
 * @constructor 
 */
js.game.MissionManager = function(){
	this._missions = [];
	this._missionIndex = -1;
	this._onMission = {};
}
js.game.MissionManager.prototype = {
	_subscribeMission:function(mission, type){
		if(!this._onMission) return;
		var fn = this._onMission[type];
		if (fn) {
			mission.subscribe(type, fn);
		}
	},
	_unsubscribeMission:function(mission, type){
		if(!this._onMission) return;
		var fn = this._onMission[type];
		if (fn) {
			mission.unsubscribe(type, fn);
		}
	},
	//Loads a mission.
	//@method _loadMission
	//@param {js.game.Mission} m
	//@private
	_loadMission: function(m){
		if (m) {
			//设置事件
			this._subscribeMission(m, 'starting');
			this._subscribeMission(m, 'started');
			this._subscribeMission(m, 'running');
			this._subscribeMission(m, 'completed');
			this._subscribeMission(m, 'failed');		
			this._missions.push(m);
		}
	},
	/**
	 * Load missions.
	 * @method loadMissions
	 * @param {js.game.Mission|Array<js.game.Mission>} ms
	 */
	loadMissions: function(ms){
		if(!SYS.isArray(ms)) {
			this._loadMission(ms);
		} else {
		    ms.forEach(function(m){
				this._loadMission(m);
			},this);	
		}
	},
	_unloadMission: function(i){
		var m = this._missions[i];
		if(!m) return;
		this._unsubscribeMission(m, 'starting');
		this._unsubscribeMission(m, 'started');
		this._unsubscribeMission(m, 'running');
		this._unsubscribeMission(m, 'completed');
		this._unsubscribeMission(m, 'failed');
	},
	/**
	 * Unload missions.
	 * @method unloadMissions
	 */
	unloadMissions: function(){
		this._missions.forEach(function(m, i){
			this._unloadMission(i);
		},this);
		this._missions = [];
	},
	/**
	 * Returns a mission by index.
	 * @method getMission 
	 * @param {Int} i:optional index
	 * @return {js.game.Mission}
	 */
	getMission: function(i){
		return this._missions[SYS.isUndefined(i)?this._missionIndex:i];
	},
	/**
	 * Returns next mission.
	 * @method getNextMission
	 * @return {js.game.Mission}
	 */
	getNextMission: function(){		;
		return this.getMission(++this._missionIndex);
	},
	/**
	 * Determines whether or not has next mission.
	 * @method hasNextMission
	 * @return {Boolean}
	 */
	hasNextMission: function(){
		return (this._missionIndex+1) < this._missions.length;
	},
	/**
	 * Sets the listeners on missions.
	 * 
	 * @method onMission
	 * @param {String} eName the event name
	 * @param {Function} fn
	 */
	on: function(eName, fn){this._onMission[eName] = fn;},
	/**
	 * Returns the current mission's index.
	 * 
	 * @method getMissionIndex
	 * @return {Int}
	 */
	getMissionIndex: function(){return this._missionIndex;},
	/**
	 * Reset the current mission's index to -1.
	 * 
	 * @method reset
	 */
	reset: function(){this._missionIndex = -1;}	
	
	/**
	 * @event starting {
	 * 		"description":"fires before start the mission"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.game.Mission"}
	 *      ,"arguments":{
	 *          "type":"null"
	 *      }
	 * }
	 */
	/**
	 * @event started {
	 * 		"description":"fires after start the mission"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.game.Mission"}
	 *      ,"arguments":{
	 *          "type":"null"
	 *      }
	 * }
	 */
	/**
	 * @event running {
	 * 		"description":"fires before run every cycle of the mission"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.game.Mission"}
	 *      ,"arguments":{
	 *          "type":"null"
	 *      }
	 * }
	 */
	/**
	 * @event completed {
	 * 		"description":"fires after finish the mission"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.game.Mission"}
	 *      ,"arguments":{
	 *          "type":"null"
	 *      }
	 * }
	 */
	/**
	 * @event failed {
	 * 		"description":"fires after failure the mission"
	 * 		,"type":"function"
	 * 		,"scope":{"type":"js.game.Mission"}
	 *      ,"arguments":{
	 *          "type":"null"
	 *      }
	 * }
	 */
}

}());