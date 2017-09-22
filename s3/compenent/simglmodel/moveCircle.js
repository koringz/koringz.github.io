var mct = 0;
function moveCircle (){
		var w = '960';
		var h = '500';
		var _trails = 110;

		var na = window.navigator;
		if(na){
			var browserApp = na.appVersion;
			if(browserApp.search('Mobile') > 0){
				var headerW = $('.header')
				w = '' + headerW.width();
				_trails = 200;
			}
		}

		var shape_circle = new s3.Shape();

		var canvas = s3.dom('canvas'),
				can = shape_circle.set(canvas),
				ctx = canvas.getContext('2d');

		canvas.style.width = w;
		can.attr('width').val(w).attr('height').val(h).attr('className').val('bgwhite');

		var width = can.attr("width").val(),
				height = can.attr("height").val(),
				radius = 32;

		var app = shape_circle.tool(ctx),
				scene = app.scene,
				getBlock = app.createGradient,
				getBlock20 = app.createGradient20;

		var colorOrPosition = app.amount(16).handleModule(getBlock20).map(function(opt) {
				return {
						index: opt,
						x: Math.round(Math.random() * (width - radius * 2) + radius) ,
						y: Math.round(Math.random() * (height - radius * 2) + radius),
				}
		});
		// var fz = simgl.freezeProperty(colorOrPosition);

		var crc = new app.Manager(scene);

		var circleShape = 
				crc.graphics.addComponent('circleShape', {
						type: 'Array',
						property: colorOrPosition
				});
				circleShape.start({speed:0.3});

		var restore = circleShape.config.set;
				restore.type = 'Array';

		var colors = ['#32e0a3','#eea033','#aae0a3'];

		for(var k = 0; k < 16; k++){
				restore.property[k] = {
						radius:Math.random() * radius,
						trails : _trails,
						motion : 'round'
				};
		}

		clearTimeout(t);
		clearTimeout(mct);

		function scc(){
				mct = setTimeout(scc,17)
				app.root.addChild(crc);
		}
		scc();
		console.log(shape_circle)
}


// app.root.addChild(crc);
// requestAnimationFrame(scc);
// var a = app.animation(crc);
// console.log(a)