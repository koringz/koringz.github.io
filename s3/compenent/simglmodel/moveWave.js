var t = 0;
function moveWave (){
		var shape_wave = new s3.Shape();

		var canvas = s3.dom('canvas'),
				can = shape_wave.set(canvas),
				ctx = canvas.getContext('2d');

				can.attr('width').val('960').attr('height').val('500').attr('className').val('bgwhite');

		var width = can.attr("width").val(),
				height = can.attr("height").val(),
				radius = 32;


		var app = shape_wave.tool(ctx);
		var scene = app.scene;
		var getBlock = app.createGradient;
		var getBlock20 = app.createGradient20;
		
		var colorOrPosition = app.amount(5).handleModule(getBlock).map(function(opt) {
			return {
				index: opt,
				x: Math.round(Math.random() * (width - radius * 2) + radius),
				y: Math.round(Math.random() * (height - radius * 2) + radius),
			}
		});


		var _scene = new app.Manager(scene);

		var waveShape = _scene.graphics.addComponent('waveShape', {
				type: 'Array',
				property: colorOrPosition
		});
		waveShape.start({speed:0.6});

		var restore = waveShape.config.set;
		restore.type = 'Array';

		for(var k = 0; k <5; k++){
				restore.property[k] = {
					beginPosition:{
						x:0
					},
					endPosition:{
						x:width
					},
				};
		}

		clearTimeout(t);
		clearTimeout(mct);

		function sc(){
				t = setTimeout(sc,20);
				app.root.addChild(_scene);
		}
		sc();
}





	// waveShape.start();
	// waveShape.animation('start');
	// app.animation(cr,t); // 只有一个canvas才能使用