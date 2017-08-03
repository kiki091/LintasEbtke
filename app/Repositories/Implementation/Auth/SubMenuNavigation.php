<?php

namespace App\Repositories\Implementation\Auth;

use App\Repositories\Implementation\BaseImplementation;
use App\Repositories\Contracts\Auth\SubMenuNavigation as SubMenuNavigationInterface;
use App\Models\Auth\SubMenu as SubMenuNavigationModel;
use App\Services\Transformation\Auth\SubMenuNavigation as SubMenuNavigationTransformation;
use App\Custom\Facades\DataHelper;

use Cache;
use Session;
use DB;
use Auth;
use Hash;

class SubMenuNavigation extends BaseImplementation implements SubMenuNavigationInterface
{

    protected $subMenuNavigation;
    protected $subMenuNavigationTransformation;

    function __construct(SubMenuNavigationModel $subMenuNavigation, SubMenuNavigationTransformation $subMenuNavigationTransformation)
    {

        $this->subMenuNavigation = $subMenuNavigation;
        $this->subMenuNavigationTransformation = $subMenuNavigationTransformation;
    }

    /**
     * Get Data Sub Menu Navigation
     * Warning: this function doesn't redis cache
     * @param $params
     * @return array
     */

    public function getData($data)
    {
    	$params = [
    		'order'	=> 'title',
    	];

    	$subMenuNavigationData = $this->subMenuNavigation($params, 'asc', 'array', false);

    	return $this->subMenuNavigationTransformation->getSubMenuNavigationCmsTransform($subMenuNavigationData);
    }

    /**
     * Change Status Sub Menu Group
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

            $oldData = $this->subMenuNavigation->id($data['id'])->first()->toArray();

            $updatedData = [
                'is_active' => $oldData['is_active'] ? false : true,
                'updated_at' => $this->mysqlDateTimeFormat()
            ];

            $changeStatus = $this->subMenuNavigation->id($data['id'])->update($updatedData);

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
     * Get All Data Sub Menu Navigation
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    
    protected function subMenuNavigation($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
    	$subMenuNavigation = $this->subMenuNavigation->with(['menu_sub']);

        if(isset($params['id'])) {
            $subMenuNavigation->id($params['id']);
        }

        if(isset($params['order'])) {
            $subMenuNavigation->orderBy($params['order'], $orderType);
        }


        if(isset($params['slug'])) {
            $subMenuNavigation->slug($params['slug']);
        }


        if(isset($params['url'])) {
            $subMenuNavigation->url($params['url']);
        }

        if(!$subMenuNavigation->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) {
                    return $subMenuNavigation->get()->toArray();
                } else {
                    return $subMenuNavigation->first()->toArray();
                }
            break;
        }
    }

}