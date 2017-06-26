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
	Route::group(['domain' => env('WORLD_WIDE_WEB') . env('ACCOUNT_DOMAIN_PREFIX')], function()
	{
		Route::get('/', 'Ebtke\Cms\MainController@index')->name('login');
		Route::get('register', 'Ebtke\Cms\AuthController@register')->name('register');
		Route::post('registered', 'Ebtke\Cms\AuthController@registered')->name('registered');

		Route::post('auth', 'Ebtke\Cms\AuthController@authenticate')->name('authenticate');
		Route::post('change-password', 'Ebtke\Cms\AuthController@changePassword')->name('ChangePassword');
		Route::get('logout', 'Ebtke\Cms\AuthController@logout')->name('logout');

		Route::group(['middleware' => ['auth', 'user.privilege']], function (){

			Route::group(['prefix' => RouteMenuLocation::setMenuLocation()], function () {

				Route::get('/', 'Ebtke\Cms\Pages\DashboardController@index')->name('CmsDashboardPage');
			});
		});
		
	});
});
