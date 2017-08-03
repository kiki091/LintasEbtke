<?php

namespace App\Repositories\Implementation\Auth;

use App\Repositories\Implementation\BaseImplementation;
use App\Repositories\Contracts\Auth\MenuNavigation as MenuNavigationInterface;
use App\Models\Auth\Menu as MenuNavigationModel;
use App\Services\Transformation\Auth\MenuNavigation as MenuNavigationTransformation;
use App\Custom\Facades\DataHelper;

use Cache;
use Session;
use DB;
use Auth;
use Hash;

class MenuNavigation extends BaseImplementation implements MenuNavigationInterface
{

    protected $menuNavigation;
    protected $menuNavigationTransformation;

    function __construct(MenuNavigationModel $menuNavigation, MenuNavigationTransformation $menuNavigationTransformation)
    {

        $this->menuNavigation = $menuNavigation;
        $this->menuNavigationTransformation = $menuNavigationTransformation;
    }

    /**
     * Get Data Menu Navigation
     * Warning: this function doesn't redis cache
     * @param $params
     * @return array
     */

    public function getData($data)
    {
    	$params = [
    		'order'	=> 'title',
    	];

    	$menuNavigationData = $this->menuNavigation($params, 'asc', 'array', false);

    	return $this->menuNavigationTransformation->getMenuNavigationCmsTransform($menuNavigationData);
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

            $oldData = $this->menuNavigation->id($data['id'])->first()->toArray();

            $updatedData = [
                'is_active' => $oldData['is_active'] ? false : true,
                'updated_at' => $this->mysqlDateTimeFormat()
            ];

            $changeStatus = $this->menuNavigation->id($data['id'])->update($updatedData);

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
     * Get All Data Menu Navigation
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    
    protected function menuNavigation($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
    	$menuNavigation = $this->menuNavigation->with(['menu_group', 'sub_menu']);

        if(isset($params['id'])) {
            $menuNavigation->id($params['id']);
        }

        if(isset($params['order'])) {
            $menuNavigation->orderBy($params['order'], $orderType);
        } else {
            $menuNavigation->orderBy('order', 'asc');
        }


        if(isset($params['slug'])) {
            $menuNavigation->slug($params['slug']);
        }


        if(isset($params['url'])) {
            $menuNavigation->url($params['url']);
        }

        if(!$menuNavigation->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) {
                    return $menuNavigation->get()->toArray();
                } else {
                    return $menuNavigation->first()->toArray();
                }
            break;
        }
    }

}