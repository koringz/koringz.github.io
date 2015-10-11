
function addCss () {
	var sty = document.createElement('style');

	var h2 = document.getElementsByTagName('h2')[0];
	// var css = 'text/css';
	var getHead = document.head || document.getElementsByTagName('head')[0];

	getHead.appendChild(sty);
	var stysheet = sty.sheet || sty.styleSheet;// 获得标签名为style的css的样式表，也就是二级属性的对象方法

	console.log(sty.sheet);
	console.log(sty.sheet.rules);
	console.log(sty.sheet.rules.length);
	// console.log(sty.sheet.rules.item(0));
	console.log(sty.sheet.cssRules);
	console.log(sty.sheet.ownerRule);
	console.log(sty.sheet.media);
	console.log(sty.sheet.type);
	console.log(sty.styleSheet);
	// 单独设置style.styleSheet没有样式的类型
	console.log(sty.sheet.addRule); /**/
	console.log(sty.sheet.insertRule); /**/
	// console.log(sty);
	console.info(sty);
	console.dir(sty.tagName); // 样式的标签名


	return stysheet;
}


var new_sheet = addCss(); //也就是说new_sheet等于styleSheet

function result(selector, rules, index){
	index = index || 0;

	if(new_sheet.insertRule){
		new_sheet.insertRule(selector + '{' + rules + '}' , index);  // 这是css二级属性的方法,详细内容见console
		
	}
	else{/* IE */
		new_sheet.addRule(selector,rules,index); // 这是css二级属性的方法,详细内容见console
	}
}

result('h2', 'text-indent:25px;border:1px solid red;color:green;')

// 结果如下：
//h2 {
//   text-indent: 25px;
//   border: 1px solid red;
//   border-image-source: initial;
//   border-image-slice: initial;
//   border-image-width: initial;
//   border-image-outset: initial;
//   border-image-repeat: initial;
//   color: green;
// }