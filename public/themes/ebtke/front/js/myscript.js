var fixed_menu = true;
window.jQuery = window.$ = jQuery;


/*-----------------------------------------------------------------------------------*/
/*	PRELOADER
/*-----------------------------------------------------------------------------------*/
jQuery(window).load(function () {
	//Preloader
	setTimeout("jQuery('#preloader').animate({'opacity' : '0'},300,function(){jQuery('#preloader').hide()})",800);
	setTimeout("jQuery('.preloader_hide, .selector_open').animate({'opacity' : '1'},500)",1000);
	setTimeout("jQuery('footer').animate({'opacity' : '1'},500)",2000);

});

jQuery(document).ready(function(){
    $('.count__number').each(function () {
        
        var data = $(this).prop('Counter',0).animate({
            Counter: $(this).text()
            
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
});

jQuery(document).ready(function() {
	setTimeout(function(){
		$('.manic-image-container img').css('opacity','1')
	}, 3000);
	
})

/*-----------------------------------------------------------------------------------*/
/*	MENU
/*-----------------------------------------------------------------------------------*/
function calculateScroll() {
	var contentTop      =   [];
	var contentBottom   =   [];
	var winTop      =   $(window).scrollTop();
	var rangeTop    =   200;
	var rangeBottom =   500;
	$('.navmenu').find('.scroll_btn a').each(function(){
		contentTop.push( $( $(this).attr('href') ).offset().top );
		contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
	})
	$.each( contentTop, function(i){
		if ( winTop > contentTop[i] - rangeTop && winTop < contentBottom[i] - rangeBottom ){
			$('.navmenu li.scroll_btn')
			.removeClass('active')
			.eq(i).addClass('active');			
		}
	})
};

jQuery(document).ready(function() {
	//MobileMenu
	if ($(window).width() < 768){
		jQuery('.menu_block .container').prepend('<a href="javascript:void(0)" class="menu_toggler"><span class="fa fa-align-justify"></span></a>');
		jQuery('header .navmenu').hide();
		jQuery('.menu_toggler, .navmenu ul li a').click(function(){
			jQuery('header .navmenu').slideToggle(300);
		});
	}
		
	// if single_page
	if (jQuery("#page").hasClass("single_page")) {			
	}
	else {
		$(window).scroll(function(event) {
			calculateScroll();
		});
		$('.navmenu ul li a, .mobile_menu ul li a, .btn_down').click(function() {  
			$('html, body').animate({scrollTop: $(this.hash).offset().top - 80}, 1000);
			return false;
		});
	};
});


jQuery(window).resize(function(){
	homeHeight();
	
});

jQuery(document).ready(function(){
	homeHeight();
	
});

function homeHeight(){
	var wh = jQuery(window).height() - 80;
	jQuery('.top_slider, .top_slider .slides li').css('height', wh);
}

/*-----------------------------------------------------------------------------------*/
/*	IFRAME TRANSPARENT
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function() {
	$("iframe").each(function(){
		var ifr_source = $(this).attr('src');
		var wmode = "wmode=transparent";
		if(ifr_source.indexOf('?') != -1) {
		var getQString = ifr_source.split('?');
		var oldString = getQString[1];
		var newString = getQString[0];
		$(this).attr('src',newString+'?'+wmode+'&'+oldString);
		}
		else $(this).attr('src',ifr_source+'?'+wmode);
	});
});







/*-----------------------------------------------------------------------------------*/
/*	BLOG MIN HEIGHT
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function() {
	blogHeight();
});

jQuery(window).resize(function(){
	blogHeight();
});

function blogHeight(){
	if ($(window).width() > 991){
		var wh = jQuery(window).height() - 80;
		jQuery('#blog').css('min-height', wh);
	}
	
}







/*-----------------------------------------------------------------------------------*/
/*	FOOTER HEIGHT
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function() {
	contactHeight();
});

jQuery(window).resize(function(){
	contactHeight();
});

function contactHeight(){
	if ($(window).width() > 991){
		var wh = jQuery('footer').height() + 70;
		jQuery('#contacts').css('min-height', wh);
	}
	

}





/*-----------------------------------------------------------------------------------*/
/*	FOOTER MAP
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function() {
	jQuery('.map_show').click(function(){
		jQuery('#map').addClass('showed');
	});
	
	jQuery('.map_hide').click(function(){
		jQuery('#map').removeClass('showed');
	});
});

