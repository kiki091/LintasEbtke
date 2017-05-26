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
    'public/themes/pusri/front/css/bootstrap.css',
    'public/themes/pusri/front/css/bootstrap.min.css',
    'public/themes/pusri/front/css/animate.min.css',
    'public/themes/pusri/front/css/loader.css',
    'public/themes/pusri/front/css/style.default.css',
    'public/themes/pusri/front/css/custom.css',
    'public/themes/pusri/front/css/slider-def.css',
    'public/themes/pusri/front/css/gallery.css',
    'public/themes/pusri/front/css/news.css',
    'public/themes/pusri/front/css/font.css',
    'public/themes/pusri/front/css/owl.carousel.css',
    'public/themes/pusri/front/css/owl.theme.css',
    'public/themes/pusri/front/css/icomoon.css',
    'public/themes/pusri/front/css/custom-slider.css',
    'public/themes/pusri/front/css/style-slider.css',
    'public/themes/pusri/front/css/responsives.css',
], 'public/themes/pusri/front/build/css/plugins.css');


/* script compile */

mix.scripts([
	'public/themes/pusri/front/js/jquery-1-8-2.min.js',
	'public/themes/pusri/front/js/modernizr.custom.79639.js',
	'public/themes/pusri/front/js/bootstrap.min.js',
	'public/themes/pusri/front/js/scroll-menu.js',
	'public/themes/pusri/front/js/respond.min.js',
	'public/themes/pusri/front/js/jquery.cookie.js',
	'public/themes/pusri/front/js/front.js',
	'public/themes/pusri/front/js/myscript.js',
], 'public/themes/pusri/front/build/js/plugins.js');

mix.scripts([
	'public/themes/pusri/front/js/jquery.ba-cond.min.js',
	'public/themes/pusri/front/js/jquery.slitslider.js',
	'public/themes/pusri/front/js/plugins-slider.js',
	'public/themes/pusri/front/js/owl.carousel.min.js',
	'public/themes/pusri/front/js/jquery.stellar.min.js',
	'public/themes/pusri/front/js/wow.min.js',
	'public/themes/pusri/front/js/waypoints.min.js',
	'public/themes/pusri/front/js/smoothscroll.js',
	'public/themes/pusri/front/js/theme.js',
], 'public/themes/pusri/front/build/js/animation.js');