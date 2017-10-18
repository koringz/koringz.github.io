
 /* @Author: zhengshanggen
 * @Team group: wangjianfei ...
 * @Date: 2017-09-25 15:32:29
 * @Last Modified by: zhengshanggen
 * @Last Modified time: 2017-10-17 08:00:00
*/

'use strict';

(function (global){

typeof defaults === 'undefined' ? false : defaults


var defaults = {
    g: global,
    step: 0,
    stamp: 0,
    wrap: global.wrap || {}
}


global.wrap = defaults.wrap


// init wrap lib
defaults.wrap = function (){
  this.absoluteObject = []
  this.relativeObject = []
  this.$promise = []
  // save call the object of functional, the parent 'default.wrap'
  this.common = []
  // save 'this.methods' public method of call 
  this.public = []
  // save 'new this.methods' invoked methods
  this.static = []
  // save 'this.el' need method and class to call 
  this.class = {}
  // save the first create method
  this.create = {}
  // used scope invoked attr
  this.$scope = {}
  // the method manage attr for another the methods
  this.$props = {}
}


defaults.wrap.mess = null
defaults.wrap.common = []
defaults.wrap.managePlanPartment = []


// 一、AJAX rewrap call
defaults.wrap.prototype.nativeAjax = function (success, error) {

  // define domain
  var domain = 'https://' + global.location.host + '/'

  var url = domain + this.relativeObject.URL
  var type = this.relativeObject.TYPE
  var data = this.relativeObject.DATA
  var xhrRequest = null
  var _this = this
  var str = ''

  if (global.XMLHttpRequest) xhrRequest = new XMLHttpRequest()
  else xhrRequest = new ActiveXObject('Microsoft.XMLHTTP')

  xhrRequest.open(type, url, true)

  if (type === "POST" && data != null) {
    xhrRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
    for (var key in data) {
      str += '&'+key+'='+data[key]
      str = str.slice(1)
    }
  }

  xhrRequest.onreadystatechange = function() {

    if (xhrRequest.readyState == 4) {

      if (xhrRequest.state == 200) {

        var obj = {
          state: xhrRequest.state,
          textData: xhrRequest.responseText
        }

        var responseData = _this.resolveData(obj)

        _this.validateSuccess(success,[responseData],true)

      } else error(xhrRequest.state)

    }

  }

  xhrRequest.send(str)
  ++defaults.step
}


defaults.wrap.prototype.resolveData = function (options){
  var responseTextData = options.textData

  (options.state === 200) && !0

  var text
  if(typeof responseTextData === 'string'){
    var _search = responseTextData.search(' ')
    if(_search >= 0){
      text = this.trim(responseTextData)
    }
    else text = responseTextData
  }

  return this.compileParse(text)
}



defaults.wrap.prototype.validateSuccess = function (isComplate,options,bool){
  var _this = this
  var turn = [{
    bool: bool,
    msg:'查询成功',
    count: options.length,
    result: options
  }]

  isComplate(_this.common[0],turn)
}



defaults.wrap.prototype.compileStringify = function (options){
  return typeof options === 'object' ? JSON.stringify(options) : false
}


defaults.wrap.prototype.compileParse = function (options){
  return typeof options === 'string' ? JSON.parse(options) : false
}


// call fallback method
defaults.wrap.prototype.resolveComplexFallback = function resolveComplexFallback(options){
    var bindCall = [options]
    var _this = this
    return {
      custom : function (){
        var callAjaxMehtod = bindCall

        for(;;){
          if( callAjaxMehtod instanceof Array ){
            callAjaxMehtod = callAjaxMehtod.pop()
            continue
          }
          break
        }

        _this.absoluteObject = callAjaxMehtod

        return this
      },
      bind : function (){
        console.log([bindCall?bindCall:false])
      }
    }
}


defaults.wrap.prototype.trim = function(options){
  return options.replace(/\s/g,'')
}


defaults.wrap.prototype.toUppCase = function(options){
  return options.toUpperCase()
}


defaults.wrap.prototype.toLowCase = function(options){
  return options.toLowerCase()
}


defaults.wrap.prototype.setType = function(options){
    this.relativeObject[this.toUppCase(options)] = this.toUppCase(this.absoluteObject[options])
}


defaults.wrap.prototype.getType = function(options){
  // please return a debug log
  var takeUpper = this.relativeObject[this.toUppCase(options)]
  if(takeUpper === 'GET' || takeUpper === 'POST') return takeUpper
  return false
}


defaults.wrap.prototype.setUrl = function(options){
  // please return a debug log
    this.relativeObject[this.toUppCase(options)] = this.toLowCase(this.absoluteObject[options])
}


defaults.wrap.prototype.getUrl = function(options){
  return this.relativeObject[this.toUppCase(options)]
}


defaults.wrap.prototype.setData = function(options){
  // please return a debug log
  if(options in this.absoluteObject) this.relativeObject[this.toUppCase(options)] = this.toLowCase(this.absoluteObject[options])
  else this.relativeObject[this.toUppCase(options)] = null
}


defaults.wrap.prototype.getData = function(options){
  return this.relativeObject[this.toUppCase(options)]
}


defaults.wrap.prototype.setSuccess = function(options){
    this.relativeObject[this.toUppCase(options)] = [this.absoluteObject[options]]
}


defaults.wrap.prototype.getSuccess = function(options){
    return this.relativeObject[this.toUppCase(options)]
}


defaults.wrap.prototype.setError = function(options){
    this.relativeObject[this.toUppCase(options)] = [this.absoluteObject[options]]
}


defaults.wrap.prototype.getError = function(options){
  return this.relativeObject[this.toUppCase(options)]
}



defaults.wrap.prototype.setRegister = function(options){
    this.relativeObject[this.toUppCase(options)] = [this.absoluteObject[options]]
}


defaults.wrap.prototype.getRegister = function(options){
  return this.relativeObject[this.toUppCase(options)]
}



defaults.wrap.prototype.setProps = function(options){
    this.relativeObject[this.toUppCase(options)] = [this.absoluteObject[options]]
}


defaults.wrap.prototype.getProps = function(options){
  return this.relativeObject[this.toUppCase(options)]
}


defaults.wrap.prototype.setMethods = function(options){
    this.relativeObject[this.toUppCase(options)] = [this.absoluteObject[options]]
}


defaults.wrap.prototype.getMethods = function(options){
  return this.relativeObject[this.toUppCase(options)]
}


defaults.wrap.prototype.validateKeyForLowerCase = function (){
  var lower

  for(var k in this.absoluteObject){
    lower = this.toLowCase(k)

    if(lower !== k){
      this.absoluteObject[lower] = this.absoluteObject[k]
      delete this.absoluteObject[k]
    }

  }
  return 1
}


defaults.wrap.prototype.initStaticMethods = function (){

  return {
    addClass : function (elem,cls){
      if(!hasClass(elem,cls)){
          elem.className+=" "+cls;
      }
    },
    hasClass : function (elem,cls){
      return elem.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
    },
    pushHtml : function (elem,cls){
      return document.getElementById(id).innerHTML=html;
    },
    removeClass : function (elem,cls){
      if(hasClass(elem,cls)){
          var reg=new RegExp('(\\s|^)'+cls+'(\\s|$)');
          elem.className=elem.className.replace(reg,"");
      }
    }
  }
}

defaults.wrap.prototype.staticMethods = function (){
  this.static.push(new this.initStaticMethods())
}


defaults.wrap.prototype.organization = function ( getArgs, location ){

  if(this.$promise.length > 0) {
    location = [this.$promise[0]]
  }

  var dist = location.push({
    'dist register': getArgs.getRegister[0],
    'dist props': getArgs.getProps[0],
    'dist methods': getArgs.getMethods[0]
  })

  if(this.$promise[0] instanceof Object){
    Object.assign(this.$promise[0], location.pop())
  }
  else this.$promise.push(location.shift())

  var _this = this

  return {
    count: defaults.stamp++,
    type: Array,
    isComplate: defaults.wrap.mess,
    state: 'successful distribution!',
    result: {
      get $promise() {
        return _this.$promise
      },
      set $promise( val ) {
        _this.$promise.mount = val
      }
    }
  }
}


defaults.wrap.prototype.analysisPlan = function ( giz ){
  var acceptPlan = giz.$promise
  var _this = this

  return {
    analysisProps: function () {
      return acceptPlan[acceptPlan.length-1]['dist props'](acceptPlan.mount)
    },

    analysisMethods: function () {
      var distMethods = acceptPlan[acceptPlan.length-1]

      distMethods.nail = {}

      // this is bottom $scope domain
      distMethods.nail.$scope = acceptPlan.mount()

      Object.assign(_this, distMethods.nail)

      distMethods.$scope = distMethods.nail.$scope[0].$scope

      var len = 0
      var keys

      for(var k in distMethods.$scope){
        if(distMethods.$scope[k].length > 0){
          Object.assign(distMethods.$scope[k], distMethods.$scope[k][distMethods.$scope[k].length-1])
          delete distMethods.$scope[k][distMethods.$scope[k].length-1]
          keys = Object.keys(distMethods.$scope[k])
        }
        distMethods.$scope[k].length = keys.length
        distMethods.$scope.length = ++len
        distMethods.$scope.type = 'object'
      }

      return acceptPlan[acceptPlan.length-1]['dist methods'](distMethods.$scope)
    }
  }
}


defaults.wrap.prototype.callHandlePlanGroup = function ( project, noticyFullPartment ){
  var report = []

  if(project instanceof Object) report = [project]

  report = project

  this.managePlanPartment = report

  this.managePlanPartment.progress = noticyFullPartment ? noticyFullPartment : defaults.wrap.mess

  defaults.wrap.managePlanPartment = this.managePlanPartment
}


defaults.wrap.prototype.callHandlePlanGroup.member = function ( project ){
  var getPlanContent = defaults.wrap.common[0].callHandlePlanGroup.managePlanPartment_lend.submitPlan

  return {
    information : function  () {
      return getPlanContent
    },

    // send the message to organization methods
    message : function  ( mess, _is ) {
      defaults.wrap.mess = [{
        message: mess,
        isTruth: _is ? true : false
      }]
    }
  }
}


defaults.wrap.prototype.callHandlePlanGroup.managePlanPartment_lend = function  ( select ) {
  var keys = Object.keys(defaults.wrap.managePlanPartment)
  var _number = keys.length

  var Ogroup = {}


  while(_number > 0){
    var eachKeys = keys.pop()
    Ogroup[eachKeys] = defaults.wrap.managePlanPartment[eachKeys]

    _number--
  }

  var out = Ogroup[select]

  defaults.wrap.common[0].callHandlePlanGroup.managePlanPartment_lend.recievPlan = out
  
  return [{
    num: _number,
    task: {
      out
    }
  }]
}


defaults.wrap.prototype.callHandlePlanGroup.Team_1 = function  () {
  var part = defaults.wrap.common[0].callHandlePlanGroup.managePlanPartment_lend

  var anyp = 'analysisProps'

  part(anyp)


  function plan_combo ( options ) {

    var knowTask = options[0]

    var state = 'state'

    this.props = new knowTask()

    if(typeof this.props === 'object'){

      if(state in this){

        this.state = this.props.state
      }
      else{
        this.$scope = this.props
      }
    }

    if( this.state !== undefined ) this.$scope.state = this.state


    return this
  }


  var getPlan_combo = plan_combo.call( this, part.recievPlan )
  delete this.state
  delete this.props

  part.submitPlan = getPlan_combo

  return {
    get $scope () {
      return getPlan_combo
    },
    set $scope (options) {
      return getPlan_combo
    }
  }
}


defaults.wrap.prototype.callHandlePlanGroup.Team_2 = function  () {
  var part = defaults.wrap.common[0].callHandlePlanGroup.managePlanPartment_lend

  var anym = 'analysisMethods'

  part(anym)

  function plan_combo ( options ) {

    var knowTask = options[0]

    this.methods = new knowTask()

    this.$methods = this.methods
    delete this.methods

    return this
  }

  var getPlan_combo = plan_combo.call( this, part.recievPlan )

  part.submitPlan = getPlan_combo

  return {
    get $methods () {
      return getPlan_combo.$methods
    },
    set $methods (options) {
      getPlan_combo.$methods.$scope = options
      getPlan_combo.$methods.el = function ( node ) {

        var _self = this
        var getAddClass = _self.addClass

        var gac = getAddClass.toString()
        var e = /(this.el)(\()(\))(\.)([a-zA-Z]|(\_)|($)|\d)*(\()((\s)*(([a-zA-Z]?(\d)*)|(\_)|(\$))+(\s)*?((\,)+(\s)*?([a-zA-Z]|(\_)|(\$)))*)*(\))/g
        var r_m = gac.match(e)
        var arr = []
        r_m.forEach(function(opt){
          var _opt = opt.replace('this.el().','')
          var INDEX = _opt.indexOf('(')
              INDEX = _opt.substr(0,INDEX)

          return arr.push(INDEX)
        })

        var invoked = {}
        invoked[arr[0]] = function () {
          return function (options){
            return defaults.wrap.common[0].static[0]['addClass'](options)
          }
        }

        part.submitPlan = invoked

        return invoked
      }
    }
  }
}


Object.defineProperties(defaults.wrap.prototype.callHandlePlanGroup.managePlanPartment_lend,{
  recievPlan: {
    get : function  () {
      return this.val
    },
    set : function  (options) {
      this.val = [options]
    }
  },
  submitPlan: {
    get : function  () {
      return this.data
    },
    set : function  (options) {
      this.data = [options]
    }
  }
})


defaults.wrap.prototype.appPool = function (){
  var Args = arguments[0]

  // used insert the Array of position
  var distState = this.organization( Args, [] )

  var getResults = distState.result
  var noticyFullPartment = defaults.wrap.mess

  var AOP = new this.analysisPlan( getResults )

  this.callHandlePlanGroup( AOP, noticyFullPartment )

  var COT1 = this.common[0].callHandlePlanGroup.Team_1

  var definetionProps = new COT1()

  var COM = this.common[0].callHandlePlanGroup.member(true)

  var getInfo = COM.information

  COM.message('get a props data',true)

  getResults.$promise = getInfo

  var COT2 = this.common[0].callHandlePlanGroup.Team_2

  var definetionMethods = new COT2()

  definetionMethods.$methods = definetionProps.$scope

  this.staticMethods()

  var subMethods = definetionMethods.$methods

  var publicMethods = definetionMethods.$methods.addClass( this.static )

  // boss will be take with content and data, form Team 2 group
  var giveBossOfData = COM.information

  COM.message('get a methods data',true)

  getResults.$promise = giveBossOfData

  // save output data to application pool
  var broadcast = ({giveBossOfData, subMethods})

  console.log(broadcast)
}


// return procssing ajax
defaults.wrap.fn = function bindObjectGroup(opt,fallback){
  var bindCall = new defaults.wrap(true)
  var empty = []

  if(typeof opt === 'string'){

    if(opt === 'ajax'){
      empty.length = 0
      defaults.wrap.chain 
      defaults.wrap.module = opt
    }
    else return false
  }


  if(typeof fallback === 'function'){

    if(empty.length) empty.length = 0
    else empty.push(fallback)

    defaults.wrap.chain = function (options){
      return [(new empty[0])]
    }

  }


  var resolveComplexFallback = bindCall.resolveComplexFallback(defaults.wrap.chain())
  var _customMethod = resolveComplexFallback.custom();



  if(typeof _customMethod === 'object'){
    // return boolean true
    var isTruth = bindCall.validateKeyForLowerCase();

    bindCall.setType('type')
    bindCall.setUrl('url')
    bindCall.setData('data')
    bindCall.getType('type')
    bindCall.getUrl('url')
    bindCall.getData('data')
    bindCall.setSuccess('success')
    bindCall.setError('error')
    bindCall.setRegister('register')
    bindCall.setProps('props')
    bindCall.setMethods('methods')
  }

  var getSuccess = bindCall.getSuccess('success')
  var getError =  bindCall.getError('error')
  var getRegister =  bindCall.getRegister('register')
  var getProps =  bindCall.getProps('props')
  var getMethods =  bindCall.getMethods('methods')

  // on the first, insert array to save
  bindCall.common.push(bindCall)
  defaults.wrap.common = bindCall.common

  // all resource be invoked on the pool
  bindCall.appPool({
    getRegister,
    getProps,
    getMethods
  })


  // dist property bound to this pointer
  var print = bindCall.nativeAjax(getSuccess.pop(), getError.pop())

  return print ? 'request json data success' : false
}


global.wrap['service'] = defaults.wrap.fn

})(this)








/*
合并其他分支上指定的文件或者文件夹到当前分支

git checkout branchName folderName
git checkout branchName path

注：一下都是在主分支master上执行的命令
1 把dev1 分支上app下所有的文件合并到主分支master上.
git checkout dev app

2 部分更新，如单独合并app/css/index.css到master主分支上.
git checkout dev app/css/index.css

3 部分文件夹dev分支上app的js文件夹下有多个JS文件都更新了.
git checkout dev app/js

合并过来的文件或者文件夹在主分支master上都是默认add过的，
然后需要在master分支上commit,再push即可完成合并更新！
*/