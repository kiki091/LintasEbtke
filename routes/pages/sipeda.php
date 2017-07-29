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
	Route::group(['domain' => env('WORLD_WIDE_WEB') . env('SIPEDA_DOMAIN_PREFIX')], function()
	{
		Route::get('/', 'Ebtke\Sipeda\AuthController@index')->name('sipeda_login');
		Route::get('register', 'Ebtke\Sipeda\AuthController@register')->name('sipeda_register');
		Route::post('registered', 'Ebtke\Sipeda\AuthController@registered')->name('sipeda_registered');

		Route::post('auth', 'Ebtke\Sipeda\AuthController@authenticate')->name('sipeda_authenticate');
		Route::post('change-password', 'Ebtke\Sipeda\AuthController@changePassword')->name('sipeda_chenge_password');
		Route::get('logout', 'Ebtke\Sipeda\AuthController@logout')->name('sipeda_logout');

		Route::group(['middleware' => ['auth', 'sipeda.privilege']], function (){

			Route::group(['prefix' => 'dashboard'], function () {

				Route::get('/', 'Ebtke\Sipeda\DashboardController@index')->name('sipeda_dashboard');

		});
		
	});
});
