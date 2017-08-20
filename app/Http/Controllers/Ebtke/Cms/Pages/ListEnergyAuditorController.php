<?php

namespace App\Http\Controllers\Ebtke\Cms\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\CmsBaseController;
use App\Custom\DataHelper;
use App\Services\Bridge\Cms\Province as ProvinceServices;
use App\Services\Bridge\Cms\ListEnergyAuditor as ListEnergyAuditorServices;
use App\Services\Api\Response as ResponseService;

use Validator;
use ValidatesRequests;
use Response;
use Session;
use Auth;

class ListEnergyAuditorController extends CmsBaseController
{

    protected $province;
    protected $listEnergyAuditor;
    protected $response;
    protected $validationMessage = '';

    public function __construct(ProvinceServices $province, ListEnergyAuditorServices $listEnergyAuditor, ResponseService $response)
    {
        $this->province = $province;
        $this->listEnergyAuditor = $listEnergyAuditor;
        $this->response = $response;
    }

    /**
     * Index Of Energy Conservation
     * @return string
     */
    public function index(Request $request)
    {
        $blade = self::URL_BLADE_CMS. '.information-services.renewable-energy.list-energy-auditor.main';
        
        if(view()->exists($blade)) {
        
            return view($blade);

        }

        return abort(404);

    }

    /**
     * Get Data Of News
     * @return string
     */

    public function getData(Request $request)
    {
        $data['province'] = $this->province->getData();
        $data['list_energy_auditor'] = $this->listEnergyAuditor->getData();

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
            return $this->listEnergyAuditor->store($request->except(['_token']));
        }

    }

    /**
     * Edit Data
     * @param Request $request
     */
    public function edit(Request $request)
    {
        return $this->listEnergyAuditor->edit($request->except(['_token']));
    }

    /**
     * Change Status Data
     * @param Request $request
     */
    public function changeStatus(Request $request)
    {
        return $this->listEnergyAuditor->changeStatus($request->except(['_token']));
    }

    /**
     * Delete Data
     * @param Request $request
     */
    public function delete(Request $request)
    {
        return $this->listEnergyAuditor->delete($request->except(['_token']));
    }

    /**
     * Ordering
     * @param Request $request
     * @return mixed
     */
    public function order(Request $request)
    {
        return $this->listEnergyAuditor->order($request->input('list_order'));
    }

    /**
     * Validation Store Landing Offers
     * @return array
     */
    private function validationStore($request = array())
    {
        $rules = [
            'sector.*'        => 'required',
            'sub_sector.*'    => 'required',
            'fullname'        => 'required',
            'company_name'    => 'required',
            'province_id'     => 'required',
            'type_auditor'    => 'required',
            'years'           => 'required',
        ];

        if ($this->isEditMode($request->input())) {

            if (is_null($request->input('province_id'))) {
                unset($rules['province_id']);
            }
        }

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