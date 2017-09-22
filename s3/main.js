
$(document).ready(function(){

var all = document.querySelector('#mid').querySelectorAll("button");
var _config = $('.config select.menuBar');
var _onlyConfig = $('.config');
var clear = $('.clear');
var configEvent = 'hill';
var bindObjectProperties = {
	direction : null,
	trails : null,
	smooth : null,
	x : null,
	y : null,
	index : "rgb('46','139','87')"
};
var isMobile = 0;

	var na = window.navigator;
	var appBrowser = (function appBrowser(){
			if(na){
				var browserApp = na.appVersion;
				if(browserApp.search('Mobile') > 0){
					_onlyConfig.hide();
					clear.show();
				}
				else {
					isMobile++;
					_onlyConfig.show();
				}
			}
		}());

	for(var k = 0; k < all.length; k++ ){
			all[k].onclick = function  (e) {
				var pre = e.target.nextSibling;
				var c = e.target.nextSibling.parentNode.children;
				var allLen = c.length;

				var items = [];
				for(var d = 0; d < allLen; d++){
					items.push( c.item(d) );
					var node = $(items[d]);
					if(node.addClass('active') ) node.removeClass('active');
				}

				e.target.setAttribute('class','active');

				var getFoo = e.target.getAttribute("data-model");

				if(getFoo !== 'hill') {
					_onlyConfig.hide();
				}
				else{
					if(isMobile) {
						_onlyConfig.show();
					}
				} 
				if(getFoo !== 'moveWave') clearTimeout(t);
				if(getFoo !== 'moveCircleTest') clearTimeout(mct);

				window[getFoo](bindObjectProperties)
			}
	}

	function emmitEvent(option){
		// controller the configuration method
		_config.on('change',function (){
			// get values
			var v = $("option:selected",this).val();
			var vc = $("option:selected",this).attr('data-color');
			// get attributes
			var parentNode = $(this).attr("data-item");


				
			if (parentNode === 'index' ) option[parentNode] = vc;
			if( parentNode === 'x' || 
				parentNode === 'y' ||
				parentNode === 'trails' ||
			 	parentNode === 'smooth' || 
				parentNode === 'direction'){
				option[parentNode] = v
			}

			window[configEvent](option);
		});
	}
	emmitEvent(bindObjectProperties); // 默认

	hill(bindObjectProperties);
});