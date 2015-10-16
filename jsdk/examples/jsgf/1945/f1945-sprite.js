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
 * 
 * @version 0.1
 * @author fengchun
 * @email f15_nsm@hotmail.com
 * @date 2010-12-02
 */
PKG1945.MovePattern = function(){
	var _center = [GAME.VIEW_COLS*GAME.TILE_UNIT/2,GAME.VIEW_ROWS*GAME.TILE_UNIT/4]	
	, _keys = ['0','7','7','6','6','5','5','4','4','3','3','2','2','1','1','0'];
	return {
		run: function(sprite){
			var mp = sprite.getInfo('motion')
			, t = sprite.getInfo('time')||0;
			
			var way = mp?mp:'line', xy = [0,0];
			if(way=='line'){
				xy = F.line(t, sprite.getInfo('from'), sprite.getDir(), sprite.getInfo('speed'));			
			}else if(way=='round'){
				xy = F.round(t, sprite.getInfo('from'), _center, sprite.getInfo('speed'));
				sprite.setFrameSeqKey('d'+_keys[Math.floor(MT.calcRadian(xy,_center)/MT.RADIAN_1)]);			
			}
			sprite.setXY(xy[0],xy[1]);
			sprite.setInfo('time', ++t);	
		}
	}
}();

PKG1945.Weapon = function(config){
	this._info = {};
	this._info['name'] = config['name'];
	this._info['side'] = config['side'];
	this._info['motion'] = config['motion'];
	this._info['hitter'] = null;
	
	var p = WEAPON[config['name']];
	config['imageSrc'] = GAME.IMG_SRC;
	config['frameSeqs'] = p['frameSeqs'];
	config['width'] = p['frameSize'][0];
	config['height'] = p['frameSize'][1];
	
	this._info['gun'] = p['gun'];
	this._info['speed'] = p['speed'];
	this._info['hp'] = p['hp'];
	this._info['type'] = p['type'];
	this._info['bp'] = p['bp'];
		
	PKG1945.Weapon.superclass.constructor.apply(this, arguments);
	this.setAABB('default',p['collision']);
	this.setAABB('collision2',p['collision2']);
	this._ammos = [];
	this._hitAnim = null;	
};
SYS.extend(PKG1945.Weapon, js.game.Sprite, {
	getInfo: function(k){return this._info[k];},
	setInfo: function(k, v){this._info[k] = v;},
	beHit: function(i, hitter, canvas){
		this._info['hp']-=i;
		this._info['hitter'] = hitter;
		if (this._info['hp'] <= 0) {
			this.destory(canvas);
		}else{//被子弹击中效果		
			if(this._hitAnim && this._hitAnim.isAnimated())	{				
			}else{
				this._hitAnim = new js.anim.Flicker({
    				target:this.getId(), opacity: {from:0, to:1}, step:5, interval:5
    			});
				this._hitAnim.start();
			}			
		}
	},
	_beforeInit: function(game, canvas){
		this.subscribe('moved', function(eName, param){
			if (!G2D.containsRect(canvas.getBound(), this.getAABB('default').getBoundingBox())) {
				this.destory(canvas);return;//电脑移动至画布外自动销毁
			}									
		});	
		
		this.subscribe('destoryed', function(){
			//如果敌方被玩家击毁，给玩家加分
			var hitter = this._info['hitter'];
			if(hitter) game.addPlayerScore(hitter, this.getInfo('bp'));
			
			//销毁所有自己的子弹
			this.destoryAllAmmos(game.getViewCanvas());
			
			var id = this.getId(), m = game.getMission();
			//销毁对象实例
			if(m) m.handleComputerDied(id, this.getInfo('type'));
			
			//绘制爆炸动画
			this._anim = this._createExpAnim(canvas);
			this._anim.setPosition(this._getExpXY(),id);
			this._anim.start();									
		});		
	},	
	init: function(game, canvas){	
		this.setFrameSeqKey('d0');	
		this._beforeInit(game, canvas);
		this.paint(canvas);			
	},
	destoryAllAmmos: function(canvas){
		//自动销毁所有子弹
		this._ammos.forEach(function(b){			
			if(b) b.destory(canvas);
		});
		this._ammos = [];		
	},
	paintAmmos: function(canvas){
		var nulls = 0;
		for(var i=0, len=this._ammos.length;i<len;i++){
			var b = this._ammos[i];
			if(b && !b.isDestoryed()){
				b.paint(canvas);
			}else{
				this._ammos[i] = null;
				nulls++;
			}
		}
		if(nulls > 0) this._ammos = this._ammos.compact();//清理
	},
	_getCenterXY: function(bsize, vXY){
		var size = this.getSize()
		, aXY = D.getXY(this.getId())
		, x = aXY[0]-vXY[0], y = aXY[1]-vXY[1];	
		return [x+(size[0]-bsize[0])/2, y+(size[1]-bsize[1])/2]; 
	},
	_getBulletXY: function(bsize, vXY){
		var size = this.getSize()
		, aXY = D.getXY(this.getId())
		, x = aXY[0]-vXY[0], y = aXY[1]-vXY[1];	
		return [x+(size[0]-bsize[0])/2, this.getInfo('side')==GAME.HUM?y-15:y+(size[1]-bsize[1])/2]; 
	},
	shoot: function(game){
		if(this.isDestoryed()) return;	
		var m = game.getMission();
		if(!m) return;
		var player1 = m.getPlayer('player1'), side = this.getInfo('side');
		if(!player1 || (side == GAME.COM && player1.isStealth())) return;//玩家刚出现不可以移动时电脑暂停射击		
		
		var b = new PKG1945.Ammo({
			id:SYS.getUUID(), name: this.getInfo('gun'), z:2
			, dir:side==GAME.HUM?UP:DOWN, side: side, parent: this.getId()			
		});
		
		var vXY = game.getViewCanvas().getXY(), xy = this._getBulletXY(b.getSize(),vXY);
		b.setXY(xy[0], xy[1]);//设置子弹的起点是武器的前点		
		
		if (side == GAME.COM) {//如果是电脑方的子弹自动跟踪玩家
			b.turn(MT.calcRadian(player1._getCenterXY(b.getSize(),vXY),b.getXY()));	
		}
		b.init(game, game.getViewCanvas());
		this._ammos.push(b);
	},
	_getExpXY: function(){
		var config = WEAPON[this.getInfo('name')], 
		expFrameSize = config['expMode']['expFrameSize'], frameSize = this.getSize();		
		return [this._x+(frameSize[0]-expFrameSize[0])/2, this._y+(frameSize[1]-expFrameSize[1])/2]
	},
	_createExpAnim: function(canvas, target){
		var config = WEAPON[this.getInfo('name')], 
		expFrameSize = config['expMode']['expFrameSize'], frameSize = this.getSize();		
	
		var anim = new js.anim.Film({
			canvas:canvas,z:3,src:GAME.IMG_SRC,frameSeq:config['expMode']['expFrames'],
			width:expFrameSize[0],height:expFrameSize[1],target:target,interval:150
		});
		return anim;
	}
});

PKG1945.Ammo = function(config){
	this._info = {};
	this._info['name'] = config['name'];
	this._info['side'] = config['side'];
	this._info['parent'] = config['parent'];
	
	var p = AMMO[config['name']];
	config['imageSrc'] = GAME.IMG_SRC;
	config['frameSeqs'] = p['frameSeqs'];
	config['width'] = p['frameSize'][0];
	config['height'] = p['frameSize'][1];
	
	this._info['speed'] = p['speed'];
	this._info['power'] = p['power'];
		
	PKG1945.Ammo.superclass.constructor.apply(this, arguments);
	this.setAABB('default',p['collision']);	
};
SYS.extend(PKG1945.Ammo, js.game.Sprite, {
	getInfo: function(k){return this._info[k];},
	setInfo: function(k, v){this._info[k] = v;},	
	init: function(game, canvas){
		this.subscribe('painted', function(){
			//是否在画布之外，是则自行销毁
			if (!G2D.containsRect(canvas.getBound(), this.getAABB('default').getBoundingBox())) {
				this.destory(canvas);return;
			}
			var m = game.getMission();
			if(!m) return;	
			
			if(this.getInfo('side')==GAME.HUM){//玩家子弹碰见敌方时			
				var ships = m.getShips();				
				if (ships) {
					for (k in ships) {
						if (this._meetWithShip(ships[k], game.getCanvas(), canvas)) 
							return;
					}
				}
				
				var fighters = m.getFighters();				
				if (fighters) {
					for (j in fighters) {
						if (this._meetWithFighter(fighters[j], game.getViewCanvas())) 
							return;
					}
				}				
			}else{//电脑子弹碰见敌方时
				this._meetWithPlayer(m.getPlayer('player1'), canvas);
			}				
		});
		this.setFrameSeqKey('down');		
		this.setInfo('from', this.getXY());
		this.paint(canvas);
	},
	paint: function(canvas){
		PKG1945.MovePattern.run(this);
		PKG1945.Ammo.superclass.paint.call(this, canvas);
	},
	_meetWithPlayer: function(enemy,canvas){
		if(!enemy || enemy.getOpacity()<1) return;//隐身时受保护
		//检测是否碰撞
		if(this.getAABB('default').collidesWith(enemy.getAABB('default'))){
			this.destory(canvas);
			enemy.destory(canvas);
			return true;	
		}
		return false;
	},
	_meetWithFighter: function(enemy,canvas){
		//检测是否碰撞
		if(this.getAABB('default').collidesWith(enemy.getAABB('default'))){
			this._destoryWith(enemy,canvas,canvas);
			return true;	
		}
		return false;
	},
	_meetWithShip: function(enemy,eCanvas,meCanvas){
		if(enemy.isDestoryed()) return false;
		var sRect = enemy.getAABB('default').getBoundingBox(),
		b1 = eCanvas.getXY(), b2 = meCanvas.getXY();
		sRect.x += b1[0]-b2[0];sRect.y += b1[1]-b2[1];
		
		//检测是否碰撞
		if(this.getAABB('default').collidesWith(sRect)){
			this._destoryWith(enemy,eCanvas,meCanvas);
			return true;	
		}
		return false;
	},
	_destoryWith: function(enemy,eCanvas,meCanvas){
		this.destory(meCanvas);
		enemy.beHit(this.getInfo('power'), this.getInfo('parent'), eCanvas);		
	}
});

PKG1945.Warship = function(config){
	PKG1945.Warship.superclass.constructor.apply(this, arguments);
};
SYS.extend(PKG1945.Warship, PKG1945.Weapon, {	
});
	
PKG1945.Fighter = function(config){
	PKG1945.Fighter.superclass.constructor.apply(this, arguments);	
};
SYS.extend(PKG1945.Fighter, PKG1945.Weapon, {
	paint: function(canvas){
		PKG1945.MovePattern.run(this);
		PKG1945.Fighter.superclass.paint.apply(this, arguments);
	}		
});

PKG1945.Player = function(config){
	PKG1945.Player.superclass.constructor.apply(this, arguments);
	this._info['bombs'] = 3;	
	this._shootable = false;
	this._isStealth = false;	
};
SYS.extend(PKG1945.Player, PKG1945.Fighter, {
	paint: function(canvas){
		PKG1945.Fighter.superclass.paint.apply(this, arguments);
	},
	_beforeInit: function(game, canvas){
		this.subscribe('moved', function(eName, param){
			this.getAABB('collision2').limitIn(canvas.getBound());//玩家飞机限制在视窗内移动								
		});
		
		this._anim = this._createExpAnim(canvas);
		this.subscribe('destoryed', function(){
			//销毁所有自己的子弹
			this.destoryAllAmmos(game.getViewCanvas());
			//清除所有电脑的子弹
			var m = game.getMission();
			if (m) m.destoryAllAmmos(canvas);
			
			var id = this.getId(), m = game.getMission();
			//销毁对象实例
			game.addPlayerLife(id, -1);
			if(m) m.handlePlayerDied(id);			
			
			if(!game.isPlayerOver(id)){//如果玩家还有剩余飞机
				this._anim.subscribe('completed', function(){
					if(m) m.addPlayer(game, id);//新增一个玩家飞机
				});						
			}
			
			//绘制爆炸动画
			this._anim.setPosition(this._getExpXY(),id);
			this._anim.start();														
		});
	},
	init: function(game, canvas){		
		this.setStealth(true);//先隐形	
		PKG1945.Fighter.superclass.init.apply(this, arguments);		
		
		//玩家飞机出场效果				
		var id = this.getId()
		,xy = this.getXY(), me = this 
		,anim = new js.anim.Motion({
			target:id, step: 30
			, points: {
				from:[xy[0],xy[1]]
				, to:[xy[0],xy[1]-50]
			},interval:30
		});
		
		anim.subscribe('completed', function(){
			me.setStealth(false);//再现身
			me.setMovable(true);//可移动
			me.setShootable(true);//可射击
			game.initPlayerKeys(me);//初始化按键事件					
		});
		anim.start();
	},	
	addBombs: function(i){this._info['bombs']+=i;},
	setStealth: function(f){
		this._isStealth = f;
		this.setOpacity(f?0.5:1);
	},
	isStealth: function(){return this._isStealth;},
	isShootable: function(){return this._shootable},	
	setShootable: function(f){this._shootable = f;},	
	shoot: function(game){
		if(!this.isShootable()) return;
		PKG1945.Player.superclass.shoot.call(this, game);
	},
	bomb: function(game){
		if(this.isDestoryed() || this._info['bombs']<=0) return;	
		
		this.setStealth(true);//先隐形
		var canvas = game.getViewCanvas();
		this.paint(canvas);		
		//清除所有电脑的子弹
		var m = game.getMission();
		if (m) {
			m.destoryAllAmmos(canvas);
		}
		
		//设置爆炸效果		
		var rect = this.getBound()
		, x = rect['x'], y = rect['y'], w = rect['w'], h = rect['h']
		, anim = this._createExpAnim(canvas, [{x:x,y:y-h},{x:x-w,y:y},{x:x+w,y:y},{x:x,y:y+h}]);
				
		var me = this;
		anim.subscribe('completed', function(){
			me.setStealth(false);//再现形
		});
		anim.start();
		this.addBombs(-1);
		game.addPlayerBombs(this.getId(),-1);
	}
});
