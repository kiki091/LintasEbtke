<?php

namespace App\Repositories\Implementation\Cms;

use Illuminate\Http\Request;
use App\Repositories\Implementation\BaseImplementation;
use App\Repositories\Contracts\Cms\ContactUs as ContactUsInterface;
use App\Models\ContactUs as ContactUsModel;
use App\Services\Transformation\Cms\ContactUs as ContactUsTransformation;
use Cache;
use Session;
use DB;
use stdClass;
use Auth;
use DataHelper;

class ContactUs extends BaseImplementation implements ContactUsInterface
{
    protected $contactUs;
    protected $contactUsTrans;
    protected $contactUsTransformation;

    protected $message;
    protected $lastInsertId;

    function __construct(ContactUsModel $contactUs, ContactUsTransformation $contactUsTransformation)
    {
        $this->contactUs = $contactUs;
        $this->contactUsTransformation = $contactUsTransformation;
    }

    public function getData($data)
    {
        $params = [
            "limit" => '10'
        ];

        $contactUsData = $this->contactUs($params, 'desc', 'array', false);
        
        return $this->contactUsTransformation->getContactUsCmsTransform($contactUsData);
    }

    /**
     * Edit Data
     * @param $eventId
     * @return bool
     */

    public function show($data)
    {
        $params = [
            'id' => $data['id']
        ];

        $singleData = ContactUsModel::where('id', $params['id'])->first()->toArray();

        return $this->setResponse(trans('message.cms_success_get_data'), true, $this->contactUsTransformation->getSingleContactUsTransform($singleData));
    }

    /**
     * Delete Data
     * @param $params
     * @return mixed
     */
    public function delete($data)
    {
        try {
            if (!isset($data['id']) && empty($data['id']))
                return $this->setResponse(trans('message.cms_required_id'), false);

            DB::beginTransaction();

            $params = [
                "id" => $data['id']
            ];
            $contactUsData = $this->getSingleContactUs($params);

            if (!$this->removeContactUs($params)) {
                DB::rollback();
                return $this->setResponse($this->message, false);
            }

            DB::commit();
            return $this->setResponse(trans('message.cms_success_delete_data_general'), true);

        } catch (\Exception $e) {
            DB::rollback();
            return $this->setResponse($e->getMessage(), false);
        }
    }

    /**
     * Get Single Data
     * @param $params
     */
    public function getSingleContactUs($params) {

        $primaryData = $this->contactUs($params, 'asc', 'array', true);

        return $this->contactUsTransformation->getSingleContactUsTransform($primaryData);
    }

    /**
     * Remove Data From Database
     * @param $data
     * @return bool
     */
    protected function removeContactUs($data)
    {
        try {

            $delete = $this->contactUs
                ->contactUsId($data['id'])
                ->forceDelete();

            if ($delete)
                return true;

            $this->message = trans('message.cms_failed_delete_data_general');
            return false;

        } catch (\Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }
    }


    /**
     * Get All Data
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function contactUs($params = array(), $orderType = 'desc', $returnType = 'array', $returnSingle = false)
    {

        $contactUs = $this->contactUs;

        if(isset($params['limit'])) {
            $contactUs->take($params['limit']);
        }

        if(isset($params['order_by'])) {
            $contactUs->orderBy($params['order_by'], $orderType);
        } else {
            $contactUs->orderBy('created_at', $orderType);
        }

        if(!$contactUs->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $contactUs->get()->toArray();
                } 
                else 
                {
                    return $contactUs->first()->toArray();
                }

            break;
        }
    }


    /**
     * Check need edit Mode or No
     * @param $data
     * @return bool
     */
    protected function isEditMode($data)
    {
        return isset($data['id']) && !empty($data['id']) ? true : false;
    }

}