<?php

namespace App\Custom;

use LaravelLocalization;
use Request;
use App\Redis\MenuLocation as MenuLocationRedis;
use App\Models\Auth\Location as LocationModels;
use App\Models\Auth\System as SystemModels;
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
    const DEFAULT_SYSTEM_LOCATION = 'cms';

    protected $systemLocationId = '';
    protected $systemLocationName = '';
	/**
     * Set Menu Location
     * @return null
     */
    public function setMenuLocation()
    {
        $menuLocation = Request::segment(1);

        $redisKey                   = MenuLocationRedis::MENU_LOCATION;
        $menuLocationCollection     = Cache::rememberForever($redisKey, function() {

            return LocationModels::get()->toArray();

        });
        
        if(empty($menuLocationCollection))
            return null;

        foreach ($menuLocationCollection as $key => $value) {
           
            if($value['slug'] == $menuLocation) {
                $isExists = true;
                break;
            }
            $isExists = false;
        }

        if(!$isExists) {

            Session::forget('current_menu_location');

            $this->setSessionCurrentMenuLocation('');

            return self::DEFAULT_USER_MENU;
        }


        $this->setSessionCurrentMenuLocation($menuLocation);

        return $menuLocation;

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


    /**
     * Set System Location CMS
     * @param $param
     */
    public function systemLocation()
    {
        $systemLocation = Request::segment(2);

        $systemLocationCollection     = SystemModels::orderBy('order', 'asc')->get()->toArray();
        
        if(empty($systemLocationCollection))
            return null;

        foreach ($systemLocationCollection as $key => $value) {
           
            if($value['slug'] == $systemLocation) {
                $this->systemLocationId = $value['id'];
                $this->systemLocationName = $value['name'];
                $isExists = true;
                break;
            }
            $isExists = false;
        }

        if(!$isExists) {

            return self::DEFAULT_SYSTEM_LOCATION;
        }

        $this->setSessionCurrentSystemLocation($systemLocation, $this->systemLocationId, $this->systemLocationName);

        return $systemLocation;
    }

    /**
     * Set Session Current Menu
     * @param $param
     */
    public function setSessionCurrentSystemLocation($param, $id, $name)
    {
        Session::forget('current_system_location');
        Session::forget('current_system_location_id');
        Session::forget('current_system_location_name');

        Session::put('current_system_location', $param);
        Session::put('current_system_location_id', $id);
        Session::put('current_system_location_name', $name);
    }

}