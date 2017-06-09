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
		Route::group(['prefix' => LaravelLocalization::setLocale(), 'middleware' => ['localize']], function ()
		{

			Route::get('/', 'Ebtke\Front\Pages\MainController@index')->name('MainPage');

			Route::group(['prefix' => LaravelLocalization::transRoute('routes.news')], function () {

				Route::get('/', 'Ebtke\Front\Pages\NewsController@landing')->name('landingNews');
				Route::get(LaravelLocalization::transRoute('routes.news_detail'), 'Ebtke\Front\Pages\NewsController@detail')->name('detailNews');
			});

			Route::group(['prefix' => LaravelLocalization::transRoute('routes.event')], function () {

				Route::get('/', 'Ebtke\Front\Pages\EventController@landing')->name('landingEvent');
				Route::get(LaravelLocalization::transRoute('routes.event_detail'), 'Ebtke\Front\Pages\EventController@detail')->name('detailEvent');
			});

			Route::group(['prefix' => LaravelLocalization::transRoute('routes.company')], function () {

				Route::get(LaravelLocalization::transRoute('routes.history'), 'Ebtke\Front\Pages\CompanyController@history')->name('CompanyHistory');
				
				Route::get(LaravelLocalization::transRoute('routes.vision_and_mission'), 'Ebtke\Front\Pages\CompanyController@visionMision')->name('CompanyVisionMission');
				
				Route::get(LaravelLocalization::transRoute('routes.organization_structure'), 'Ebtke\Front\Pages\CompanyController@organizationStructure')->name('CompanyOrganization');
				
				Route::get(LaravelLocalization::transRoute('routes.scope_of_services'), 'Ebtke\Front\Pages\CompanyController@scopeServices')->name('CompanyScope');
			});

		});

	});
});
