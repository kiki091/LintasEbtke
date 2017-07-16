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
	Route::group(['domain' => env('WORLD_WIDE_WEB') . env('APP_DOMAIN')], function()
	{
		Route::group(['prefix' => LaravelLocalization::setLocale(), 'middleware' => ['localize','localizationRedirect','localeSessionRedirect']], function ()
		{

			Route::get('/', 'Ebtke\Front\Pages\MainController@index')->name('MainPage');

			// CONTACT US

			Route::post('/contact-us', 'Ebtke\Front\Pages\ContactUsController@store')->name('StoreContactUs');

			// NEWS ROUTE

			Route::group(['prefix' => LaravelLocalization::transRoute('routes.news')], function () {

				Route::get('/', 'Ebtke\Front\Pages\NewsController@landing')->name('landingNews');
				Route::get(LaravelLocalization::transRoute('routes.news_detail'), 'Ebtke\Front\Pages\NewsController@detail')->name('detailNews');

				// News By Category
				
				Route::group(['prefix' => LaravelLocalization::transRoute('routes.tags')], function () {
					Route::get('{slug}', 'Ebtke\Front\Pages\NewsController@getNewsByCategory')->name('NewsByCategory');
				});
			});

			// EVENT ROUTE

			Route::group(['prefix' => LaravelLocalization::transRoute('routes.event')], function () {

				Route::get('/', 'Ebtke\Front\Pages\EventController@landing')->name('landingEvent');
				Route::get('data', 'Ebtke\Front\Pages\EventController@getData')->name('GetDataEvent');
				Route::get(LaravelLocalization::transRoute('routes.event_detail'), 'Ebtke\Front\Pages\EventController@detail')->name('detailEvent');
			});

			// COMPANY ROUTE

			Route::group(['prefix' => LaravelLocalization::transRoute('routes.company')], function () {

				Route::get(LaravelLocalization::transRoute('routes.history'), 'Ebtke\Front\Pages\CompanyController@history')->name('CompanyHistory');
				
				Route::get(LaravelLocalization::transRoute('routes.vision_and_mission'), 'Ebtke\Front\Pages\CompanyController@visionMision')->name('CompanyVisionMission');
				
				Route::get(LaravelLocalization::transRoute('routes.organization_structure'), 'Ebtke\Front\Pages\CompanyController@organizationStructure')->name('CompanyOrganization');
				
				Route::get(LaravelLocalization::transRoute('routes.scope_of_services'), 'Ebtke\Front\Pages\CompanyController@scopeServices')->name('CompanyScope');
			});

			// INVESTMENT SERVICES ROUTE

			Route::group(['prefix' => LaravelLocalization::transRoute('routes.investment_services')], function () {

				Route::get('/', 'Ebtke\Front\Pages\InvestmentServicesController@landing')->name('InvestmentServicesLanding');
				Route::get(LaravelLocalization::transRoute('routes.detail'), 'Ebtke\Front\Pages\InvestmentServicesController@detail')->name('InvestmentServicesDetail');

				// POTENTIALS ROUTE

				Route::group(['prefix' => LaravelLocalization::transRoute('routes.investment_services_potentials')], function () {

					// GEOTHERMAL ROUTE

					Route::group(['prefix' => LaravelLocalization::transRoute('routes.investment_potentials_geothermal')], function () {

						Route::get('/', 'Ebtke\Front\Pages\GeothermalController@landing')->name('InvestmentServicesPotentialsGeothermalLanding');

						Route::get(LaravelLocalization::transRoute('routes.maps'), 'Ebtke\Front\Pages\GeothermalController@maps')->name('InvestmentServicesPotentialsGeothermal');

					});

					// BIO ENERGY ROUTE

					Route::get(LaravelLocalization::transRoute('routes.investment_potentials_bio_energy'), 'Ebtke\Front\Pages\BioEnergyController@maps')->name('InvestmentServicesPotentialsBioEnergy');

					//OTHER ROUTE

					Route::get(LaravelLocalization::transRoute('routes.investment_potentials_other'), 'Ebtke\Front\Pages\PotentialController@other')->name('InvestmentServicesPotentialsOther');

					// ENERGY CONSERVATION ROUTE

					Route::group(['prefix' => LaravelLocalization::transRoute('routes.investment_potentials_conservation')], function () {

						Route::get('/', 'Ebtke\Front\Pages\EnergyConservationController@landing')->name('InvestmentServicesPotentialsEnergyConservation');
						Route::get(LaravelLocalization::transRoute('routes.detail'), 'Ebtke\Front\Pages\EnergyConservationController@detail')->name('InvestmentServicesPotentialsEnergyConservationDetail');
						Route::get('maps_data', 'Ebtke\Front\Pages\EnergyConservationController@maps')->name('InvestmentServicesPotentialsEnergyConservationMapsData');
					});
				});

				// Green Pages

				Route::group(['prefix' => LaravelLocalization::transRoute('routes.green_pages')], function () {

					Route::get('/', 'Ebtke\Front\Pages\GreenPagesController@landing')->name('InvestmentServicesGreenPages');

					Route::get(LaravelLocalization::transRoute('routes.detail'), 'Ebtke\Front\Pages\GreenPagesController@detail')->name('InvestmentServicesGreenPagesDetail');
					
				});

				// Procedure

				Route::get(LaravelLocalization::transRoute('routes.investment_services_procedure'), 'Ebtke\Front\Pages\ProcedureController@landing')->name('InvestmentServicesProcedure');
			});

			// RESOURCES ROUTE

			Route::group(['prefix' => LaravelLocalization::transRoute('routes.resources')], function (){

				// TOOLS ROUTE
				Route::group(['prefix' => LaravelLocalization::transRoute('routes.tools')], function () {

					Route::get('/', 'Ebtke\Front\Pages\ToolsController@landing')->name('Tools');
					Route::get('{slug}', 'Ebtke\Front\Pages\ToolsController@detail')->name('ToolsDetail');
					
					
				});


				// WHITE PAPERS  ROUTE

				Route::group(['prefix' => LaravelLocalization::transRoute('routes.papers')], function () {

					Route::get('/', 'Ebtke\Front\Pages\WhitePaperController@landing')->name('WhitePapers');
					Route::get('{slug}', 'Ebtke\Front\Pages\WhitePaperController@detail')->name('DetailWhitePapers');
					
				});
			});

			// INFORMATION SERVICES ROUTE

			Route::group(['prefix' => LaravelLocalization::transRoute('routes.information_services')], function () {
				
				// INFORMATION SERVICES RENEWABLE ENERGI ROUTE

				Route::group(['prefix' => LaravelLocalization::transRoute('routes.renewable_energi')], function () {

					// INFORMATION SERVICES RENEWABLE ENERGI INDUSTRI ROUTE

					Route::group(['prefix' => LaravelLocalization::transRoute('routes.industry')], function () {

						Route::get('/', 'Ebtke\Front\Pages\IndustriController@landing')->name('IndusrtiLanding');
						Route::get(LaravelLocalization::transRoute('routes.detail'), 'Ebtke\Front\Pages\IndustriController@detail')->name('IndusrtiDetail');
					});
					
				});
			});

			// CONSULTING SERVICES
			
			Route::group(['prefix' => LaravelLocalization::transRoute('routes.consulting_services')], function () {
				
				Route::get('/', 'Ebtke\Front\Pages\ConsultingServicesController@landing')->name('ConsultingServices');
				
			});

		});

	});
});
