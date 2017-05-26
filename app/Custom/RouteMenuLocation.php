<?php

namespace App\Custom;

use LaravelLocalization;
use Request;
use App\Redis\MenuLocation as MenuLocationRedis;
use App\Models\TopNavigation;
use App\Models\Navigation as NavigationModel;
use App\Models\NavigationTrans as NavigationTransModel;
use Cache;
use Session;
use Route;

class RouteMenuLocation {

	const DEFAULT_MENU_LOCATION = '/';
	/**
     * Set Menu Location
     * @return null
     */
    public function setMenuLocation()
    {
        $menuLocation = Request::segment(1);

        if( $this->urlWithLocaleKeys() ) {
            $menuLocation = Request::segment(2);

        }


        $menuLocationCollection     = $this->getSessionMenuLocationList();

        if(empty($menuLocationCollection))
            return null;
        
        foreach($menuLocationCollection as $key => $value) {

            if($value['menu_tran']['slug'] == $menuLocation && $value['menu_tran']['locale'] == Request::segment(1)) {
           
                $isExists = true;
                break;
            }
            $isExists = false;
        }

        if(!$isExists) {
            
            Session::forget('current_menu_location');

            if(strpos(Request::url(), env('DOMAIN_PREFIX')) !== false) {
                $this->setSessionCurrentMenuLocation(self::DEFAULT_MENU_LOCATION);
                return null;
            }

            Session::forget('current_menu_location');
            
        }

        $this->setSessionCurrentMenuLocation($menuLocation);

        return $menuLocation;
    }

    /**
     * @return bool
     */
    private function urlWithLocaleKeys()
    {
        $supportLocale  = LaravelLocalization::getSupportedLanguagesKeys();
        $locale         = Request::segment(1);

        if( in_array($locale, $supportLocale) ) {
            return true;
        }

        return false;
    }

    /**
    * Get Session Menu Location List
    * @return array
    */
    public function getSessionMenuLocationList()
    {   
        
        /*$redisKey                   = MenuLocationRedis::MENU_LOCATION_COLLECTION;
        $menuLocationCollection     = Cache::rememberForever($redisKey, function() {

            return NavigationModel::isActive(true)->with('menu_tran')->orderBy('order','asc')->get()->toArray();

        });
        
        return $menuLocationCollection;*/

        $menuLocationCollection     =  NavigationModel::isActive(true)->with('menu_tran')->orderBy('order','asc')->get()->toArray();

        
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
     * Get Top Menu Navigation
     * @return array
     */
    public function getTopMenuNavigation()
    {
        $topMenuNavigation     = TopNavigation::isActive(true)->with('top_menu_tran')->orderBy('order','asc')->get()->toArray();

        $finalData = $this->setTopNavigationTransform($topMenuNavigation);

        if(empty($finalData))
            return null;

        return $finalData;
    }

    // Set Transformation Top Navigation

    protected function setTopNavigationTransform($data)
    {
        $dataTranform = array_map(function($data)
        {
            return [
                'top_menu'          => $this->getTopNavigationTranslation($data['top_menu_tran'])
            ];

        },$data);

        return $dataTranform;
        
    }

    // Get Transformation Top Navigation Translation

    protected function getTopNavigationTranslation($data)
    {
        $dataTranform['locale']       = isset($data['locale']) ? $data['locale'] : '';
        $dataTranform['title']        = isset($data['title']) ? strtoupper($data['title']) : '';
        $dataTranform['slug']         = isset($data['slug']) ? $data['slug'] : '';

        return $dataTranform;
    }

    /**
     * Get Menu Navigation
     * @return array
     */
    public function getMainMenuNavigation()
    {
        $menuNavigation     = NavigationModel::isActive(true)->with('menu_tran')->with('sub_menu')->orderBy('order','asc')->get()->toArray();

        $finalData = $this->setNavigationTransform($menuNavigation);

        if(empty($finalData))
            return null;

        return $finalData;
    }

    /**
     * Set Menu Navigation Translation
     * @return array
     */

    protected function setNavigationTransform($data)
    {
        $dataTranform = array_map(function($data)
        {
            return [
                'menu'          => [
                    'class'             => isset($data['class']) ? $data['class'] : '',
                    'menu_trans'        => $this->getNavigationTranslation($data['menu_tran']),
                ],
                'sub_menu' => $this->getSubNavigationTranslation($data['sub_menu']['sub_menu_tran'])
            ];

        },$data);
        
        return $dataTranform;
        
    }

    // Get Transformation Navigation Translation

    protected function getNavigationTranslation($data)
    {
        $dataTranform['locale'] = isset($data['locale']) ? $data['locale'] : '';
        $dataTranform['title']  = isset($data['title']) ? strtoupper($data['title']) : '';
        $dataTranform['slug']   = isset($data['slug']) ? $data['slug'] : '';

        return $dataTranform;


    }

    // Get Transformation Sub Navigation Translation

    protected function getSubNavigationTranslation($data)
    {
        
        $dataTranform = array_map(function($data)
        {
            return [
            
                'locale'        => isset($data['locale']) ? $data['locale'] : '',
                'title'         => isset($data['title']) ? strtoupper($data['title']) : '',
                'slug'          => isset($data['slug']) ? $data['slug'] : '',
            ];
        },$data);

        // krsort($dataTranform);
        $rows = ceil(count($dataTranform) / 5); // calculate slice to 5 items per row
        $piecesSub_nav = array_chunk($dataTranform, ceil(count($dataTranform) / $rows), true);

        return $piecesSub_nav;
    }

}