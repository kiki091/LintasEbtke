<?php

namespace App\Http\Controllers\Ebtke\Sipeda;

use Illuminate\Http\Request;
use App\Http\Controllers\SipedaBaseController;
use App\Custom\SipedaDataHelper;
//use App\Services\Bridge\Sipeda\CapacityBuilding as CapacityBuildingServices;
use App\Services\Api\Response as ResponseService;

use Validator;
use ValidatesRequests;
use Response;
use Session;
use Auth;

class ProyekPowerProsedureController extends SipedaBaseController
{

    protected $response;
    protected $validationMessage = '';

    public function __construct(ResponseService $response)
    {
        $this->response = $response;
    }

    /**
     * Index Of Energy Conservation
     * @return string
     */
    public function index(Request $request)
    {
        $blade = self::URL_BLADE_SIPEDA. '.proyek-power-procedure.main';
        
        if(view()->exists($blade)) {
        
            return view($blade);

        }

        return abort(404);

    }
}