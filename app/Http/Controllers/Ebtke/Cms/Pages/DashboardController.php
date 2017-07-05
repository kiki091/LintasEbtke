<?php

namespace App\Http\Controllers\Ebtke\Cms\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\CmsBaseController;
use App\Custom\DataHelper;
use App\Services\Bridge\Auth\Users as UserServices;
use App\Http\Middleware\UserPrivilege as UserPrivilegeServices;

use Carbon\Carbon;
use JavaScript;
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

        JavaScript::put([
            'supported_language' => $this->setSuportedLanguage(),
            'supported_language_keys' => $this->setSuportedLanguageKey(),
            'lintas_default_language' => 'id',
            'app_domain' => env('ACCOUNT_DOMAIN_PREFIX'),
            'token' => csrf_token(),
        ]);
    }

    /**
     * Index Of Dashboard
     * @return string
     */
    public function index(Request $request)
    {
        //dd(DataHelper::userInfo());

        $blade = self::URL_BLADE_CMS. '.dashboard';
        
        if(view()->exists($blade)) {
        
            return view($blade);

        }

        return abort(404);

    }
}