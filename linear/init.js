function init (echarts,option, context) {
  var can = document.createElement('canvas');
  Object.assign(can,context);
  document.body.appendChild(can);
  var init = echarts.init(can);
  init.setOption(option);

  return init
}
