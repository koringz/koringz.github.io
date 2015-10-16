(function(doc) {
    function xmlhttprq() {
        if (typeof new_xmlhttpr != 'undefined') {
            try {
                return new ActiveXObject('Microsoft.XMLHTTP');
            } catch (e) {
                console.log(e.message);
            }
        }
        return new XMLHttpRequest();
    };

    function console_data(j, k) { //j表示一个一直改变的数字，k表示总数
        var create_xmlhttprq = xmlhttprq(),
            link = 'assets/js/module/public/json/package.json';

        create_xmlhttprq.open('GET', link, true);
        create_xmlhttprq.onreadystatechange = function() { // 异步准备就绪
            if (create_xmlhttprq.readyState == 4) {
                var W = 180; 
                var res = create_xmlhttprq.responseText;
                get_content(res, j, k); //从json数据内部获取响应的数据
                CHANGE_WIDHT.FrameworkNav_bar_Body(W); //因为width等于left的值，传个一个值，在函数内部赋于另一个值即可
            }
        };
        create_xmlhttprq.send(null);
    };

    function get_content(r, j, k) { //通过获取到的json数据，就可以对异步进行传参
        var json = eval("(" + r + ")"),
            //json_item = json[j][j]
            index = 0,
            one = 1;

        if (j == index) {
            var p = j,
                addcontent;
            //如果j不等于0，那么我就要设置为零，让id的数字不会随着节点的升序而插入的升序的id号
            //因为 id是不能随着菜单的item增加的，但是json数据是要随着item增加的，不过每次改变item，获取到的json数据都要从0开始获取
            inner_content(p, k, json);
        } else if (j != index) { 
            //此时的item = j > 0，获取的json[j]就是当前的数组。 但是插入到id不能增加，应该还是从0开始
            inner_content(j, k, json);
        }
        // 通过判断菜单的序列号为0的正整数，以及不为0的正整数
    };

    function inner_content(j, k, json) {
        var m = 0;
        for (m; m < k; m++) {
            addcontent = doc.getElementById('list0' + m + '');
            if (typeof json[j][m] == 'undefined') { //当html页面的节点比json内的数据多，ajax调用的时候输出就会不足，不足的话产生未定义undefined
                addcontent.innerHTML = ''; //阻止未定义的文本加入到html页面，添加空字符串
            } else {
                addcontent.innerHTML = json[j][m];
            } //console.log(  json[j][m] + '2')
        }
    };

    function change_width() { // 改变内容的宽度和距离左边的导航栏
        return {
            FrameworkNav_bar_Body:function WE(w){
                doc.querySelector('.Framework-product-navbar').style.width =  doc.querySelector('.Framework-product-body').style.left = w + 'px';
            }
        };
    };

    var CHANGE_WIDHT = new change_width();

    window.onload = function() {
        var ul_nav_list = doc.querySelector('.sidebar-trans'),
            li_item = ul_nav_list.getElementsByTagName('li');

        for (var i = 0; i < li_item.length; i++) {
            li_item[i].index = i;
            var str = 'list0' + i + '';
            var new_i;

            li_item[i].onmouseover = (function() {
                var _this = this,
                    index = 0 || index,
                    sty = doc.createElement('style');
                    var getHead = document.head || document.getElementsByTagName('head')[0];
                console_data(_this.index, i);
                getHead.appendChild(sty);
                sty = sty.sheet || sty.styleSheet;
                var li_item = _this.getElementsByTagName('li');
                console.log()
               var li = ''+li_item;

                function result(selector, rules, index){
                        index = index || 0;

                        if(sty.insertRule){
                            sty.insertRule(selector + '{' + rules + '}' , index);  // 这是css二级属性的方法,详细内容见console
                            
                        }
                        else{/* IE */
                            sty.addRule(selector,rules,index); // 这是css二级属性的方法,详细内容见console
                        }
                    }
                    result(li, 'text-indent:25px;border:1px solid red;color:green;')
            });

            li_item[i].onmouseout = (function() {
                var stt=setTimeout(
                        function (){
                        var offset_navbar = doc.querySelector('.Framework-product-navbar').offsetWidth,
                            _navbar = doc.querySelector('.Framework-product-navbar');
                            var zore = 0,
                                 half = 180,
                                _this = this;
                            if(offset_navbar != '0'){
                                _navbar.onmouseover = function(){
                                    CHANGE_WIDHT.FrameworkNav_bar_Body(half);
                                };
                                _navbar.onmouseout = function(){
                                    CHANGE_WIDHT.FrameworkNav_bar_Body(zore);
                                };
                            }
                            else{
                               return false;
                            }
                        }, 2000);
                        console.log(i);
                try{
                    stt
                }
                catch(e){
                    console.log(e.message);
                }
            });

        }
    };

})(document)