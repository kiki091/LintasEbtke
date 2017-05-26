<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::group(['middleware' => ['web']], function () 
{
	Route::group(['domain' => env('WORLD_WIDE_WEB') . env('DOMAIN_PREFIX') . env('APP_DOMAIN')], function()
	{
		Route::group(['prefix' => LaravelLocalization::setLocale(), 'middleware' => ['localize', 'localeSessionRedirect', 'localizationRedirect']], function ()
		{

			Route::get('/', 'Pusri\Front\Pages\MainController@index')->name('MainPage');

			Route::group(['prefix' => RouteMenuLocation::setMenuLocation()], function () {

				Route::get(LaravelLocalization::transRoute('/{slug}'), 'Pusri\Front\Pages\CompanyController@profile')->name('CompanyProfile');
			});

		});

	});
});
