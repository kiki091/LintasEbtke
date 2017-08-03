<?php

namespace App\Http\Controllers\Ebtke\Cms;

use Illuminate\Http\Request;
use App\Http\Controllers\CmsController;
use App\Services\Api\Response as ResponseService;
use Illuminate\Routing\Route;

use JavaScript;
use Auth;
use Session;
use URL;

class MainController extends CmsController
{

    protected $response;


    public function __construct( ResponseService $response)
    {
        $this->response = $response;

        JavaScript::put([
            'href_url' => URL::current(),
            'app_domain' => env('ACCOUNT_DOMAIN_PREFIX'),
            'token' => csrf_token(),
        ]);
    }


    public function index(Request $request)
    {
        if (Auth::check()) {
           return redirect()->route('CmsDashboardPage');
        }

        $blade = self::MAIN_BLADE_CMS. '.auth.login';
        
        if(view()->exists($blade)) {
        
            return view($blade);

        }

        return abort(404);
    }

    
}