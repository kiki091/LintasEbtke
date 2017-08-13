process.env.DISABLE_NOTIFIER = true;
var elixir = require('laravel-elixir');
require('laravel-elixir-browserify-official');
var gulp = require("gulp");

var sipeda_style_path = './public/themes/ebtke/sipeda/css/';
var sipeda_scripts_path = './public/themes/ebtke/sipeda/js/';
var sipeda_bower_path = './public/js/bower_components/';

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {

    mix.styles([
       	'font-awesome.css',
	    'bootstrap.css',
	    'notify__custom.css',
	    'nprogress.css',
	    'animate.css',
	    'custom.css',
	    'pop__up.css',
    ], 'public/themes/ebtke/sipeda/build/css/style.css',sipeda_style_path); 

    mix.styles([
       	'pacejs/pace-theme-flash.css',
	    'iCheck/skins/flat/flat.css',
	    'hold-on/HoldOn.min.css',
	    'sweetalert/dist/sweetalert.css',
	    'icheck-bootstrap/icheck-bootstrap.css',
	    'custom-scrollbar/jquery.mCustomScrollbar.min.css',
	    'air-datepicker-master/dist/css/datepicker.css',
	    'bootstrap-clockpicker/bootstrap-clockpicker.css',
	    'datetimepicker/build/jquery.datetimepicker.min.css',
	    'chosen/css/chosen.css',
    ], 'public/themes/ebtke/sipeda/build/css/plugins.css',sipeda_bower_path); 


    mix.scripts([
       	'jquery/dist/jquery.min.js',
	    'jquery/dist/jquery-ui.js',
	    'iCheck/icheck.min.js',
	    'hold-on/HoldOn.min.js',
	    'sweetalert/dist/sweetalert.min.js',
	    'notifyjs/dist/notify.js',
	    'gsap/src/minified/TweenMax.min.js',
	    'pnotify/dist/pnotify.js',
	    'custom-scrollbar/jquery.mCustomScrollbar.concat.min.js',
	    'air-datepicker-master/dist/js/datepicker.js',
	    'bootstrap-clockpicker/bootstrap-clockpicker.js',
	    'datetimepicker/build/jquery.datetimepicker.full.js',
	    'masonry/dist/masonry.pkgd.js',
	    'custom-file-input/custom-file-input.js',
	    'chosen/js/mootools-yui-compressed.js',
	    'chosen/js/mootools-more-1.4.0.1.js',
	    'chosen/js/chosen.js',
	    'chosen/js/Locale.en-US.Chosen.js',
    ], 'public/themes/ebtke/sipeda/build/js/plugins.js',sipeda_bower_path); 


    mix.scripts([
       	'bootstrap.min.js',
	    'custom.min.js',
	    'nprogress.js',
    ], 'public/themes/ebtke/sipeda/build/js/core.js',sipeda_scripts_path); 
    
});
