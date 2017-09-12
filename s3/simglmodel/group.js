

function arcAndCircle (){

	var simgl = new s3.Shape();
var canvas = s3.dom('canvas');
var ctx = canvas.getContext('2d');

simgl.set(canvas).attr('width').val('960').attr('height').val('500').attr('className').val('bgred');

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

var arcShap = cr.graphics.addComponent('arcShape', {
	type: 'Array',
	property: colorOrPosition
});

var res = arcShap.config.set;
for(var k =0; k< 20; k++){
	res.property[k] = {
		x:colorOrPosition[k].x+k,
		y:colorOrPosition[k].y+k,
		index:'#aae0a3'
	};
}


var sc = new app.Manager(scene);
// rebuilt app
var circleShap = sc.graphics.addComponent('circleShape', {
	type: 'Array',
	property: colorOrPosition
});
app.root.addChild(sc);

var restores = circleShap.config.set;
/*restores.property[0] = {
	x: 10,
	y: 50,
	index:'#32e0a3'
};

restores.property[1] = {
	x: 20,
	y: 70,
	index:'#eea033'
};
restores.property[2] = {
	x: 30,
	y: 90,
	index:'#aae0a3'
};*/
// final
app.root.addChild(cr);

simgl.render();

}

// second
function arcAndWave (){

	var simgl = new s3.Shape();
var canvas = s3.dom('canvas');
var ctx = canvas.getContext('2d');

simgl.set(canvas).attr('width').val('960').attr('height').val('500').attr('className').val('bgred');

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

var fz = simgl.freezeProperty(colorOrPosition);

var cr = new app.Manager(scene);

var waveShape = cr.graphics.addComponent('waveShape', {
	type: 'Array',
	property: colorOrPosition
});
var arcs =waveShape.config.set;

// rebuilt app
var arcShap = cr.graphics.addComponent('arcShape', {
	type: 'Array',
	property: colorOrPosition
});
// final
app.root.addChild(cr);

simgl.render();

}

// third
function rectAndline (){

	var simgl = new s3.Shape();
var canvas = s3.dom('canvas');
var ctx = canvas.getContext('2d');

simgl.set(canvas).attr('width').val('960').attr('height').val('500').attr('className').val('bgred');

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

var fz = simgl.freezeProperty(colorOrPosition);

var cr = new app.Manager(scene);

// rebuilt app
var rectShape = cr.graphics.addComponent('rectShape', {
	type: 'Array',
	property: colorOrPosition
});
var lineShape = cr.graphics.addComponent('lineShape', {
	type: 'Array',
	property: colorOrPosition
});


// final
app.root.addChild(cr);

simgl.render();

}

// fourth
function circleAndsectors (){

	var simgl = new s3.Shape();
var canvas = s3.dom('canvas');
var ctx = canvas.getContext('2d');

simgl.set(canvas).attr('width').val('960').attr('height').val('500').attr('className').val('bgred');

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

var fz = simgl.freezeProperty(colorOrPosition);

var cr = new app.Manager(scene);

// rebuilt app
var circleShap = cr.graphics.addComponent('circleShape', {
	type: 'Array',
	property: colorOrPosition
});
var sectorsShape = cr.graphics.addComponent('sectorsShape', {
	type: 'Array',
	property: colorOrPosition
});


// final
app.root.addChild(cr);

simgl.render();

}

// fivth
function lineAndsectors (){

	var simgl = new s3.Shape();
var canvas = s3.dom('canvas');
var ctx = canvas.getContext('2d');

simgl.set(canvas).attr('width').val('960').attr('height').val('500').attr('className').val('bgred');

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

var fz = simgl.freezeProperty(colorOrPosition);

var cr = new app.Manager(scene);

// rebuilt app
var lineShape = cr.graphics.addComponent('lineShape', {
	type: 'Array',
	property: colorOrPosition
});
var sectorsShape = cr.graphics.addComponent('sectorsShape', {
	type: 'Array',
	property: colorOrPosition
});


// final
app.root.addChild(cr);

simgl.render();

}


// sixth
function waveAndcircle (){

	var simgl = new s3.Shape();
var canvas = s3.dom('canvas');
var ctx = canvas.getContext('2d');

simgl.set(canvas).attr('width').val('960').attr('height').val('500').attr('className').val('bgred');

var width = simgl.set(canvas).attr("width").val(),
	height = simgl.set(canvas).attr("height").val(),
	radius = 32;

var app = simgl.tool(ctx);
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

// var fz = simgl.freezeProperty(colorOrPosition);

var cr = new app.Manager(scene);

// rebuilt app
var waveShape = cr.graphics.addComponent('waveShape', {
	type: 'Array',
	property: colorOrPosition
});
var wave = waveShape.config.set;
for(var k =0; k< 10; k++){
	wave.property[k] = {
		x:colorOrPosition[k].x+k,
		y:colorOrPosition[k].y+k,
		index:colorOrPosition[k].index,
		endPosition :{
			x: colorOrPosition[k].x
		}
	};
}


var circleShap = cr.graphics.addComponent('circleShape', {
	type: 'Array',
	property: colorOrPosition
});


// final
app.root.addChild(cr);

simgl.render();

}

// seveth
function rectAndcircle (){

	var simgl = new s3.Shape();
var canvas = s3.dom('canvas');
var ctx = canvas.getContext('2d');

simgl.set(canvas).attr('width').val('960').attr('height').val('500').attr('className').val('bgred');

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

var fz = simgl.freezeProperty(colorOrPosition);

var cr = new app.Manager(scene);

// rebuilt app
var rectShape = cr.graphics.addComponent('rectShape', {
	type: 'Array',
	property: colorOrPosition
});
var circleShap = cr.graphics.addComponent('circleShape', {
	type: 'Array',
	property: colorOrPosition
});


// final
app.root.addChild(cr);

simgl.render();

}

// eigth
function arcAndline (){

	var simgl = new s3.Shape();
var canvas = s3.dom('canvas');
var ctx = canvas.getContext('2d');

simgl.set(canvas).attr('width').val('960').attr('height').val('500').attr('className').val('bgred');

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

var fz = simgl.freezeProperty(colorOrPosition);

var cr = new app.Manager(scene);

// rebuilt app
var arcShap = cr.graphics.addComponent('arcShape', {
	type: 'Array',
	property: colorOrPosition
});
var circleShap = cr.graphics.addComponent('lineShape', {
	type: 'Array',
	property: colorOrPosition
});


// final
app.root.addChild(cr);

simgl.render();

}

// ninth
function lineAndcircle (){

	var simgl = new s3.Shape();
var canvas = s3.dom('canvas');
var ctx = canvas.getContext('2d');

simgl.set(canvas).attr('width').val('960').attr('height').val('500').attr('className').val('bgred');

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

var fz = simgl.freezeProperty(colorOrPosition);

var cr = new app.Manager(scene);

// rebuilt app
var lineShape = cr.graphics.addComponent('lineShape', {
	type: 'Array',
	property: colorOrPosition
});
var circleShap = cr.graphics.addComponent('circleShape', {
	type: 'Array',
	property: colorOrPosition
});


// final
app.root.addChild(cr);

simgl.render();

}