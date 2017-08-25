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
    const DEFAULT_SYSTEM_LOCATION_NAME = 'CMS';

    protected $systemLocationId = '';
    protected $systemLocationName = '';
    protected $systemLocationSlug = '';
    protected $isSpecific = false;


    /**
     * Set System Location CMS
     * @param $param
     */
    public function systemLocation()
    {
        $systemLocation = Request::segment(1);

        $systemLocationCollection     = SystemModels::orderBy('order', 'asc')->get()->toArray();
        
        if(empty($systemLocationCollection))
            return null;

        if (is_array($systemLocationCollection) && !empty($systemLocationCollection)) {
            foreach ($systemLocationCollection as $key => $value) {
               
                if($value['slug'] == $systemLocation) {

                    $this->isSpecific = true;
                    $this->systemLocationId = $value['id'];
                    $this->systemLocationName = $value['name'];
                    $this->systemLocationSlug = isset($value['slug']) ?$value['slug']:'';
                    break;
                }
            }
        }
        if (! $this->isSpecific) {

            $this->setSessionCurrentSystemLocation(self::DEFAULT_SYSTEM_LOCATION, '1', self::DEFAULT_SYSTEM_LOCATION_NAME);
            return self::DEFAULT_SYSTEM_LOCATION;

        } else {

            $this->setSessionCurrentSystemLocation($this->systemLocationSlug, $this->systemLocationId, $this->systemLocationName);
            
        }
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