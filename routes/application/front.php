<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::group(['middleware' => ['web']], function () {

    Route::group(['domain' => env('DOMAIN_PREFIX') . env('APP_DOMAIN')], function () {
        Route::get('/', function() {
            return view('ebtke.front.pages.landing');

        })->name('frontHome');
    });

});




