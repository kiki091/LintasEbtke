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

			Route::get('/', 'Ebtke\Front\Pages\MainController@index')->name('MainPage');

			Route::group(['prefix' => 'news'], function () {

				Route::get('/', 'Ebtke\Front\Pages\NewsController@landing')->name('landingNews');
				Route::get('detail/{slug}', 'Ebtke\Front\Pages\NewsController@detail')->name('detailNews');
			});

			Route::group(['prefix' => 'event'], function () {

				Route::get('/', 'Ebtke\Front\Pages\EventController@landing')->name('landingEvent');
				Route::get('detail/{slug}', 'Ebtke\Front\Pages\EventController@detail')->name('detailEvent');
			});

			Route::group(['prefix' => 'company'], function () {

				Route::get('history', 'Ebtke\Front\Pages\CompanyController@history')->name('CompanyHistory');
				Route::get('vision-and-mission', 'Ebtke\Front\Pages\CompanyController@visionMision')->name('CompanyVisionMission');
				Route::get('organization-structure', 'Ebtke\Front\Pages\CompanyController@organizationStructure')->name('CompanyOrganization');
				Route::get('scope-of-services', 'Ebtke\Front\Pages\CompanyController@scopeServices')->name('CompanyScope');
			});

		});

	});
});
