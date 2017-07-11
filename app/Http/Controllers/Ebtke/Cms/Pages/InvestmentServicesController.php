<?php

namespace App\Http\Controllers\Ebtke\Cms\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\CmsBaseController;
use App\Custom\DataHelper;
use App\Services\Bridge\Cms\InvestmentServices as InvestmentServices;
use App\Services\Api\Response as ResponseService;

use Validator;
use ValidatesRequests;
use Response;
use Session;
use Auth;

class InvestmentServicesController extends CmsBaseController
{
    protected $investmentServices;
    protected $response;
    protected $validationMessage = '';

    public function __construct(InvestmentServices $investmentServices, ResponseService $response)
    {
        $this->investmentServices = $investmentServices;
        $this->response = $response;
    }

    /**
     * Index Of News
     * @return string
     */
    public function index(Request $request)
    {
        $blade = self::URL_BLADE_CMS. '.investment-services.services.main';
        
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
        $data['investment_services'] = $this->investmentServices->getData();
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
            return $this->investmentServices->store($request->except(['_token']));
        }

    }

    /**
     * Edit Data
     * @param Request $request
     */
    public function edit(Request $request)
    {
        return $this->investmentServices->edit($request->except(['_token']));
    }

    /**
     * Change Status Data
     * @param Request $request
     */
    public function changeStatus(Request $request)
    {
        return $this->investmentServices->changeStatus($request->except(['_token']));
    }

    /**
     * Delete Data
     * @param Request $request
     */
    public function delete(Request $request)
    {
        return $this->investmentServices->delete($request->except(['_token']));
    }

    /**
     * Ordering
     * @param Request $request
     * @return mixed
     */
    public function order(Request $request)
    {
        return $this->investmentServices->order($request->input('list_order'));
    }

    /**
     * Edit Image Slider 
     * @param Request $request
     */

    public function editImageSlider(Request $request)
    {
        
        $validator = Validator::make($request->all(), $this->validateEditImageSlider($request));

        if ($validator->fails()) {
            //TODO: case fail
            return $this->response->setResponseErrorFormValidation($validator->messages(), false);

        } else {
            //TODO: case pass
            return $this->investmentServices->editImageSlider($request->except(['_token', 'filename_edit']));
        }
        
    }

    /**
     * Delete Image Slider
     * @param Request $request
     * @return mixed
     */
    public function deleteImageSlider(Request $request)
    {
        return $this->investmentServices->deleteImageSlider($request->except('_token'));
    }

    /**
     * Validation Store Landing Offers
     * @return array
     */
    private function validationStore($request = array())
    {
        $rules = [
            'title.*'                               => 'required',
            'slug.*'                                => 'required',
            'introduction.*'                        => 'required',
            'description.*'                         => 'required',
            'meta_title.*'                          => 'required',
            'meta_keyword.*'                        => 'required',
            'meta_description.*'                    => 'required',
            'investment_services_related_id.*'      => 'required',
            'thumbnail'                             => 'required|dimensions:width='.INVESTMENT_SERVICES_THUMBNAIL_WIDTH.',height='.INVESTMENT_SERVICES_THUMBNAIL_HEIGHT.'|max:'. INVESTMENT_SERVICES_IMAGES_SIZE .'|mimes:jpeg,jpg',
            'filename.*'                            => 'required|dimensions:width='.INVESTMENT_SERVICES_IMAGES_WIDTH.',height='.INVESTMENT_SERVICES_IMAGES_HEIGHT.'|max:'. INVESTMENT_SERVICES_IMAGES_SIZE .'|mimes:jpeg,jpg',
        ];

        if ($this->isEditMode($request->input())) {

            if (is_null($request->file('thumbnail'))) {
                unset($rules['thumbnail']);
            }

            if (is_null($request->file('filename.*'))) {
                unset($rules['filename.*']);
            }
        }

        return $rules;
    }

    /**
     * Validate Edit Slider Image 
     */

    
    private function validateEditImageSlider($request = array())
    {
        $rules = [
            'filename.*' => 'required|dimensions:width='.INVESTMENT_SERVICES_IMAGES_WIDTH.',height='.INVESTMENT_SERVICES_IMAGES_HEIGHT.'|max:'. INVESTMENT_SERVICES_IMAGES_SIZE .'|mimes:jpeg,jpg',
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