
var elixir = require('laravel-elixir');
 
require('laravel-elixir-browserify-official');
var gulp = require("gulp");
 
elixir(function(mix) {
    mix.browserify('cart/app.js','public/themes/ebtke/sipeda/build/js/app.js'); // src, output, baseDir, browserify-options 
});