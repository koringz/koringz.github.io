var width = 960, height = 500, radius = 32

var shape = s3.Shape()
var app = shape.tool(s3.dom('canvas'))
var am = app.manager(app.scene)
var circleShape = am.graphics.addComponent('circleShape', {
  type: 'Array',
  property: app.amount(2).handleModule(app.createGradient20).map(function(opt) {
    return {
      color: opt,
      x: Math.round(Math.random() * (width - radius * 2) + radius) ,
      y: Math.round(Math.random() * (height - radius * 2) + radius),
      speed: 0.3,
      radius: 82,
      trails: 12,
      startAngles: 12,
      stopAngles: 122,
      trails : 110,
      motion : 'round'
    }
  })
})
circleShape.start({speed:0.3})
app.root.addChild(am)
app.loop(true)












