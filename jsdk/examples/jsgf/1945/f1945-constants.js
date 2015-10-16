/**
 * @project JSDK: JavaScript Development Kit
 * @copyright Copyright (c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.2
 * @author fengchun
 * @date 2011-01-25
 * @date 2011-03-08
 * @date 2011-05-18
 * 
 * @version 0.1
 * @author fengchun
 * @email f15_nsm@hotmail.com
 * @date 2010-12-02
 */
js.lang.System.namespace('js.game.demo.f1945');

var SYS = js.lang.System,
	D = js.core.Dom,
	$ = js.core.Dom.$,
	MT = js.math.MathTool,
	G2D = js.math.Geom2D,
	F = js.phys.Formulas,
	PKG1945 = js.game.demo.f1945,
	
	UP = MT.RADIAN_12,
	DOWN = MT.RADIAN_4,
	LEFT = MT.RADIAN_8,
	RIGHT = MT.RADIAN_0,	
	UP_LEFT = MT.RADIAN_10,
	UP_RIGHT = MT.RADIAN_14,
	DOWN_LEFT = MT.RADIAN_6,
	DOWN_RIGHT = MT.RADIAN_2,
	
    KEY_UP = js.input.KEY.UP,
	KEY_RIGHT = js.input.KEY.RIGHT,
	KEY_DOWN = js.input.KEY.DOWN,
	KEY_LEFT = js.input.KEY.LEFT,
	KEY_A = 65,
	KEY_S = 83,
	KEY_PAUSE = js.input.KEY.PAUSE
	KEY_ENTER = js.input.KEY.ENTER;
	
var KEY_MAPPING = {};	
KEY_MAPPING[KEY_UP] = UP;
KEY_MAPPING[KEY_RIGHT] = RIGHT;
KEY_MAPPING[KEY_DOWN] = DOWN;
KEY_MAPPING[KEY_LEFT] = LEFT;
KEY_MAPPING[KEY_UP+KEY_LEFT] = UP_LEFT;
KEY_MAPPING[KEY_UP+KEY_RIGHT] = UP_RIGHT;
KEY_MAPPING[KEY_DOWN+KEY_LEFT] = DOWN_LEFT;
KEY_MAPPING[KEY_DOWN+KEY_RIGHT] = DOWN_RIGHT;
	
var GAME = {
	VERSION: '0.2',
	BUILD: '2011-05-18',
	AUTHOR: 'fengchun',
	X:150,
	Y:30,
	DELAY:30,
	MAP_MOVE_STEP:-2,
	PLAY_LIVES:3,
	PLAYERS: {
		'player1':{xy:[140,500]},
		'player2':{xy:[250,500]}
	},	
	FONT_FAMILY: 'Comic Sans MS',
	IMG_SRC:'1945.gif',
	IMAGES:{
		'logo':{x:103,y:577,w:276,h:139}
		,'player':{x:202,y:268,w:32,h:32}
		,'bomb':{x:268,y:268,w:32,h:32}		
	},
	TILE_UNIT:32,
	VIEW_COLS:14,
	VIEW_ROWS:16,
	MAP_TILES_DEF: [
		[268,202]//海
		
		,[103,499]//岛1-1
		,[135,499]//岛2-2
		,[103,531]//岛3-3
		,[135,531]//岛4-4
		
		,[168,499]//岛2-5
		,[200,499]//岛2-6
		,[168,531]//岛2-7
		,[200,531]//岛2-8
		
		,[233,499]//岛3-9
		,[265,499]//岛3-10
		,[233,531]//岛3-11
		,[265,531]//岛3-12
	],
	HUM:0,COM:1,
	EXPLOSION:[{
		expFrameSize: [65,65],
		expFrames: [[4,301],[70,301],[136,301],[202,301],[268,301],[334,301],[400,301]]
	}, {
		expFrameSize: [32,32],
		expFrames: [[70,169],[103,169],[136,169],[169,169],[202,169],[235,169]]
	}]
}

var WEAPON = {
	'submarine': {
		frameSize: [32, 98], hp: 30, type: 'warship', speed: 0, bp: 500
		,frameSeqs: {'d0': [[367, 103]]}
		,expMode:GAME.EXPLOSION[1],gun:'gun0'
	},
	'cruiser': {
		frameSize: [41, 197], hp: 100, type: 'warship', speed: 0, bp: 10000
		,frameSeqs: {'d0': [[466, 301]]}
		,expMode:GAME.EXPLOSION[0],gun:'gun0'
	},	
	'p38': {
		frameSize: [65, 65],hp: 10, type: 'fighter', speed: 8
		,frameSeqs:{'d0':[[4,400],[70,400],[136,400]]}
		,expMode:GAME.EXPLOSION[0],gun:'gun2',collision:{x:18,y:22,w:29,h:14},collision2:{x:4,y:8,w:56,h:49}
	},
	'a6m': {
		frameSize: [65, 65],hp: 30, type: 'fighter', speed: 0, bp: 500
		,frameSeqs:{'d0':[[268,400],[334,400],[400,400]]}
		,expMode:GAME.EXPLOSION[0],gun:'gun0',collision:{x:18,y:22,w:29,h:14}
	},
	'a7m': {
		frameSize: [98, 98],hp: 100, type: 'fighter', speed: 0, bp: 10000
		,frameSeqs:{'d0':[[697,103]]}
		,expMode:GAME.EXPLOSION[0],gun:'gun0',collision:{x:33,y:40,w:32,h:18}
	},
	'a5m_1': {
		frameSize: [32, 32],hp: 1, type: 'fighter', speed: 8, bp: 100
		,frameSeqs:{
			'd0':[[4,4]],'d1':[[37,4]],'d2':[[70,4]],'d3':[[103,4]],'d4':[[136,4]],'d5':[[169,4]],'d6':[[202,4]],'d7':[[235,4]]				
		}
		,expMode:GAME.EXPLOSION[1],gun:'gun0'
	},
	'a5m_2': {
		frameSize: [32, 32],hp: 1, type: 'fighter', speed: 8, bp: 100
		,frameSeqs:{
			'd0':[[4,37]],'d1':[[37,37]],'d2':[[70,37]],'d3':[[103,37]],'d4':[[136,37]],'d5':[[169,37]],'d6':[[202,37]],'d7':[[235,37]]			
		}
		,expMode:GAME.EXPLOSION[1],gun:'gun0'
	},
	'a5m_3': {
		frameSize: [32, 32],hp: 1, type: 'fighter', speed: 8, bp: 100
		,frameSeqs:{
			'd0':[[4,70]],'d1':[[37,70]],'d2':[[70,70]],'d3':[[103,70]],'d4':[[136,70]],'d5':[[169,70]],'d6':[[202,70]],'d7':[[235,70]]				
		}
		,expMode:GAME.EXPLOSION[1],gun:'gun0'
	},
	'a5m_4': {
		frameSize: [32, 32],hp: 1, type: 'fighter', speed: 8, bp: 100
		,frameSeqs:{
			'd0':[[4,103]],'d1':[[37,103]],'d2':[[70,103]],'d3':[[103,103]],'d4':[[136,103]],'d5':[[169,103]],'d6':[[202,103]],'d7':[[235,103]]				
		}
		,expMode:GAME.EXPLOSION[1],gun:'gun0'
	},
	'a5m_5': {
		frameSize: [32, 32],hp: 1, type: 'fighter', speed: 8, bp: 100
		,frameSeqs:{
			'd0':[[4,136]],'d1':[[37,136]],'d2':[[70,136]],'d3':[[103,136]],'d4':[[136,136]],'d5':[[169,136]],'d6':[[202,136]],'d7':[[235,136]]				
		}
		,expMode:GAME.EXPLOSION[1],gun:'gun0'
	}
}	

var AMMO = {
	'gun0': {
		frameSize: [32, 32], speed: 8, power: 1
		,frameSeqs:{
			'down':[[70,202]]
		},collision:{x:13,y:13,w:6,h:6}
	},
	'gun2': {
		frameSize: [32, 32], speed: 15, power: 2
		,frameSeqs:{
			'down':[[4,169]]
		},collision:{x:7,y:8,w:18,h:16}
	}
}