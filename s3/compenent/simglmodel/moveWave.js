var t = 0;
function moveWave (){
	console.log(s3)

	var shape = new s3.Shape();
	var canvas = s3.dom('canvas');
	var ctx = canvas.getContext('2d');
	shape.set(canvas).attr('width').val('960').attr('height').val('500').attr('className').val('bgred');

	var width = shape.set(canvas).attr("width").val(),
		height = shape.set(canvas).attr("height").val(),
		radius = 32;


	var app = shape.tool(ctx);
	var scene = app.scene;
	var getBlock = app.createGradient;
	var getBlock20 = app.createGradient20;
	var colorOrPosition = app.amount(10).handleModule(getBlock).map(function(opt) {
		return {
			index: opt,
			x: Math.round(Math.random() * (width - radius * 2) + radius),
			y: Math.round(Math.random() * (height - radius * 2) + radius),
		}
	});

	// var fz = shape.freezeProperty(colorOrPosition);

	var cr = new app.Manager(scene);

	var waveShape = cr.graphics.addComponent('waveShape', {
		type: 'Array',
		property: colorOrPosition
	});
	waveShape.start({speed:0.5});

	var restore = waveShape.config.set;
	restore.type = 'Array';

	for(var k = 0; k <10; k++){
		restore.property[k] = {
			beginPosition:{
				x:0
			},
			endPosition:{
				x:width
			},
		};

	}

	// waveShape.start();
	// waveShape.animation('start');
	// app.animation(cr,t); // 只有一个canvas才能使用
	if(t) clearTimeout(t);
	if(mct) clearTimeout(mct);

	function sc(){
		t = setTimeout(sc,20);
		app.root.addChild(cr);
	}
	sc();

	console.log(app)
}
