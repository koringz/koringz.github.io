// KORINGZ._create_xml_object();
var koringz = {
	_create_xhr_object:function (f){
		try{
			if(typeof xmlhttp == 'undefined'){
				xmlhttp = new XMLHttpRequest();
			}else{
				try{
					xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
				}
				catch(e){
					console.log(e.message);
				}
			}
		}catch(e){}
		finally{
			return xmlhttp;
		}
	},
	asyc_xhr_request:function (url,d){ 
	// d表示外部传入的一个dom元素 
	// url表示一个json地址
		var create_xhr_object, default_num, _defaul_object, _str_object, str, c;
		default_num = 0
		c={
			lik:url,
			tid:default_num,
			xhr:true
		};
		create_xhr_object = this._create_xhr_object();
		// if(){
		// }
		create_xhr_object.open('get',c.lik,c.xhr);
		create_xhr_object.onreadystatechange = function(){
			if(create_xhr_object.readyState == 4){
				 str = create_xhr_object.responseText; //函数传入一个返回的json数据,未转换的数据格式

				try{ //扔一个返回的数据，判断responseText是否返回为空
					if(typeof str != 'string' && typeof str != 'object'){ //如果返回为空，输出null
						return null;
					}else{	//如果返回不为空，输出str字符串
						_defaul_object = {
							txt:str,
							num:default_num,
							result:false,
							dom:d
						};
						koringz._get_res_content(_defaul_object);
					}
				}catch(e){}
			}
		}
		create_xhr_object.send(null);
	},
	_get_res_content:function(_new_defaul_object){
		var myContent,json_data,i,c,f;
		f = { 
			//服务器异步时，开始获取，dom对象，json地址，从外部传入封装的对象，然后进行封装
			_txt:_new_defaul_object.txt,
			_num:_new_defaul_object.num,
			_rst:_new_defaul_object.result,
			_dom:_new_defaul_object.dom
		};
		if(f._dom){ //开始封装dom对象
			var is_dom = f._dom;
		}
		if(f._txt){	//开始封装json对象
			json_data = eval('(' + f._txt +')');
		}
		koringz._test_demo_one(json_data,is_dom);
		// myContent.innerHTML = '<iframe src=' + val[k].iframe_url + ' width=100%' + ' height=100%' + '></iframe>'
	},
	_test_demo_one:function(val,dom){ //这是第一个文件内容
		/*****************/
		try{
			if(typeof val == 'object'){
				for(i=0;i<val.length;i++){
					(function(k){
						var p,q,get_string,new_value01,new_value02,new_value03,new_value04,new_value05;
						// get_string ='';
							p = k;
							q = ++k;
						// if(typeof get_string == 'undefined'){
							get_string ='';
							try{
								if('string' == typeof get_string){ //创建一个字符串
									get_string  += '<p>' 
									+ '<span>' + val[p].shift +'</span>' 
									+  val[p].map
									+ '<a href=' + val[p].url +' class=' + 'cc0' + q +' >' + val[p].word_links + '</a>'
									+'</p>';
									// console.log(get_string); //里面循环输出的时候，不包含指定的对象shift就会输出一个undefined，下面进行了一次判断
									if(typeof val[p].shift == 'undefined'){ //如果不存在一个数组的对象的值，就停止执行
										return false;
									}else if(typeof val[p].shift == 'string'){ //如果数组的这个对象是一个字符串就输出到html
										dom.innerHTML += get_string;
										// ** 注 ** 此处需要进行一个改进 数组 对象 字符串的判断
									}
									document.querySelector('#myPlaces').onclick = function(){
										myContent.innerHTML = '<iframe src=' + val[k].iframe_url + ' width=100%' + 'height=100%' + '></iframe>';
									}
								}
							}catch(e){
								console.log(e.message)
							}

					})(i)
				}
			}else{}
		}catch(e){console.log(e.message)}
		/*****************/
	},
	_test_demo_two:function(){

	}
};





