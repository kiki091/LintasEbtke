
jQuery("document").ready(function($){
	
	var nav = $('#navigation-menu');
	
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			nav.addClass("f-nav");
		} else {
			nav.removeClass("f-nav");
		}
	});
 
});