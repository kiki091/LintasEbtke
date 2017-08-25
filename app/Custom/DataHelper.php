<?php

namespace App\Custom;

use Session;

class DataHelper {

    const DEFAULT_SYSTEM_LOCATION = 'cms';
    /**
     * Get User Info
     */
    public static function userInfo()
    {
        return Session::get('user_info');
    }

    /**
     * Get User Id
     */

    public static function userId()
    {
        $userInfo = Session::get('user_info');

        if (isset($userInfo['user_id'])) {
            return $userInfo['user_id'];
        }

        return false;
    }

	/**
     * Get User Email
     */
    public static function userEmail()
    {
        $userInfo = Session::get('user_info');

        if (isset($userInfo['email'])) {
            return $userInfo['email'];
        }

        return false;
    }

    /**
     * Get User Name
     */

    public static function userName()
    {
        $userInfo = Session::get('user_info');

        if (isset($userInfo['name'])) {
            return $userInfo['name'];
        }

        return false;
    }

    /**
     * Get User Role
     */
    public static function userRole()
    {
        $userInfo = Session::get('user_info');

        if (isset($userInfo['user_privilage'][0]['role_name'])) {

            return $userInfo['user_privilage'][0]['role_name'];
        }

        return false;
    }

    /**
     * Get User Menu
     */

    public static function userMenu()
    {
        $userInfo = Session::get('user_info');

        if (isset($userInfo['user_menu'])) {
            return $userInfo['user_menu'];
        }

        return false;
    }

    /**
     * Get User Menu
     */

    public static function userLocation()
    {
        $userInfo = Session::get('user_info');

        if (isset($userInfo['user_location']['slug'])) {
            return $userInfo['user_location']['slug'];
        }

        return false;
    }

    /**
     * Get System Location User
     */

    public static function userSystemLocation()
    {   
        $userInfo = Session::get('user_info');
        $userInfo['system_name'] = Session::get('current_system_location_name');

        if (isset($userInfo['system_location'])) {

            return $userInfo;
        }

        return false;
    }

    /**
     * Get Current System Id
     * @return bool
     */
    public static function currentSystemId()
    {
        if(!Session::Has('current_system_location_id'))
            return false;

        return Session::get('current_system_location_id');
    }

    /**
     * Get Current System Id
     * @return bool
     */
    public static function currentSystemName()
    {
        if(!Session::Has('current_system_location_name'))
            return false;

        return Session::get('current_system_location_name');
    }
}