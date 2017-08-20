<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Bridge\Front\ContactUs as ContactUsServices;
use App\Services\Api\Response as ResponseService;

use Validator;
use ValidatesRequests;

class ContactUsController extends FrontController
{

    protected $contactUs;
    protected $response;
    protected $validationMessage = '';

	public function __construct(ContactUsServices $contactUs, ResponseService $response)
    {
        $this->contactUs = $contactUs;
        $this->response = $response;

    }

    /**
     *
     * Store Data 
     * @param array
     * @return array
     */


    public function store(Request $request)
    {
        
        $validator = Validator::make($request->all(), $this->validationStore($request));

        if ($validator->fails()) {
            //TODO: case fail
            return $this->response->setResponseErrorFormValidation($validator->messages(), false);

        } else {
            //TODO: case pass
            return $this->contactUs->store($request->except(['_token']));
        }
    }

    /**
     * Validation Store 
     * @return array
     */
    private function validationStore($request = array())
    {
        $rules = [
            'fullname'              => 'required|min:6|max:25',
            'email'                 => 'required|email',
            'message'               => 'required|min:15',
        ];

        return $rules;
    }
}