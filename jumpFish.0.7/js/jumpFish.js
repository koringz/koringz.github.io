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
    }


    /********************************/
    /********************************/
    /********************************/
    /********************************/
    /********************************/

    var jumpFishing = function () {
        this.control_times  = null;               /* 弹出框显示的时候 再次点击隐藏弹出框的改变条件 */
        this.defined_times  = null;               /* 通过自定义赋值判断（当弹出框显示的时候，再次点击阴影部分隐藏弹出框，防止出现闪屏） */
        this.count          = null;               /* 定义变量count清除定时器*/
        this.world          = {};
    }
      /*
            parame = {
              H:'70%',  // 垂直位置
              W:'70%', // 水平位置
              Dom_node:'#h1',  // 必填
              Ele:'.control_load',  // 必填
              Events:'click',  // 不是必填,默认click事件
              Txt:'稍等,加载中...', // 不是必填
              Bg:{_parent:'rgba(232,12,222,.1)',_child:"rgba(132,3,12,1)"} // 不是必填
            }
      */
jumpFishing.prototype = {
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

      接受差数和监听事件

        para = {
          this.Node     : paramer.Dom_node;        
          this.Element  : paramer.Ele;              
          this.Events   : paramer.EVENTS||"click";  
          this.Text     : paramer.Txt||"加载中..."; 
          this.Bk       : paramer.Bk||"block";      
          this.H        : paramer.H||"100%";        
          this.W        : paramer.W||"100%";        
        }

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
        调用弹出框函数showLoading
      */
      showLoading : function (para,events) {
          this.default_stop_listener(events);   // 阻止默认冒泡事件
          this.add_style(para);    // 第一次点击加载弹出框（显示）
          this.add_txt(para);     // 添加文本内容的函数
          this.deference_operation(para,events);    // 函数回流操作 动画效果向反方向运动
      },

      /*
        小于2秒执行监听事件
        此刻，需要设定一个时间为几秒钟内不能点击，就是显示弹出框不能立即点击使他隐藏，应该有一个时间刻，就要在此设定一个。
        目前用小于2和大于2来判断，分别在弹出框的函数(1)和默认隐藏弹出框的函数(3)内赋值。
        小于2，说明弹出框在（显示与默认隐藏）状态内。
        同时去阻止（默认隐藏）的函数，以便控制默认隐藏函数执行自动关闭。
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

      default_stop_listener : function  (events) { /* 默认清除冒泡事件 */
         return function(){
            addLister(trySelector(this.Element),events[0],function(e){
              e.preventDefault();
            });
          }();
      },
      add_style : function (para) { /* 首次显示弹出框的函数 */
          this.dis_visibility(para.Bk); /* 显示弹出框 */
          this.defined_times = 1;  /* 开始捕获（控制监听点击事件）*/ 
      },

      /*
        添加加载文字函数
      */
      add_txt : function  (para) { /*添加文字内容的函数 */
          var t = para.Text;
          return t !==undefined && (trySelector(para.Txt_node).textContent = t);
      },

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

      dis_visibility : function (_show_hide) {     /* 显示隐藏弹出框 */
        var get_frame_node = myself_move();  // 新线程获取一个数组，且包含初始化传入的一个节点名

          _show_hide = _show_hide ? _show_hide : "none";
          trySelector(get_frame_node[0]).style.display = _show_hide;
      },

      clear_timeout : function (options) {
        if(options !== null){
          clearTimeout(options);
        }
      }
}
    /************************************************ start
        myself_move函数将从event_set函数内部捕获EVENTS数组对象，并且把EVENTS数组绑定到getter_event对象上。
        myself_move从getter_event上间接拿到EVENTS数组。
        于是，我们在myself_move上处理EVENTS，最终得到一个新的有做处理过的EVENTS数组。
    ************************************************/ 
            
    var event_set = function (option,evt) {
        var self = this;  // self就是一个内部对象jumpFishing

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
        // delete self.my_event; // 不能删除，否则不能继承到my_event属性
        // 第二次触发事件时 调用对象
        return this; // this这是一个window全局对象
    };
    
    var getter_event = {
          fun : function(){
            var alise = getter_event;
            return event_set(alise);
          }
    };

    /************************************************ 
        myself_move函数将从event_set函数内部捕获EVENTS数组对象，并且把EVENTS数组绑定到getter_event对象上。
        myself_move从getter_event上间接拿到EVENTS数组。
        于是，我们在myself_move上处理EVENTS，最终得到一个新的有做处理过的EVENTS数组。
    ************************************************/ 
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

        [success_proto_event].forEach(function(that,index){
          arr.push(that.frame_node);
        });
        return arr;
    };

    
    /*
      2016/7/8 
      创建自定义的HTML元素
    */

    /* 默认创建div(html元素)的method */
    var createE = function (elements,options) {

      // 遍历一个字符串数组，推入到新的数组内
      var defined_each = function (_htmlElement,_element,_arr) {
          [_element].forEach(function (target,index) {
              for (var i = index,len = _htmlElement.length; i < len; i++) {
                  if(target ===  _htmlElement[i]){
                      _arr.push(target);
                  }
              }
          });
          return _arr;
      };

      var htmlE = ['div','p','span'],c_arr = [];

      var current_attr = options||"";


        if (!elements) {
            elements = 'div';
            return doc.createElement(elements);
        }
        else if (isString(elements)) {
            var r_arr = defined_each(htmlE,elements,c_arr);
                elements = r_arr[0];
            var div_009_one;
            div_009_one = doc.createElement(elements);
            div_009_one.className = current_attr.currentClass ||"";

            // 创建一个元素 div 或 span 节点
            return div_009_one
        }
        else if ("object" === typeof elements) {
          /*
          elements = { add :2 , element : 'div'}
          */
          var clone_o = elements, // 克隆一个对象
              add_val = clone_o.add,  // 获得一个节点元素的长度
              get_ele = clone_o.element,  // 获得一个节点元素
              r_arr = [],
              r =[];
          if (typeof add_val == 'number') {
                var a_arr = defined_each(htmlE,get_ele,r); // 获得一个节点元素
                if (clone_o.element === a_arr[0]) { // 匹配一个元素是否为html1-html5规范的元素 
                  var div_009 = doc.createElement('div');
                      div_009.className = current_attr.currentClass; // 定义一个元素的class类的属性

                  var change_children_class = current_attr.childClass;
                    for (var j = 0; j < add_val;j++) { // 循环多少次，也就是说创建几个节点
                      var more_ele = doc.createElement(get_ele); // 这里就是添加了几个div,p元素的定义
                        div_009.appendChild(more_ele);

                        // 如果是一个字符串，说明就是一个节点，直接附上属性即可
                        if("string" === typeof change_children_class){
                          div_009.firstChild.className = change_children_class;
                        }
                        // 否则就是一个对象，说明不是一个节点，具有多个节点
                        else if(typeof change_children_class === "object"){
                          div_009['children'][j].className = change_children_class[0][j];
                        }
                    }

                    return div_009; // 输出一个父节点
                }
          }
          else{
            console.log("it's not number")
          }
        }

    };
    /* 
      add 表示创建二个并且添加二个div元素
      element 表示创建div元素
   */
    var html_element = function (cabak) {
      /*
        
        // 表示创建一个div元素，并且添加一个class类
        createE('div',{currentClass:"control_load"}); // <div class="control_load"></div>
        
        // 表示自动创建一个父div元素的class类为"loading-inner"，且添加8个div子节点的元素
        createE({ add :8 , element : 'div'},{currentClass:"loading-inner"});
        // <div class="loading-inner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>


        // 表示自动创建一个父div元素的class类为"loading-inner"，且添加8个div子节点，8个div节点对应8个class类
        createE({ add :8 , element : 'div'},{currentClass:"loading-inner",childClass:[{"0":"","1":"","2":"","3":"","4":"","5":"","6":"","7":"","8":""}]});
        
        // 表示创建了一次div节点，class类为空
        createE('div',{currentClass:""});
        <div class=""></div>

      */
      if(cabak){
          cabak(createE);
      }
      else{
          var str = "<div clas='control_load'><div class='loading' style='display: none;'><div class='loading-inner'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><div class='parent-txt'><div class='loading-txt'>稍等,马上就好</div></div><div class='loading-mask'></div></div><div>";

            var create_div = doc.createElement("div");
            create_div.setAttribute("class","control_load");
            doc.querySelector('body').appendChild(create_div);
            doc.querySelector('.control_load').innerHTML = str;
      }
    }

    /*
      添加样式函数
    */
    

    win.jumpFish = new jumpFishing();

})(window,document)

/*
  此刻封装成对象 
  如何才能定义参数 从而一直改变参数值

*/