<?php

namespace App\Http\Controllers\Ebtke\Sipeda;

use Illuminate\Http\Request;
use App\Http\Controllers\SipedaBaseController;
use App\Custom\SipedaDataHelper;
use App\Services\Bridge\Sipeda\Provinsi as ProvinsiServices;
use App\Services\Bridge\Sipeda\Kabupaten as KabupatenServices;
use App\Services\Bridge\Sipeda\Kecamatan as KecamatanServices;
use App\Services\Bridge\Sipeda\Desa as DesaServices;
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
    protected $provinsi;
    protected $kabupaten;
    protected $kecamatan;
    protected $desa;
    protected $proyekPowerProducer;

    public function __construct(ProvinsiServices $provinsi, KabupatenServices $kabupaten, KecamatanServices $kecamatan, DesaServices $desa, ProyekPowerProducerServices $proyekPowerProducer,ResponseService $response)
    {
        $this->response = $response;
        $this->provinsi = $provinsi;
        $this->kabupaten = $kabupaten;
        $this->kecamatan = $kecamatan;
        $this->desa = $desa;
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
        $data['provinsi'] = $this->provinsi->getData();
        $data['power_producer'] = $this->proyekPowerProducer->getData();

        return $this->response->setResponse(trans('message.success_get_data'), true, $data);
    }


    /**
     * Get Data Kabupaten
     * @return string
     */

    public function getDataKabupaten(Request $request)
    {
        return $this->kabupaten->getDataByProvinsi($request->except(['_token']));
    }


    /**
     * Get Data Kecamatan
     * @return string
     */

    public function getDataKecamatan(Request $request)
    {
        return $this->kecamatan->getDataByKabupaten($request->except(['_token']));
    }


    /**
     * Get Data Desa
     * @return string
     */

    public function getDataDesa(Request $request)
    {
        return $this->desa->getDataByKecamatan($request->except(['_token']));
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
            'latitude'                  => 'required',
            'longitude'                 => 'required',
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