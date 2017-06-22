<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\ContactUs as ContactUsInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\ContactUs as ContactUsServices;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class ContactUs extends BaseImplementation implements ContactUsInterface
{
	protected $message;
    protected $contactUs;


    function __construct(ContactUsServices $contactUs)
    {
    	$this->contactUs = $contactUs;
    }

    /**
     * Store Data
     */
    
    public function store($params)
    {
    	try {

    		DB::beginTransaction();

    		if ($this->storeContactUs($params) != true) {
                DB::rollBack();
                return $this->setResponse($this->message, false);
            }

            DB::commit();
            return $this->setResponse(trans('message.success_store_contact_us'), true);

    	} catch (\Exception $e) {
            return $this->setResponse($e->getMessage(), false);
        }
    }

    /**
     * Store Data Into database
     * @param $data
     * @return mixed
     */
    protected function storeContactUs($params)
    {

    	try {

    		$store                 	= $this->contactUs;

    		$store->fullname		=	isset($params['fullname']) ? $params['fullname'] : '';
    		$store->email 			= 	isset($params['email']) ? $params['email'] : '';
    		$store->question 		= 	isset($params['question']) ? $params['question'] : '';
    		$store->message 		= 	isset($params['message']) ? $params['message'] : '';
            $store->created_at      =  $this->mysqlDateTimeFormat();

    		$save = $store->save();

    		return $save;

    	} catch (\Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }
    }
}