
function evtLine(){
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
	var colorOrPosition = app.amount(20).handleModule(getBlock20).map(function(opt) {
		return {
			index: opt,
			x: Math.round(Math.random() * (width - radius * 2) + radius),
			y: Math.round(Math.random() * (height - radius * 2) + radius),
		}
	});
	var cr = new app.Manager(scene);

	var lineShape = cr.graphics.addComponent('lineShape', {
		type: 'Array',
		property: colorOrPosition
	});

	var restore = lineShape.config.set;

	canvas.addEventListener('mousemove',function a(events){
		var getBindRect = canvas.getBoundingClientRect();
		var x = events.clientX - getBindRect.left;
		var y = events.clientY - getBindRect.top;
	    ctx.clearRect(0, 0, getBindRect.width, getBindRect.height);

		for(var k = 0; k<20 ; k++){
			restore.property[k]={
				x1: x,
				y1: y,
			};
		}

		app.root.addChild(cr);
	});

	console.log(shape)
}


var t = 0;
function evtWave (){
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
var colorOrPosition = app.amount(20).handleModule(getBlock20).map(function(opt) {
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

var restore = waveShape.config.set;
restore.type = 'Array';

for(var k = 0; k <20; k++){
	restore.property[k] = {
		beginPosition:{
			x:0
		},
		endPosition:{
			x:width
		}
	};

}


// app.animation(cr,t); // 只有一个canvas才能使用


function sc(){
	t = setTimeout(sc,10);
	// waveShape.start();
	// waveShape.animation('start');
	app.root.addChild(cr);
}

sc();

console.log(app)

}
