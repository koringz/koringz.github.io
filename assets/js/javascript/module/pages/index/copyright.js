var korginz = (function(doc){
  var body = doc.querySelector('body');
  var footer = body.querySelector('.main-footer');

  var side_bar = body.querySelector('.get-sidebar');

  var data_left1 = side_bar.getAttribute('data-left');
  var data_left2 = side_bar.dataset.left;

  function get_h(get_height_value) {
    var fifth = 50;
    var val = parseInt(get_height_value).toString();
    // console.log(typeof val);
    var  top_val = val - fifth;
    footer.style.marginTop = '' + top_val + 'px';
  }
  get_h.prototype.def = function () {
    if (typeof data_left2 == 'string' ) {
      var get_height = side_bar.offsetHeight;
      get_h(get_height);
      console.log(parseInt(get_height));

    }else {
      console.log('error')
    }

  }


  // console.log(data_left2)


})(document)
