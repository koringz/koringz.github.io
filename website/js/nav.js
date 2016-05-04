    var site_url = window.location.href.toLowerCase();
	//alert($("#nav li").eq(0).html());
	switch (true) {
		case site_url.indexOf("about") > 0 || site_url.indexOf("advantage") > 0 || site_url.indexOf("culture") > 0 || site_url.indexOf("course") > 0 || site_url.indexOf("partner") > 0 || site_url.indexOf("joinus") > 0:
			$(".nav li").attr("class","");
			$(".nav li").eq(0).attr("class","nav_lishw");
			$(".nav_lishw .aon a").attr("class","sele");
			break;
		case site_url.indexOf("case") > 0 || site_url.indexOf("client") > 0 || site_url.indexOf("evaluate") > 0:
			$(".nav li").attr("class","");
			$(".nav li").eq(1).attr("class","nav_lishw");
			$(".nav_lishw .aon a").attr("class","sele");
			break;
		case site_url.indexOf("solution") > 0 || site_url.indexOf("solution2") > 0 || site_url.indexOf("solution3") > 0 || site_url.indexOf("solution4") > 0 || site_url.indexOf("solution5") > 0:
			$(".nav li").attr("class","");
			$(".nav li").eq(2).attr("class","nav_lishw");
			$(".nav_lishw .aon a").attr("class","sele");
			break;
		case site_url.indexOf("cooperate") > 0 || site_url.indexOf("principle") > 0 || site_url.indexOf("cost") > 0:
			$(".nav li").attr("class","");
			$(".nav li").eq(3).attr("class","nav_lishw");
			$(".nav_lishw .aon a").attr("class","sele");
			break;
		case site_url.indexOf("opinion") > 0 || site_url.indexOf("news") > 0 || site_url.indexOf("faq") > 0 || site_url.indexOf("download") > 0:
			$(".nav li").attr("class","");
			$(".nav li").eq(4).attr("class","nav_lishw");
			$(".nav_lishw .aon a").attr("class","sele");
			break;
		case site_url.indexOf("contact") > 0 || site_url.indexOf("legal") > 0 || site_url.indexOf("sitemap") > 0:
			$(".nav li").attr("class","");
			$(".nav li").eq(5).attr("class","nav_lishw");
			$(".nav_lishw .aon a").attr("class","sele");
			break;

		default :
			//$(".nav li").attr("class","");
			//$(".nav li").eq(0).attr("class","nav_lishw");
			//$(".nav_lishw .aon a").attr("class","sele");
			//$(".nav_lishw .subnav").show();
	} 


	$(".nav li").hover(
		function(){
			$(".nav .subnav").hide(); 
			$(".nav li .aon .sele").attr("class","shutAhover");
			$(this).attr("id","nav_hover")
			$("#nav_hover .aon a").attr("class","sele");
			$("#nav_hover").find(".subnav").stop(true,false).slideDown(); 
		},
		function(){
			
			if($(this).attr("class") != "nav_lishw"){
				$("#nav_hover .aon .sele").attr("class","");
				$("#nav_hover .subnav").slideUp();
			}
			$(this).attr("id","")
			$(".nav li .aon .shutAhover").attr("class","sele");
			$(".nav_lishw").find("dl").slideUp();
			$(".nav_lishw .aon a").attr("class","sele");
		}
	);