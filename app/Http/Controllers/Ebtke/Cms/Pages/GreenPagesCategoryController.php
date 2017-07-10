<?php

namespace App\Http\Controllers\Ebtke\Cms\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\CmsBaseController;
use App\Custom\DataHelper;
use App\Services\Bridge\Cms\GreenPagesCategory as GreenPagesCategoryServices;
use App\Services\Api\Response as ResponseService;

use Validator;
use ValidatesRequests;
use Response;
use Session;
use Auth;

class GreenPagesCategoryController extends CmsBaseController
{
	protected $greenPagesCategory;
    protected $response;
    protected $validationMessage = '';

    public function __construct(GreenPagesCategoryServices $greenPagesCategory,ResponseService $response)
    {
        $this->greenPagesCategory = $greenPagesCategory;
        $this->response = $response;
    }

    /**
     * Index 
     * @return string
     */
    public function index(Request $request)
    {
        $blade = self::URL_BLADE_CMS. '.investment-services.green-pages.category.main';
        
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
        $data['category'] = $this->greenPagesCategory->getData();
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
            return $this->greenPagesCategory->store($request->except(['_token']));
        }

    }

    /**
     * Edit Data
     * @param Request $request
     */
    public function edit(Request $request)
    {
        return $this->greenPagesCategory->edit($request->except(['_token']));
    }

    /**
     * Change Status Data
     * @param Request $request
     */
    public function changeStatus(Request $request)
    {
        return $this->greenPagesCategory->changeStatus($request->except(['_token']));
    }

    /**
     * Delete Data
     * @param Request $request
     */
    public function delete(Request $request)
    {
        return $this->greenPagesCategory->delete($request->except(['_token']));
    }

    /**
     * Ordering
     * @param Request $request
     * @return mixed
     */
    public function order(Request $request)
    {
        return $this->greenPagesCategory->order($request->input('list_order'));
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