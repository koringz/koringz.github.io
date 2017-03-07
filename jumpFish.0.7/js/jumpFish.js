(function (win,doc) {

var el = function (element) {
    if(!element){
        element = doc
    }
    return element 
};

var isString = function  (element) {
    return typeof element === "string"
};

var isNull = function  (element) {
    return typeof element === "null"
};

var hookAddLister = function (el,eventType,handler,isbool){
    isbool = isbool || false;
    if(el.addEventListener){
      el.addEventListener(eventType,handler,isbool);
      }
};

var addLister = function (domnode,eventType,handler,isbool){
    if(el().all){
        domnode.attachEvent("on"+eventType,handler)
    }
    hookAddLister(domnode,eventType,handler,isbool);
};

var trySelector = function (element) {
    if (!isString(element)) {
      return false
    }
    return el().querySelector(element);
};

var isIn = function (options,arr_obj){
    var arr = [];
    if (options in arr_obj) {
        arr.push(options)
    }
    return arr
};

var extend = function (options, target) {
     for(var key in target){
        options[key] = target[key];
     }
     return options;
};

/********************************/

var event_set = function (option,evt) {
    var self = this;  // self一个内部对象jumpFishing

    // console.log(this);
    /*
      第一次加载函数保存数据
    */
    if (evt) {
      this.my_event = evt;
    }
    else{
      console.log('first onload function')
    };
    /*
      第一次加载函数保存数据
    */

    // 第二次触发事件时 调用保存的对象
    if (this) {
      this.MY_EVENT = self.my_event;
    };
    // 第二次触发事件时 调用对象
    return this; // this这是一个window全局对象
};

var getter_event = {
      fun : function(){
        var alise = getter_event;
        return event_set(alise);
      }
};

var myself_move = function () {
    /*
      getter_event ={
        MY_EVENT :  Object, // option.MY_EVENT= {touchstart: "touchstart", click: "onclick", dragstart: "ondragstart", drag: "ondrag"}
        fun      :  function
      }
    */
    var success_get_obj = getter_event.fun(),
        success_proto_event = success_get_obj.MY_EVENT, // 此刻获取到MY_EVENT事件对象
        arr = [];

    console.log(success_proto_event);
    [success_proto_event].forEach(function(that,index){
      arr.push(that.frame_node);
    });
    return arr;
};

/********************************/

var jumpFishing = function () {
    this.control_times  = null;               /* 弹出框显示的时候 再次点击隐藏弹出框的改变条件 */
    this.defined_times  = null;               /* 通过自定义赋值判断（当弹出框显示的时候，再次点击阴影部分隐藏弹出框，防止出现闪屏） */
    this.count          = null;               /* 定义变量count清除定时器*/
    this.world          = {};
};
      
jumpFishing.prototype = {

      /*

          外部调用的函数request_handle

      */

      request_handle : function (parame,callback) {
          var save_object = extend(this.world,parame);

          html_element(callback); // 自动添加div节点到HTML页面上
          return this.set(save_object);
      },

      /*

          重新定义外部差数的函数

      */

      set : function (para) {
          var paramer = para;
          this.Element  = paramer.parentElement;        /* 必选，一定要有dom */
          this.Node     = paramer.eventElement;         /* 必选，一定要有dom */
          this.Txt_node = paramer.textNode;             /* 必选，一定要有dom */
          this.Events   = paramer.events||"click";      /* 可选 */
          this.Text     = paramer.text||"加载中...";    /* 可选 */
          this.Bk       = paramer.block||"block";       /* 可选 */
          this.showdow_Time   = paramer.timeout||2000;  /* 弹出框显示的时间 */
          
          paramer.Bg === undefined ? this.Bg = "rgba(0,0,0,.3)"  :  this.bg = paramer.Bg;   // 对象的属性如果未定义，就会返回undefined，undefined不是js类型，而且和一个变量名如出一撤。
          
          console.log(this);
          this.reture_res_handle.call(this.set,this);   // 回调函数 reture_res_handle内部的this指针将变成jumpFishin.set，于是在 reture_res_handle内部重新定义一次原型链var this = jumpFishing.prototype即可
      },

      /*

          监听鼠标点击事件

      */
      
      reture_res_handle : function (inhirt) {
          var ACCESS_EVENT = [],
              Event_dom,
              EVENTS,
              frame_node;

              EVENTS        = {touchstart:'touchstart',click:'onclick',dragstart:'ondragstart',drag:"ondrag",drop:'ondrop'}; /* 储存触发事件 */
              frame_node_dom= {frame_node:inhirt.Element}; /* 储存节点机制 */
              ACCESS_EVENT  = isIn(inhirt.Events,EVENTS);  /* 接收外部的point触发事件 */
          
          var self = jumpFishing.prototype; // 因为para和this相同所以产生冲突，需要在内部定义一次，才能在作用域和外部父对象获得this指针 ,因为此对象（函数）从回调函数流过来的

          if( isString(inhirt.Node) ){  // 绑定（监听）事件到指定的节点上，触发事件机制
              Event_dom     = trySelector(inhirt.Node);   /* 定义变量clickEvent_dom为点击事件的元素 */
              addLister(Event_dom,ACCESS_EVENT[0],function(e){
                self.showLoading(inhirt,ACCESS_EVENT);   /* 调用执行函数 */
              });
          }
          
          return event_set(inhirt,frame_node_dom);
      },

      /*

        调用显示弹出框函数
      
      */

      showLoading : function (para,events) {
          this.default_stop_listener(events);   // 阻止默认冒泡事件
          this.add_style(para);    // 第一次点击加载弹出框（显示）
          this.add_txt(para);     // 添加文本内容的函数
          this.deference_operation(para,events);    // 函数回流操作 动画效果向反方向运动
      },

      /*
        
        阻止弹出框点击闪烁函数

      */

      deference_operation : function (para,events) {
          var that = this;
          if (this.defined_times === 1) { /* 控制监听点击事件 成立*/
              // 监听第二次点击事件，隐藏弹出框函数。
              
              var nums = addLister(trySelector(para.Element),events[0],function(e){
                  return (para.control_times = 0) & function () {   /* 设置为0，不再执行后续操作 **将关闭默认的定时器set_time操作 */
                    that.dis_visibility()
                  }();
              });
          }

          para.control_times = 1;     /* 条件为1自动执行setime，否则不执行后续setime */
          this.set_time(para);     /* (如果用户没有操作界面，就会执行setime)或者(如果用户操作了界面，就不再执行setime) */
      },

      /*
        
        清除冒泡函数

      */

      default_stop_listener : function  (events) { /* 默认清除冒泡事件 */
         return function(){
            addLister(trySelector(this.Element),events[0],function(e){
              e.preventDefault();
            });
          }();
      },

      /*
        
        显示弹出框样式函数

      */

      add_style : function (para) { /* 首次显示弹出框的函数 */
          this.dis_visibility(para.Bk); /* 显示弹出框 */
          this.defined_times = 1;  /* 开始捕获（控制监听点击事件）*/ 
      },

      /*

        添加加载文字内容函数

      */

      add_txt : function  (para) { /*添加文字内容的函数 */
          var t = para.Text;
          return t !==undefined && (trySelector(para.Txt_node).textContent = t);
      },

      /*

        自动关闭弹出框函数

      */

      set_time : function (para) {    /* 默认隐藏弹出框的函数 */
        var that = this;
        if(para.control_times? 1 : 0){    /*（是/否）执行默认隐藏invoked */
            this.clear_timeout(this.count);
            this.count = setTimeout(function () {
                that.dis_visibility();
                this.defined_times = null; /*条件控制监听点击事件*/
            },para.showdow_Time);
        }
      },

      /*

        是否显示弹出框函数

      */

      dis_visibility : function (_show_hide) {     /* 显示隐藏弹出框 */
        var get_frame_node = myself_move();  // 新线程获取一个数组，且包含初始化传入的一个节点名

          _show_hide = _show_hide ? _show_hide : "none";
          trySelector(get_frame_node[0]).style.display = _show_hide;
      },


      /*

        清除定时器函数

      */

      clear_timeout : function (options) {
        if(options !== null){
          clearTimeout(options);
        }
      }
};

/************************************************ start************************************************/ 

/*

  创建自定义的HTML元素

*/

var createE = function (elements,options) {};

/*

  添加html元素的回调函数

*/

var html_element = function (cabak) {
  if(cabak){
      cabak(createE);
  }
};

win.jumpFish = new jumpFishing();

})(window,document)