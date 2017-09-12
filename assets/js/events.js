var KORINGZ = {
/** ------------------------- **/

	_xml_http:['Microsoft.XMLHTTP','MSXML2.XMLHTTP','MSXML2.XMLHTTP.3.0'],
	_http:{},
	_default_Http:'XmlHttpRequest',
	_default_options:0,
	_has_default_get:true,
	_has_default_post:true,
	// start_event:new KORINGZ.customevent('start'),
	// complete_event:new KORINGZ.customevent('complete'),
	// success_event:new KORINGZ.customevent('success'),
	// failure_event:new KORINGZ.customevent('failure'),
	// abort_event:new KORINGZ.customevent('abort'),
	_custom_event:{
		onstart:['start_event','start'],
		oncomplete:['complete_event','complete'],
		onsuccess:['success_event','success'],
		onfailure:['failure_event','failure'],
		onabort:['abort_event','abort']
	},

	_create_xml_object:function(d){ //见对象 nid
		var x,b,c;
		// x表示一个创建一个新的对象，判断这个对象是ie浏览器的还是非ie浏览器
		// b表示输出一个函数对象的方法
		// c表示声明一个循环数字

		try{
			x = new XmlHttpRequest(); //this._default_Http
			b = {
				across:x,
				nid:d,
				xml:this._has_default_get
			}
		}
		catch(e){
			for(c= 0; c<this._xml_http.length; ++c){
				try{
					x = new ActiveXObject(this._xml_http[c]);
					b = {
						across:x,
						nid:d,//这是一个数字，后面的函数传入一个参数零，然后调用对象 b的第一个对象 across 
						xml:this._has_default_get
					};
					break;
				}
				catch(E){}
			}
		}
		finally{
			console.log('b');
			return b;
		}
	},
	_get_xml_state:function(f,g,k,p){
		var e, c, d = this._default_options;
		
		e = this._create_xml_object[d];//获得上一个函数输出的对象结果
		try{
			if(!e){
				return null;
			}
			else{
				c = {
					nid:d
				};
				if(e === 'one value'){

				}
				else{
					if(e === 'two value'){

					}
				}

			}
			if(c){
			}
		}catch(b){}
		return c;
	},
	_asyc_request:function(){

	},
	_init_custom_events:function(a,c){
		var b;
		for(b in c._custom_event.length){	//判断事件是否在一个对象内
			if(c._custom_event[b][0]){
				a[c._custom_event[b][0]] = new KORINGZ.js.customevent(this._custom_event[b][1],(c.scope)?c.scope:null);
				a[c._custom_event[b][0]].subscribe(c.customevent[b]);
				//实例一个在外部已经封装过的函数或方法 koringz.js.customevent()
			}
		}
	}


/** ------------------------- **/
}


