<?php

namespace App\Custom;

use Session;

class SipedaDataHelper {

    const DEFAULT_SYSTEM_LOCATION = 'CONTENT MANAGEMENT SYSTEM';
    /**
     * Get sipeda Info
     */
    public static function sipedaInfo()
    {
        return Session::get('sipeda_user_info');
    }

    /**
     * Get sipeda Id
     */

    public static function sipedaId()
    {
        $sipedaInfo = Session::get('sipeda_user_info');

        if (isset($sipedaInfo['sipeda_id'])) {
            return $sipedaInfo['sipeda_id'];
        }

        return false;
    }

	/**
     * Get sipeda Email
     */
    public static function sipedaEmail()
    {
        $sipedaInfo = Session::get('sipeda_user_info');

        if (isset($sipedaInfo['email'])) {
            return $sipedaInfo['email'];
        }

        return false;
    }

    /**
     * Get sipeda Name
     */

    public static function sipedaName()
    {
        $sipedaInfo = Session::get('sipeda_user_info');

        if (isset($sipedaInfo['nama_perusahaan'])) {
            return $sipedaInfo['nama_perusahaan'];
        }

        return false;
    }

    /**
     * Get sipeda Role
     */
    public static function sipedaRole()
    {
        $sipedaInfo = Session::get('sipeda_user_info');

        if (isset($sipedaInfo['sipeda_privilage'][0]['role_name'])) {

            return $sipedaInfo['sipeda_privilage'][0]['role_name'];
        }

        return false;
    }

    /**
     * Get sipeda Menu
     */

    public static function sipedaMenu()
    {
        $sipedaInfo = Session::get('sipeda_user_info');

        if (isset($sipedaInfo['sipeda_menu'])) {
            return $sipedaInfo['sipeda_menu'];
        }

        return false;
    }

    /**
     * Get sipeda Menu
     */

    public static function sipedaLocation()
    {
        $sipedaInfo = Session::get('sipeda_user_info');

        if (isset($sipedaInfo['sipeda_location']['slug'])) {
            return $sipedaInfo['sipeda_location']['slug'];
        }

        return false;
    }

    /**
     * Get System Location sipeda
     */

    public static function sipedaSystemLocation()
    {
        $sipedaInfo = Session::get('sipeda_user_info');
        $sipedaInfo['default_system_location'] = self::DEFAULT_SYSTEM_LOCATION;

        if (isset($sipedaInfo['system_location'])) {

            
            return $sipedaInfo['system_location'];
        }

        return false;
    }
}