<?php

namespace App\Http\Controllers\Ebtke\Cms\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\CmsBaseController;
use App\Custom\DataHelper;
use App\Services\Bridge\Cms\MainBanner as MainBannerServices;
use App\Services\Bridge\Cms\CompanyHistory as CompanyHistoryServices;
use App\Services\Api\Response as ResponseService;

use Validator;
use ValidatesRequests;
use Response;
use Session;
use Auth;

class CompanyHistoryController extends CmsBaseController
{

    protected $mainBanner;
    protected $companyHistory;
    protected $response;
    protected $validationMessage = '';

    const BANNER_KEY = 'banner:company:history';

    public function __construct(MainBannerServices $mainBanner, CompanyHistoryServices $companyHistory,ResponseService $response)
    {
        $this->mainBanner = $mainBanner;
        $this->companyHistory = $companyHistory;
        $this->response = $response;
    }

    /**
     * Index Of Event
     * @return string
     */
    public function index(Request $request)
    {
        $blade = self::URL_BLADE_CMS. '.company.history.main';
        
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
        $data['main_banner'] = $this->mainBanner->getData(['key'=>self::BANNER_KEY]);
        $data['company_history'] = $this->companyHistory->getData();
        
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
            return $this->companyHistory->store($request->except(['_token']));
        }

    }

    /**
     * Store Data
     * @param Request $request
     */

    public function storeBanner(Request $request)
    {
        $validator = Validator::make($request->all(), $this->validationStoreBanner($request));

        if ($validator->fails()) {
            //TODO: case fail
            return $this->response->setResponseErrorFormValidation($validator->messages(), false);

        } else {
            //TODO: case pass
            return $this->mainBanner->store($request->except(['_token']), self::BANNER_KEY);
        }

    }

    /**
     * Edit Data
     * @param Request $request
     */
    public function edit(Request $request)
    {
        return $this->companyHistory->edit($request->except(['_token']));
    }

    /**
     * Edit Main Banner
     * @param Request $request
     */
    public function editBanner(Request $request)
    {
        return $this->mainBanner->edit($request->except(['_token']));
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
            'description_left.*'    => 'required',
            'description_right.*'   => 'required',
            'meta_title.*'          => 'required',
            'meta_keyword.*'        => 'required',
            'meta_description.*'    => 'required',
            'file'                  => 'required|max:'. COMPANY_HISTORY_SIZE .'|mimes:pdf,doc,docx,xls,xlsx',
        ];

        if ($this->isEditMode($request->input())) {

            if (is_null($request->file('file'))) {
                unset($rules['file']);
            }
        }

        return $rules;
    }

    /**
     * Validation Store Landing Offers
     * @return array
     */
    private function validationStoreBanner($request = array())
    {
        $rules = [
            'filename'                  => 'required|dimensions:width='.MAIN_BANNER_COMPANY_WIDTH.',height='.MAIN_BANNER_COMPANY_HEIGHT.'|max:'. MAIN_BANNER_IMAGES_SIZE .'|mimes:jpeg,jpg',
        ];

        if ($this->isEditMode($request->input())) {

            if (is_null($request->file('filename'))) {
                unset($rules['filename']);
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