<?php

namespace App\Services\Auth;

use Route;
use Auth;
use Config;
use Session;
use App\Custom\Helper\SipedaDataHelper;
use Symfony\Component\VarDumper\Cloner\Data;

class SipedaPrivilegeChecker
{
    /**
     * A collection of role
     *
     * @access protected
     * @var    role
     */
    protected $role;


    /**
     * Is Public Method
     *
     * @var bool
     */
    protected $isPublicMethod = false;

    /**
     * public Method
     * @var array
     */
    protected $publicMethod = [
        'App\Http\Controllers\Ebtke\Sipeda\DashboardController@index'
    ];

    /**
     * Initiate some mandatory properties.
     *
     * @access public
     * @param  array    $role
     * @param  int      $system
     * @param  string   $controller
     * @param  string   $method
     */
    public function __construct($role = null)
    {
        if ($role == null)
        {
            $session = Session::get('sipeda_info');

            $role = isset($session['sipeda_privilage'][0]['role_name']) ? $session['sipeda_privilage'][0]['role_name'] : null;

        }

        $currentRoute = Route::currentRouteAction();

        $routeAction = explode('@', $currentRoute);

        if (in_array($currentRoute, $this->publicMethod)) {
            $this->isPublicMethod = true;
        }

        $this->role   = $role;
    }

    /**
     * Check whether the administrator is authorized to access certain methods
     *
     * @access public
     * @return bool
     */
    public function isAuthorized()
    {
        if ($this->isPublicMethod === true) {
            return true;
        }

        if (! isset($this->role)) {
            return false;
        }


        return true;
    }
}