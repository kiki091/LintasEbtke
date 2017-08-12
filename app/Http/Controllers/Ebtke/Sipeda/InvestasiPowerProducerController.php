<?php

namespace App\Http\Controllers\Ebtke\Sipeda;

use Illuminate\Http\Request;
use App\Http\Controllers\SipedaBaseController;
use App\Custom\SipedaDataHelper;
use App\Services\Bridge\Sipeda\ProyekPowerProducer as ProyekPowerProducerServices;
use App\Services\Bridge\Sipeda\InvestasiPowerProducer as InvestasiPowerProducerServices;
use App\Services\Api\Response as ResponseService;

use Validator;
use ValidatesRequests;
use Response;
use Session;
use Auth;

class InvestasiPowerProducerController extends SipedaBaseController
{

    protected $response;
    protected $validationMessage = '';
    protected $proyekPowerProducer;
    protected $investasiPowerProducer;

    public function __construct(ProyekPowerProducerServices $proyekPowerProducer,InvestasiPowerProducerServices $investasiPowerProducer,ResponseService $response)
    {
        $this->response = $response;
        $this->proyekPowerProducer = $proyekPowerProducer;
        $this->investasiPowerProducer = $investasiPowerProducer;
    }

    /**
     * Index Of Energy Conservation
     * @return string
     */
    public function index(Request $request)
    {
        $blade = self::URL_BLADE_SIPEDA. '.investasi-power-procedure.main';
        
        if(view()->exists($blade)) {
        
            return view($blade);

        }

        return abort(404);

    }


    /**
     * Get Data 
     * @return string
     */

    public function getData(Request $request)
    {
        $data['proyek_producer'] = $this->proyekPowerProducer->getData();
        $data['investasi_producer'] = $this->investasiPowerProducer->getData();

        return $this->response->setResponse(trans('message.success_get_data'), true, $data);
    }

    /**
     * Store Data
     * @param Request $request
     */

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->validationStore($request));

        if ($validator->fails()) {
            //TODO: case fail
            return $this->response->setResponseErrorFormValidation($validator->messages(), false);

        } else {
            //TODO: case pass
            return $this->investasiPowerProducer->store($request->except(['_token']));
        }

    }


    /**
     * Validation Store Landing Offers
     * @return array
     */
    private function validationStore($request = array())
    {
        $rules = [
            'sumber_dana'                    => 'required',
            'status'                         => 'required',
            'tahun_investasi'                => 'required',
            'penambahan_kapasitas'           => 'required',
            'penambahan_komponen'            => 'required',
            'peningkatan_efisiensi'          => 'required',
            'rencana_investasi'              => 'required',
            'realisasi_investasi'            => 'required',
            'proyek_power_producer_id'       => 'required',
        ];

        return $rules;
    }
}