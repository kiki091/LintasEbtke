
jQuery("document").ready(function($){
	
	var nav = $('#header__content');
	
	$(document).scroll(function () {
		if ($(this).scrollTop() > 150) {
			nav.addClass("fix_menu");
		} else {
			nav.removeClass("fix_menu");
		}
	});
 
});