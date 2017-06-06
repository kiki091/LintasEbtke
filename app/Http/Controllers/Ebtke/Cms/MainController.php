<?php

namespace App\Http\Controllers\Ebtke\Cms;

use Illuminate\Http\Request;
use App\Http\Controllers\CmsController;
use App\Services\Api\Response as ResponseService;
use Illuminate\Routing\Route;

use Auth;
use Session;

class MainController extends CmsController
{

    protected $response;


    public function __construct( ResponseService $response)
    {
        $this->response = $response;
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