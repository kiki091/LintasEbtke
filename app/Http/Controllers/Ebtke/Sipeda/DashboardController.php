<?php

namespace App\Http\Controllers\Ebtke\Sipeda;

use Illuminate\Http\Request;
use App\Http\Controllers\SipedaBaseController;
use App\Custom\SipedaDataHelper;

use Carbon\Carbon;
use JavaScript;
use Auth;
use Session;
use Validator;
use Symfony\Component\VarDumper\Cloner\Data;
use URL;

class DashboardController extends SipedaBaseController
{
    public function __construct()
    {
        JavaScript::put([
            'href_url' => URL::current(),
            'app_domain' => env('SIPEDA_DOMAIN_PREFIX'),
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

        $blade = self::URL_BLADE_SIPEDA. '.dashboard';
        
        if(view()->exists($blade)) {
        
            return view($blade);

        }

        return abort(404);

    }
}