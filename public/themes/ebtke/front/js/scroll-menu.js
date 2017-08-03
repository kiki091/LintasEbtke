
jQuery("document").ready(function($){
	
	var nav = $('#header__content');
	
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			nav.addClass("fix_menu");
		} else {
			nav.removeClass("fix_menu");
		}
	});
 
});