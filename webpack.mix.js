const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// for plugin css
mix.styles([
    'public/themes/ebtke/front/css/bootstrap.css',
    'public/themes/ebtke/front/css/maps/jquery-jvectormap-2.0.3.css',
    'public/themes/ebtke/front/css/raleway-webfont.css',
    'public/themes/ebtke/front/css/helvetica-webfont.css',
    'public/themes/ebtke/front/css/animate.min.css',
    'public/themes/ebtke/front/css/accordion.css',
    'public/themes/ebtke/front/css/loader.css',
    'public/themes/ebtke/front/css/style.default.css',
    'public/themes/ebtke/front/css/custom.css',
    'public/themes/ebtke/front/css/w3style.css',
    'public/themes/ebtke/front/css/slider-def.css',
    'public/themes/ebtke/front/css/gallery.css',
    'public/themes/ebtke/front/css/news.css',
    'public/themes/ebtke/front/css/font.css',
    //'public/themes/ebtke/front/css/carousel.css',
    'public/themes/ebtke/front/css/owl.carousel.css',
    'public/themes/ebtke/front/css/owl.theme.css',
    'public/themes/ebtke/front/css/icomoon.css',
    'public/themes/ebtke/front/css/custom-slider.css',
    'public/themes/ebtke/front/css/style-slider.css',
    'public/themes/ebtke/front/css/responsives.css',
    'public/themes/ebtke/front/css/menu.css',
    'public/js/bower_components/toastr/toastr.css',
    'public/js/bower_components/fullcalendar/dist/fullcalendar.min.css',
    'public/js/bower_components/fullcalendar/dist/print.css',
], 'public/themes/ebtke/front/build/css/plugins.css');


/* script compile */

mix.scripts([
	'public/themes/ebtke/front/js/jquery-2.1.1.js',
	'public/themes/ebtke/front/js/jquery.mixitup.min.js',
	'public/js/bower_components/toastr/toastr.min.js',
	'public/js/bower_components/jquery.scrollTo/jquery.scrollTo.min.js',
	/*'public/themes/ebtke/front/js/maps/jquery-jvectormap-2.0.3.min.js',
	'public/themes/ebtke/front/js/maps/jquery-jvectormap-us-aea-en.js',
	'public/themes/ebtke/front/js/maps/jquery-jvectormap-asia-merc.js',
	'public/themes/ebtke/front/js/maps/jquery-jvectormap-world-mill-en.js',
	'public/themes/ebtke/front/js/maps/gdp-data.js',*/
	'public/js/maps/mapdata.js',
	'public/js/maps/countrymap.js',
	'public/themes/ebtke/front/js/modernizr.js',
	'public/themes/ebtke/front/js/bootstrap.min.js',
	'public/themes/ebtke/front/js/scroll-menu.js',
	'public/themes/ebtke/front/js/respond.min.js',
	'public/themes/ebtke/front/js/jquery.cookie.js',
	'public/themes/ebtke/front/js/front.js',
	'public/themes/ebtke/front/js/myscript.js',
	'public/themes/ebtke/front/js/menu.js',
], 'public/themes/ebtke/front/build/js/plugins.js');

mix.scripts([
	//'public/themes/ebtke/front/js/jquery-jvectormap-2.0.3.min.js',
	'public/themes/ebtke/front/js/jquery.slitslider.js',
	//'public/themes/ebtke/front/js/plugins-slider.js',
	'public/themes/ebtke/front/js/owl.carousel.min.js',
	'public/themes/ebtke/front/js/jquery.stellar.min.js',
	'public/themes/ebtke/front/js/wow.min.js',
	'public/themes/ebtke/front/js/waypoints.min.js',
	'public/themes/ebtke/front/js/smoothscroll.js',
	'public/themes/ebtke/front/js/theme.js',
	'public/js/bower_components/moment/min/moment.min.js',
	'public/js/bower_components/fullcalendar/dist/fullcalendar.min.js',
], 'public/themes/ebtke/front/build/js/animation.js');

/**
 * CMS Style And Javascript
 */

mix.styles([
    'public/themes/ebtke/cms/css/font-awesome.css',
    'public/themes/ebtke/cms/css/bootstrap.css',
    'public/themes/ebtke/cms/css/notify__custom.css',
    'public/themes/ebtke/cms/css/nprogress.css',
    'public/themes/ebtke/cms/css/animate.css',
    'public/themes/ebtke/cms/css/custom.css',
    'public/themes/ebtke/cms/css/pop__up.css',
    'public/js/bower_components/pacejs/pace-theme-flash.css',
    'public/js/bower_components/iCheck/skins/flat/flat.css',
    'public/js/bower_components/hold-on/HoldOn.min.css',
    'public/js/bower_components/sweetalert/dist/sweetalert.css',
    'public/js/bower_components/icheck-bootstrap/icheck-bootstrap.css',
    'public/js/bower_components/custom-scrollbar/jquery.mCustomScrollbar.min.css',
    'public/js/bower_components/air-datepicker-master/dist/css/datepicker.css',
    'public/js/bower_components/bootstrap-clockpicker/bootstrap-clockpicker.css',
    'public/js/bower_components/datetimepicker/build/jquery.datetimepicker.min.css',
], 'public/themes/ebtke/cms/build/css/style.css');


mix.scripts([
	'public/js/bower_components/jquery/dist/jquery.min.js',
	'public/js/bower_components/jquery/dist/jquery-ui.js',
    'public/js/bower_components/iCheck/icheck.min.js',
	'public/js/bower_components/hold-on/HoldOn.min.js',
	'public/js/bower_components/sweetalert/dist/sweetalert.min.js',
    'public/js/bower_components/notifyjs/dist/notify.js',
    'public/js/bower_components/gsap/src/minified/TweenMax.min.js',
    'public/js/bower_components/pnotify/dist/pnotify.js',
    'public/js/bower_components/custom-scrollbar/jquery.mCustomScrollbar.concat.min.js',
    'public/js/bower_components/air-datepicker-master/dist/js/datepicker.js',
    'public/js/bower_components/bootstrap-clockpicker/bootstrap-clockpicker.js',
    'public/js/bower_components/datetimepicker/build/jquery.datetimepicker.full.js',
    'public/js/bower_components/masonry/dist/masonry.pkgd.js',
], 'public/themes/ebtke/cms/build/js/plugins.js');

mix.scripts([
	'public/themes/ebtke/cms/js/bootstrap.min.js',
    'public/js/bower_components/custom-file-input/custom-file-input.js',
	//'public/js/bower_components/pacejs/pace.js',
	'public/themes/ebtke/cms/js/custom.min.js',
	'public/themes/ebtke/cms/js/nprogress.js',
], 'public/themes/ebtke/cms/build/js/core.js');