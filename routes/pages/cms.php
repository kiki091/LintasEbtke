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

				// SEO ROUTE CMS

				Route::group(['prefix' => 'seo'], function () {

					Route::group(['prefix' => 'home-pages'], function () {

						Route::get('/', 'Ebtke\Cms\Pages\Seo\SeoHomePagesController@index')->name('SeoHomePage');
						Route::get('data', 'Ebtke\Cms\Pages\Seo\SeoHomePagesController@getData')->name('SeoHomePageGetData');
						Route::post('store', 'Ebtke\Cms\Pages\Seo\SeoHomePagesController@store')->name('SeoHomePageStoreData');
						Route::post('edit', 'Ebtke\Cms\Pages\Seo\SeoHomePagesController@edit')->name('SeoHomePageEditData');
					});

					Route::group(['prefix' => 'company'], function () {

						Route::group(['prefix' => 'vision-mission'], function () {

							Route::get('/', 'Ebtke\Cms\Pages\Seo\SeoVisionMissionController@index')->name('SeoVisionMission');
							Route::get('data', 'Ebtke\Cms\Pages\Seo\SeoVisionMissionController@getData')->name('SeoVisionMissionGetData');
							Route::post('store', 'Ebtke\Cms\Pages\Seo\SeoVisionMissionController@store')->name('SeoVisionMissionStoreData');
							Route::post('edit', 'Ebtke\Cms\Pages\Seo\SeoVisionMissionController@edit')->name('SeoVisionMissionEditData');
						});

						Route::group(['prefix' => 'lintas-of-scope'], function () {
							
							Route::get('/', 'Ebtke\Cms\Pages\Seo\SeoLintasOfScopeController@index')->name('SeoLintasOfScope');
							Route::get('data', 'Ebtke\Cms\Pages\Seo\SeoLintasOfScopeController@getData')->name('SeoLintasOfScopeGetData');
							Route::post('store', 'Ebtke\Cms\Pages\Seo\SeoLintasOfScopeController@store')->name('SeoLintasOfScopeStoreData');
							Route::post('edit', 'Ebtke\Cms\Pages\Seo\SeoLintasOfScopeController@edit')->name('SeoLintasOfScopeEditData');
						});
					});

					Route::group(['prefix' => 'investment-services'], function () {

						Route::group(['prefix' => 'procedure'], function () {
							
							Route::get('/', 'Ebtke\Cms\Pages\Seo\SeoServicesProcedureController@index')->name('SeoServicesProcedure');
							Route::get('data', 'Ebtke\Cms\Pages\Seo\SeoServicesProcedureController@getData')->name('SeoServicesProcedureGetData');
							Route::post('store', 'Ebtke\Cms\Pages\Seo\SeoServicesProcedureController@store')->name('SeoServicesProcedureStoreData');
							Route::post('edit', 'Ebtke\Cms\Pages\Seo\SeoServicesProcedureController@edit')->name('SeoServicesProcedureEditData');
						});

						Route::group(['prefix' => 'green-pages'], function () {
							
							Route::get('/', 'Ebtke\Cms\Pages\Seo\SeoGreenPagesController@index')->name('SeoGreenPages');
							Route::get('data', 'Ebtke\Cms\Pages\Seo\SeoGreenPagesController@getData')->name('SeoGreenPagesGetData');
							Route::post('store', 'Ebtke\Cms\Pages\Seo\SeoGreenPagesController@store')->name('SeoGreenPagesStoreData');
							Route::post('edit', 'Ebtke\Cms\Pages\Seo\SeoGreenPagesController@edit')->name('SeoGreenPagesEditData');
						});
					});

					Route::group(['prefix' => 'news-and-event'], function () {

						Route::group(['prefix' => 'news-landing'], function () {

							Route::get('/', 'Ebtke\Cms\Pages\Seo\SeoNewsController@index')->name('SeoNewsPages');
							Route::get('data', 'Ebtke\Cms\Pages\Seo\SeoNewsController@getData')->name('SeoNewsPagesGetData');
							Route::post('store', 'Ebtke\Cms\Pages\Seo\SeoNewsController@store')->name('SeoNewsPagesStoreData');
							Route::post('edit', 'Ebtke\Cms\Pages\Seo\SeoNewsController@edit')->name('SeoNewsPagesEditData');
						});

						Route::group(['prefix' => 'events-landing'], function () {

							Route::get('/', 'Ebtke\Cms\Pages\Seo\SeoEventController@index')->name('SeoEventPages');
							Route::get('data', 'Ebtke\Cms\Pages\Seo\SeoEventController@getData')->name('SeoEventPagesGetData');
							Route::post('store', 'Ebtke\Cms\Pages\Seo\SeoEventController@store')->name('SeoEventPagesStoreData');
							Route::post('edit', 'Ebtke\Cms\Pages\Seo\SeoEventController@edit')->name('SeoEventPagesEditData');
						});
					});

					Route::group(['prefix' => 'renewable-energy'], function () {

						Route::group(['prefix' => 'industri'], function () {

							Route::get('/', 'Ebtke\Cms\Pages\Seo\SeoRenewableIndustriController@index')->name('SeoRenewableIndustriPages');
							Route::get('data', 'Ebtke\Cms\Pages\Seo\SeoRenewableIndustriController@getData')->name('SeoRenewableIndustriPagesGetData');
							Route::post('store', 'Ebtke\Cms\Pages\Seo\SeoRenewableIndustriController@store')->name('SeoRenewableIndustriPagesStoreData');
							Route::post('edit', 'Ebtke\Cms\Pages\Seo\SeoRenewableIndustriController@edit')->name('SeoRenewableIndustriPagesEditData');
						});
					});

					Route::group(['prefix' => 'resources'], function () {

						Route::group(['prefix' => 'tools'], function () {

							Route::get('/', 'Ebtke\Cms\Pages\Seo\SeoToolsController@index')->name('SeoToolsPages');
							Route::get('data', 'Ebtke\Cms\Pages\Seo\SeoToolsController@getData')->name('SeoToolsPagesGetData');
							Route::post('store', 'Ebtke\Cms\Pages\Seo\SeoToolsController@store')->name('SeoToolsPagesStoreData');
							Route::post('edit', 'Ebtke\Cms\Pages\Seo\SeoToolsController@edit')->name('SeoToolsPagesEditData');
						});

						Route::group(['prefix' => 'white-papers'], function () {

							Route::get('/', 'Ebtke\Cms\Pages\Seo\SeoWhitePaperController@index')->name('SeoWhitePaperPages');
							Route::get('data', 'Ebtke\Cms\Pages\Seo\SeoWhitePaperController@getData')->name('SeoWhitePaperPagesGetData');
							Route::post('store', 'Ebtke\Cms\Pages\Seo\SeoWhitePaperController@store')->name('SeoWhitePaperPagesStoreData');
							Route::post('edit', 'Ebtke\Cms\Pages\Seo\SeoWhitePaperController@edit')->name('SeoWhitePaperPagesEditData');
						});
					});
				});


				// MAIN BANNER ROUTE CMS 


				Route::group(['prefix' => 'main-banner'], function () {

					Route::get('/', 'Ebtke\Cms\Pages\MainBannerController@index')->name('CmsMainBannerIndex');
					Route::get('data', 'Ebtke\Cms\Pages\MainBannerController@getData')->name('CmsMainBannerGetData');
					Route::post('store', 'Ebtke\Cms\Pages\MainBannerController@store')->name('CmsMainBannerStoreData');
					Route::post('edit', 'Ebtke\Cms\Pages\MainBannerController@edit')->name('CmsMainBannerEditData');
					Route::post('change-status', 'Ebtke\Cms\Pages\MainBannerController@changeStatus')->name('CmsMainBannerChangeStatus');
					Route::post('delete', 'Ebtke\Cms\Pages\MainBannerController@delete')->name('CmsMainBannerDeleteData');
					Route::post('order', 'Ebtke\Cms\Pages\MainBannerController@order')->name('CmsMainBannerOrderData');
				});

				// ROUTE NEWS

				Route::group(['prefix' => 'news'], function () {

					Route::get('/', 'Ebtke\Cms\Pages\NewsController@index')->name('CmsNewsIndex');
					Route::get('data', 'Ebtke\Cms\Pages\NewsController@getData')->name('CmsNewsGetData');
					Route::post('store', 'Ebtke\Cms\Pages\NewsController@store')->name('CmsNewsStoreData');
					Route::post('edit', 'Ebtke\Cms\Pages\NewsController@edit')->name('CmsNewsEditData');
					Route::post('change-status', 'Ebtke\Cms\Pages\NewsController@changeStatus')->name('CmsNewsChangeStatus');
					Route::post('delete', 'Ebtke\Cms\Pages\NewsController@delete')->name('CmsNewsDeleteData');
					Route::post('order', 'Ebtke\Cms\Pages\NewsController@order')->name('CmsNewsOrderData');
					Route::post('order-images-slider', 'Ebtke\Cms\Pages\NewsController@orderImageSlider')->name('CmsNewsOrderDataImageSlider');
					Route::post('edit-slider', 'Ebtke\Cms\Pages\NewsController@editImageSlider')->name('CmsNewsEditImageSlider');
					Route::post('delete-slider', 'Ebtke\Cms\Pages\NewsController@deleteImageSlider')->name('CmsNewsDeleteImageSlider');
				});

				// ROUTE ENENT

				Route::group(['prefix' => 'event'], function () {

					Route::get('/', 'Ebtke\Cms\Pages\EventController@index')->name('CmsEventIndex');
					Route::get('data', 'Ebtke\Cms\Pages\EventController@getData')->name('CmsEventGetData');

					Route::post('store', 'Ebtke\Cms\Pages\EventController@store')->name('CmsEventStoreData');
					Route::post('edit', 'Ebtke\Cms\Pages\EventController@edit')->name('CmsEventEditData');
					Route::post('change-status', 'Ebtke\Cms\Pages\EventController@changeStatus')->name('CmsEventChangeStatus');
					Route::post('delete', 'Ebtke\Cms\Pages\EventController@delete')->name('CmsEventDeleteData');
					Route::post('order', 'Ebtke\Cms\Pages\EventController@order')->name('CmsEventOrderData');
					Route::post('order-images-slider', 'Ebtke\Cms\Pages\EventController@orderImageSlider')->name('CmsEventOrderDataImageSlider');
					Route::post('edit-slider', 'Ebtke\Cms\Pages\EventController@editImageSlider')->name('CmsEventEditImageSlider');
					Route::post('delete-slider', 'Ebtke\Cms\Pages\EventController@deleteImageSlider')->name('CmsEventDeleteImageSlider');
				});

				// ROUTE COMPANY

				Route::group(['prefix' => 'company'], function () {


					// ROUTE COMPANY HISTORY
					Route::group(['prefix' => 'history'], function () {

						Route::get('/', 'Ebtke\Cms\Pages\CompanyHistoryController@index')->name('CompanyHistoryIndex');
						Route::get('data', 'Ebtke\Cms\Pages\CompanyHistoryController@getData')->name('CompanyHistoryGetData');
						Route::post('store', 'Ebtke\Cms\Pages\CompanyHistoryController@store')->name('CompanyHistoryStoreData');
						Route::post('edit', 'Ebtke\Cms\Pages\CompanyHistoryController@edit')->name('CompanyHistoryEditData');

						Route::post('store-banner', 'Ebtke\Cms\Pages\CompanyHistoryController@storeBanner')->name('CompanyHistoryStoreBannerImages');
						Route::post('edit-banner', 'Ebtke\Cms\Pages\CompanyHistoryController@editBanner')->name('CompanyHistoryEditBanner');
					});

				});

				// ROUTE INVESTMENT SERVICES
				
				Route::group(['prefix' => 'investment-services'], function () {

					// ROUTE SERVICES
					Route::group(['prefix' => 'services'], function () {

						Route::get('/', 'Ebtke\Cms\Pages\InvestmentServicesController@index')->name('InvestmentServicesIndex');
						Route::get('data', 'Ebtke\Cms\Pages\InvestmentServicesController@getData')->name('InvestmentServicesGetData');
						Route::post('store', 'Ebtke\Cms\Pages\InvestmentServicesController@store')->name('InvestmentServicesStoreData');
						Route::post('edit', 'Ebtke\Cms\Pages\InvestmentServicesController@edit')->name('InvestmentServicesEditData');
						Route::post('change-status', 'Ebtke\Cms\Pages\InvestmentServicesController@changeStatus')->name('InvestmentServicesChangeStatus');
						Route::post('delete', 'Ebtke\Cms\Pages\InvestmentServicesController@delete')->name('InvestmentServicesDeleteData');
						Route::post('order', 'Ebtke\Cms\Pages\InvestmentServicesController@order')->name('InvestmentServicesOrderData');
						Route::post('edit-slider', 'Ebtke\Cms\Pages\InvestmentServicesController@editImageSlider')->name('InvestmentServicesEditImageSlider');
						Route::post('delete-slider', 'Ebtke\Cms\Pages\InvestmentServicesController@deleteImageSlider')->name('InvestmentServicesDeleteImageSlider');
					});

					// ROUTE GREEN PAGES
					Route::group(['prefix' => 'green-pages'], function () {

						Route::group(['prefix' => 'category'], function () {

							Route::get('/', 'Ebtke\Cms\Pages\GreenPagesCategoryController@index')->name('GreenPagesCategoryIndex');
							Route::get('data', 'Ebtke\Cms\Pages\GreenPagesCategoryController@getData')->name('GreenPagesCategoryGetData');
							Route::post('store', 'Ebtke\Cms\Pages\GreenPagesCategoryController@store')->name('GreenPagesCategoryStoreData');
							Route::post('edit', 'Ebtke\Cms\Pages\GreenPagesCategoryController@edit')->name('GreenPagesCategoryEditData');
							Route::post('change-status', 'Ebtke\Cms\Pages\GreenPagesCategoryController@changeStatus')->name('GreenPagesCategoryChangeStatus');
							Route::post('delete', 'Ebtke\Cms\Pages\GreenPagesCategoryController@delete')->name('GreenPagesCategoryDeleteData');
							Route::post('order', 'Ebtke\Cms\Pages\GreenPagesCategoryController@order')->name('GreenPagesCategoryOrderData');
						});

						Route::group(['prefix' => 'index'], function () {
							Route::get('/', 'Ebtke\Cms\Pages\GreenPagesController@index')->name('GreenPagesIndex');
							Route::get('data', 'Ebtke\Cms\Pages\GreenPagesController@getData')->name('GreenPagesGetData');

							Route::post('store', 'Ebtke\Cms\Pages\GreenPagesController@store')->name('GreenPagesStoreData');
							Route::post('edit', 'Ebtke\Cms\Pages\GreenPagesController@edit')->name('GreenPagesEditData');
							Route::post('change-status', 'Ebtke\Cms\Pages\GreenPagesController@changeStatus')->name('GreenPagesChangeStatus');
							Route::post('delete', 'Ebtke\Cms\Pages\GreenPagesController@delete')->name('GreenPagesDeleteData');
							Route::post('order', 'Ebtke\Cms\Pages\GreenPagesController@order')->name('GreenPagesOrderData');
							Route::post('order-images-slider', 'Ebtke\Cms\Pages\GreenPagesController@orderImageSlider')->name('GreenPagesOrderDataImageSlider');
							Route::post('edit-slider', 'Ebtke\Cms\Pages\GreenPagesController@editImageSlider')->name('GreenPagesEditImageSlider');
							Route::post('delete-slider', 'Ebtke\Cms\Pages\GreenPagesController@deleteImageSlider')->name('GreenPagesDeleteImageSlider');
						});
					});
				});

				// ROUTE RESOURCES
				
				Route::group(['prefix' => 'resources'], function () {

					// ROUTE WHITE PAPERS
					
					Route::group(['prefix' => 'white-papers'], function () {

						Route::get('/', 'Ebtke\Cms\Pages\WhitePapersController@index')->name('WhitePapersIndex');
						Route::get('data', 'Ebtke\Cms\Pages\WhitePapersController@getData')->name('WhitePapersGetData');

						Route::post('store', 'Ebtke\Cms\Pages\WhitePapersController@store')->name('WhitePapersStoreData');
						Route::post('edit', 'Ebtke\Cms\Pages\WhitePapersController@edit')->name('WhitePapersEditData');
						Route::post('change-status', 'Ebtke\Cms\Pages\WhitePapersController@changeStatus')->name('WhitePapersChangeStatus');
						Route::post('delete', 'Ebtke\Cms\Pages\WhitePapersController@delete')->name('WhitePapersDeleteData');
						Route::post('order', 'Ebtke\Cms\Pages\WhitePapersController@order')->name('WhitePapersOrderData');

					});

					// ROUTE TOOLS
					
					Route::group(['prefix' => 'tools'], function () {

						Route::get('/', 'Ebtke\Cms\Pages\ToolsController@index')->name('ToolsIndex');
						Route::get('data', 'Ebtke\Cms\Pages\ToolsController@getData')->name('ToolsGetData');
						Route::post('store', 'Ebtke\Cms\Pages\ToolsController@store')->name('ToolsStoreData');
						Route::post('edit', 'Ebtke\Cms\Pages\ToolsController@edit')->name('ToolsEditData');
						Route::post('change-status', 'Ebtke\Cms\Pages\ToolsController@changeStatus')->name('ToolsChangeStatus');
						Route::post('delete', 'Ebtke\Cms\Pages\ToolsController@delete')->name('ToolsDeleteData');
						Route::post('order', 'Ebtke\Cms\Pages\ToolsController@order')->name('ToolsOrderData');

					});
				});

			});

			// ACCOUNT MANAGEMENT ROUTE

			Route::group(['prefix' => 'ams'], function () {

				// MENU GROUP MANAGEMENT ROUTE

				Route::group(['prefix' => 'menu-group'], function ()
				{
					Route::get('/', 'Ebtke\Cms\Pages\Auth\MenuGroupController@index')->name('CmsMenuGroupManager');
					Route::get('data', 'Ebtke\Cms\Pages\Auth\MenuGroupController@getData')->name('CmsMenuGroupManagerGetData');
					Route::post('change-status', 'Ebtke\Cms\Pages\Auth\MenuGroupController@changeStatus')->name('CmsMenuGroupManagerChangeStatus');
				});

				// MENU NAVIGATION MANAGEMENT ROUTE

				Route::group(['prefix' => 'menu-navigation'], function ()
				{
					Route::get('/', 'Ebtke\Cms\Pages\Auth\MenuNavigationController@index')->name('CmsMenuNavigation');
					Route::get('data', 'Ebtke\Cms\Pages\Auth\MenuNavigationController@getData')->name('CmsMenuNavigationGetData');
					Route::post('change-status', 'Ebtke\Cms\Pages\Auth\MenuNavigationController@changeStatus')->name('CmsMenuNavigationChangeStatus');
				});

				// SUB MENU NAVIGATION MANAGEMENT ROUTE

				Route::group(['prefix' => 'sub-menu-navigation'], function ()
				{
					Route::get('/', 'Ebtke\Cms\Pages\Auth\SubMenuNavigationController@index')->name('CmsSubMenuNavigation');
					Route::get('data', 'Ebtke\Cms\Pages\Auth\SubMenuNavigationController@getData')->name('CmsSubMenuNavigationGetData');
					Route::post('change-status', 'Ebtke\Cms\Pages\Auth\SubMenuNavigationController@changeStatus')->name('CmsSubMenuNavigationChangeStatus');
				});

				// USER ACCOUNT MANAGEMENT ROUTE

				Route::group(['prefix' => 'user-account'], function ()
				{
					Route::get('/', 'Ebtke\Cms\Pages\Auth\UserAccountController@index')->name('CmsUserAccount');
					Route::get('data', 'Ebtke\Cms\Pages\Auth\UserAccountController@getData')->name('CmsUserAccountGetData');
					Route::post('change-status', 'Ebtke\Cms\Pages\Auth\UserAccountController@changeStatus')->name('CmsUserAccountChangeStatus');
					Route::post('store', 'Ebtke\Cms\Pages\Auth\UserAccountController@store')->name('CmsUserAccountStoreData');
					Route::post('edit', 'Ebtke\Cms\Pages\Auth\UserAccountController@edit')->name('CmsUserAccountEditData');
				});
			});
		});
		
	});
});
