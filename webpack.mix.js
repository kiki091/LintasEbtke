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
    //'public/themes/ebtke/front/css/bootstrap.min.css',
    'public/themes/ebtke/front/css/animate.min.css',
    'public/themes/ebtke/front/css/loader.css',
    'public/themes/ebtke/front/css/style.default.css',
    'public/themes/ebtke/front/css/custom.css',
    'public/themes/ebtke/front/css/slider-def.css',
    'public/themes/ebtke/front/css/gallery.css',
    'public/themes/ebtke/front/css/news.css',
    'public/themes/ebtke/front/css/font.css',
    'public/themes/ebtke/front/css/owl.carousel.css',
    'public/themes/ebtke/front/css/owl.theme.css',
    'public/themes/ebtke/front/css/icomoon.css',
    'public/themes/ebtke/front/css/custom-slider.css',
    'public/themes/ebtke/front/css/style-slider.css',
    'public/themes/ebtke/front/css/responsives.css',
], 'public/themes/ebtke/front/build/css/plugins.css');


/* script compile */

mix.scripts([
	'public/themes/ebtke/front/js/jquery-1-8-2.min.js',
	'public/themes/ebtke/front/js/modernizr.custom.79639.js',
	'public/themes/ebtke/front/js/bootstrap.min.js',
	'public/themes/ebtke/front/js/scroll-menu.js',
	'public/themes/ebtke/front/js/respond.min.js',
	'public/themes/ebtke/front/js/jquery.cookie.js',
	'public/themes/ebtke/front/js/front.js',
	'public/themes/ebtke/front/js/myscript.js',
], 'public/themes/ebtke/front/build/js/plugins.js');

mix.scripts([
	//'public/themes/ebtke/front/js/jquery.ba-cond.min.js',
	'public/themes/ebtke/front/js/jquery.slitslider.js',
	'public/themes/ebtke/front/js/plugins-slider.js',
	'public/themes/ebtke/front/js/owl.carousel.min.js',
	'public/themes/ebtke/front/js/jquery.stellar.min.js',
	'public/themes/ebtke/front/js/wow.min.js',
	'public/themes/ebtke/front/js/waypoints.min.js',
	'public/themes/ebtke/front/js/smoothscroll.js',
	'public/themes/ebtke/front/js/theme.js',
], 'public/themes/ebtke/front/build/js/animation.js');