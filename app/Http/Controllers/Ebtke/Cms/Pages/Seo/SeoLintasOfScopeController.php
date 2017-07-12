<?php

namespace App\Http\Controllers\Ebtke\Cms\Pages\Seo;

use Illuminate\Http\Request;
use App\Http\Controllers\CmsBaseController;
use App\Custom\DataHelper;
use App\Services\Bridge\Cms\Seo as SeoServices;
use App\Services\Api\Response as ResponseService;

use Validator;
use ValidatesRequests;
use Response;
use Session;
use Auth;

class SeoLintasOfScopeController extends CmsBaseController
{

    protected $seo;
    protected $response;
    protected $validationMessage = '';

    const SEO_KEY = 'seo:company:scope-of-services';

    public function __construct(SeoServices $seo,ResponseService $response)
    {
        $this->seo = $seo;
        $this->response = $response;
    }

    /**
     * Index Of Event
     * @return string
     */
    public function index(Request $request)
    {
        $blade = self::URL_BLADE_CMS. '.seo.scope-services.main';
        
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
        $data['seo'] = $this->seo->getData(['key'=>self::SEO_KEY]);
        
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
            return $this->seo->store($request->except(['_token']),self::SEO_KEY);
        }

    }

    /**
     * Edit Data
     * @param Request $request
     */
    public function edit(Request $request)
    {
        return $this->seo->edit($request->except(['_token']));
    }

    /**
     * Validation Store Landing Offers
     * @return array
     */
    private function validationStore($request = array())
    {
        $rules = [
            'meta_title.*'          => 'required',
            'meta_keyword.*'        => 'required',
            'meta_description.*'    => 'required',
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