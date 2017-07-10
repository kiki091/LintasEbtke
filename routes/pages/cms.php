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
