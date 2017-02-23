/*
  Auther : null.
  Date : 2017-02-23.
  content : foreach Array method.
*/

var a = [],
    o = {},
    obj = {},
    b = function(){},
    n = null,
    defaults,
    body = document.querySelector('body');


/*
First, define b() mehtod prototype of the object.
*/
b.prototype = {

  zone :function  ( opt ) { return opt },

  one :function  ( opt ) { return opt },

  two :function  ( opt ) {return 'you could be pointer me. let.s speaking to 123.zone one two! gogogo'},

  three :function  ( opt ) { return opt },

  four :function  ( opt ) { return opt },

  five :function  ( opt ) { return opt },

  six :function  ( opt ) { return opt },

  seven :function  ( opt ) { return opt },

  eight :function  ( opt ) { return opt },

  nine :function  ( opt ) { return opt },

};





/*
this is a very important part of isEventsBindLister() method.
*/
function  isEventsBindLister( opts ) {
      var 
      z = 0,
      r = [],
      d = null,
      cheers = {

        styles :'body,html{margin:0;padding:0}',

        observers : {}

      };


      r = ['zone','one','two','three','four','five','six','seven','eight','nine'];

      var __once_observers_B = new b();

      for (var i =  0,len = r.length; i < len ; i++) {

          a.push(__once_observers_B[r[i]]);

          cheers[r[i]] = a[i];

      };


      return {

        __once_observers_B : __once_observers_B, // 调用外部 b() 函数的方法  

        cheers : cheers,  // 调用内部 cheers 对象

        a : a  // 调用内部 a 数组

      };

};


/*
Now this is output new a method .for example @ new isEventsBindLister().
*/
var __output_results = new isEventsBindLister();


/*
  into the Array.[] that maybe cycle each methods#
  @ __Array_a [fun1,fun2...]#
  define object##
*/
var __Array_a = __output_results.a;



for (var l = __Array_a.length,j =0 ; j < l; j++) {

  var __foreach_arr_method_changed =  __Array_a[j];

      addIntoListers( __foreach_arr_method_changed , j );

};





function addIntoListers ( opts , num ) {
    var y = [];
    var __number = num;

    if (opts) {

        var __complate_value = opts(__number);
        y.push(__complate_value);
        
    };

    n = setTimeout(function  () {
      body.innerHTML += y + ' , ';
    },2000)

};





// console.log(__output_results.a);
// console.log(__output_results.cheers);
// console.log(__output_results.__once_observers_B);

// __output_results.cheers.two()

