<?php

namespace App\Http\Controllers\Ebtke\Cms\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\CmsBaseController;
use App\Custom\DataHelper;
use App\Services\Bridge\Cms\Province as ProvinceServices;
use App\Services\Bridge\Cms\MapsCategory as MapsCategoryServices;
use App\Services\Bridge\Cms\EnergyConservation as EnergyConservationServices;
use App\Services\Api\Response as ResponseService;

use Validator;
use ValidatesRequests;
use Response;
use Session;
use Auth;

class EnergyConservationController extends CmsBaseController
{

    protected $province;
    protected $mapsCategory;
    protected $energyConservation;
    protected $response;
    protected $validationMessage = '';

    public function __construct(ProvinceServices $province, MapsCategoryServices $mapsCategory, EnergyConservationServices $energyConservation,ResponseService $response)
    {
        $this->province = $province;
        $this->mapsCategory = $mapsCategory;
        $this->energyConservation = $energyConservation;
        $this->response = $response;
    }

    /**
     * Index Of Energy Conservation
     * @return string
     */
    public function index(Request $request)
    {
        $blade = self::URL_BLADE_CMS. '.investment-services.potentials.energy-conservation.main';
        
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
        $data['maps_category'] = $this->mapsCategory->getData();
        $data['energy_conservation'] = $this->energyConservation->getData();

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
            return $this->energyConservation->store($request->except(['_token']));
        }

    }

    /**
     * Edit Data
     * @param Request $request
     */
    public function edit(Request $request)
    {
        return $this->energyConservation->edit($request->except(['_token']));
    }

    /**
     * Change Status Data
     * @param Request $request
     */
    public function changeStatus(Request $request)
    {
        return $this->energyConservation->changeStatus($request->except(['_token']));
    }

    /**
     * Delete Data
     * @param Request $request
     */
    public function delete(Request $request)
    {
        return $this->energyConservation->delete($request->except(['_token']));
    }

    /**
     * Ordering
     * @param Request $request
     * @return mixed
     */
    public function order(Request $request)
    {
        return $this->energyConservation->order($request->input('list_order'));
    }

    /**
     * Validation Store Landing Offers
     * @return array
     */
    private function validationStore($request = array())
    {
        $rules = [
            'title.*'               => 'required',
            'slug.*'                => 'required',
            'introduction.*'        => 'required',
            'description.*'         => 'required',
            'description_maps'      => 'required',
            'meta_title.*'          => 'required',
            'meta_keyword.*'        => 'required',
            'meta_description.*'    => 'required',
            'thumbnail'             => 'required|dimensions:width='.ENERGY_CONSEREVATION_THUMBNAIL_WIDTH.',height='.ENERGY_CONSEREVATION_THUMBNAIL_HEIGHT.'|max:'. INVESTMENT_SERVICES_IMAGES_SIZE .'|mimes:jpeg,jpg',
        ];

        if ($this->isEditMode($request->input())) {

            if (is_null($request->file('thumbnail'))) {
                unset($rules['thumbnail']);
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