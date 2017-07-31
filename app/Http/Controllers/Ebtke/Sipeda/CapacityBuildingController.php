<?php

namespace App\Http\Controllers\Ebtke\Sipeda;

use Illuminate\Http\Request;
use App\Http\Controllers\SipedaBaseController;
use App\Custom\SipedaDataHelper;
use App\Services\Bridge\Sipeda\CapacityBuilding as CapacityBuildingServices;
use App\Services\Api\Response as ResponseService;

use Validator;
use ValidatesRequests;
use Response;
use Session;
use Auth;

class CapacityBuildingController extends SipedaBaseController
{

    protected $capacityBuilding;
    protected $response;
    protected $validationMessage = '';

    public function __construct(CapacityBuildingServices $capacityBuilding, ResponseService $response)
    {
        $this->capacityBuilding = $capacityBuilding;
        $this->response = $response;
    }

    /**
     * Index Of Energy Conservation
     * @return string
     */
    public function index(Request $request)
    {
        $blade = self::URL_BLADE_SIPEDA. '.capacity-building.main';
        
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
    {dd("dfasfas");
        $data['capacity_building'] = $this->capacityBuilding->getData();

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
            return $this->capacityBuilding->store($request->except(['_token']));
        }

    }

    /**
     * Edit Data
     * @param Request $request
     */
    public function edit(Request $request)
    {
        return $this->capacityBuilding->edit($request->except(['_token']));
    }

    /**
     * Change Status Data
     * @param Request $request
     */
    public function publish(Request $request)
    {
        return $this->capacityBuilding->publish($request->except(['_token']));
    }

    /**
     * Delete Data
     * @param Request $request
     */
    public function delete(Request $request)
    {
        return $this->capacityBuilding->delete($request->except(['_token']));
    }

    /**
     * Validation Store Landing Offers
     * @return array
     */
    private function validationStore($request = array())
    {
        $rules = [
            'topik_kegiatan'               => 'required',
            'request_topik'                => 'required',
            'penyelenggara_kegiatan'       => 'required',
            'tahun_perencanaan'            => 'required',
            'tanggal_pelaksanaan'          => 'required',
            'tahun_pelaksanaan'            => 'required',
            'target_peserta'               => 'required',
            'realisasi_peserta'            => 'required',
            'sasaran_peserta'              => 'required',
            'jenis_institusi_peserta'      => 'required',
            'total_biaya'                  => 'required',
            'sumber_pendanaan'             => 'required',
            'sertifikasi_kompetensi'       => 'required',
            'sumber_data'                  => 'required',
            'keterangan'                   => 'required',
            'lokasi_id'                    => 'required',
            'jenis_kegiatan_id'            => 'required',
        ];

        return $rules;
    }
    
    /**
     * Check is edit mode or no
     * @param $data
     * @return bool
     */
    protected function isEditMode($data)
    {
        return isset($data['id']) && !empty($data['id']) ? true : false;
    }
}