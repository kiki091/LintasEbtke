<?php

namespace App\Custom;

use Session;

class DataHelper {

    const DEFAULT_SYSTEM_LOCATION = 'CONTENT MANAGEMENT SYSTEM';
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

        if (isset($userInfo['id'])) {
            return $userInfo['id'];
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
        $userInfo['default_system_location'] = self::DEFAULT_SYSTEM_LOCATION;

        if (isset($userInfo['system_location'])) {

            
            return $userInfo['system_location'];
        }

        return false;
    }
}