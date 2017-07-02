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
