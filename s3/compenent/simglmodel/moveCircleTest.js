
var mct = 0;
function moveCircleTest (){

	var simgl = new s3.Shape();

	var canvas = s3.dom('canvas'),
		can = simgl.set(canvas),
		ctx = canvas.getContext('2d');

	can.attr('width').val('960').attr('height').val('500').attr('className').val('bgwhite');

	var width = can.attr("width").val(),
		height = can.attr("height").val(),
		radius = 32;


	var app = simgl.tool(ctx),
		scene = app.scene,
		getBlock = app.createGradient,
		getBlock20 = app.createGradient20;

	var colorOrPosition = app.amount(20).handleModule(getBlock20).map(function(opt) {
		return {
			index: opt,
			x: Math.round(Math.random() * (width - radius * 2) + radius),
			y: Math.round(Math.random() * (height - radius * 2) + radius),
		}
	});

	// var fz = simgl.freezeProperty(colorOrPosition);

	var crc = new app.Manager(scene);

	var circleShape = crc.graphics.addComponent('circleShape', {
		type: 'Array',
		property: colorOrPosition
	});
	circleShape.start({speed:0.1});

	var restore = circleShape.config.set;
	restore.type = 'Array';

	var colors = ['#32e0a3','#eea033','#aae0a3'];

	for(var k = 0; k < 20; k++){
		restore.property[k] = {
			radius:Math.random() * radius,
			trails : 110,
			motion : 'round'
		};
	}
	clearTimeout(t);
	clearTimeout(mct);

	// app.root.addChild(crc);
	function scc(){
		mct = setTimeout(scc,160);
		app.root.addChild(crc);
	}
	scc();

	console.log(simgl)
}



var t = 0;
function evtCircle (){

	var simgl = new s3.Shape();

	var canvas = s3.dom('canvas'),
		can = simgl.set(canvas),
		ctx = canvas.getContext('2d');

	can.attr('width').val('960').attr('height').val('500').attr('className').val('bgwhite');

	var width = can.attr("width").val(),
		height = can.attr("height").val(),
		radius = 32;


	var app = simgl.tool(ctx),
		scene = app.scene,
		getBlock = app.createGradient,
		getBlock20 = app.createGradient20;

	var colorOrPosition = app.amount(1).handleModule(getBlock).map(function(opt) {
		return {
			index: opt,
			x: Math.round(Math.random() * (width - radius * 2) + radius),
			y: Math.round(Math.random() * (height - radius * 2) + radius),
		}
	});

	clearTimeout(mct);
	clearTimeout(t);

	app.root.addChild(crc);
	// function scc(){
	// 	t = setTimeout(scc,11000);
	// 	app.root.addChild(crc);
	// }
	// scc();

	console.log(simgl)
}
