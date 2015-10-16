/**
 * @project JSDK: JavaScript Development Kit
 * @copyright Copyright (c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.3
 * @author fengchun
 * @date 2010-01-06
 * @date 2011-02-28
 * @date 2011-03-22
 * @date 2011-03-29
 * @date 2011-04-14
 * @date 2011-04-26
 * @date 2011-05-18
 * 
 * @version 0.2
 * @author fengchun
 * @date 2010-11-15
 * @date 2010-11-25
 * @date 2010-11-29
 * @date 2010-12-01
 * @date 2010-12-02
 * 
 * @version 0.1
 * @author fengchun
 * @email f15_nsm@hotmail.com
 * @date 2010-10-07
 */
js.lang.System.namespace('js.game.demo.tankbrigade');

var SYS = js.lang.System,
	$ = js.core.Dom.$,
	MT = js.math.MathTool,
	G2D = js.math.Geom2D,
	
	UP = MT.RADIAN_12,
	DOWN = MT.RADIAN_4,
	LEFT = MT.RADIAN_8,
	RIGHT = MT.RADIAN_0,
	
	KEY_UP = js.input.KEY.UP,
	KEY_RIGHT = js.input.KEY.RIGHT,
	KEY_DOWN = js.input.KEY.DOWN,
	KEY_LEFT = js.input.KEY.LEFT,
	KEY_SPACE = js.input.KEY.SPACE,
	KEY_PAUSE = js.input.KEY.PAUSE,
	KEY_ENTER = js.input.KEY.ENTER;		

var KEY_MAPPING = {};	
KEY_MAPPING[KEY_UP] = UP;
KEY_MAPPING[KEY_RIGHT] = RIGHT;
KEY_MAPPING[KEY_DOWN] = DOWN;
KEY_MAPPING[KEY_LEFT] = LEFT;

var RES = new js.i18n.Resource({
	   version: 'Version: 0.3 2011-05-18',
	   author: 'Author: fengchun',
       game_over:{
	       'en':'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Game Over',
	       'zh':'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;游 戏 结 束'
	   },
       options:{
           'en':'Press "Enter" to start<br/>Press "Arrow" to move<br/>Press "Space" to shoot',
           'zh':'按 "回车键" 开始<br/>按 "方向键" 移动<br/>按 "空格键" 射击'
       },
	   enter:{
           'en':'Press "Enter" to continue',
           'zh':'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;按 "回车键" 继续'
       },
	   mission:{
	       'en':'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mission',
           'zh':'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;&nbsp;&nbsp;&nbsp;关'
	   },
	   mission_completed:{
	       'en':'Mission Completed',
           'zh':'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;任 务 完 成'
	   },
	   mission_failed:{
	       'en':'&nbsp;&nbsp;&nbsp;&nbsp;Mission Failed',
           'zh':'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;任 务 失 败'
	   }
});
		
var GAME = {
	FONT_FAMILY: 'Comic Sans MS',
	IMG_SRC:'tank.gif',
	PIC:{'logo':{x:0,y:265,w:320,h:160},'tank':{x:331,y:1,w:32,h:32}},
	TILE_UNIT:32,
	MAP_ROWS:14,
	MAP_COLS:16,
	MAP_TILES_DEF: [
		[1,100]//墙1
		,[34,100]//墙2
		,[67,100]//沙
		,[100,100]//土
		,[133,100]//草
		,[166,100]//海
		,[1,133]//沼泽
		,[34,133]//桥 
	],
	TANK_UNPASS_TILES:[0,1,5],//避让墙1、墙2、海
	BULLET_UNPASS_TILES:[0,1],//避让墙1、墙2
	SOUNDS:[
		{id:'hum_die',url:'sounds/player_die.mp3'},
		{id:'com_die',url:'sounds/computer_die.mp3'},
		{id:'gun_fire',url:'sounds/gun_fire.mp3'},
		{id:'hit',url:'sounds/hit.mp3'},
		{id:'mission_complete',url:'sounds/mission_complete.mp3'}
	]
}

var TANK = {
	COM: 0,
	HUM: 1,
	BULLET: 2,
	EXP_FRAMES: [[1,1],[34,1],[67,1]],
	IMAGE:[{//电脑坦克
		src: GAME.IMG_SRC
		,frameSeqs:{
			'up':[[331,1],[364,1],[397,1],[430,1],[463,1],[496,1],[529,1],[562,1]],
			'down':[[331,34],[364,34],[397,34],[430,34],[463,34],[496,34],[529,34],[562,34]],
			'left':[[331,100],[364,100],[397,100],[430,100],[463,100],[496,100],[529,100],[562,100]],
			'right':[[331,67],[364,67],[397,67],[430,67],[463,67],[496,67],[529,67],[562,67]]
		}
	},{//玩家坦克
		src:GAME.IMG_SRC
		,frameSeqs:{
			'up':[[331,133],[364,133],[397,133],[430,133],[463,133],[496,133],[529,133],[562,133]],
			'down':[[331,166],[364,166],[397,166],[430,166],[463,166],[496,166],[529,166],[562,166]],
			'left':[[331,232],[364,232],[397,232],[430,232],[463,232],[496,232],[529,232],[562,232]],
			'right':[[331,199],[364,199],[397,199],[430,199],[463,199],[496,199],[529,199],[562,199]]
		}
	},{//坦克的子弹
		src:GAME.IMG_SRC
		,frameSeqs:{
			'up':[[100, 1]],
			'down':[[199, 1]],
			'left':[[133, 1]],
			'right':[[166, 1]]
		}
	}],
	COLLISION:[{x:13,y:13,w:4,h:4},{x:3,y:2,w:26,h:28}],
	SPEED:[6,6,12]		
}

js.game.demo.tankbrigade.Painter = {
	drawText: function(canvas, text){
		text['color'] = 'yellow';
		text['fontFamily'] = GAME.FONT_FAMILY;
		if(!text['x']) text['align'] = 'center';
		text['z'] = 2;
		if(!text['fontSize']) text['fontSize'] = '20px';
		
		canvas.drawText(text);		
	},
	drawImage: function(canvas, image, key){
		image['width'] = GAME.PIC[key].w;
		image['height'] = GAME.PIC[key].h;
		image['offsetX'] = GAME.PIC[key].x;
		image['offsetY'] = GAME.PIC[key].y;		
		image['src'] = GAME.IMG_SRC;
		image['z'] = 2;
		canvas.drawImage(image);
	}
}
var PT = js.game.demo.tankbrigade.Painter;

js.game.demo.tankbrigade.Bullet = function(config){
	this._side = config['side'];
	config['width'] = GAME.TILE_UNIT;
	config['height'] = GAME.TILE_UNIT;
	config['imageSrc'] = GAME.IMG_SRC;
	config['frameSeqs'] = TANK.IMAGE[TANK.BULLET]['frameSeqs'];
	
	js.game.demo.tankbrigade.Bullet.superclass.constructor.apply(this, arguments);
	this.setAABB('default',TANK.COLLISION[0]);
};
SYS.extend(js.game.demo.tankbrigade.Bullet, js.game.Sprite, {
	init: function(game){
		this.subscribe('painting', function(){
			var key = 'up';
			switch(this.getDir()){
				case UP: key = 'up';break;
				case DOWN: key = 'down';break;
				case LEFT: key = 'left';break;
				case RIGHT: key = 'right';break;
			}
			this.setFrameSeqKey(key);
		});
		
		var canvas = game.getCanvas();
		this.subscribe('moved', function(){
			//是否和墙碰撞或是在画布之外，是则自行销毁
			if (this.getAABB('default').collidesWithTiles(game.getMapLayer(), GAME.BULLET_UNPASS_TILES)
			|| !this.getAABB('default').isInBox(canvas.getBound())) {
				this.destory(canvas);return;
			}
			
			//子弹碰见敌方坦克时		
			var sps = game.getSprites(this._side^1);
			if(sps) sps.some(function(tank){
				return this._meetWithEnemy(tank, canvas);
			},this);					
		});
		this.paint(canvas);
	},
	_meetWithBullets: function(tank,canvas){
		//检测是否坦克的所有子弹碰撞
		var bullets = tank.getBullets();			
		for(var i=0,len=bullets.length;i<len;i++){			
			var b = bullets[i];
			if (b && b.getAABB('default').collidesWith(this.getAABB('default'))) {
				this.destory(canvas);b.destory(canvas);return true;
			}
		}
		return false;
	},
	_meetWithEnemy: function(tank,canvas){
		//检测是否碰撞
		if(this.getAABB('default').collidesWith(tank.getAABB('default'))) {
			//是敌方则同时销毁
			this.destory(canvas);
			tank.destory(canvas);
			return true;	
		}else{			
			//检测是否和敌方的所有子弹碰撞
			return this._meetWithBullets(tank,canvas);
		}
	}
});

js.game.demo.tankbrigade.Tank = function(config){
	this._side = config['side'];
	config['width'] = GAME.TILE_UNIT;
	config['height'] = GAME.TILE_UNIT;
	config['imageSrc'] = GAME.IMG_SRC;
	config['frameSeqs'] = TANK.IMAGE[this._side]['frameSeqs'];
	
	js.game.demo.tankbrigade.Tank.superclass.constructor.apply(this, [config]);
	this._bullets = [];	
	this._anim = null;
	this.setAABB('default',TANK.COLLISION[1]);		
	
};
SYS.extend(js.game.demo.tankbrigade.Tank, js.game.Sprite, {
	getBullets: function(){return this._bullets;},
	_meetWithEnemy: function(tank){
		//检测是否碰撞，是则同时销毁
		if(this.getAABB('default').collidesWith(tank.getAABB('default'))) {
			return true;		
		}
		return false;
	},
	_randomDir:function(){//电脑坦克随机转向
		if(this._side == TANK.HUM) return;
		
		var dirs = [UP,DOWN,LEFT,RIGHT];
		dirs.remove(this.getDir());		
		this.turn(SYS.randomEnum(dirs));				
	},	
	init: function(game){
		this.subscribe('painting', function(){
			var key = 'up';
			switch(this.getDir()){
				case UP: key = 'up';break;
				case DOWN: key = 'down';break;
				case LEFT: key = 'left';break;
				case RIGHT: key = 'right';break;
			}
			this.setFrameSeqKey(key);
		});
		this.subscribe('turned', function(type, args){
			this.setFrameSeqKey(args[0]);
		});
		this.subscribe('moved', function(){
			//检测与敌方的所有坦克是否发生碰撞
			var sps = game.getSprites(this._side^1);
			if(sps){
				for(var i=0,len=sps.length;i<len;i++){				
					var tank = sps[i];
					if(this._meetWithEnemy(tank)){
						this.destory(game.getCanvas());
						tank.destory(game.getCanvas());			
						return;
					}
				}
			}
			
			if(this.getAABB('default').avoidToTiles(game.getMapLayer(), GAME.TANK_UNPASS_TILES)//坦克避让某些图砖
				|| this.getAABB('default').limitIn(game.getCanvas().getBound())//坦克限制在画布内移动			
			) this._randomDir();		
		});
		
		this._anim = new js.anim.Film({
				canvas:game.getCanvas(), frameSeq:TANK.EXP_FRAMES
				,src:GAME.IMG_SRC,width:GAME.TILE_UNIT,height:GAME.TILE_UNIT,interval:150
			});
		this.subscribe('destoryed', function(){
			//销毁所有自己的子弹
			this.destoryAllBullets(game.getCanvas());
			//绘制坦克爆炸动画
			this._anim.setPosition(this.getXY(),this.getId());
			this._anim.start();
			//播放声音
			game.playSound(this._side==TANK.HUM?'hum_die':'com_die');			
		});							
		
		this.paint(game.getCanvas());		
	},
	_getFirstBulletXY: function(bUnit){
		switch (this._dir) {
			case UP:
				return [this._x, this._y-bUnit];
			case DOWN:
				return [this._x, this._y+bUnit];	
			case LEFT:
				return [this._x-bUnit, this._y];	
			case RIGHT:
				return [this._x+bUnit, this._y];				
		}
	},
	destoryAllBullets: function(canvas){
		//自动销毁所有子弹
		this._bullets.forEach(function(b){			
			if(b) b.destory(canvas);
		});
		this._bullets = [];		
	},
	shoot: function(game){
		if(this._destoryed) return;		
		//前面是否有墙等，或者前面是否画布边缘，是则无法发射
		if(this.getAABB('default').collidesWithTiles(game.getMapLayer(), GAME.BULLET_UNPASS_TILES)
		|| !G2D.containsRect(game.getCanvas().getBound(), TANK.COLLISION[0])) return;
		
		var xy = this._getFirstBulletXY(GAME.TILE_UNIT/2);
		if(!xy) return;
		
		var b = new js.game.demo.tankbrigade.Bullet({
			id:SYS.getUUID(), dir:this._dir, x: xy[0], y: xy[1], side: this._side			
		});		
		if (this._side == TANK.HUM) game.playSound('gun_fire');				
		b.init(game);
		this._bullets.push(b);		
	},
	paintBullets: function(canvas){
		var nulls = 0;
		for(var i=0, len=this._bullets.length;i<len;i++){
			var b = this._bullets[i];
			if(b && !b.isDestoryed()){
				b.moveWith(TANK.SPEED[TANK.BULLET]);
				b.paint(canvas);
			}else{
				this._bullets[i] = null;
				nulls++;
			}
		}
		if(nulls > 20) this._bullets = this._bullets.compact();//定量清理
	}
});

js.game.demo.tankbrigade.TankGame = function(config){
	js.game.demo.tankbrigade.TankGame.superclass.constructor.apply(this, arguments);
	this._sprites = [];
	this._mmgr = new js.game.MissionManager();
	this._map = new js.game.TiledLayer({x:0,y:0,z:0,src:GAME.IMG_SRC,cell_size:[GAME.TILE_UNIT,GAME.TILE_UNIT],tile_set:GAME.MAP_TILES_DEF});
	this._needSound = false;//音效开关	
};
SYS.extend(js.game.demo.tankbrigade.TankGame, js.game.Game, {
	playSound: function(id){
		if (this._needSound) {
			var SP = js.media.SoundPlayer;
			var sound = SP.getSounds(id);
			if (!sound) return;
			if(sound.playState==1){
				var pos = sound.position;
				if(!pos || pos > 200) SP.play(id);//控制声音的播放不要过于密集
			}else{
				SP.play(id);
			}			
		}
	},
	getSprites: function(side){return this._sprites?this._sprites[side]:null;},
	resetSprites: function(){this._sprites = [];},
	getMissionMgr: function(){return this._mmgr;},
	loadMap: function(d){this._map.setData(d);this._map.paint(this.getCanvas());},
	getMapLayer:function(){return this._map;},
	clearCanvas: function(){
		this.getCanvas().clear();
		this.removeAllKeys();
	},
	_initSounds: function(){	
		var SP = js.media.SoundPlayer;
		if(!SP) {
			alert('The game can continue just no sound! \nPlease visit the Flash Site and add the folder of the page as trust.');
			return;
		}
		SP.on('ready', 
			function(){
				if(SP.isOK()){
					SP.createSounds(GAME.SOUNDS);
					this._needSound = true;
				}			
			},this);
	},
	init: function(missions){
		this._initSounds();		

		var game = this;
		//设置关卡事件监听
		this.getMissionMgr().on('failed', function(){
			game.end();
		});
		this.getMissionMgr().on('completed', function(){				
			var mgr = game.getMissionMgr();
			if (mgr.hasNextMission()) {
				game.resume();mgr.getNextMission().start(game);
			}else{
				game.end();
			}				
		});
		
		this.getMissionMgr().loadMissions(missions);		
		
		//设置游戏事件监听
		this.subscribe('starting', function(){
			//按回车开始
			this.onKeyDown(
				{keys: KEY_ENTER},
				{fn:function(){//每次游戏开始下一关
					this.getMissionMgr().getNextMission().start(this);		
				}}
			);
			
			//绘制游戏初始画面
			var canvas = this.getCanvas();
			PT.drawImage(canvas, {id:this.getId()+'_init_logo',x:70,y:60}, 'logo');
			PT.drawText(canvas, {id:this.getId()+'_init_text',text:RES.get('options'),width:250,y:260});
			PT.drawText(canvas, {text:RES.get('version'),width:250,y:360});
			PT.drawText(canvas, {text:RES.get('author'),width:250,y:390});											
		})
		
		this.subscribe('ended', function(){
			this.clearCanvas();						
			this.setupEnter(RES.get('game_over'),function(){
				this.getMissionMgr().reset();
				this.start();
			});					
		})			
	},
	setupEnter: function(title, fn){
		var canvas = this.getCanvas();
		PT.drawText(canvas, {id:this.getId()+'_enter_title',text:title,fontSize:'35px',width:300,valign:'middle',height:200});
		PT.drawText(canvas, {id:this.getId()+'_enter_info',text:RES.get('enter'),width:235,y:300});
		this.onKeyDown(
			{keys: KEY_ENTER},
			{fn:function(){
				this.clearCanvas();
				fn.call(this);
			}}
		);
	},
	addTank: function(side,xy){
		if(!this._sprites[side]) this._sprites[side] = [];		
		var tank = new js.game.demo.tankbrigade.Tank({
			id:'tank_'+side+'_'+this._sprites[side].length, x: xy[0],y: xy[1]
			,side: side, dir:side==TANK.HUM?UP:DOWN, movable: side==TANK.COM
		});
		tank.init(this);
		this._sprites[side].push(tank);
	},
	run: function(){
		var m = this.getMissionMgr().getMission();
		//关卡处理：1、玩家被击毁则关卡失败 2、所有电脑被击毁则关卡成功 3、自动处理坦克的绘制；自动补充电脑坦克
		if(m && m.isStarted()) {
			//玩家被击毁则关卡结束
			var players = this.getSprites(TANK.HUM);
			if(!players) return;
			if(players[0].isDestoryed()) m.fail(this);
			
			if(players[0].isMovable()) players[0].nextFrame();//玩家坦克移动时转至下一帧动画
			players[0].moveWith(TANK.SPEED[TANK.HUM]);//每个周期，玩家坦克（如可以移动的话）移动一个步长
			players[0].paint(this.getCanvas());
			players[0].paintBullets(this.getCanvas());
			if (new Date().getTime()%5==0 && this.isKeyHold(KEY_SPACE)) players[0].shoot(this);//控制玩家连续射击子弹频度
			
			var coms = this.getSprites(TANK.COM);
			if(!coms) return;
			var score = this._simpleAI(coms);m.setScore(score);
			if (score['dead'] == m.getConfig('com_total')) {//所有电脑被击毁则关卡完成
				m.complete(this);
			}else if(score['live'] < m.getConfig('com_nps')
			&& score['total'] < m.getConfig('com_total')){//当前屏幕电脑数未满且还有没出现的电脑坦克，则自动补充一辆
				this.addTank(TANK.COM, SYS.randomEnum(m.getConfig('com_places')));
			}			
		}
	},
	_simpleAI: function(coms){
		var dead = 0, live = 0;
		coms.forEach(function(tank){
			if (tank.isDestoryed()) {
				dead++;
			}else {
				live++;
				tank.moveWith(TANK.SPEED[TANK.COM]);				
				tank.paint(this.getCanvas());
				tank.paintBullets(this.getCanvas());
				//敌方坦克随机发射1颗子弹
				if(SYS.random(0,30)==SYS.random(0,30)) tank.shoot(this);
			}
		}, this);
		return {dead:dead,live:live,total:coms.length};
	},
	initPlayerKeys: function(){
		//注册玩家键盘事件
		var player = this.getSprites(TANK.HUM)[0];		
		
		//设置按键监听		
		this.setPressedKeyLoggable(true);
		this.resetKeyBuffer();
		this.onKeyHold(
			{keys:[KEY_UP,KEY_LEFT,KEY_RIGHT,KEY_DOWN,KEY_SPACE,KEY_PAUSE]}
			,{fn: function(keyCode){
					if (this.isRunning()) {
						switch (keyCode) {							
							case KEY_SPACE:break;
							case KEY_PAUSE:this.pause();break;
							default: 
								player.turn(KEY_MAPPING[keyCode]);player.setMovable(true);
						}
					}
					else {
						if (keyCode == KEY_PAUSE) 
							this.resume();
					}
			}},{fn: function(keyCode){
					if (keyCode == KEY_SPACE || keyCode == KEY_PAUSE) 
						return;
					
					//如果最近有键Hold则方向调至该键方向
					var holdKeys = this.getHoldKeys([KEY_UP,KEY_LEFT,KEY_DOWN,KEY_RIGHT])
					,lastestHoldKey = holdKeys.pop();
					
					if(lastestHoldKey){
						player.turn(KEY_MAPPING[lastestHoldKey]);
					}else{
						player.setMovable(false);
					}
				}						
			});
	}
});

js.game.demo.tankbrigade.Mission = function(config){
	js.game.demo.tankbrigade.Mission.superclass.constructor.apply(this, arguments);	
}
SYS.extend(js.game.demo.tankbrigade.Mission, js.game.Mission,{
	setScore: function(score){this._score = score},
	start: function(game){
		this._score = null;
		game.clearCanvas();
		this.fireEvent('starting');
		
		var me = this,mIndex = game.getMissionMgr().getMissionIndex()+1	
		,txt = RES.getLang()=='en'?RES.get('mission')+'&nbsp;&nbsp;&nbsp;&nbsp;'+mIndex:RES.get('mission').replace(/#/, mIndex);
		
		game.setupEnter(txt, function(){
			this.clearCanvas();
			//绘制关卡地图
			this.loadMap(me._config['map_data']);
			
			//绘制玩家坦克
			var hum_places = me._config['hum_places'];
			this.addTank(TANK.HUM, hum_places[0]);
			this.initPlayerKeys();
					
			//绘制电脑坦克
			var com_nps = me._config['com_nps'],com_total = me._config['com_total'],com_places = me._config['com_places'];
			if(com_nps > com_total) com_nps = com_total;
			for (var i = 0; i < com_nps; i++) {
				var xy = SYS.randomEnum(com_places);
				this.addTank(TANK.COM, xy);
			}
			me.setStarted(true);
			me.fireEvent('started');
		});		
	},
	_end: function(game, title, fn){
		game.pause();
		game.resetSprites();
		game.removeAllKeys();
		
		PT.drawImage(game.getCanvas(),{id:'mission_result_tank',x:200,y:203},'tank');
		PT.drawText(game.getCanvas(),{
			id:'mission_result_number',text:'X&nbsp;&nbsp;&nbsp;&nbsp;'+this._score['dead']
			,x:250,y:200,fontSize:'25px'});		
		game.setupEnter(RES.get(title),fn);
	},
	fail: function(game){
		var me = this;
		this._end(game,'mission_failed',function(){
			me.fireEvent('failed');
		});	
	},
	complete: function(game){
		//播放关卡完成效果
		game.playSound('mission_complete');		
		var me = this;
		this._end(game,'mission_completed',function(){			
			me.fireEvent('completed');
		});		
	}
});

var TankDemo = function(){
	var game = null;
	
	return {
		init: function(){	
			if(js.core.Env.language=='en'){
				$('v1').click();
			}else{
				$('v0').click();
			}			
		},
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
			RES.setLang(v);					
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
				TankDemo.resetFPS();
			});
			js.core.Event.on('fps_max','keyup', function(){				
				TankDemo.resetFPS();
			});
						
			var def1 = {
				com_places: [[0,0],[450,0]],//电脑坦克的随机出现地点
				hum_places: [[210,330]],//玩家坦克的随机出现地点				
				com_total: 20,//电脑坦克总数量
				com_nps: 6,//电脑坦克的每屏幕最大同时出现数量
				map_data: [//关卡地图
					[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
					,[3,3,3,3,3,0,3,3,3,0,0,0,0,3,3,3]
					,[3,3,3,3,3,0,3,3,3,0,3,3,3,3,3,3]
					,[3,3,3,3,3,0,3,3,3,0,0,0,0,3,3,3]
					,[3,3,3,3,3,0,3,3,3,3,3,3,0,3,3,3]
					,[3,3,0,3,3,0,3,3,3,3,3,3,0,3,3,3]
					,[3,3,3,0,0,3,3,3,3,0,0,0,0,3,3,3]
					,[5,7,5,5,5,5,5,7,5,5,5,5,5,5,7,5]
					,[3,3,3,0,0,0,3,3,3,0,0,0,0,3,3,3]
					,[3,3,0,3,3,3,3,3,3,0,3,3,3,3,3,3]
					,[3,3,0,3,0,0,3,3,3,0,0,0,3,3,3,3]
					,[3,3,0,3,3,0,3,3,3,0,3,3,3,3,3,3]
					,[3,3,3,0,0,3,3,3,3,0,3,3,3,3,3,3]
					,[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
				]
			}
			var def2 = {
				com_places: [[225,180],[110,90],[335,270],[335,90],[110,270]],hum_places: [[225,390]],
				com_total: 50,com_nps: 10,
				map_data: [
					[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
					,[3,1,1,6,6,1,1,3,3,1,1,6,6,1,1,3]
					,[3,1,3,3,3,3,3,3,3,3,3,3,3,3,1,3]
					,[3,6,3,3,3,3,1,1,1,1,3,3,3,3,6,3]
					,[3,1,3,3,3,3,1,3,3,1,3,3,3,3,1,3]
					,[3,1,3,1,1,6,1,3,3,1,6,1,1,3,1,3]
					,[3,3,3,1,3,3,3,3,3,3,3,3,1,3,3,3]
					,[3,3,3,1,3,3,3,3,3,3,3,3,1,3,3,3]
					,[3,1,3,1,1,6,1,3,3,1,6,1,1,3,1,3]
					,[3,1,3,3,3,3,1,3,3,1,3,3,3,3,1,3]
					,[3,6,3,3,3,3,1,1,1,1,3,3,3,3,6,3]
					,[3,1,3,3,3,3,3,3,3,3,3,3,3,3,1,3]
					,[3,1,1,6,6,1,1,3,3,1,1,6,6,1,1,3]
					,[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]					
				]
			}
			var m1 = new js.game.demo.tankbrigade.Mission(def1); 
			var m2 = new js.game.demo.tankbrigade.Mission(def2); 
			
			game = new js.game.demo.tankbrigade.TankGame({
				id:'tankgame',x:150,y:30,background:'black'
				,width:GAME.TILE_UNIT*GAME.MAP_COLS,height:GAME.TILE_UNIT*GAME.MAP_ROWS
			});
			game.subscribe('started', function(){
				TankDemo.resetFPS();
			});
			game.init([m1,m2]);
			game.watchFPS(true);
			game.start();
		}
	}
}();

