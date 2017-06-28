<?php

namespace App\Repositories\Implementation\Auth;

use App\Repositories\Implementation\BaseImplementation;
use App\Repositories\Contracts\Auth\MenuGroup as MenuGroupInterface;
use App\Models\Auth\MenuGroup as MenuGroupModel;
use App\Services\Transformation\Auth\MenuGroup as MenuGroupTransformation;
use App\Custom\Facades\DataHelper;

use Cache;
use Session;
use DB;
use Auth;
use Hash;

class MenuGroup extends BaseImplementation implements MenuGroupInterface
{

    protected $menuGroup;
    protected $menuGroupTransformation;

    function __construct(MenuGroupModel $menuGroup, MenuGroupTransformation $menuGroupTransformation)
    {

        $this->menuGroup = $menuGroup;
        $this->menuGroupTransformation = $menuGroupTransformation;
    }

    /**
     * Get Data Menu Group
     * Warning: this function doesn't redis cache
     * @param $params
     * @return array
     */

    public function getData($data)
    {
    	$params = [
    		'order'	=> 'order',
    	];

    	$menuGroupData = $this->menuGroup($params, 'asc', 'array', false);

    	return $this->menuGroupTransformation->getMenuGroupCmsTransform($menuGroupData);
    }

    /**
     * Change Status Menu Group
     * Warning: this function doesn't redis cache
     * @param $params
     * @return array
     */

    public function changeStatus($data)
    {
     
        try {

            if (!isset($data['id']) && empty($data['id']))

                return $this->setResponse(trans('message.cms_required_id'), false);

            DB::beginTransaction();

            $oldData = $this->menuGroup->id($data['id'])->first()->toArray();

            $updatedData = [
                'is_active' => $oldData['is_active'] ? false : true,
                'updated_at' => $this->mysqlDateTimeFormat()
            ];

            $changeStatus = $this->menuGroup->id($data['id'])->update($updatedData);

            if($changeStatus) {
                DB::commit();
                return $this->setResponse(trans('message.cms_success_update_status_general'), true);
            }

            DB::rollBack();
            return $this->setResponse(trans('message.cms_failed_update_status_general'), false);
        } catch (\Exception $e) {
            return $this->setResponse($e->getMessage(), false);
        }
    }

    /**
     * Get All Data Menu Group
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    
    protected function menuGroup($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
    	$menuGroup = $this->menuGroup->with(['system_menu']);

        if(isset($params['id'])) {
            $menuGroup->id($params['id']);
        }

        if(isset($params['order'])) {
            $menuGroup->orderBy($params['order'], $orderType);
        }

        if(!$menuGroup->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) {
                    return $menuGroup->get()->toArray();
                } else {
                    return $menuGroup->first()->toArray();
                }
            break;
        }
    }

}