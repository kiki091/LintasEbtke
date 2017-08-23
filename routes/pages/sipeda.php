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
	Route::group(['prefix' =>'dashboard'], function()
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

					Route::group(['prefix' => 'proyek-power-producer'], function () {

						Route::get('/', 'Ebtke\Sipeda\ProyekPowerProducerController@index')->name('sipeda_proyek_power_producer');
						Route::get('data', 'Ebtke\Sipeda\ProyekPowerProducerController@getdata')->name('sipeda_proyek_power_producer_data');
						Route::post('store', 'Ebtke\Sipeda\ProyekPowerProducerController@store')->name('sipeda_proyek_power_producer_store');


						Route::post('get-data-kabupaten', 'Ebtke\Sipeda\ProyekPowerProducerController@getDataKabupaten')->name('sipeda_proyek_power_producer_get_data_kabupaten');
						Route::post('get-data-kecamatan', 'Ebtke\Sipeda\ProyekPowerProducerController@getDataKecamatan')->name('sipeda_proyek_power_producer_get_data_kecamatan');
						Route::post('get-data-desa', 'Ebtke\Sipeda\ProyekPowerProducerController@getDataDesa')->name('sipeda_proyek_power_producer_get_data_desa');
					});

					Route::group(['prefix' => 'investasi-power-producer'], function () {

						Route::get('/', 'Ebtke\Sipeda\InvestasiPowerProducerController@index')->name('sipeda_investasi_power_producer');
						Route::get('data', 'Ebtke\Sipeda\InvestasiPowerProducerController@getdata')->name('sipeda_investasi_power_producer_data');
						Route::post('store', 'Ebtke\Sipeda\InvestasiPowerProducerController@store')->name('sipeda_investasi_power_producer_store');
					});

					Route::group(['prefix' => 'investasi-pabrikan-aneka-ebt'], function () {

						Route::get('/', 'Ebtke\Sipeda\InvestasiPabrikanAnekaEbtController@index')->name('sipeda_investasi_pabrikan_aneka_ebt');
						Route::get('data', 'Ebtke\Sipeda\InvestasiPabrikanAnekaEbtController@getdata')->name('sipeda_investasi_pabrikan_aneka_ebt_data');
						Route::post('store', 'Ebtke\Sipeda\InvestasiPabrikanAnekaEbtController@store')->name('sipeda_investasi_pabrikan_aneka_ebt_store');

						Route::post('get-data-location', 'Ebtke\Sipeda\InvestasiPabrikanAnekaEbtController@getDataKabupatenByProvinsi')->name('sipeda_investasi_pabrikan_aneka_ebt_data_location');
					});

					Route::group(['prefix' => 'investasi-plts-rooftop'], function () {

						Route::get('/', 'Ebtke\Sipeda\InvestasiPltsRooftopController@index')->name('sipeda_investasi_plts_rooftop');
						Route::get('data', 'Ebtke\Sipeda\InvestasiPltsRooftopController@getdata')->name('sipeda_investasi_plts_rooftop_data');
						Route::post('store', 'Ebtke\Sipeda\InvestasiPltsRooftopController@store')->name('sipeda_investasi_plts_rooftop_store');

						Route::post('get-data-location', 'Ebtke\Sipeda\InvestasiPltsRooftopController@getDataKabupatenByProvinsi')->name('sipeda_investasi_plts_rooftop_data_location');
					});
				});
			});
			
		});
	});
});
