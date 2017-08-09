<?php

namespace App\Http\Controllers\Ebtke\Sipeda;

use Illuminate\Http\Request;
use App\Http\Controllers\SipedaBaseController;
use App\Custom\SipedaDataHelper;
use App\Services\Bridge\Sipeda\ProyekPowerProducer as ProyekPowerProducerServices;
use App\Services\Api\Response as ResponseService;

use Validator;
use ValidatesRequests;
use Response;
use Session;
use Auth;

class ProyekPowerProducerController extends SipedaBaseController
{

    protected $response;
    protected $validationMessage = '';
    protected $proyekPowerProducer;

    public function __construct(ProyekPowerProducerServices $proyekPowerProducer,ResponseService $response)
    {
        $this->response = $response;
        $this->proyekPowerProducer = $proyekPowerProducer;
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


    /**
     * Get Data 
     * @return string
     */

    public function getData(Request $request)
    {
        $data['power_producer'] = $this->proyekPowerProducer->getData();

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
            return $this->proyekPowerProducer->store($request->except(['_token']));
        }

    }


    /**
     * Validation Store Landing Offers
     * @return array
     */
    private function validationStore($request = array())
    {
        $rules = [
            'nama_proyek'               => 'required',
            'jenis_pembangkit'          => 'required',
            'koordinat'                 => 'required',
            'kapasitas_terpasang'       => 'required',
            'produksi_energi_tahunan'   => 'required',
            'sharing_equity'            => 'required',
            'jenis_energy_primer'       => 'required',
            'cod'                       => 'required',
            'kontrak_pln'               => 'required',
            'desa_id'                   => 'required',
            'kecamatan_id'              => 'required',
            'kabupaten_id'              => 'required',
            'provinsi_id'               => 'required',
        ];

        return $rules;
    }
}