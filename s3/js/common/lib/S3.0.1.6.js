(function(foctory) { !
    function(factory) {
        if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
            var target = module['exports'] || exports; // module.exports is for Node.js
            factory(target);
        } else if (typeof define === 'function' && define['amd']) {
            // AMD
            define(['exports'], factory);
        } else {
            // No module loader
            factory(window['s3'] = {});
        }
    } (function(exports) {

        var _s3 = typeof exports !== "undefined" ? exports: {};
        // Default global properties.
        var doc = exports.document || document;
        function s3(element, options) {
            this.options = new order(element, options) || {};
            return this.options;
        };
        // Add a val in the method. it is Okay.
        var order = function(element, options) {};
        order.prototype = {

            version: "0.0.4",

            dom: function(options) {
                return doc.querySelector(options)
            },

            append: function(element, options) {
                return element.appendChild(options);
            },

            text: function(element, options) {
                return element.innerHTML = options;
            },

            blank: function() {},

            isStr: function(options) {
                return typeof(options) === 'string'
            },

            isObj: function(options) {
                return typeof(options) === 'object'
            },

            isFun: function(options) {
                return typeof(options) === 'function'
            },

            isNum: function(options) {
                return typeof(options) === 'number'
            },

            isArr: function(options) {
                return typeof(options) === 'array'
            },

            trim: function(options) {
                return options.replace(/(\s*)/g, '');
            },

            extend: function(prop, options) {
                for (var pop in options) {
                    if (pop in prop) {
                        prop[pop] = options[pop]
                    }
                    prop[pop] = options[pop]
                }
                return prop
            },

            indexof: function(prop, options) {
                for (var i = 0; i < prop.length; i++) {
                    if (prop[i] === options) {
                        return 1;
                    }
                }
                return - 1;
            },

            debug: function(options) {
                function warn(options, log) {
                    options.call(this, log.options);
                }
                return warn(function(options) {
                    window.console.warn(options);
                },
                {
                    options: options ? options: 'disable write. call function error'
                })
            },

            Shape: function(options) {
                return new Shape(options, this)
            }
        };

        // The declare attribute used in the call.
        // 变量首字母以A开始
        // 所有在1000以下的变量用A开头
        // 并且变量的第二个字母以99使用的单词开头
        // 第三个字母和第二个同名 那么第三字母使用_下划线
        // 所有超过1000的按照英文的字母表顺序做变量的开头首字母
        // 数组的属性以_下划线开头
        // 如果hatShape首字母和其他名称类似 hs中间加一个大写字母
        // ARRSLICE_module
        var 
        Am, 
        At, 
        Atp, 
        Ata, 
        Atd, 
        Att, 
        Atr, 
        Ats, 
        Ata, 
        Atc, 
        Atc20, 
        Atc30, 
        Ac, 
        Acls, 
        Acas, 
        Acrs, 
        Acws, 
        Acss, 
        Achs, 
        AchIs, 
        Ac_, 
        Ach, 
        Aw, 
        Al, 
        As, 
        Af, 
        Bc, 
        Bp, 
        Br,

        // functional property
        speed, 
        times, 
        logger, 
        messages, 
        processing, 
        requestAnimation,

        // be used to configure the declared properties.
        put = {},
        counts = 0,
        o = null,
        q = void {};

        q = new(function(_ = {
            a: [],
            puts: put
        }) { // this ‘a’ is a array so you can be used that ‘o’ from wilds to be imported parameters.
            return function($_ = {}) {

                // original property bind to '$_'.
                $_.self = _.a;
                $_.puts = _.puts;
                // save self in the parent '$_'.
                $_.self.push($_);
                var childs,closureCollection;
                closureCollection = _.a;
                for (var i = 0,
                iterator = $_.self[0], len = iterator.length; i < len; i++) {

                    closureCollection[i] = [];
                    var child = iterator[i];
                    for (var j in child) {
                        childs = child[j];
                        try {
                            if ("function" !== typeof childs) {
                                throw "你没有选择函数！" //You are not define function mehtods.
                            } else {
                                // output function methods save to between one object and another object.
                                switch (i) {
                                case 0:
                                    closureCollection[i][j] = (childs);
                                    break;
                                case 1:
                                    closureCollection[i][j] = (childs);
                                    break;
                                case 2:
                                    closureCollection[i][j] = (childs);
                                    break;
                                case 3:
                                    closureCollection[i][j] = (childs);
                                    break;
                                default:
                                    break;
                                }
                            }

                        } catch(e) {
                            throw e
                        };
                    };
                }
                // 实现反向获得caes 1内部的数组函数
                return closureCollection[0][2](),
                closureCollection[0][3](),
                closureCollection[0][1].call(this, closureCollection),
                closureCollection

            } ([{
                1 : function(closure) {
                    // first ,reset the properties.
                    // 实现反向储存方法 
                    // 闭包内部的方法可重用
                    // 变量实现初始化方法
                    // 如果多次调用,必须在q不使用new的前提下使用
                    Am = Array.prototype.slice;
                    At = closure[1][99];
                    Atp = closure[1][98];
                    Ata = closure[1][97];
                    Atd = closure[1][96];
                    Att = closure[1][95];
                    Atr = closure[1][94];
                    Ats = closure[1][89];
                    Ata = closure[1][87];
                    Atc = closure[1][86];
                    Atc20 = closure[1][85];
                    Atc30 = closure[1][84];
                    Atpc = closure[1][83];
                    Ac = closure[1][299];
                    Acls = closure[1][298];
                    Acas = closure[1][297];
                    Acrs = closure[1][296];
                    Acws = closure[1][295];
                    Acss = closure[1][294];
                    Achs = closure[1][293];
                    AchIs = closure[1][292];
                    Acw = closure[1][240];
                    Ac_ = closure[1][239];
                    Ach = closure[1][232];
                    As = closure[1][499];
                    Af = closure[1][999];
                    Bp = closure[1][1000];
                    Bc = closure[1][1099];
                    Br = closure[1][1299];
                },
                2 : function() {
                    // used in the function properties.
                    speed = 0.1; // speed lv
                    times = 0; // time out
                    logger = false; // record
                    processing = 1;
                    messages = {}; // start properties
                    requestAnimation = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || (function() {
                        var fps = 1000 / 60;
                        var lastTimes = 0;
                        return function(callback) {
                            var currentTimes = (new Date).getTime();
                            var callTimes = Math.max(0, fps - (currentTimes - lastTimes));
                            var t = setTimeout(function(callback) {
                                callback(callTimes + currentTimes);
                            },
                            callTimes);
                            lastTimes = callTimes + currentTimes;
                            return t;
                        }
                    });
                },
                3 : function() {
                    // bind function mehtod in the rename variable.
                    // eleven with data and el document.
                    // first : properties; second : closure; third : prototype chain; fourth : __proto__ ; fifth : this gesture[6]
                    o = [Object,
                    /* default properties*/
                    { // the application is replacement the tools
                        99 : 'tool',
                        98 : 'pos',
                        97 : 'animation',
                        96 : 'draw',
                        95 : 'transfer',
                        94 : 'render',
                        89 : 'scene',
                        88 : 'amount',
                        86 : 'createGradient',
                        85 : 'createGradient20',
                        84 : 'createGradient30',
                        83 : 'pointerConfig',
                        82 : 'startConfig',
                        300 : 'shape',
                        299 : 'circleShape',
                        298 : 'lineShape',
                        297 : 'arcShape',
                        296 : 'rectShape',
                        295 : 'waveShape',
                        294 : 'sectorsShape',
                        293 : 'hatShape',
                        292 : 'hillShape',
                        240 : 'wave',
                        239 : 'circle',
                        232 : 'hill',
                        499 : 'set',
                        999 : 'freezeProperty',
                        1000 : 'plugin',
                        1099 : 'cover2DProperty',
                        1111 : 'cache',
                        1299 : 'render',
                    },
                    /*closure*/
                    {
                        1 : 'get',
                        2 : 'set',
                        3 : 'add',
                        66 : 'on'
                    },
                    /*prototype chain*/
                    {
                        1 : 'click',
                        3 : 'mouseover',
                        6 : 'gesture',
                        11 : 'atach'
                    }
                    /*gesture events*/
                    ]
                }
            },
            {
                99 : function() {
                    this.name = 'tool';
                    this.newEmpty = [];
                    this.pipe = [];
                    this.defaults = {};
                    this.data = [arguments[0]];
                    var data = this.data[0];
                    for (var k in data) {
                        if (k === 'webkitImageSmoothingEnabled' || 
                            k === 'mozImageSmoothingEnabled' || 
                            k === 'msImageSmoothingEnabled') k = 'imageSmoothingEnabled';
                        var inherit = data[k];
                        if (typeof inherit === 'string' || 
                            typeof inherit === 'number' || 
                            typeof inherit === 'boolean') {
                            this.newEmpty.push(k);
                            this.defaults[k] = {
                                name: 'withoutMethod',
                                type: typeof data[k]
                            }
                        } else if (typeof inherit === 'function') {
                            this.newEmpty.push(k);
                            this.defaults[k] = {
                                name: 'withMethod',
                                type: typeof data[k],
                                length: data[k].length
                            }
                        }
                    }

                    for (var i in messages) {
                        this[i] = messages[i];
                    }
                },
                88 : function(num) {
                    this.name = 'amount';
                    this.nums = num;
                },
                87 : function() {
                    this.name = 'arc';
                },
                86 : function() {
                    this.name = 'createGradient';
                },
                85 : function() {
                    this.name = 'createGradient20';
                },
                84 : function() {
                    this.name = 'createGradient30';
                },
                83 : function() {
                    this.name = 'pointerConfig';
                    this.TYPE = arguments[0].type;
                    this.PROPERTY = arguments[0].property;
                },
                82 : function() {
                    this.name = 'startConfig';
                    this.SPEED = 0.1;
                    this.OPEN = 0;
                },
                198 : function() {
                    this.name = 'circleShapeResetting';
                    this.collection = arguments[0];
                },
                300 : function() {
                    this.name = 'shape';
                    this.borderColor = '#7E8842';
                    this.radius = 36; // 半径
                    this.thick = 5; // 厚度
                    this.motion = 'stop'; // 运动方式 自动 随机 由名称决定
                    this.trails = 1; // 运动轨迹 默认1
                    this.sensitivity = 10; // 敏感度高 浮动数量多
                    this.rate = 5; // 频率大 浮动高度低 否则高
                    this.SPEED_3 = null; // start set
                    this.speed = this.SPEED_3 || 0.2; // 速度快慢
                    this.bMoveMode = !1; // if false is stop moving
                    this.opposite = 1;
                    this.direction = 'top'; // 方向
                    this.slope = 0.99996; // 倾斜度
                    this.smooth = 1; // 平滑度
                    this.currentTimes = (new Date).getTime();
                    this.buffer = new ArrayBuffer(16);
                    this.fdata = new Float32Array(this.buffer, 0, 3);
                    this.index = this.fdata;
                    this.x = Math.round(Math.random() * 36 + 36); // start position
                    this.y = Math.round(Math.random() * 36 + 36); // start position
                    this.x1 = Math.round(Math.random() * 36 + 36) * 2; // end position
                    this.y1 = Math.round(Math.random() * 36 + 36) * 2; // end position
                    this.calculationProperty = { // 进程的属性
                        createWave: o[1][240].createWave,
                        createCircle: o[1][239].createCircle,
                        createHill: o[1][232].createHill
                    };
                    this.readyPosition = 50;
                    this.beginPosition = {x: 50,y: null};
                    this.endPosition = {x: 500,y: null};
                    this.startAngles = Math.PI * 0;
                    this.stopAngles = Math.PI / 2;
                },
                299 : function() {
                    this.name = 'circleShape';
                    this.data = [];
                    this.o_OPEN = 0;
                    this.iterator = {};
                    // 运动方式 分别有 自动、随机 向左 右、下 上、停止
                    this.moveModel = ['auto', 'random', 'round', 'left', 'right', 'bottom', 'top', 'stop'];
                    // 如果是0停止 否则运动
                    this.bMoveMode = !1;
                    this.isMoveModel = this.bMoveMode ? this.moveModel[0] : this.moveModel[this.moveModel.length-1];
                    this.collection = arguments[0];
                },
                298 : function() {
                    this.name = 'lineShape';
                    this.data = [];
                    this.iterator = {};
                    this.collection = arguments[0];
                },
                297 : function() {
                    this.name = 'arcShape';
                    this.data = [];
                    this.iterator = {};
                    this.collection = arguments[0];
                },
                296 : function() {
                    this.name = 'rectShape';
                    this.data = [];
                    this.iterator = {};
                    this.collection = arguments[0];
                },
                295 : function() {
                    this.name = 'waveShape';
                    this.stop = !0;
                    this.s_SPEED = 0;
                    this.o_OPEN = 0;
                    this.data = [];
                    this.iterator = {};
                    this.collection = arguments[0];
                },
                294 : function() {
                    this.name = 'sectorsShape';
                    this.data = [];
                    this.iterator = {};
                    this.collection = arguments[0];
                },
                293 : function() {
                    this.name = 'hatShape';
                    this.data = [];
                    this.iterator = {};
                    this.collection = arguments[0];
                },
                292 : function() {
                    this.name = 'hillShape';
                    this._direction = ['top','left','right','bottom'];
                    this.data = [];
                    this.iterator = {};
                    this.radius = 0.0001;
                    this.collection = arguments[0];
                },
                240 : function() {
                    this.name = 'wave';
                    this.data = [];
                },
                239 : function() {
                    this.name = 'circle';
                    this.data = [];
                },
                232 : function() {
                    this.name = 'hill';
                    this.data = [];
                },
                499 : function() {
                    this.name = 'set';
                    this.data = [];

                    if (typeof arguments === 'object') this.data.push(arguments[0]);
                },
                999 : function() {
                    this.name = 'freezeProperty';
                    this.isFreezeProperties = arguments[0];
                    Object.freeze(this.isFreezeProperties)
                },
                1000 : function() {
                    this.name = 'plugin';
                    shape.plugin(arguments);
                },
                1111 : function() {
                    this.name = 'cache';
                },
                1099 : function() {
                    this.name = 'cover2DProperty';
                },
                1299 : function() {
                    this.name = 'render';
                },
            },

            {
                1 : function() {
                    this.name = 'get';
                    // used gesture pointer.
                },
                2 : function() {
                    this.name = 'set';
                },
                3 : function() {
                    this.name = 'add';
                },
                4 : function() {
                    this.name = 'on';
                }
            },

            {
                6 : function() {
                    this.name = 'gesture';
                    // used gesture pointer.
                    return {
                        linear: function(argument) {},
                        easein: function(argument) {},
                        easeout: function(argument) {}
                    }
                }
            }])
        });

        /*
		-  options is an obj.
		-  The 'previous' will be proto methods by reo target.

		- Shape.chain()
		- 你可以重新写入调用的数据, 因此你可以自定义写插件
		- 通过给chain的方法传入2个参数即可, 第一个参数为this
		- 第二个参数就是你的插件名 world方法名称

		-	var d = Shape.plugin({get:1},{
				init : function(){},
				frame : function(){}
			}
		*/
        function Shape(options, previous) {
            // inject parameters;
            // Extend previous method of preotype chain properties.
            return new o[1][99](),
            put._o = o,
            this;
        };
        Shape.plugin = function() {
            return Shape.plugin.create(arguments)
        };
        Shape.plugin.create = function(subclasses, definition) {
            Shape.prototype[subclasses] = definition.prototype.initialize;
        };

        (function() {
            /*
              set s3.js libriry version.
              create a model name.
              create Date.
              other configuration info.
			*/
            messages.version = '0.1';
            messages.privateModule = 's3';
            messages.date = '20170912';
            messages.nowDate = new Date;
            messages.config = {};
        } ());

        /*
		- Rename variable,get a function mehtod give rename var,
		- this is a plugins methods,get the prototype property from the parent element.
		 	
		 	var app = simgl.tool('canvas');
		 	// while we can call scene methods

		 	app.scene
		 	// we are express the use of canvas	2d layers, or not svg and webgl
		 	// add color and speed and rotia from the canvas 2d layout
		*/
        q[1][99].prototype.constructor = o[1][99];
        o[1][99] = q[1][99];
        Object.assign(o[1][99].prototype, {
            // 此处initialize是通道
            // 插件的调用入口
            initialize: function() {
                return this,
                At.call(this, arguments[0]),
                new At(arguments[0])
            },
            createGradient: function(params) {
                var rgb = ['#5E8579', '#7B7687', '#77C34F', '#96CDCD', '#407D94', '#D62728', '#C1FFC1', '#2E8B57', '#87CEEB', '#9ACD32'];
                return rgb
            },
            createGradient20: function(argument) {
                var rgb = ['#5E8579', '#7B7687', '#77C34F', '#96CDCD', '#407D94', '#D62728', '#C1FFC1', '#2E8B57', '#87CEEB', '#9ACD32', '#DFB5B7', '#EACF02', '#ACB327', '#7F1784', '#E08031', '#C7CEB2', '#199475', '#0B6E48', '#044D22', '#7E8842'];
                return rgb
            },
            createGradient30: function(argument) {
                var rgb = ['#5E8579', '#7B7687', '#77C34F', '#96CDCD', '#407D94', '#D62728', '#C1FFC1', '#2E8B57', '#87CEEB', '#9ACD32', '#DFB5B7', '#EACF02', '#ACB327', '#7F1784', '#E08031', '#C7CEB2', '#199475', '#0B6E48', '#044D22', '#7E8842', '#DFB5B7', '#EACF02', '#ACB327', '#7F1784', '#E08031', '#C7CEB2', '#199475', '#0B6E48', '#044D22', '#7E8842'];
                return rgb
            },
            /*
			- 表示多个同等属性的设置
			- 属性的值不同而已
			- 后面的方法是处理的color方法
			*/
            amount: function(params) {
                var amounts = new o[1][88](params);
                var vals = amounts.value;

                return amounts.set(vals)
            },
            /*
			- 处理弧度的属性方法
			- 不接收参数
			- 后面是处理弧度的参数
			- 比如Angle 角度 position 位置 radius 圆角等
			*/
            arc: function(argument) {
                var arcs = new o[1][87]();
                return arcs
            },
            /*
				管理图形下面的组件 graphics
				给图像定义方法名 addComponent()
				方法内部添加的二个属性 
				第一 字符串 表示组件的名称 name
				第二 对象 表示添加的属性名称 property
				{ 
					type : boolean || number || array || function || string,
					property : colorArr
				}
				demo :
				{
					'circleShape',{
						type : Array,
						property : colorOrPosition
					}
				}
			*/
            Manager: function() {
                // 接收传的参数
                this.pipe = [];
                // 缓存执行animation的数组
                this.storeBufferSlice = [];

                var preArgs = arguments[0];
                var that = this;
                return {
                    graphics: {
                        addComponent: function() {
                            var args = arguments;

                            if (typeof args[0] === 'string' && typeof args[1] === 'object') {
                                that.pipe.push({
                                    componentName: args[0],
                                    characteristic: args[1]
                                })
                            }

                            var getPropBindObject;
                            for (var k = 299; k > 200; k--) {
                                if (k in o[1]) {
                                    try {
                                        if (o[1][k].prototype.constructor === args[0]) {
                                            getPropBindObject = k;
                                            break;
                                        } else continue;
                                    } catch(e) {
                                        throw 'no defaults the method name.'
                                    }
                                }
                            }

                            var utils = new o[1][getPropBindObject](that.pipe);

                            /*
								 utils.draw() 第一次执行的函数方法
								 utils 需要重置的函数方法
								 utils 属性的方法可以被调用
							*/
                            that.storeBufferSlice.push(utils);

                            // 调用call组件的配置信息 进行一次重新配置
                            return utils,
                            this
                        },
                        config: {
                            set: (function() {
                                var that = this;

                                // 执行默认的参数类型
                                // 只能设置到[]数组的第一层
                                var atpc = new o[1][83]({
                                    type: 'Array',
                                    property: []
                                });

                                // 是否自动执行
                                var setAttr = new o[1][82]();
                                Object.assign(atpc,setAttr);

                                // 重新set设置参数的类型和属性
                                return atpc
                            })()
                        },
                        start: function(options) {

                            var getAttr = this.config.set;
                            var defaults_NUM = 0.66666;
                            
                            if( typeof options === 'object' ){
                                if('speed' in options){
                                    (typeof options.speed === 'string'? null : true);
                                    if(typeof options.speed === 'number') defaults_NUM = 1 - options['speed'];
                                }
                            }

                            var getSpeed = getAttr.speed;

                            getSpeed -= defaults_NUM;

                            getAttr.speed = getSpeed;
                            getAttr.open = 1;

                            return !0
                        }
                    },
                    // 获得深度执行components组件的函数方法 that.storeBufferSlice 
                    depthCall: this.storeBufferSlice
                }
            },
            animation: function(options, t) {
                var node = this.root.addChild;

                if (t >> 0 || typeof(t) === 'number') t = 1;

                if (t == null && t == undefined) t = counts;

                function render() {
                    t = requestAnimation(render, 30);
                    node(options);
                }

                render();
                return t
            }
        });
        Object.defineProperties(o[1][99].prototype, {
            posX: {
                get: function() {
                    return this.data[0]
                },
                set: function(value) {
                    this.data[0] = value
                }
            },
            posY: {
                get: function() {
                    return this.data[0]
                },
                set: function(value) {
                    this.data[0] = value
                }
            },
            posZ: {
                get: function() {
                    return this.val
                },
                set: function(value) {
                    this.data[0] = value
                }
            },

            /*
				將属性添加进 scene.root.addChild方法里面
				此时 scene 场景即可调用克隆的2D属性
				通过clone克隆scene属性赋值给2D进行render渲染
			*/
            scene: {
                get: function() {
                    var that = this,
                    o = {},
                    canName = that.newEmpty,
                    canNameProperties = that.defaults,
                    originalProperty = that.data[0];

                    return originalProperty
                },
                set: function(value) {
                    var originalProperty;

                    originalProperty = value ? value: this.data[0];

                    for (var k in originalProperty) {
                        this.newEmpty.push[k];
                    }
                    return this.newEmpty
                }
            },

            /*
				把这个场景的属性和调用属性传给一个新函数
				此函数或方法主要manager管理一个物理实例事物
				通过调用相应的物理对象 即可使用相应的属性和参数 并且赋值
				var cir = new app.Manager('circle'); // or cylinder rect
				此管理事件为新开的对象
			*/
            root: {
                get: function(x) {
                    var that = this;
                    return {
                        /*
							get configuration of info on the Manager methods.
							options property will be resetting.
						*/
                        addChild: function(options) {
                            var getBufferMethod = options;

                            // 重新定义属性 from graphics object to config.
                            var defineConfigurationInfo = getBufferMethod.graphics.config.set;
                            var defineConfigurationInfoPropertiesType;

                            if (defineConfigurationInfo.type === 'Array' || !defineConfigurationInfo.type) {
                                defineConfigurationInfoPropertiesType = 'Array';
                            } else if (defineConfigurationInfo.type !== 'Array') {
                                defineConfigurationInfoPropertiesType = defineConfigurationInfo.type;
                            }

                            // 重新定义type 
                            var acceptCustomizeConfig = Object.assign(defineConfigurationInfo, {
                                type: defineConfigurationInfoPropertiesType
                            });

                            // 执行保存在数组里面的组件的每一个方法
                            var getDepthCall = getBufferMethod.depthCall;

                            // start ani config information

                            getDepthCall.forEach(function(opt) {
                                // 存入一个2d的rending渲染
                                // 如果第二个参数为false 执行默认的数组
                                // 第三个参数限制作用 false 禁止自动 true 自动执行
                                opt.Excute2DEngine(that.data[0], acceptCustomizeConfig, {
                                    speed: defineConfigurationInfo.speed,
                                    open : defineConfigurationInfo.open
                                })
                            });
                            return this
                        },
                    }
                },
                set: function(value) {
                    this.val = value;
                    return value
                }
            },

        });

        // name = 'amount()'
        q[1][88].prototype.constructor = o[1][88];
        o[1][88] = q[1][88];
        Object.assign(o[1][88].prototype, {
            handleModule: function(options) {
                // color and pos is a mothods.
                // options => function (){ return ['#222','#333']};
                // this.getValue => number;
                var acceptData, size, arrEmpty;

                if (typeof options === 'function') acceptData = options.call(this);
                else acceptData = options;

                size = this.getValue;
                arrEmpty = [];

                for (var j = 0; j < size; j++) {
                    arrEmpty.push(acceptData[j])
                }

                return arrEmpty
            },
            set: function(param) {
                this.getValue = param;
                return this
            }
        });
        Object.defineProperties(o[1][88].prototype, {
            value: {
                get: function() {
                    return typeof this.nums === 'number' ? this.nums: Number(this.nums)
                },
                set: function(val) {
                    var output = val;
                    console.log(output);
                    // 如果传入的值不是10
                    if (output !== 10) {
                        this.nums = val
                    }
                }
            }
        });

        // name = 'arc()'
        q[1][87].prototype.constructor = o[1][87];
        o[1][87] = q[1][87];
        Object.assign(o[1][87].prototype, {
            handlePosition: function(argument) {},
        });

        // name = '()'
        q[1][86].prototype.constructor = o[1][86];
        o[1][86] = q[1][86];
        Object.assign(o[1][86].prototype, {
            handleColor: function(argument) {},
        });

        // name = '()'
        q[1][85].prototype.constructor = o[1][85];
        o[1][85] = q[1][85];
        Object.assign(o[1][85].prototype, {
            handleColor: function(argument) {},
        });

        // name = '()'
        q[1][84].prototype.constructor = o[1][84];
        o[1][84] = q[1][84];
        Object.assign(o[1][84].prototype, {
            handleColor: function(argument) {},
        });

        // pointerconfig = '()'
        q[1][83].prototype.constructor = o[1][83];
        o[1][83] = q[1][83];
        Object.assign(o[1][83].prototype, {
            initialize: function() {
                return this.val
            }
        });
        Object.defineProperties(o[1][83].prototype, {
            'type': {
                get: function() {
                    return this.TYPE
                },
                set: function(val) {
                    this.TYPE = val;
                }
            },
            'property': {
                get: function() {
                    return this.PROPERTY
                },
                set: function(val) {
                    this.PROPERTY = val;
                }
            },
            'speed': {
                get: function() {
                    return this.SPEED
                },
                set: function(val) {
                    this.SPEED = val;
                }
            }
        });
        // startconfig = '()'
        q[1][82].prototype.constructor = o[1][82];
        o[1][82] = q[1][82];
        Object.assign(o[1][82].prototype, {
            initialize: function() {
                return this.val
            }
        });
        Object.defineProperties(o[1][82].prototype, {
            'speed': {
                get: function() {
                    return this.SPEED
                },
                set: function(val) {
                    this.SPEED = val;
                }
            },
            'open': {
                get: function() {
                    return this.OPEN
                },
                set: function(val) {
                    this.OPEN = val;
                }
            }
        });

        q[1][300].prototype.constructor = o[1][300];
        o[1][300] = q[1][300];
        Object.assign(o[1][300].prototype, {
            initialize: function(argument) {},
        });
        Object.defineProperties(o[1][300].prototype, {
            'mouseX': {
                get: function() {
                    return this.x1
                },
                set: function(val) {
                    this.x1 = val;
                }
            },
            'mouseY': {
                get: function() {
                    return this.y1
                },
                set: function(val) {
                    this.y1 = val;
                }
            },
            'SPEED_3': {
                get: function() {
                    return this._SPEED
                },
                set: function(val) {
                    this._SPEED = val
                }
            }
        });
        /*
        - circle shape
		- 传入参数(默认canvas Element)
		- 回调函数(函数名为调用功能functional)
		- 功能分别为 SHAPE WAVE CIRCLE LINE ARC ...
		- circle : app.circle()
		*/
        /*
    		定义配置信息
    		首次配置implement组件的属性和方法
          {
              x: 坐标 x,
              y: 坐标 y,
              index: color 值,
              speed ：速度 number,
              trails ：轨迹 number,
              radius ：半径 number,
              startAngles ：起始角度 pi,
              stopAngles : 结束角度 pi,
              motion : 运动方式 String,
              bMoveMode : 运动方式 boolean
          }
		*/
        q[1][299].prototype.constructor = o[1][299];
        o[1][299] = q[1][299];
        Object.assign(o[1][299].prototype, {
            initialize: function() {
                return this,
                o[1][299].call(this, arguments),
                o[1][299].prototype
            },
            draw: function(options) {
                var getCollectionProperty = this.particularProperty(true);
                // 获得默认的属性和参数
                var shapeProperty = new o[1][300];
                var _createCircle = shapeProperty.calculationProperty.createCircle;

                this.iterator.dynamic = {};
                
                // if loop.
                if(this.o_OPEN){
                    this.data[0].fillStyle = "rgb(255,255,255)";
                    this.data[0].fillRect(0, 0, this.data[0].canvas.width, this.data[0].canvas.height);
                }


                var acceptCollection, inherit;
                if (getCollectionProperty.type === 'Array') acceptCollection = getCollectionProperty.property;
                for (var j = 0; j < acceptCollection.length; j++) {
                    // 获取所有传入的属性 之后check检查
                    inherit = acceptCollection[j];
                    inherit.x = !inherit.x ? shapeProperty.x: inherit.x;
                    inherit.y = !inherit.y ? shapeProperty.y: inherit.y;
                    inherit.index = !inherit.index ? shapeProperty.index: inherit.index;
                    inherit.speed = !inherit.speed ? shapeProperty.speed: inherit.speed;
                    inherit.radius = !inherit.radius ? shapeProperty.radius: inherit.radius;
                    inherit.trails = !inherit.trails ? shapeProperty.trails: inherit.trails;
                    inherit.startAngles = !inherit.startAngles ? shapeProperty.startAngles: inherit.startAngles;
                    inherit.stopAngles = !inherit.stopAngles ? shapeProperty.stopAngles: inherit.stopAngles;
                    inherit.motion = !inherit.motion ? shapeProperty.motion: inherit.motion;
                    inherit.bMoveMode = !inherit.bMoveMode ? shapeProperty.bMoveMode: inherit.bMoveMode;
                     

                    this.iterator.x = inherit.x;
                    this.iterator.y = inherit.y;
                    this.iterator.speed = inherit.speed;
                    this.iterator.trails = inherit.trails;
                    this.iterator.index = inherit.index;
                    this.iterator.radius = inherit.radius;
                    this.iterator.motion = inherit.motion;
                    this.iterator.startAngles = inherit.startAngles;
                    this.iterator.stopAngles = inherit.stopAngles * 4; // 默认2 pi
                    this.iterator.bMoveMode = inherit.bMoveMode; // 只接受二个值(0,1) 如果为1即为true 开启auto 否则stop

                    this._moveTo();
                    this._beggingToDo();
                    // 如果默认停止即圆 否则 开始运动
                    // 支持二种方式 {moveModel : String} {bMoveMode:0 || 1}
                    if(this.iterator.motion === shapeProperty.motion && this.iterator.bMoveMode ?
                      (this.iterator.motion === shapeProperty.motion || this.isMoveModel !== this.iterator.motion):
                       this.iterator.motion !== shapeProperty.motion  ? false : !0 ) this._drawGraphicsArc(this.iterator.x,this.iterator.y);
                    else this.start(_createCircle);
                    this._closePath();
                    this._scene2DFillStyles();
                    this._scene2DFill()
                }
            },

            /*
				example color array and pos
			*/
            particularProperty: function(options) {
                if (options) return this.collection[0].characteristic;
            },
            _beggingToDo: function(options) {
                this.data[0].beginPath();
            },
            _closePath : function (){
                this.data[0].closePath();
            },
            _moveTo: function(options) {
                this.data[0].moveTo(this.iterator.x, this.iterator.y);
            },
            /*
				excuting the arc events 
			*/
            _drawGraphicsArc: function(x,y) {
                // console.log(x+'=x,'+y+'=y,'+ this.iterator.radius+'=this.iterator.radius,'+ this.iterator.startAngles+'=this.iterator.startAngles,'+ this.iterator.stopAngles + '=this.iterator.stopAngles')
                this.data[0].arc(x, y, this.iterator.radius, this.iterator.startAngles, this.iterator.stopAngles);
            },
            /*
    			setting color properties
    		*/
            _scene2DFillStyles: function(options) {
                this.data[0].fillStyle = options || this.iterator.index;
            },
            _scene2DFill: function() {
                this.data[0].fill();
            },
            _fillRect : function (options){
                this.data[0].fillRect(0, 0, this.data[0].canvas.width, this.data[0].canvas.height);
            },
            start : function (options){
                this.getDynamicData(options, this.iterator.x, this.iterator.y);
                for(var d = this.iterator.dynamic.group,k = this.iterator.dynamic.length, i = 0; i < k; i++){
                    var x = d[i][0] * this.iterator.trails + this.iterator.x, 
                        y = d[i][1] * this.iterator.trails + this.iterator.y;
                    this._drawGraphicsArc(x,y);
                }
            },
            // 获得动态属性
            getDynamicData: function(_createCircle, _a, _b) {
                var outModelObj,getModel,circleModule,item;

                outModelObj = this.matchModel(this.iterator.motion);

                getModel = outModelObj.isBool ? outModelObj.is : !1;

                // 如果不存在类型 返回false
                try{
                    if(!getModel){
                        console.log("You cannot call with the correct model type.")
                        return false;
                    }
                }
                catch(err){ 
                    throw err
                }

                // 根据指定圆形的动画模型获得位移数据
                circleModule = _createCircle(_a, _b, getModel);

                item = circleModule[getModel];

                this.iterator.dynamic.group = item;
                this.iterator.dynamic.length = item.length;
                // especially of base property
            },
            matchModel : function (options){
                // 匹配模型的类型
                var saveMoveMedel = this.moveModel;
                var isMatch = 0;
                for(var s = 0, m = saveMoveMedel.length; s < m; s++ ){
                    if(options === saveMoveMedel[s]) isMatch++;
                    if(isMatch) break;
                    else continue;
                }
                return {
                    is : options,
                    isBool : isMatch
                }
            },
            Excute2DEngine: function() {
                // accept ctx 2d property.
                var d2 = arguments[0],
                isConfig = arguments[1],
                auto = arguments[2],
                domain = this.collection[0]['characteristic'];

                if (isConfig) {
                    domain.type = isConfig['type'];

                    // 获得整数的数组配置 this.collection[0]['characteristic'].property = [0:{},1:{}...]
                    var originalProperty = domain.property;

                    for (var j = 0,
                    getParams = isConfig['property']; j < getParams.length; j++) {
                        Object.assign(domain.property[j], getParams[j]);
                    }
                }

                // 可执行 true 循环运动
                // start config info
                // open the ani of return true
                if(auto.open) this.o_OPEN = auto.open;

                Object.assign(this.collection[0]['characteristic'], domain);
                this.data.push(d2);
                this.draw(this.data[0])
            }
        });
        /*
    		重新写入配置信息
    		通过 return set : { restore config info }
    	*/
        Object.defineProperties(o[1][299].prototype, {
            config: {
                get: function() {
                    var that = this;
                    var collection = this.collection;

                    return {
                        set: new o[1][299]()
                    }
                },
                set: function(value) {
                    return value
                }
            }
        });

        // line shape
        q[1][298].prototype.constructor = o[1][298];
        o[1][298] = q[1][298];
        Object.assign(o[1][298].prototype, {
            initialize: function() {
                return this,
                o[1][298].call(this, arguments),
                o[1][298].prototype
            },
            draw: function(options) {
                var getCollectionProperty = this.particularProperty();

                // 获得默认的属性和参数
                var shapeProperty = new o[1][300];

                var acceptCollection, inherit;
                if (getCollectionProperty.type === 'Array') acceptCollection = getCollectionProperty.property;
                for (var j = 0; j < acceptCollection.length; j++) {
                    inherit = acceptCollection[j];

                    // 获取所有传入的属性 之后check检查
                    inherit.x = !inherit.x ? shapeProperty.x: inherit.x;
                    inherit.y = !inherit.y ? shapeProperty.y: inherit.y;
                    inherit.index = !inherit.index ? shapeProperty.index: inherit.index;
                    inherit.x1 = !inherit.x1 ? shapeProperty.x1: inherit.x1;
                    inherit.y1 = !inherit.y1 ? shapeProperty.y1: inherit.y1;

                    this.iterator.x = inherit.x;
                    this.iterator.y = inherit.y;
                    this.iterator.index = inherit.index;
                    this.iterator.x1 = inherit.x1;
                    this.iterator.y1 = inherit.y1;

                    this._strokeStyle();
                    this._beggingToDo();
                    this._moveTo();
                    this._lineTo();
                    this._stroke()
                }
            },
            particularProperty: function(options) {
                return this.collection[0].characteristic;
            },
            _strokeStyle: function(options) {
                this.data[0].strokeStyle = this.iterator.index;
            },
            _beggingToDo: function() {
                this.data[0].beginPath();
            },
            _moveTo: function(options) {
                this.data[0].moveTo(this.iterator.x, this.iterator.y);
            },
            _lineTo: function(options) {
                this.data[0].lineTo(this.iterator.x1, this.iterator.y1);
            },
            _stroke: function() {
                this.data[0].stroke();
            },
            Excute2DEngine: function() {
                // accept ctx 2d property.
                var d2 = arguments[0],
                isConfig = arguments[1],
                domain = this.collection[0]['characteristic'];

                if (isConfig) {
                    domain.type = isConfig['type'];

                    // 获得整数的数组配置 this.collection[0]['characteristic'].property = [0:{},1:{}...]
                    var originalProperty = domain.property;

                    for (var j = 0,
                    getParams = isConfig['property']; j < getParams.length; j++) {
                        Object.assign(domain.property[j], getParams[j]);
                    }
                }

                Object.assign(this.collection[0]['characteristic'], domain);
                this.data.push(d2);
                this.draw(this.data[0])
            }
        });
        Object.defineProperties(o[1][298].prototype, {
            config: {
                get: function() {
                    var that = this;
                    var collection = this.collection;

                    return {
                        set: new o[1][299]()
                    }
                },
                set: function(value) {
                    return value
                }
            },
            pos: {
                get: function() {
                    return this.position
                },
                set: function(value) {
                    if (value) this.position = value
                    return value
                }
            }
        });

        // arc shape
        q[1][297].prototype.constructor = o[1][297];
        o[1][297] = q[1][297];
        Object.assign(o[1][297].prototype, {
            initialize: function() {
                return this,
                o[1][293].call(this, arguments),
                o[1][293].prototype
            },
            draw: function(options) {
                var getCollectionProperty = this.particularProperty();

                // 获得默认的属性和参数
                var shapeProperty = new o[1][300];

                var acceptCollection, inherit;
                if (getCollectionProperty.type === 'Array') acceptCollection = getCollectionProperty.property;
                for (var j = 0; j < acceptCollection.length; j++) {
                    inherit = acceptCollection[j];

                    inherit.radius = !inherit.radius ? shapeProperty.radius: inherit.radius;
                    inherit.x = !inherit.x ? shapeProperty.x: inherit.x;
                    inherit.y = !inherit.y ? shapeProperty.y: inherit.y;
                    inherit.index = !inherit.index ? shapeProperty.index: inherit.index;
                    inherit.startAngles = !inherit.startAngles ? shapeProperty.startAngles: inherit.startAngles;
                    inherit.stopAngles = !inherit.stopAngles ? shapeProperty.stopAngles: inherit.stopAngles;

                    this.iterator.radius = inherit.radius;
                    this.iterator.x = inherit.x;
                    this.iterator.y = inherit.y;
                    this.iterator.index = inherit.index;
                    this.iterator.startAngles = inherit.startAngles;
                    this.iterator.stopAngles = inherit.stopAngles;

                    this._strokeStyle();
                    this._beggingToDo();
                    this._drawGraphicsArc();
                    this._stroke()
                }
            },
            particularProperty: function(options) {
                return this.collection[0].characteristic;
            },
            _strokeStyle: function(options) {
                this.data[0].strokeStyle = this.iterator.index;
            },
            _beggingToDo: function() {
                this.data[0].beginPath();
            },
            _drawGraphicsArc: function(options) {
                this.data[0].arc(this.iterator.x, this.iterator.y, this.iterator.radius, this.iterator.startAngles, this.iterator.stopAngles, false);
            },
            _stroke: function() {
                this.data[0].stroke();
            },
            Excute2DEngine: function() {
                // accept ctx 2d property.
                var d2 = arguments[0],
                isConfig = arguments[1],
                domain = this.collection[0]['characteristic'];

                if (isConfig) {
                    domain.type = isConfig['type'];

                    // 获得整数的数组配置 this.collection[0]['characteristic'].property = [0:{},1:{}...]
                    var originalProperty = domain.property;

                    for (var j = 0,
                    getParams = isConfig['property']; j < getParams.length; j++) {
                        Object.assign(domain.property[j], getParams[j]);
                    }
                }

                Object.assign(this.collection[0]['characteristic'], domain);
                this.data.push(d2);
                this.draw(this.data[0])
            }
        });
        Object.defineProperties(o[1][297].prototype, {
            config: {
                get: function() {
                    var that = this;
                    var collection = this.collection;

                    return {
                        set: new o[1][297]()
                    }
                },
                set: function(value) {
                    return value
                }
            },
            pos: {
                get: function() {
                    return this.position
                },
                set: function(value) {
                    if (value) this.position = value
                    return value
                }
            }
        });

        // rect shape
        q[1][296].prototype.constructor = o[1][296];
        o[1][296] = q[1][296];
        Object.assign(o[1][296].prototype, {
            initialize: function() {
                return this,
                o[1][293].call(this, arguments),
                o[1][293].prototype
            },
            draw: function(options) {
                var getCollectionProperty = this.particularProperty();

                // 获得默认的属性和参数
                var shapeProperty = new o[1][300];

                var acceptCollection, inherit;
                if (getCollectionProperty.type === 'Array') acceptCollection = getCollectionProperty.property;

                for (var j = 0; j < acceptCollection.length; j++) {
                    inherit = acceptCollection[j];

                    // 获取所有传入的属性 之后check检查
                    inherit.x = !inherit.x ? shapeProperty.x: inherit.x;
                    inherit.y = !inherit.y ? shapeProperty.y: inherit.y;
                    inherit.index = !inherit.index ? shapeProperty.index: inherit.index;
                    inherit.thick = !inherit.thick ? shapeProperty.tick: inherit.thick;
                    inherit.borderColor = !inherit.borderColor ? shapeProperty.borderColor: inherit.borderColor;
                    inherit.x1 = !inherit.x1 ? shapeProperty.x1: inherit.x1;
                    inherit.y1 = !inherit.y1 ? shapeProperty.y1: inherit.y1;

                    this.iterator.x = inherit.x;
                    this.iterator.y = inherit.y;
                    this.iterator.index = inherit.index;
                    this.iterator.thick = inherit.thick;
                    this.iterator.x1 = inherit.x1;
                    this.iterator.y1 = inherit.y1;

                    this._strokeStyle();
                    this._fillStyle();
                    this._beggingToDo();
                    //设定图形边框的样式
                    this._lineWidth();
                    this._fillRect();
                    this._strokeRect();
                    this._stroke()
                }
            },
            particularProperty: function(options) {
                return this.collection[0].characteristic;
            },
            _fillStyle: function(options) {
                this.data[0].fillStyle = this.iterator.index;
            },
            _strokeStyle: function(options) {
                this.data[0].strokeStyle = this.iterator.borderColor;
            },
            _beggingToDo: function() {
                this.data[0].beginPath();
            },
            _fillRect: function(options) {
                this.data[0].fillRect(this.iterator.x, this.iterator.y, this.iterator.x1, this.iterator.y1);
            },
            _lineWidth: function(options) {
                this.data[0].lineWidth = this.iterator.thick;
            },
            _strokeRect: function(options) {
                this.data[0].strokeRect(this.iterator.x, this.iterator.y, this.iterator.x1, this.iterator.y1);
            },
            _clearRect: function(options) {
                this.data[0].clearRect(this.iterator.x, this.iterator.y, this.iterator.x1, this.iterator.y1);
            },
            _stroke: function() {
                this.data[0].stroke();
            },
            Excute2DEngine: function() {
                // accept ctx 2d property.
                var d2 = arguments[0],
                isConfig = arguments[1],
                domain = this.collection[0]['characteristic'];

                if (isConfig) {
                    domain.type = isConfig['type'];

                    // 获得整数的数组配置 this.collection[0]['characteristic'].property = [0:{},1:{}...]
                    var originalProperty = domain.property;

                    for (var j = 0,
                    getParams = isConfig['property']; j < getParams.length; j++) {
                        Object.assign(domain.property[j], getParams[j]);
                    }
                }

                Object.assign(this.collection[0]['characteristic'], domain);
                this.data.push(d2);
                this.draw(this.data[0])
            }
        });
        Object.defineProperties(o[1][296].prototype, {
            config: {
                get: function() {
                    var that = this;
                    var collection = this.collection;

                    return {
                        set: new o[1][296]()
                    }
                },
                set: function(value) {
                    return value
                }
            },
            pos: {
                get: function() {
                    return this.position
                },
                set: function(value) {
                    if (value) this.position = value
                    return value
                }
            }
        });

        // wave shape
        q[1][295].prototype.constructor = o[1][295];
        o[1][295] = q[1][295];
        Object.assign(o[1][295].prototype, {
            initialize: function() {
                return this,
                o[1][295].call(this, arguments),
                o[1][295].prototype
            },
            draw: function(options) {
                var getCollectionProperty = this.particularProperty();

                // 获得默认的属性和参数
                // Algorithm
                // SPEED_3
                var shapeProperty = new o[1][300];
                var _createWave = shapeProperty.calculationProperty.createWave;

                this.iterator.dynamic = {};

                var acceptCollection, inherit;
                // the params in the early 
                if (getCollectionProperty.type === 'Array') acceptCollection = getCollectionProperty.property;

                // if loop.
                if(this.o_OPEN){
                    shapeProperty.speed -= this.s_SPEED;

                    this._fillStyle("rgb(255,255,255)");
                    this._fillRect('0', '0', this.data[0].canvas.width, this.data[0].canvas.height);
                }

                for (var j = 0; j < acceptCollection.length; j++) {

                    inherit = acceptCollection[j];

                    // 获取所有传入的属性 之后check检查
                    inherit.x = !inherit.x ? shapeProperty.x: inherit.x;
                    inherit.y = !inherit.y ? shapeProperty.y: inherit.y;
                    inherit.rate = !inherit.rate ? shapeProperty.rate: inherit.rate;
                    inherit.index = !inherit.index ? shapeProperty.index: inherit.index;
                    inherit.speed = !inherit.speed ? shapeProperty.speed - this.s_SPEED: inherit.speed - this.s_SPEED;
                    inherit.slope = !inherit.slope ? shapeProperty.slope: inherit.slope;
                    inherit.opposite = !inherit.opposite ? shapeProperty.opposite: inherit.opposite;
                    inherit.sensitivity = !inherit.sensitivity ? shapeProperty.sensitivity: inherit.sensitivity;
                    inherit.readyPosition = !inherit.readyPosition ? shapeProperty.readyPosition: inherit.readyPosition;
                    inherit.beginPosition = !inherit.beginPosition ? shapeProperty.beginPosition: inherit.beginPosition;
                    inherit.endPosition = !inherit.endPosition ? shapeProperty.endPosition: inherit.endPosition;

                    this.iterator.index = inherit.index;
                    this.iterator.readyPosition = inherit.readyPosition;
                    this.iterator.beginPosition = inherit.beginPosition;
                    this.iterator.endPosition = inherit.endPosition;

                    // 准备x位置 readyPosition = i
                    // 起始x位置 beginPosition = i
                    // 结束x位置 endPosition = len
                    // 水平运动长度 len = 10
                    var beginDistance_x = this.iterator.beginPosition.x;
                    var endDistance_x = this.iterator.endPosition.x;
                    this._beggingToDo();

                    for (var i = beginDistance_x; i < endDistance_x; i++) {
                        // 传入参数进行计算pos 位移的动态x y位置
                        this.getDynamicData(_createWave, inherit.x, inherit.y, inherit.sensitivity, inherit.rate, inherit.speed, i, inherit.opposite, inherit.slope);

                        this._lineTo({
                            x: this.iterator.dynamic.x,
                            y: this.iterator.dynamic.y
                        });
                    }
                    this._fillStyle();
                    this._strokeStyle();
                    this._stroke()
                }
            },
            /*
				example color array and pos
			*/
            particularProperty: function(options) {
                return this.collection[0].characteristic;
            },
            _beggingToDo: function(options) {
                this.data[0].beginPath();
            },
            _moveTo: function(options) {
                this.data[0].moveTo(this.iterator.x, this.iterator.y);
            },
            /*
				excuting the arc events 
			*/
            _lineTo: function(options) {
                // 从0 到总width宽度的实际长度
                this.data[0].lineTo(options.x, options.y);
                // this.data[0].lineTo(x, y2);
            },
            /*
				setting color properties
			*/
            _strokeStyle: function(options) {
                this.data[0].strokeStyle = this.iterator.index;
            },
            _fillStyle: function(options) {
                this.data[0].fillStyle = options || this.iterator.index;
            },
            _fillRect: function(a, b, c, d) {
                this.data[0].fillRect(a||this.iterator.x, b||this.iterator.y, c||this.iterator.x1, d||this.iterator.y1);
            },
            _stroke: function() {
                this.data[0].stroke();
            },
            // 获得动态属性
            getDynamicData: function(_createWave, _a, _b, _c, _d, _e, _f, _g, _l) {
                var collection = {};
                var waveModule = _createWave(_a, _b, _c, _d, _e, _f, _g, _l);

                collection = {
                    'x': waveModule.x,
                    'y': waveModule.y
                };

                this.iterator.dynamic = collection;

                // especially of base property
                Object.assign(this.iterator.dynamic, waveModule);
            },
            Excute2DEngine: function() {
                // accept ctx 2d property.
                var d2 = arguments[0],
                isConfig = arguments[1],
                auto = arguments[2],
                domain = this.collection[0]['characteristic'];

                if (isConfig) {
                    domain.type = isConfig['type'];

                    // 获得整数的数组配置 this.collection[0]['characteristic'].property = [0:{},1:{}...]
                    var originalProperty = domain.property;

                    for (var j = 0,
                    getParams = isConfig['property']; j < getParams.length; j++) {
                        Object.assign(domain.property[j], getParams[j]);
                    }
                }
                // 可执行 true 循环运动
                // start config info
                // open the ani of return true
                this.o_OPEN = auto.open;
                if( this.o_OPEN ) this.s_SPEED = auto.speed;

                Object.assign(this.collection[0]['characteristic'], domain);
                this.data.push(d2);
                this.draw(this.data[0])
            }
        });
        Object.defineProperties(o[1][295].prototype, {
            config: {
                get: function() {
                    var that = this;
                    var collection = this.collection;

                    return {
                        set: new o[1][295]()
                    }
                },
                set: function(value) {
                    return value
                }
            },
            pos: {
                get: function() {
                    return this.position
                },
                set: function(value) {
                    if (value) this.position = value
                    return value
                }
            },
            RATE: {
                get: function() {
                    return this.rate
                },
                set: function(value) {
                    if (value) this.rate = value
                    return value
                }
            },
            SENSITIVITY: {
                get: function() {
                    return this.sensitivity
                },
                set: function(value) {
                    if (value) this.sensitivity = value
                    return value
                }
            },
            SPEED: {
                get: function() {
                    return this.speed
                },
                set: function(value) {
                    if (value) this.speed = value
                    return value
                }
            },
        });

        // sectors shape
        q[1][294].prototype.constructor = o[1][294];
        o[1][294] = q[1][294];
        Object.assign(o[1][294].prototype, {
            initialize: function() {
                return this,
                o[1][293].call(this, arguments),
                o[1][293].prototype
            },
            draw: function(options) {

                var getCollectionProperty = this.particularProperty();

                // 获得默认的属性和参数
                var shapeProperty = new o[1][300];

                var acceptCollection, inherit;
                if (getCollectionProperty.type === 'Array') acceptCollection = getCollectionProperty.property;

                for (var j = 0; j < acceptCollection.length; j++) {

                    inherit = acceptCollection[j];

                    // 获取所有传入的属性 之后check检查
                    inherit.radius = !inherit.radius ? shapeProperty.radius: inherit.radius;
                    inherit.x = !inherit.x ? shapeProperty.x: inherit.x;
                    inherit.y = !inherit.y ? shapeProperty.y: inherit.y;
                    inherit.x1 = !inherit.x1 ? shapeProperty.x1: inherit.x1;
                    inherit.y1 = !inherit.y1 ? shapeProperty.y1: inherit.y1;
                    inherit.index = !inherit.index ? shapeProperty.index: inherit.index;
                    inherit.startAngles = !inherit.startAngles ? shapeProperty.startAngles: inherit.startAngles;
                    inherit.stopAngles = !inherit.stopAngles ? shapeProperty.stopAngles: inherit.stopAngles;

                    this.iterator.radius = inherit.radius;
                    this.iterator.x = inherit.x;
                    this.iterator.y = inherit.y;
                    this.iterator.x1 = inherit.x1;
                    this.iterator.y1 = inherit.y1;
                    this.iterator.index = inherit.index;
                    this.iterator.startAngles = inherit.startAngles;
                    this.iterator.stopAngles = inherit.stopAngles;

                    this._beggingToDo();
                    this._moveTo();
                    this._drawGraphicsArc();
                    this._fillStyle();
                    this._strokeStyle();
                    this._fill();
                    this._lineTo();
                    this._closePath();
                    this._stroke()
                }
            },
            particularProperty: function(options) {
                return this.collection[0].characteristic;
            },
            _strokeStyle: function(options) {
                this.data[0].strokeStyle = this.iterator.index;
            },
            _beggingToDo: function() {
                this.data[0].beginPath();
            },
            _moveTo: function(options) {
                // console.log(options.x1+'=options.x1,'+options.y1)
                this.data[0].moveTo(this.iterator.x1, this.iterator.y1);
            },
            _drawGraphicsArc: function(options) {
                this.data[0].arc(this.iterator.x, this.iterator.y, this.iterator.radius, this.iterator.startAngles, this.iterator.stopAngles, false);
            },
            _lineTo: function(options) {
                this.data[0].lineTo(this.iterator.x1, this.iterator.y1);
            },
            _fillStyle: function(options) {
                this.data[0].fillStyle = this.iterator.index;
            },
            _closePath: function() {
                this.data[0].closePath();
            },
            _fill: function() {
                this.data[0].fill();
            },
            _stroke: function() {
                this.data[0].stroke();
            },
            Excute2DEngine: function() {
                // accept ctx 2d property.
                var d2 = arguments[0],
                isConfig = arguments[1],
                domain = this.collection[0]['characteristic'];

                if (isConfig) {
                    domain.type = isConfig['type'];

                    // 获得整数的数组配置 this.collection[0]['characteristic'].property = [0:{},1:{}...]
                    var originalProperty = domain.property;

                    for (var j = 0,
                    getParams = isConfig['property']; j < getParams.length; j++) {
                        Object.assign(domain.property[j], getParams[j]);
                    }
                }

                Object.assign(this.collection[0]['characteristic'], domain);
                this.data.push(d2);
                this.draw(this.data[0])
            }
        });
        Object.defineProperties(o[1][294].prototype, {
            config: {
                get: function() {
                    var that = this;
                    var collection = this.collection;

                    return {
                        set: new o[1][294]()
                    }
                },
                set: function(value) {
                    return value
                }
            },
            pos: {
                get: function() {
                    return this.position
                },
                set: function(value) {
                    if (value) this.position = value
                    return value
                }
            }
        });

        // hat shape
        q[1][293].prototype.constructor = o[1][293];
        o[1][293] = q[1][293];
        Object.assign(o[1][293].prototype, {
            initialize: function() {
                return this,
                o[1][293].call(this, arguments),
                o[1][293].prototype
            },
            draw: function(options) {

                var getCollectionProperty = this.particularProperty();

                // 获得默认的属性和参数
                var shapeProperty = new o[1][300];

                var acceptCollection, inherit;
                if (getCollectionProperty.type === 'Array') acceptCollection = getCollectionProperty.property;

                for (var j = 0; j < acceptCollection.length; j++) {

                    inherit = acceptCollection[j];

                    // 获取所有传入的属性 之后check检查是否存在数据
                    inherit.radius = !inherit.radius ? shapeProperty.radius: inherit.radius;
                    inherit.x = !inherit.x ? shapeProperty.x: inherit.x;
                    inherit.y = !inherit.y ? shapeProperty.y: inherit.y;
                    inherit.x1 = !inherit.x1 ? shapeProperty.x1: inherit.x1;
                    inherit.y1 = !inherit.y1 ? shapeProperty.y1: inherit.y1;
                    inherit.index = !inherit.index ? shapeProperty.index: inherit.index;
                    inherit.startAngles = !inherit.startAngles ? shapeProperty.startAngles: inherit.startAngles;
                    inherit.stopAngles = !inherit.stopAngles ? shapeProperty.stopAngles: inherit.stopAngles;

                    this.iterator.radius = inherit.radius;
                    this.iterator.x = inherit.x;
                    this.iterator.y = inherit.y;
                    this.iterator.x1 = inherit.x1;
                    this.iterator.y1 = inherit.y1;
                    this.iterator.index = inherit.index;
                    this.iterator.startAngles = inherit.startAngles;
                    this.iterator.stopAngles = inherit.stopAngles;

                    this._moveTo();
                    this._beggingToDo();
                    this._drawGraphicsArc();
                    this._fillStyle();
                    this._strokeStyle();
                    this._fill();
                    this._lineTo();
                    this._closePath();
                    this._stroke()
                }
            },
            particularProperty: function(options) {
                return this.collection[0].characteristic;
            },
            _strokeStyle: function(options) {
                this.data[0].strokeStyle = this.iterator.index;
            },
            _beggingToDo: function() {
                this.data[0].beginPath();
            },
            _moveTo: function(options) {
                this.data[0].moveTo(this.iterator.x, this.iterator.y);
            },
            _drawGraphicsArc: function(options) {
                this.data[0].arc(this.iterator.x, this.iterator.y, this.iterator.radius, this.iterator.startAngles, this.iterator.stopAngles, false);
            },
            _lineTo: function(options) {
                this.data[0].lineTo(this.iterator.x1, this.iterator.y1);
                // console.log(this.iterator.x1 + ',' + this.iterator.y1);
            },
            _fillStyle: function(options) {
                this.data[0].fillStyle = this.iterator.index;
            },
            _closePath: function() {
                this.data[0].closePath();
            },
            _fill: function() {
                this.data[0].fill();
            },
            _stroke: function() {
                this.data[0].stroke();
            },
            Excute2DEngine: function() {
                // accept ctx 2d property.
                var d2 = arguments[0],
                isConfig = arguments[1],
                domain = this.collection[0]['characteristic'];

                if (isConfig) {
                    domain.type = isConfig['type'];

                    // 获得整数的数组配置 this.collection[0]['characteristic'].property = [0:{},1:{}...]
                    var originalProperty = domain.property;

                    for (var j = 0,
                    getParams = isConfig['property']; j < getParams.length; j++) {
                        Object.assign(domain.property[j], getParams[j]);
                    }
                }

                Object.assign(this.collection[0]['characteristic'], domain);
                this.data.push(d2);
                this.draw(this.data[0])
            }
        });
        Object.defineProperties(o[1][293].prototype, {
            config: {
                get: function() {
                    var that = this;
                    var collection = this.collection;

                    return {
                        set: new o[1][293]()
                    }
                },
                set: function(value) {
                    return value
                }
            },
            pos: {
                get: function() {
                    return this.position
                },
                set: function(value) {
                    if (value) this.position = value
                    return value
                }
            }
        });


        /*
          - 方向使用指针Arrow函数获取
        */
        q[1][292].prototype.constructor = o[1][292];
        o[1][292] = q[1][292];
        Object.assign(o[1][292].prototype, {
            initialize: function() {
                return this,
                o[1][292].call(this, arguments),
                o[1][292].prototype
            },
            draw: function(options) {
                var getCollectionProperty = this.particularProperty(true);
                // 获得默认的属性和参数
                var shapeProperty = new o[1][300];
                var _createHill = shapeProperty.calculationProperty.createHill;
                
                // if loop.
                if(this.o_OPEN){
                    this.data[0].fillStyle = "rgb(255,255,255)";
                    this.data[0].fillRect(0, 0, this.data[0].canvas.width, this.data[0].canvas.height);
                }

                this.iterator.static = {};

                var acceptCollection, inherit;
                if (getCollectionProperty.type === 'Array') acceptCollection = getCollectionProperty.property;
                for (var j = 0; j < acceptCollection.length; j++) {
                    // 获取所有传入的属性 之后check检查
                    inherit = acceptCollection[j];
                    inherit.x = !inherit.x ? shapeProperty.x: inherit.x;
                    inherit.y = !inherit.y ? shapeProperty.y: inherit.y;
                    inherit.index = !inherit.index ? shapeProperty.index: inherit.index;
                    inherit.speed = !inherit.speed ? shapeProperty.speed: inherit.speed;
                    inherit.trails = !inherit.trails ? shapeProperty.trails: inherit.trails;
                    inherit.startAngles = !inherit.startAngles ? shapeProperty.startAngles: inherit.startAngles;
                    inherit.stopAngles = !inherit.stopAngles ? shapeProperty.stopAngles: inherit.stopAngles;
                    inherit.direction = !inherit.direction ? shapeProperty.direction: inherit.direction;
                    inherit.smooth = !inherit.smooth ? shapeProperty.smooth: inherit.smooth;

                    this.iterator.x = inherit.x;
                    this.iterator.y = inherit.y;
                    this.iterator.speed = inherit.speed;
                    this.iterator.trails = inherit.trails;
                    this.iterator.index = inherit.index;
                    this.iterator.radius = this.radius;
                    this.iterator.startAngles = inherit.startAngles;
                    this.iterator.stopAngles = inherit.stopAngles * 4; // 默认2 pi
                    this.iterator.direction = inherit.direction;
                    this.iterator.smooth = inherit.smooth;

                    this._moveTo();
                    this._beggingToDo();
                    this.silence(_createHill);
                    this._closePath();
                    this._scene2DFillStyles();
                    this._scene2DFill()
                }
            },

            /*
              example color array and pos
            */
            particularProperty: function(options) {
                if (options) return this.collection[0].characteristic;
            },
            _beggingToDo: function(options) {
                this.data[0].beginPath();
            },
            _closePath : function (){
                this.data[0].closePath();
            },
            _moveTo: function(options) {
                this.data[0].moveTo(this.iterator.x, this.iterator.y);
            },
            // excuting the arc events 
            _drawGraphicsArc: function(x,y) {
                this.data[0].arc(x, y, this.iterator.radius, this.iterator.startAngles, this.iterator.stopAngles);
            },
            // setting color properties
            _scene2DFillStyles: function(options) {
                this.data[0].fillStyle = options || this.iterator.index;
            },
            _scene2DFill: function() {
                this.data[0].fill();
            },
            _fillRect : function (options){
                this.data[0].fillRect(0, 0, this.data[0].canvas.width, this.data[0].canvas.height);
            },
            // 获得静态属性
            silence : function (options){
                this.getArrowData(options, this.iterator.x, this.iterator.y);
                for(var d = this.iterator.static.group,k = this.iterator.static.length, i = 0; i < k; i++){
                    var x = d[i][0] * this.iterator.trails + this.iterator.x, 
                        y = d[i][1] * this.iterator.trails + this.iterator.y;
                    this._drawGraphicsArc(x,y);
                }
            },
            // 获得static属性 即获得指针数据
            // 因静态数据是根据指针变化
            getArrowData: function(_createHill, _a, _b) {
                var outModelObj,getModel,hillModule,item;

                outModelObj = this.matchModel(this.iterator.direction);

                getModel = outModelObj.isBool ? outModelObj.is : !1;

                // 如果不存在类型 返回false
                try{
                    if(!getModel){
                        console.log("You cannot call with the correct model type.")
                        return false;
                    }
                }
                catch(err){ 
                    throw err
                }

                // 根据指定hill山的动画模型获得位移数据
                hillModule = _createHill(_a, _b, this.iterator.smooth);

                item = hillModule[getModel];

                this.iterator.static.group = item;
                this.iterator.static.length = item.length;
                // especially of base property
            },
            matchModel : function (options){
                // 匹配模型的类型
                var save_direction = this._direction;
                var isMatch = 0;
                for(var s = 0, m = save_direction.length; s < m; s++ ){
                    if(options === save_direction[s]) isMatch++;
                    if(isMatch) break;
                    else continue;
                }
                return {
                    is : options,
                    isBool : isMatch
                }
            },
            Excute2DEngine: function() {
                // accept ctx 2d property.
                var d2 = arguments[0],
                isConfig = arguments[1],
                auto = arguments[2],
                domain = this.collection[0]['characteristic'];

                if (isConfig) {
                    domain.type = isConfig['type'];

                    // 获得整数的数组配置 this.collection[0]['characteristic'].property = [0:{},1:{}...]
                    var originalProperty = domain.property;

                    for (var j = 0,
                    getParams = isConfig['property']; j < getParams.length; j++) {
                        Object.assign(domain.property[j], getParams[j]);
                    }
                }

                // 可执行 true 循环运动
                // start config info
                // open the ani of return true
                if(auto.open) this.o_OPEN = auto.open;

                Object.assign(this.collection[0]['characteristic'], domain);
                this.data.push(d2);
                this.draw(this.data[0])
            }
        });
        /*
            重新写入配置信息
            通过 return set : { restore config info }
        */
        Object.defineProperties(o[1][292].prototype, {
            config: {
                get: function() {
                    var that = this;
                    var collection = this.collection;

                    return {
                        set: new o[1][292]()
                    }
                },
                set: function(value) {
                    return value
                }
            }
        });

        /*
			options,count,a
			x,y,inherit.sensitivity, inherit.rate, inherit.speed, i, inherit.opposite
			a = x
			b = y
			c = sensitivity
			d = rate
			e = speed
			f = i <== transform x
			g = opposite
		*/
        q[1][240].prototype.constructor = o[1][240];
        o[1][240] = q[1][240];
        o[1][240].createWave = function(a, b, c, d, e, f, g, l) {
            var x, y, h, k, o, p, r, s, q, m, n, hx4, hy4, t = [];

            // default position
            x = f;

            // 1/4 of the width and height
            hx4 = Math.abs(f - a);
            hy4 = Math.abs(f - b);

            n = Math.pow(l, hy4);
            m = hx4;

            q = Math.pow(n, m);
            o = q * b / d; // the rate on the pos.y = height
            p = Math.PI / 180 * f * c;
            s = e;

            r = Math.cos(p + s);

            y = b + o * r * g;
            t.push(x, y);

            this.base = !0;

            return {
                x: x,
                y: y,
                base: this.base,
                rate: d,
                speed: s
            }
        }
        Object.assign(o[1][240].prototype, {
            initialize: function() {
                return this,
                o[1][240].call(this, arguments),
                o[1][240].prototype
            }
        });


        /*
          x,y,
          aa = x
          bb = y
        */
        q[1][239].prototype.constructor = o[1][239];
        o[1][239] = q[1][239];
        o[1][239].createCircle = function(aa, bb) {
            var chain_round,chain_auto,chain_top,chain_left,chain_right,chain_bottom,chain_random,times,circle_modelType_chain;
            
            times = (new Date).getTime() / 60;
            circle_modelType_chain = new o[1][239]();

            chain_round =  circle_modelType_chain._location_round(aa, bb, times);

            return {
                'round' : chain_round.results,
            }
        }
        Object.assign(o[1][239].prototype, {
            initialize: function() {
                return this,
                o[1][239].call(this, arguments),
                o[1][239].prototype
            },
            _location_round: function (aa,bb,times){
                var a, b, c, d, e, x, y, xx, yy,r, m, n;
                var geths;

                a = times / 88;
                yy = bb;
                xx = yy * Math.sin(Math.PI / 3);

                for (d = 0; d < 2; d++) {
                    r = Math.PI * 2 / 3 * d;
                    m = Math.cos(r);
                    n = Math.sin(r);
                    for (b = 0; b < 2; b++) {
                        c = 1;
                        if (b % 2 == 1) c = 1/2;
                        x = (b * m) * xx + times * 2;
                        y =  yy + (a + c) * n;
                        geths = this._destroy(x, y, xx, yy, times);
                    }
                }

                return geths
            },
            _destroy: function (x, y, xx, yy, times) {
                        var a, b, c, d, e, z, f1,f2,f3,f4, x0, y0, g, g1, g2, m1, m2, rx, ry, r1, r2;
                        g = g2 = [];
                        g1 = [];
                        f1 = [x, y];
                        f2 = [x + xx / 2, y + yy / 4];
                        f3 = [x, y + yy / 2];
                        f4 = [x - xx / 2, y + yy / 4];
                        g = [f1,f2,f3,f4];

                        len = 4;
                        for (a = 0; a < 4; a++) {
                            c = g[a];
                            d = g[(a + 1) % 4];
                            for (b = 0; b < len; b++) {
                                r1 = b / len;
                                r2 = 1 - r1;
                                x0 = c[0] * r2 + d[0] * r1;
                                y0 = c[1] * r2 + d[1] * r1;
                                g1.push([x0, y0]);
                            }
                        }

                        for (g = g1,a = 0; a < g.length; a++) {
                            x0 = g[a][0];
                            y0 = g[a][1];
                            rx = (x0 / xx / 20) * Math.PI * 2;
                            ry = (y0 / yy / 20) * Math.PI * 2 + times / 24;

                            m1 = Math.cos(rx);
                            m2 = Math.sin(rx);

                            z = Math.cos(ry) / 2 + 1;
                            y = Math.sin(ry) / 2;

                            x = z * m2;
                            y= z * x;

                            z = z * m1;
                            g2.push([x, y, z]);
                        }

                        return {
                            results: g2
                        };
                }
        });

        /*
          x,y,
          aa = x
          bb = y
          - 如果是半个周期的
          - 模型是static形式的位置
          - draw调用的输出的results还是和动态的写法类似
          - 和动态的唯一不同点
          - 一静态是location_后面的参数名称不一样
          - 二动态的需要start方法调用改变的运动motion类型type
        */
        q[1][232].prototype.constructor = o[1][232];
        o[1][232] = q[1][232];
        o[1][232].createHill = function(aa, bb, _smooth) {
            var chain_auto,chain_top,chain_left,chain_right,chain_bottom,times,hill_modelType_chain;
            
            times = (new Date).getTime() / 60;
            hill_modelType_chain = new o[1][232]();

            chain_top =  hill_modelType_chain._location_staticn_top(aa, bb, _smooth);
            chain_left =  hill_modelType_chain._location_static_left(aa, bb, _smooth);
            chain_right =  hill_modelType_chain._location_static_right(aa, bb, _smooth);
            chain_bottom =  hill_modelType_chain._location_static_bottom(aa, bb, _smooth);

            return {
                top : chain_top.results,
                left : chain_left.results,
                right : chain_right.results,
                bottom : chain_bottom.results,
            }
        }
        Object.assign(o[1][232].prototype, {
            initialize: function() {
                return this,
                o[1][232].call(this, arguments),
                o[1][232].prototype
            },
            /*
                取整的函数方法
            */
            takeInteger: function (min,max){
                var pointNums,smoothness,o,m,n;
                o = 1;
                m = max;
                n = min;
                pointNums = Math.abs(m) + o;
                smoothness = Math.floor((m) + (n - o));
                ( (smoothness >= m) ? (pointNums = smoothness % m)?
                ( pointNums >= (m - min) ) ? (pointNums = smoothness):
                ( pointNums = m ) : (pointNums = smoothness) : (pointNums = smoothness) );

                return pointNums
            },
            /*
              - 总共的点为pointNums 
              - 每一个点的度数为angleNums
              - 角度的90度为1 
              - 所以pointNums一半的数乘以度数要为90
              - 也就是说p/2的点乘多少度的数等于90(且排除2与4的点) 
              - 由最大的点数为180 最小的点数为6
              - 弧度边小 那么点就会多一点 意味着平滑一点
              - 弧度越大 点的数量少 越陡峭
            */
            _location_staticn_top : function (aa ,bb, point){
                // 使用平滑度计算坡平面的光滑程度(平滑度从0开始结束为180)
                // 假设平滑度等于点数的数量
                var getSmoothness,angles,points,two,midPointerHalf;

                getSmoothness = this.takeInteger(6,point);
                points = getSmoothness; 
                two = 2;
                midPointerHalf = points / two;// 取中间的点
                angles = 90 / midPointerHalf; // 获得一个点的度数

                for(var radian,radianValues,x,y,a = [],i = 0; i < points; i++){
                    radian = i * angles * Math.PI / 180;

                    radianValues = Math.cos(radian);

                    // 根据纵坐标的位移实现几何图形 余弦
                    y = Math.pow(radianValues*two,two);
                    x = i;
                    a.push([x,y]);
                }

                return {
                    results : a
                }
            },
            _location_static_left : function (aa ,bb, point){
                var getSmoothness,angles,points,two,midPointerHalf;

                getSmoothness = this.takeInteger(6,point);
                points = getSmoothness; 
                two = 2;
                midPointerHalf = points / two;// 取中间的点
                angles = 90 / midPointerHalf; // 获得一个点的度数

                for(var radian,radianValues,x,y,a = [],i = 0; i < points; i++){
                    radian = i * angles * Math.PI / 180;
                    radianValues = Math.cos(radian);

                    // 根据纵坐标的位移实现几何图形 余弦
                    x = Math.pow(radianValues*two,two);
                    y = i;
                    a.push([x,y]);
                }

                return {
                    results : a
                }
            },
            _location_static_right : function (aa ,bb, point){
                var getSmoothness,angles,points,two,midPointerHalf;

                getSmoothness = this.takeInteger(6,point);
                points = getSmoothness; 
                two = 2;
                midPointerHalf = points / two;// 取中间的点
                angles = 90 / midPointerHalf; // 获得一个点的度数

                for(var radian,radianValues,x,y,a = [],i = 0; i < points; i++){
                    radian = i * angles * Math.PI / 180;
                    radianValues = Math.sin(radian);

                    // 根据纵坐标的位移实现几何图形 余弦
                    x = Math.pow(radianValues*two,two);
                    y = i;
                    a.push([x,y]);
                }

                return {
                    results : a
                }
            },
            _location_static_bottom : function (aa ,bb, point){
                var getSmoothness,angles,points,two,midPointerHalf;

                getSmoothness = this.takeInteger(6,point);
                points = getSmoothness; 
                two = 2;
                midPointerHalf = points / two;// 取中间的点
                angles = 90 / midPointerHalf; // 获得一个点的度数

                for(var radian,radianValues,x,y,a = [],i = 0; i < points; i++){
                    radian = i * angles * Math.PI / 180;
                    radianValues = Math.sin(radian);
                    // 根据纵坐标的位移实现几何图形 余弦
                    // 使用的是n的平方根
                    y = Math.pow(radianValues*two,two);
                    x = i;
                    a.push([x,y]);
                }

                return {
                    results : a
                }
            },
        });


        q[1][198].prototype.constructor = o[1][198];
        o[1][198] = q[1][198];
        Object.defineProperties(o[1][198].prototype, {
            get: function() {
                return 2
            },
            set: function(value) {
                return value
            }
        });
        Object.assign(o[1][198].prototype, {
            initialize: function() {
                return this,
                o[1][198].call(this, arguments),
                o[1][198].prototype
            },
        });

        q[1][499].prototype.constructor = o[1][499];
        o[1][499] = q[1][499];
        Object.assign(o[1][499].prototype, {
            initialize: function() {
                return this,
                As.call(this, arguments),
                new As(arguments[0])
            },
            attr: function(attr) {
                // 查看是否具有属性
                // 如果存在就会保存且重置值
                // this.data[0][attr]
                // 否则不存在就会保存 手动设置
                // console.log(attr in this.data[0])
                try {
                    if (attr in this.data[0]) return this.data.unshift(attr),
                    this;
                    else return void this
                } catch(e) {
                    throw e
                }
            },
            val: function(value) {
                // 从第一个取出数据 并删除
                var data = this.data;
                var getShift = data.shift();

                // 重写属性值
                if (typeof value === 'string') data[0][getShift] = value;
                else return data[0][getShift];

                return this
            }
        });

        q[1][999].prototype.constructor = o[1][999];
        o[1][999] = q[1][999];
        Object.assign(o[1][999].prototype, {
            initialize: function() {
                return this,
                Af.call(this, arguments[0]),
                Af.prototype
            }
        });
        Object.defineProperties(o[1][999].prototype, {
            get: function() {
                return this.isFreezeProperties
            },
            set: function(value) {
                if (value) this.isFreezeProperties = value;

                return this.isFreezeProperties
            }
        });

        // s3.plugin 接收插件名|插件方法
        q[1][1000].prototype.constructor = o[1][1000];
        o[1][1000] = q[1][1000];
        Object.defineProperties(o[1][1000].prototype, {
            get: function() {
                return 2
            },
            set: function(value) {
                return value
            }
        });
        Object.assign(o[1][1000].prototype, {
            initialize: function() {
                return this,
                o[1][1000].call(this, arguments),
                o[1][1000].prototype
            },
            sets:function (){}
        });

        // 此处为重写2d属性的值 
        // reject实现注入的方法
        // var d = app.define2DAttr(scene);
        q[1][1099].prototype.constructor = o[1][1099];
        o[1][1099] = q[1][1099];
        Object.defineProperties(o[1][1099].prototype, {
            get: function() {
                return 2
            },
            set: function(value) {
                return value
            }
        });
        Object.assign(o[1][1099].prototype, {
            initialize: function() {
                return this,
                o[1][1099].call(this, arguments),
                o[1][1099].prototype
            },
        });

        q[1][1111].prototype.constructor = o[1][1111];
        o[1][1111] = q[1][1111];
        Object.defineProperties(o[1][1111].prototype, {
            get: function() {
                return 2
            },
            set: function(value) {
                return value
            }
        });
        Object.assign(o[1][1111].prototype, {
            initialize: function() {
                return this,
                o[1][1111].call(this, arguments),
                o[1][1111].prototype
            },
        });

        q[1][1299].prototype.constructor = o[1][1299];
        o[1][1299] = q[1][1299];
        Object.assign(o[1][1299].prototype, {
            initialize: function() {
                return this,
                o[1][1299].call(this, arguments),
                o[1][1299].prototype
            },

        });
        Object.defineProperties(o[1][1299].prototype, {
            get: function() {
                return 2
            },
            set: function(value) {
                return value
            }
        });

        /*
			* create a class.
			* call subclasses and prototype attributes to parent element.
			* implemention invoking anonymous function of properties.
			* there	are	invoking extends subclasses.
			* fn(first params ,second params )
			* params first = this.prototype.first
			* params second = second.prototype
		*/
        Shape.plugin.create('tool', o[1][99]);
        Shape.plugin.create('circleShape', o[1][299]);
        Shape.plugin.create('lineShape', o[1][298]);
        Shape.plugin.create('arcShape', o[1][297]);
        Shape.plugin.create('rectShape', o[1][296]);
        Shape.plugin.create('waveShape', o[1][295]);
        Shape.plugin.create('sectorsShape', o[1][294]);
        Shape.plugin.create('hatShape', o[1][293]);
        Shape.plugin.create('hillShape', o[1][292]);
        Shape.plugin.create('set', o[1][499]);
        Shape.plugin.create('freezeProperty', o[1][999]);
        Shape.plugin.create('plugin', o[1][1000]);
        Shape.plugin.create('cache', o[1][1111]);
        Shape.plugin.create('cover2DProperty', o[1][1099]);
        Shape.plugin.create('render', o[1][1299]);

        var _build = new s3();
        /*simply api*/
        _s3.version = _build.version;
        _s3.dom = _build.dom;
        _s3.append = _build.append;
        _s3.text = _build.text;
        _s3.blank = _build.blank;
        _s3.isStr = _build.isStr;
        _s3.isObj = _build.isObj;
        _s3.isFun = _build.isFun;
        _s3.isNum = _build.isNum;
        _s3.isArr = _build.isArr;
        _s3.trim = _build.trim;
        _s3.extend = _build.extend;
        _s3.indexof = _build.indexof;
        _s3.debug = _build.debug;
        /*multi*/
        _s3.Shape = _build.Shape;

    });
})(typeof window !== 'undefined' ? this: global);