$(document).ready(function(){
  $('.func li').mouseover(function(){
  $(this).removeClass();	
  $(this).find('.mast').slideDown("fast");
  });
  $('.func li').mouseleave(function(){
   $(this).removeClass();
  $(this).find('.mast').slideUp("fast");
  });
});
$(function(){
	$("a,lable").focus(function(){
		this.blur();
	});
});
