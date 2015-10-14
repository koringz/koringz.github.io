(function($){
    var $menu = $('.Framework >.Framework-container');
    var $menu_conn = $('.framework >.framework-product');
    if($menu){
        console.log('Framework-container')
    }else{
        try{
             Error('$container')
        }catch(e){
            return false;
        }
    }
    var view_li = $menu.find('.Framework-sidebar>.sidebar-content>.sidebar-trans >li');


    function ontouch(index){
        view_li.eq(index).bind('mouseover',function(){
            //console.log(typeof index);
            link_nav.eq(index).animate({'width':'180px'},0).siblings('.Framework-product-body').css('left','180px');
        });

        view_li.eq(index).bind('mouseout',function(){
            link_nav.eq(index ).animate({'width':'0px'},0).siblings('.Framework-product-body').css('left','0px');
        });
    };

    for(var i = 0;li_item = view_li.length, i < li_item; i++){
        var link_nav =$menu.children('.Framework-sidebar').siblings('.Framework-product').find('div.Framework-product-navbar');
        var index = 1;
        if(i == 0 )
        {
            if(i == false){
            ontouch(i);
        }
            if(index != i){
                ontouch(index);
                //console.log(index)
            }
        }
        else if(i>0){
            if(index++ < i){
                console.log(i);
                ontouch(i);
                index-- <= i;
            }
        }
    }

})(jQuery)