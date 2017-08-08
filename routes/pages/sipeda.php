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
	// 
	//Route::group(['domain' => env('WORLD_WIDE_WEB') . env('SIPEDA_DOMAIN_PREFIX')], function()
	Route::group(['prefix' =>'sipedia'], function()
	{
		Route::get('/', 'Ebtke\Sipeda\AuthController@index')->name('sipeda_login');
		Route::get('register', 'Ebtke\Sipeda\AuthController@register')->name('sipeda_register');
		Route::post('registered', 'Ebtke\Sipeda\AuthController@registered')->name('sipeda_registered');

		Route::post('auth', 'Ebtke\Sipeda\AuthController@authenticate')->name('sipeda_authenticate');
		Route::post('change-password', 'Ebtke\Sipeda\AuthController@changePassword')->name('sipeda_chenge_password');
		Route::get('logout', 'Ebtke\Sipeda\AuthController@logout')->name('sipeda_logout');

		Route::group(array('prefix' => 'success'), function () {
			Route::get('/', function () {
		        return view('ebtke.sipeda.pages.auth.success-notif');
		    });
		});

		Route::group(['middleware' => ['sipeda', 'sipeda.privilege']], function (){

			Route::group(['prefix' => 'dashboard'], function () {

				Route::get('/', 'Ebtke\Sipeda\DashboardSipediaController@index')->name('sipeda_dashboard');

				Route::group(['prefix' => 'capacity-building'], function () {

					Route::get('/', 'Ebtke\Sipeda\CapacityBuildingController@index')->name('sipeda_capacity_building');
					Route::get('data', 'Ebtke\Sipeda\CapacityBuildingController@getdata')->name('sipeda_capacity_building_data');
					Route::post('store', 'Ebtke\Sipeda\CapacityBuildingController@store')->name('sipeda_capacity_building_store');
					Route::post('edit', 'Ebtke\Sipeda\CapacityBuildingController@edit')->name('sipeda_capacity_building_edit');
					Route::post('delete', 'Ebtke\Sipeda\CapacityBuildingController@delete')->name('sipeda_capacity_building_delete');
					Route::post('publish', 'Ebtke\Sipeda\CapacityBuildingController@publish')->name('sipeda_capacity_building_publish');
				});

				Route::group(['prefix' => 'proyek-power-procedure'], function () {

					Route::get('/', 'Ebtke\Sipeda\ProyekPowerProsedureController@index')->name('sipeda_proyek_power_procedure');
				});
			});
		});
		
	});
});
