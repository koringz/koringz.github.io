var JsdocxApp = function(){
	var _toDeprName = function(name, isDepr) {
		return isDepr?"<strike>"+name+"</strike>":name;
	}
	
	return {
		genAllClasses: function(doc){
			classes.sort(function(x,y){
				var a = x['shortName'].toLowerCase();//bugfix for IE
				var b = y['shortName'].toLowerCase();
				
				var p = a.charCodeAt(0) - b.charCodeAt(0);
				if(p!=0) return p;				
				return a.length - b.length;
			});
			
			var html = [];
			for ( var i = 0; i < classes.length; i++) {
				var clazz = classes[i];
				html.push('<a href="classes/'+clazz['name']+'.html" title="'+clazz['name']+'" target="viewFrame">'+_toDeprName(clazz['shortName'],clazz['isDeprecated'])+'</a>');
			}
			
			doc.write(html.join('<br/>'));
		},
		genPackagesList: function(doc){
			packages.sort(function(x,y){
				var x = x.toLowerCase();
				var y = y.toLowerCase();
				
				var p = x.charCodeAt(0) - y.charCodeAt(0);
				if(p!=0) return p;				
				return x.length - y.length;
			});
			
			var html = [];
			for ( var i = 0; i < packages.length; i++) {
				var pkg = packages[i];
				html.push('<a href="'+pkg+'-list.html" title="'+pkg+'" target="classListFrame">'+pkg+'</a>');
			}
			doc.write(html.join('<br/>'));
		},
		getPackageNameByClass: function(className){
			var p = className.lastIndexOf('.');
			var packageName = className.substring(0, p);
			var shortClassName = className.substring(p+1);
			
			if(packageName) return packageName+'.html';
			
			for ( var i = 0; i < classes.length; i++) {
				var clazz = classes[i];
				if(clazz['name']== className && clazz['type']=='Native') return 'native.html';
			}
			
			return 'window.html';
		}
	}
}();