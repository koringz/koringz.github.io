/**
 * @project JSDK: JavaScript Development Kit
 * @copyright Copyright (c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.2
 * @author fengchun
 * @date 2011-01-25
 * @date 2011-03-08
 * @date 2011-03-22
 * @date 2011-03-29
 * @date 2011-04-14
 * 
 * @version 0.1
 * @author fengchun
 * @email f15_nsm@hotmail.com
 * @date 2010-12-02
 */
PKG1945.Painter = {
	drawImage: function(json){		
		var canvas = json['canvas'], xy = json['xy']||json['from'], image = json['image'];		
		return canvas.drawImage({
			z:10, x:xy[0], y:xy[1], width:image.w, height:image.h
			,src:GAME.IMG_SRC, offsetX:image.x, offsetY:image.y
		});
	},
	drawText: function(json){
		var canvas = json['canvas'], xy = json['xy']||json['from'];		
		return canvas.drawText({
			z:10, x:xy[0], y:xy[1], text:json['text'], color:json['color']
			, fontFamily:GAME.FONT_FAMILY, fontSize:json['fontSize']
		});
	},
	updateText: function(canvas, json, xy){
		return canvas.updateText({
			id:json['id'], text:json['text']
		});
	},
	_anims:[],//缓存当前正在执行的动画
	_drawAnim: function(el, json, fun){
		if (this._anims.length > 0) {
			this._anims[0].complete();//新动画开始前，旧动画强制结束
		}
		
		var anim = new js.anim.Motion({
			target: el, step: 30,
			points: {
				from: json.from,
				to: json.to
			},interval:30
		});
		var me = this;
		anim.subscribe('completed', function(){
			if(fun) fun['completed']();
			me._anims = [];
		});
		anim.start();this._anims.push(anim);		
	},	
	drawMoveImage: function(json, fun){
		var el = this.drawImage(json);
		this._drawAnim(el, json, fun);
		return el;
	},	
	drawMoveText: function(json, fun){
		var el = this.drawText(json);
		this._drawAnim(el, json, fun);
		return el;
	}
}
var PT = PKG1945.Painter;

PKG1945.Game = function(config){
	PKG1945.Game.superclass.constructor.apply(this, arguments);
	
	this._mmgr = new js.game.MissionManager();
	this._map = new js.game.TiledLayer({x:0,y:0,z:0,src:GAME.IMG_SRC,cell_size:[GAME.TILE_UNIT,GAME.TILE_UNIT],tile_set:GAME.MAP_TILES_DEF});
	this._view_canvas = new js.d2.Canvas({
		id:'view_canvas',x:config['x'],y:config['y'],width:config['width'],height:config['height']
	});
	this.watchFPS(this._view_canvas);
	
	this._init_data();	
};
SYS.extend(PKG1945.Game, js.game.Game, {
	_init_data: function(){		
		this._playerBars = {};	
		this._playerBars['player1'] = {score:0,bombs:0,lives:GAME.PLAY_LIVES};
		this._playerBars['player2'] = {};					
	},
	clearCanvas: function(){
		this.getCanvas().clear();
		this.removeAllKeys();
	},
	reset: function(){
		this._mmgr.reset();					
		this.clearCanvas();
		
		//恢复主画布的原始坐标与尺寸
		var canvas = this.getCanvas();
		canvas.setSize(this.getConfig('width'), this.getConfig('height'));
		canvas.setViewWindow(0,0);
		
		this._view_canvas.clear();
		this._init_data();
		
		this._map.setData(null);		
	},
	randomXYInRect: function(rect){
		var x1 = rect.x, x2 = x1+rect.w, y1 = rect.y, y2 = y1+rect.h;		
		return [SYS.random(x1,x2),SYS.random(y1,y2)]
	},	
	getMissionMgr: function(){return this._mmgr;},	
	loadMap: function(d){
		this._map.setPaintRect(0,d.length-GAME.VIEW_ROWS,GAME.VIEW_COLS,GAME.VIEW_ROWS);	
		this._map.setData(d);
		
		//设置主画布的新坐标与尺寸，以适应地图
		var canvas = this.getCanvas();
		canvas.setSize(GAME.VIEW_COLS*GAME.TILE_UNIT,d.length*GAME.TILE_UNIT);
		canvas.setViewWindow(0, d.length*GAME.TILE_UNIT-this.getConfig('height'));
		this._map.paint(canvas);				
	},
	getMapLayer:function(){return this._map;},
	getViewCanvas: function(){return this._view_canvas;},
	_addPlayerBar: function(id, key, i, flag){
		var el = this._playerBars[id][key+'_el'], k = flag?0:parseInt(el.innerHTML);
		el.innerHTML = k+i;
		this._playerBars[id][key] = k+i;
	},
	addPlayerLife: function(id, i){
		this._addPlayerBar(id,'lives',i);		
	},
	addPlayerScore: function(id, i){
		this._addPlayerBar(id,'score',i);
	},
	addPlayerBombs: function(id, i){
		this._addPlayerBar(id,'bombs',i);
	},
	resetPlayerBombs: function(id, i){
		this._addPlayerBar(id,'bombs',i,true);
	},
	isPlayerOver: function(id){
		var el = this._playerBars[id]['lives'];
		if(!el) return true;
		var i = parseInt(el.innerHTML);
		return i<=0;
	},
	isInViewWindow: function(layer){
		var b1 = layer.getScreenBound();
		if(!b1) return false;
		var b2 = this._view_canvas.getScreenBound();
		return G2D.containsRect(b2, b1);
	},
	moveCanvas: function(){//移动画布
		if (!this.isEndOfMap()) {
			this.moveMapPaint();//画布移动时绘制新的地图区域，实现卷轴效果
			this.getCanvas().moveViewPoint(0, GAME.MAP_MOVE_STEP);
		}	
	},
	moveMapPaint: function(){
		var map = this.getMapLayer(), rect = map.getPaintRect();
		if(rect.y>0){
			map.movePaintRect(0,-1*GAME.VIEW_ROWS);	
			map.paint(this.getCanvas());	
		}
	},
	isEndOfMap: function(){
		var canvas = this.getCanvas(), viewCanvas = this.getViewCanvas()
		,xy = canvas.getXY(), viewXY = viewCanvas.getXY();
		return xy[1]>=(viewXY[1]+GAME.MAP_MOVE_STEP);
	},
	getMission: function(i){
		return this._mmgr.getMission(i);
	},
	getMissionIndex: function(i){
		return this._mmgr.getMissionIndex();
	},
	getCenterXY: function(){
		var vCanvas = this.getViewCanvas(),rect = vCanvas.getBound()
		return [rect['w']/2-60, rect['h']/2-50];
	},	
	paintOnCenter: function(text){		
		var vCanvas = this.getViewCanvas(), xy = this.getCenterXY();
		PT.drawMoveText({
			canvas: vCanvas,text:text,fontSize:'28px',color:'yellow',from:[0,xy[1]],to:xy
		});
	},
	_initDesc: function(){
		var json = {canvas:this.getCanvas(),color:'yellow',fontSize:'22px'};
		json['text'] = 'Press "A" is Shoot'; json['xy'] = [100, 250];PT.drawText(json);
		json['text'] = 'Press "S" is Bomb'; json['xy'] = [100, 280];PT.drawText(json);
		json['text'] = 'Press "Enter" is Continue'; json['xy'] = [100, 310];PT.drawText(json);
		
		json['color'] = 'white';json['fontSize'] = '18px';
		json['text'] = 'Version: '+GAME.VERSION; json['xy'] = [100, 380];PT.drawText(json);
		json['text'] = 'Build: '+GAME.BUILD; json['xy'] = [100, 410];PT.drawText(json);
		json['text'] = 'Author: '+GAME.AUTHOR; json['xy'] = [100, 440];PT.drawText(json);
	},
	_initEvents: function(){
		//设置游戏事件监听
		this.subscribe('starting', function(){
			//按回车开始
			this.onKeyDown(
				{keys:KEY_ENTER},
				{fn:function(){//每次游戏开始第一关					
					this.getMissionMgr().getNextMission().start(this);		
				}}
			);
			
			//绘制游戏初始画面
			PT.drawImage({
				canvas:this.getCanvas(),image:GAME.IMAGES['logo'] ,xy:[90, 60]
			});
			this._initDesc();
		})
		
		this.subscribe('ended', function(){
			this.removeAllKeys();			
			this.onKeyDown(
				{keys: KEY_ENTER},
				{fn:function(){
					this.reset();
					this.start();
				}}
			);						
		})
		this.start();
	},
	init: function(missions){					
		var game = this;		
		//设置关卡事件监听
		this._mmgr.on('failed', function(){
			game.end();
			game.paintOnCenter('Game Over');	
		});
		
		this._mmgr.on('completed', function(){				
			var mgr = game.getMissionMgr();
			if (mgr.hasNextMission()) {
				mgr.getNextMission().start(game);
			}else{
				game.end();
				game.paintOnCenter('You Win');
			}				
		});
		this._mmgr.loadMissions(missions);		
		
		//图片资源预装载
		js.lang.Loader.loadImage(
			GAME.IMG_SRC,
			{fn: this._initEvents, scope: this},
			{fn: function(){
				var json = {
					canvas:this.getCanvas(),color:'red',fontSize:'22px',
					text:'Resource-loading failed.<br/>Press "F5" refresh this page.',xy:[80, 90]						
				};
				PT.drawText(json);
				this._initDesc();
			}, scope: this}
		);							
	},
	paintPlayerBar: function(id){
		var canvas = this.getViewCanvas();
		PT.drawImage({
			canvas:canvas,image:GAME.IMAGES['player'] ,xy:[0, 0]
		});
		PT.drawImage({
			canvas:canvas,image:GAME.IMAGES['bomb'] ,xy:[0, 25]
		});
		
		var json = {
			canvas:canvas,color:'yellow',fontSize:'14px'
		};
		json['text'] = 'X'; json['xy'] = [33, 5]; 
		PT.drawText(json);
		json['text'] = 'X'; json['xy'] = [33, 30]; 
		PT.drawText(json);
		json['text'] = 'SCORE: '; json['xy'] = [125, 5]; 
		PT.drawText(json);
		
		json['text'] = this._playerBars[id]['lives']; json['xy'] = [45, 5]; 
		this._playerBars[id]['lives_el'] = PT.drawText(json);
		json['text'] = ''+this._playerBars[id]['bombs']; json['xy'] = [45, 30]; 
		this._playerBars[id]['bombs_el'] = PT.drawText(json);
		json['text'] = ''+this._playerBars[id]['score']; json['xy'] = [180, 5]; 
		this._playerBars[id]['score_el'] = PT.drawText(json);
	},	
	initPlayerKeys: function(player){
		this.resetKeyBuffer();
		this.onKeyHold(
			{keys:[KEY_UP,KEY_RIGHT,KEY_DOWN,KEY_LEFT,KEY_A,KEY_S,KEY_PAUSE]}
			,{fn: function(keyCode){
					if (this.isRunning()) {
						if (keyCode == KEY_PAUSE) {
							this.pause();
							return;
						}
						if (this.isKeyHold(KEY_A)) player.shoot(this);
						if (keyCode == KEY_S) player.bomb(this);						
						
						if([KEY_UP,KEY_RIGHT,KEY_DOWN,KEY_LEFT].indexOf(keyCode) < 0) return;
						if (this.isKeyHold([KEY_UP, KEY_LEFT])) {
							player.turn(UP_LEFT);							
						}
						else 
							if (this.isKeyHold([KEY_UP, KEY_RIGHT])) {
								player.turn(UP_RIGHT);
							}
							else 
								if (this.isKeyHold([KEY_DOWN, KEY_LEFT])) {
									player.turn(DOWN_LEFT);
								}
								else 
									if (this.isKeyHold([KEY_DOWN, KEY_RIGHT])) {
										player.turn(DOWN_RIGHT);
									}
									else 
										if (this.isKeyHold(KEY_UP)) {
											player.turn(UP);
										}
										else 
											if (this.isKeyHold(KEY_LEFT)) {
												player.turn(LEFT);
											}
											else 
												if (this.isKeyHold(KEY_DOWN)) {
													player.turn(DOWN);
												}
												else 
													if (this.isKeyHold(KEY_RIGHT)) {
														player.turn(RIGHT);
													}
						player.setMovable(true);							
					}
					else {
						if (keyCode == KEY_PAUSE) 
							this.resume();
					}
			}}, {fn: function(keyCode){
					if (keyCode == KEY_A || keyCode == KEY_PAUSE || keyCode == KEY_S) 
						return;
					
					//如果最近有键Hold则方向调至该键方向
					var holdKeys = this.getHoldKeys([KEY_UP,KEY_LEFT,KEY_DOWN,KEY_RIGHT])
					,len = holdKeys?holdKeys.length:0;
					
					if(len>=2){
						player.turn(KEY_MAPPING[holdKeys[len-2]+holdKeys[len-1]]);
					}else if(len==1){
						player.turn(KEY_MAPPING[holdKeys[len-1]]);
					}else{
						player.setMovable(false);
					}
				}
			})
	},
	run: function(){
		var m = this._mmgr.getMission();
		if (m && m.isStarted()) m.run(this);
	}
});

F1945 = function(){
	var game = null;
	return {
		agree: function(){			
			$('readme').style.display = 'none';
			this.main();
		},
		changeLang: function(){			
			var v0 = $('v0'),v1 = $('v1');
			v = v0.checked?v0.value:v1.value;
			
			$('read_en').style.display = 'none';
			$('read_zh').style.display = 'none';
			$('read_'+v).style.display = '';
		},
		getMaxFPS: function(){
			return $('fps_limit').checked?$('fps_max').value:null;
		},
		resetFPS: function(){
			var thread = game.getThread();
			if(thread) thread.setMaxFPS(this.getMaxFPS());
		},
		main: function(){
			js.core.Event.on('fps_limit','click', function(){
				F1945.resetFPS();
			});
			js.core.Event.on('fps_max','keyup', function(){				
				F1945.resetFPS();
			});
						
			game = new PKG1945.Game({
				id:'p1945',x:GAME.X,y:GAME.Y,background:'black'
				,width:GAME.VIEW_COLS*GAME.TILE_UNIT,height:GAME.VIEW_ROWS*GAME.TILE_UNIT
			});
			game.subscribe('started', function(){
				F1945.resetFPS();
			});
			game.init(PKG1945.MissionData);
		}
	}
}();