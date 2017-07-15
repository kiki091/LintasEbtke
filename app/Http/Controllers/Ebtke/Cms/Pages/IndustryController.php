<?php

namespace App\Http\Controllers\Ebtke\Cms\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\CmsBaseController;
use App\Custom\DataHelper;
use App\Services\Bridge\Cms\Industry as IndustryServices;
use App\Services\Api\Response as ResponseService;

use Validator;
use ValidatesRequests;
use Response;
use Session;
use Auth;

class IndustryController extends CmsBaseController
{

    protected $industry;
    protected $response;
    protected $validationMessage = '';

    public function __construct(IndustryServices $industry,ResponseService $response)
    {
        $this->industry = $industry;
        $this->response = $response;
    }

    /**
     * Index Of Event
     * @return string
     */
    public function index(Request $request)
    {
        $blade = self::URL_BLADE_CMS. '.information-services.renewable-energy.industry.main';
        
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
        $data['industry'] = $this->industry->getData();
        return $this->response->setResponse(trans('message.success_get_data'), true, $data);
    }

    /**
     * Store Data
     * @param Request $request
     */

    public function store(Request $request)
    {//dd($request->all());
        $validator = Validator::make($request->all(), $this->validationStore($request));

        if ($validator->fails()) {
            //TODO: case fail
            return $this->response->setResponseErrorFormValidation($validator->messages(), false);

        } else {
            //TODO: case pass
            return $this->industry->store($request->except(['_token']));
        }

    }

    /**
     * Edit Data
     * @param Request $request
     */
    public function edit(Request $request)
    {
        return $this->industry->edit($request->except(['_token']));
    }

    /**
     * Change Status Data
     * @param Request $request
     */
    public function changeStatus(Request $request)
    {
        return $this->industry->changeStatus($request->except(['_token']));
    }

    /**
     * Delete Data
     * @param Request $request
     */
    public function delete(Request $request)
    {
        return $this->industry->delete($request->except(['_token']));
    }

    /**
     * Ordering
     * @param Request $request
     * @return mixed
     */
    public function order(Request $request)
    {
        return $this->industry->order($request->input('list_order'));
    }

    /**
     * Validation Store 
     * @return array
     */
    private function validationStore($request = array())
    {
        $rules = [
            'title.*'               => 'required',
            'slug.*'                => 'required',
            'introduction.*'        => 'required',
            'description.*'         => 'required',
            'meta_title.*'          => 'required',
            'meta_keyword.*'        => 'required',
            'meta_description.*'    => 'required',
            'thumbnail'             => 'required|dimensions:width='.INDUSTRY_THUMBNAIL_WIDTH.',height='.INDUSTRY_THUMBNAIL_HEIGHT.'|max:'. INDUSTRY_IMAGES_SIZE .'|mimes:jpeg,jpg',
            
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