<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Api\Response as ResponseService;

class MainController extends FrontController
{

    protected $response;

    public function __construct(ResponseService $response)
    {
        $this->response = $response;

    }


    public function index(Request $request)
    {

        $blade = self::URL_BLADE_FRONT_SITE. '.main';
        
        if(view()->exists($blade)) {
        
            return view($blade);

        }

        return abort(404);
    }
}