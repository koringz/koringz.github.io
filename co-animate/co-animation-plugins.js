/*
 * author: koringz
 * descri: create animate api
 * version: v1.0.0
 * website: koringz.github.io/co-animate/
 */
(function(foctory) {
    ! function(factory) {
        if(typeof require === "function" && typeof exports === "object" && typeof module === "object") {
            var target = module["exports"] || exports;
            factory(target);
        } else if(typeof define === "function" && define["amd"]) {
            define(["exports"], factory);
        } else {
            factory(window["cote"] = {});
        }
    }(function(exports) {
        var _cote = typeof exports !== "undefined" ? exports : {};
        // statci methods
        var animatiomApi = [
            'bounce','flash','pulse','rubberBand','shake', 'headShake','bounceOutLeft',
            'swing', 'tada', 'wobble', 'jello', 'bounceIn', 'bounceInDown','fadeInDownBig', 
            'bounceInLeft', 'bounceInRight', 'bounceInUp', 'bounceOut', 'bounceOutDown', 
            'bounceOutRight', 'bounceOutUp', 'fadeIn', 'fadeInDown', 'rotateInUpLeft',
            'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 
            'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 
            'fadeOutUp', 'fadeOutUpBig', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY','fadeInLeft',
            'lightSpeedIn', 'lightSpeedOut', 'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 
            'rotateInUpRight',  'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'zoomOutLeft',
            'hinge', 'jackInTheBox', 'rollIn', 'rollOut', 'zoomIn', 'zoomInDown','rotateOutUpRight',
            'zoomInLeft', 'zoomInRight', 'zoomInUp', 'zoomOut', 'zoomOutDown', 'rotateOutUpLeft', 
            'zoomOutRight', 'zoomOutUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'slideInUp',
            'slideOutDown', 'slideOutLeft', 'slideOutRight', 'fadeOutRightBig','fadeOut','slideOutUp'
        ];
        var supportBrowserAnimationEventOfName_start = {
            excuteAnimation: "animationstart",
            OAnimation: "oAnimationStart",
            MozAnimation: "animationstart",
            WebkitAnimation: "webkitAnimationStart",
            MSAnimation: "MSAnimationStart"
        };
        var supportBrowserAnimationEventOfName_end = {
            excuteAnimation: "animationend",
            OAnimation: "oAnimationEnd",
            MozAnimation: "animationend",
            WebkitAnimation: "webkitAnimationEnd",
            MSAnimation: "MSAnimationEnd"
        };
        // validate style exist
        var validateBrowserCompatiblityAnimationEvent = function(el, eventObjectName) {
            for(var k in eventObjectName) {
                if(isExist(el.style[k])) {
                    return eventObjectName[k];
                }
            }
        };

        function addEventListener(el, type, fallback) {
            if(el.addEventListener) {
                el.addEventListener(type, fallback, false);
            } else if(el.attachEvent) {
                el.attachEvent("on" + type, fallback);
            }
        }

        function removeEventListener(el, type, callback) {
            if(el.removeEventListener) {
                el.removeEventListener(type, callback, false);
            } else {
                el.detachEvent("on" + type, callback);
            }
        }

        function isObj(options) {
            return isExist(options) && Object.prototype.toString.call(options) == "[object Object]";
        }
        // compatiblity
        function eachClassName(_splitArrItems, className) {
            var params = "";
            for(var len = _splitArrItems.length, kk = 0; kk < len; kk++) {
                // disabled changed the parameters of type. maybe there are HTML elements
                if(typeof _splitArrItems[kk] == "object") {
                    params += _splitArrItems[kk][className];
                }
            }
            return params;
        }

        function isFun(options) {
            return isExist(options) && typeof options == "function";
        }

        function assign(orignal, objectGroup) {
            if(isUndefined(objectGroup)) {
                return null;
            }
            if(isObj(objectGroup)) {
                for(var o in objectGroup) {
                    orignal[o] = objectGroup[o];
                }
                return orignal;
            }
        }

        function isUndefined(options) {
            return typeof options == "undefined";
        }

        function isExist(options) {
            return !isUndefined(options);
        }

        function isStr(options) {
            return isExist(options) && typeof options == "string";
        }
        // the first parameter is target node 
        // the second params is a string
        // after the second pointer all parameter are node elements 
        function classList(nowNodeList, params) {
            var argTransformToArray = [Array.prototype.slice.apply(arguments).slice(2)];
            if(isStr(params)) {
                if(nowNodeList.classList) {
                    nowNodeList.setAttribute("class", eachClassName(argTransformToArray[0], "classList") + params);
                } else if(nowNodeList.className) {
                    nowNodeList.setAttribute("class", eachClassName(argTransformToArray[0], "className") + params);
                } else return null;
            } else return nowNodeList.className || nowNodeList.classList;
        }
        // co-animate plugins
        var coani = function(options) {
            this.listItems = [options];
            this.wait = [];
            this.animationName = "bounceOut";
            this.animationConfig = {};
        };
        coani.prototype.app = function(el) {
            this.listItems = [el];
            return this;
        };
        coani.prototype.excuteAnimation = function(nodelist, animationClass, showAndHideApi) {
            var getNodeList = document.querySelector(nodelist);
            var supportsAntEvent_end = validateBrowserCompatiblityAnimationEvent(getNodeList, supportBrowserAnimationEventOfName_end);
            var supportsAntEvent_start = validateBrowserCompatiblityAnimationEvent(getNodeList, supportBrowserAnimationEventOfName_start);
            classList(getNodeList, " " + animationClass + " animated", getNodeList);
            var callAnimationEventStart = function() {
                removeEventListener(getNodeList, supportsAntEvent_start, callAnimationEventEnd);
            };
            var callAnimationEventEnd = function() {
                classList(getNodeList, classList(getNodeList).replace(" " + animationClass + " animated", ""), "");
                removeEventListener(getNodeList, supportsAntEvent_start, callAnimationEventStart);
            };
            addEventListener(getNodeList, supportsAntEvent_end, callAnimationEventEnd);
            addEventListener(getNodeList, supportsAntEvent_start, callAnimationEventStart);
        };

        var callAnimationApi = function(_animationName, _animationConfig) {
            this.animationName = _animationName;
            this.animationConfig = _animationConfig;
            // 开始执行初始回调  第一次执行动画 需要display : block
            var callback = _animationConfig.callback;
            if(_animationConfig.type == "start" && typeof isFun(callback)) callback();
            return this;
        };

        for(var k = 0, calen = animatiomApi.length; k < calen; k++) {
            coani.prototype[animatiomApi[k]] = callAnimationApi;
        }

        // 延迟处理当前节点整体的动画时间
        coani.prototype.delay = function(options) {
            if(isExist(options)) this.wait.push(Number(options));
            return this;
        }
            // 渲染当前脚本的动画效果
        
        coani.prototype.render = function() {
            this.excuteAnimation(this.listItems.slice(0), this.animationName, this.animationConfig);
        }
        // co.saveAllNodeAnimation表示保存所有节点的动画效果
        // 每一个节点执行一次resolve方法
        var _coani = new coani();
        assign(_cote, _coani);
    });
})(typeof window !== "undefined" ? this : global);