/**
 * @project JSDK: JavaScript Development Kit
 * @copyright Copyright (c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.2
 * @author fengchun
 * @date 2011-01-25
 * @date 2011-03-08
 * 
 * @version 0.1
 * @author fengchun
 * @email f15_nsm@hotmail.com
 * @date 2010-12-02
 */
PKG1945.Mission = function(config){
	PKG1945.Mission.superclass.constructor.apply(this, arguments);	
}
SYS.extend(PKG1945.Mission, js.game.Mission,{	
	addPlayer: function(game, id){
		var xy = GAME.PLAYERS[id]['xy'];
		this.addFighter({id: id, name:'p38', side:GAME.HUM, x:xy[0],y:xy[1]}, game, 'Player');
		game.resetPlayerBombs(id, GAME.PLAY_LIVES);		
	},	
	addFighter: function(config, game, classType){
		var side = config['side']==GAME.HUM?GAME.HUM:GAME.COM
		, id = config['id']?config['id']: 'fighter_'+SYS.getUUID()
		, fighter = new PKG1945[classType||'Fighter']({
			id:id, name:config['name'], x: config['x'],y: config['y'], z:3, motion: config['motion']
			,side:side,dir:config['dir']?config['dir']:DOWN,movable:config['side']!=GAME.HUM
		});
		fighter.setInfo('from', fighter.getXY());
		fighter.init(game, game.getViewCanvas());	
		if(config['side']==GAME.HUM){
			this._players[id] = fighter;
		}else{
			this._fLayers[id] = fighter; 
		}
		return id;
	},
	addWarship: function(config, game){
		var id = 'warship_'+SYS.getUUID()
		, ship = new PKG1945.Warship({
			id:id, x: config['x'],y: config['y'], z:1
			,name:config['name'], side:GAME.COM, dir:DOWN, movable: false
		});
		ship.init(game, game.getCanvas()); 
		this._sLayers[id] = ship;
		return id;
	},
	_loadEnemies: function(game){
		var ships = this.getConfig('ships')['time_'+this._time];
		if(ships) {
			for (var i = 0, len = ships.length; i < len; i++) {
				this.addWarship(ships[i], game);
			}
		}
		var fighters = this.getConfig('fighters')['time_'+this._time];
		if(fighters) {
			for (var i = 0, len = fighters.length; i < len; i++) {
				this.addFighter(fighters[i], game);
			}
		}
		if(!this._bossLoaded && game.isEndOfMap()){
			this._bossLoaded = true;
			var boss = this.getConfig('boss'), p = WEAPON[boss['name']];
			if(p['type'] == 'warship'){
				this._bossId = this.addWarship(boss, game);
			}else{
				this._bossId = this.addFighter(boss, game);
			}
			this._animReady(game, 'Get Ready!', function(){
				
			});						
		}
	},
	_shootByEnemies: function(layers, game){
		var canvas = game.getViewCanvas();
		for(k in layers){
			var layer = layers[k];
			layer.nextFrame();
			layer.paint(canvas);
			if(this._time%(this._bossId==layer.getId()?10:15)==0 && game.isInViewWindow(layer)) layer.shoot(game, canvas);
			layer.paintAmmos(canvas);
		}
	},
	destoryAllAmmos: function(canvas){
		this._destoryAllAmmos(this.getShips(), canvas);
		this._destoryAllAmmos(this.getFighters(), canvas);
	},
	_destoryAllAmmos: function(layers, canvas){
		for(k in layers){
			var layer = layers[k];
			layer.destoryAllAmmos(canvas);
		}
	},
	getShips:function(){return this._sLayers;},
	getFighters:function(){return this._fLayers;},
	getPlayer: function(id){return this._players[id]},
	handleComputerDied: function(id, type){
		if(type=='fighter'){
			delete this._fLayers[id];
		}else{
			delete this._sLayers[id];
		}		
	},
	handlePlayerDied: function(id){
		delete this._players[id];		
	},
	_animReady: function(game, text, onCompleted){
		var me = this, vCanvas = game.getViewCanvas(),xy = game.getCenterXY()
		,el = PT.drawMoveText({
			canvas: vCanvas,text:text,fontSize:"23px",color:"yellow",from:[0,xy[1]],to:xy
		}, {'completed': function(){
				window.setTimeout(function(){
					vCanvas.erase(el);
					onCompleted.call(me);
				},1000);								
			}
		});
	},	
	_reset: function(){
		this._time = 0;
		this._fLayers = {};	
		this._sLayers = {};	
		this._players = {};
		this._bossLoaded = false;
		this._bossId = null;
	},
	start: function(game){
		game.clearCanvas();
		game.getViewCanvas().clear();
		this._reset();	
		game.paintPlayerBar('player1');
				
		//绘制关卡地图
		game.loadMap(this.getConfig('map_data'));
		this._animReady(game, 'Mission  '+(game.getMissionMgr().getMissionIndex()+1), function(){
			this.addPlayer(game, 'player1');
			this.setStarted(true);
		});
	}, 
	run: function(game){
		//是否关卡打通
		if(this._bossLoaded && !this._sLayers[this._bossId] && !this._fLayers[this._bossId]){
			this._reset();this.complete();return;
		}
		
		this._time++;
		//移动画布
		game.moveCanvas();
		//绘制电脑方
		this._loadEnemies(game);
		//电脑发射子弹
		this._shootByEnemies(this.getFighters(), game);
		this._shootByEnemies(this.getShips(), game);
		
		//玩家生命值为0则关卡失败
		var player1 = this.getPlayer('player1');
		if(!player1) {
			if(game.isPlayerOver('player1')) this.fail();
		}else{
			var viewCanvas = game.getViewCanvas();
			
			if (player1.isMovable()) {
				player1.moveWith(player1.getInfo('speed'));//每个周期，移动一个步长				
			}
			player1.nextFrame();//帧动画			
			player1.paint(viewCanvas);			
			player1.paintAmmos(viewCanvas);
			if (this._time%3==0 && game.isKeyHold(KEY_A)) player1.shoot(game);//控制玩家飞机的连续射击频度			
		}
	}
});
