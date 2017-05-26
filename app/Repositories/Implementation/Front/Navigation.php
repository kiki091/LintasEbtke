<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\Navigation as NavigationInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\TopNavigation as TopNavigationServices;
use App\Models\TopNavigationTrans as TopNavigationTransServices;
use App\Models\Navigation as NavigationServices;
use App\Models\NavigationTrans as NavigationTransServices;
use App\Models\SubNavigation as SubNavigationServices;
use App\Models\SubNavigationTrans as SubNavigationServicesTrans;
use App\Services\Transformation\Front\Navigation as NavigationTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class Navigation extends BaseImplementation implements NavigationInterface
{
	protected $message;
    protected $topNavigation;
    protected $topNavigationTrans;
    protected $navigation;
    protected $navigationTrans;
    protected $subNavigation;
    protected $subNavigationTrans;
    protected $navigationTransformation;


    function __construct(TopNavigationServices $topNavigation, TopNavigationTransServices $topNavigationTrans, NavigationServices $navigation, NavigationTransServices $navigationTrans, SubNavigationServices $subNavigation, SubNavigationServicesTrans $subNavigationTrans, NavigationTransformation $navigationTransformation)
    {
    	$this->topNavigation = $topNavigation;
        $this->topNavigationTrans = $topNavigationTrans;
        $this->navigation = $navigation;
    	$this->navigationTrans = $navigationTrans;
    	$this->subNavigation = $subNavigation;
    	$this->subNavigationTrans = $subNavigationTrans;
    	$this->navigationTransformation = $navigationTransformation;
    }

    public function getTopNavigation()
    {
    	$data = [
    		'is_active' => true,
    	];

    	$topNavigationData = $this->topNavigation($data, 'asc', 'array', true);
        
        $finalTopNavigationData = $this->navigationTransformation->getTopNavigationTransform($topNavigationData);

        Session::forget('current_top_navigation');
        Session::put('current_top_navigation', $finalTopNavigationData);

        return $finalTopNavigationData;
    }

    public function getNavigation()
    {
        $data = [
            'is_active' => true,
        ];

        $navigationData = $this->navigation($data, 'asc', 'array', true);
        
        $finalNavigationData = $this->navigationTransformation->getNavigationTransform($navigationData);

        Session::forget('current_menu_navigation');
        Session::put('current_menu_navigation', $finalNavigationData);

        return $finalNavigationData;
    }

    /**
     * Get All Data Top Navigation
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function topNavigation($data = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
    	$topNavigation = $this->topNavigation
            ->with('top_menu_tran')
            ->with('top_menu_trans');

        if(isset($data['is_active'])) {
            $topNavigation->isActive($data['is_active']);
        }

        if(isset($params['order_by'])) {
            $topNavigation->orderBy('order', $orderType);
        }

        if(!$topNavigation->count())
            return array();

        switch ($returnType) {
            case 'array':
                if($returnSingle) 
                {
                    return $topNavigation->get()->toArray();
                } 
                else 
                {
                    return $topNavigation->first()->toArray();
                }

            break;
        }
    }

    /**
     * Get All Data Navigation
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function navigation($data = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $navigation = $this->navigation
            ->with('menu_tran')
            ->with('menu_trans')
            ->with('sub_menu');

        if(isset($data['is_active'])) {
            $navigation->isActive($data['is_active']);
        }

        if(isset($params['order_by'])) {
            $navigation->orderBy('order', $orderType);
        }

        if(isset($params['slug'])) {
            $navigation->slug($params['slug'], $orderType);
        }

        if(!$navigation->count())
            return array();

        switch ($returnType) {
            case 'array':
                if($returnSingle) 
                {
                    return $navigation->get()->toArray();
                } 
                else 
                {
                    return $navigation->first()->toArray();
                }

            break;
        }
    }

}
