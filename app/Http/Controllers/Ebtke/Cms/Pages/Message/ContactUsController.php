<?php

namespace App\Http\Controllers\Ebtke\Cms\Pages\Message;

use Illuminate\Http\Request;
use App\Http\Controllers\CmsBaseController;
use App\Custom\DataHelper;
use App\Services\Bridge\Cms\ContactUs as ContactUsServices;
use App\Services\Api\Response as ResponseService;

use Response;
use Session;
use Auth;

class ContactUsController extends CmsBaseController
{
    protected $contactUs;
    protected $response;


    public function __construct(ContactUsServices $contactUs,ResponseService $response)
    {
        $this->contactUs = $contactUs;
        $this->response = $response;
    }

    /**
     * Index Of News
     * @return string
     */
    public function index(Request $request)
    {
        $blade = self::URL_BLADE_CMS. '.message.contact-us.main';
        
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
        $data['contact_us'] = $this->contactUs->getData();
        return $this->response->setResponse(trans('message.success_get_data'), true, $data);
    }

    /**
     * Show Data
     * @param Request $request
     */
    public function show(Request $request)
    {
        return $this->contactUs->show($request->except(['_token']));
    }

    /**
     * Delete Data
     * @param Request $request
     */
    public function delete(Request $request)
    {
        return $this->contactUs->delete($request->except(['_token']));
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