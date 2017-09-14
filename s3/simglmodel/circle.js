function circle (){

var simgl = new s3.Shape();
var canvas = s3.dom('canvas');
var ctx = canvas.getContext('2d');

simgl.set(canvas).attr('width').val('960').attr('height').val('500').attr('className').val('bgwhite');

var width = simgl.set(canvas).attr("width").val(),
	height = simgl.set(canvas).attr("height").val(),
	radius = 32;

var app = simgl.tool(ctx);
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

// var fz = simgl.freezeProperty(colorOrPosition);

var cr = new app.Manager(scene);

var circleShape = cr.graphics.addComponent('circleShape', {
	type: 'Array',
	property: colorOrPosition
});

var restore = circleShape.config.set;
restore.type = 'Array';
var col = ['#32e0a3','#eea033','#aae0a3'];

for(var k = 0; k < 20; k++){
	restore.property[k] = {
		radius:Math.random() * radius,
	};
}

/*canvas.addEventListener("mousemove",function (events){
	evt1(events,restore,app,cr)
});*/

app.root.addChild(cr);

console.log(simgl)

}

/*
function evt1(events,restore,app,cr){
	var getBindRect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, 0, 0);
	app.root.addChild(cr);
}*/