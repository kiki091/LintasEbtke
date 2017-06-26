<?php

namespace App\Http\Controllers\Ebtke\Cms\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\CmsBaseController;
use App\Custom\DataHelper;
use App\Services\Bridge\Auth\Users as UserServices;
use App\Http\Middleware\UserPrivilege as UserPrivilegeServices;

use Auth;
use Session;
use Validator;

class DashboardController extends CmsBaseController
{
    const ROLE_ADMINISTRATOR = 'admin';
    const ROLE_USER = 'user';


    protected $user;
    protected $userPrivilege;

    public function __construct(UserPrivilegeServices $userPrivilege,UserServices $user)
    {
        $this->user = $user;
        $this->userPrivilege = $userPrivilege;
    }

    /**
     * Index Of Dashboard
     * @return string
     */
    public function index(Request $request)
    {
        //dd(DataHelper::userRole());

        $blade = self::URL_BLADE_CMS. '.dashboard';
        
        if(view()->exists($blade)) {
        
            return view($blade);

        }

        return abort(404);

    }
}