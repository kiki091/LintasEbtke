<?php

namespace App\Custom;

use LaravelLocalization;
use Request;
use App\Redis\MenuLocation as MenuLocationRedis;
use App\Models\Auth\Location as LocationModels;
use App\Models\Auth\Users as UsersModels;
use App\Custom\Facades\DataHelper;
use Cache;
use Session;
use Auth;
use Route;

class RouteMenuLocation {

    const DEFAULT_MENU = '/';
	const DEFAULT_USER_MENU = 'user';
    const DEFAULT_ADMIN_MENU = 'admin';

	/**
     * Set Menu Location
     * @return null
     */
    public function setMenuLocation()
    {
        $menuLocation = Request::segment(1);

        $menuLocationCollection     = $this->getSessionMenuLocationList();
        
        if(empty($menuLocationCollection))
            return null;

        foreach ($menuLocationCollection as $key => $value) {
           
            $menuLocation = $value['slug'];
            $menuLocationUrl = $menuLocation;
        }


        $this->setSessionCurrentMenuLocation($menuLocationUrl);

        return $menuLocationUrl;

    }

    /**
    * Get Session Menu Location List
    * @return array
    */
    public function getSessionMenuLocationList()
    {   
        
        $redisKey                   = MenuLocationRedis::MENU_LOCATION;
        $menuLocationCollection     = Cache::rememberForever($redisKey, function() {

            return LocationModels::get()->toArray();

        });
        
        return $menuLocationCollection;
                

    }

    /**
     * Set Session Current Menu
     * @param $param
     */
    public function setSessionCurrentMenuLocation($param)
    {
        Session::forget('current_menu_location');
        Session::put('current_menu_location', $param);
    }

}