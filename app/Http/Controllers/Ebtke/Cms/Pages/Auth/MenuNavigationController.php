<?php

namespace App\Http\Controllers\Ebtke\Cms\Pages\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\CmsBaseController;
use App\Services\Bridge\Auth\MenuNavigation as MenuNavigationServices;
use App\Services\Api\Response as ResponseService;
use App\Custom\DataHelper;

use Auth;
use Session;
use Validator;
use ValidatesRequests;

class MenuNavigationController extends CmsBaseController
{
    protected $response;
    protected $menuNavigation;

    public function __construct(MenuNavigationServices $menuNavigation, ResponseService $response)
    {
        $this->response = $response;
        $this->menuNavigation = $menuNavigation;
    }

    /**
     * Index Of Menu Grouping
     * @return string
     */

    public function index(Request $request)
    {
        $blade = self::URL_BLADE_CMS. '.auth.menu-navigation.navigation.main';
        
        if(view()->exists($blade)) {
        
            return view($blade);

        }

        return abort(404);
    }

    /**
     * Get Data Of Menu Grouping
     * @return string
     */

    public function getData(Request $request)
    {
        $data['menu_navigation'] = $this->menuNavigation->getData();
        return $this->response->setResponse(trans('success_get_data'), true, $data);
    }

    /**
     * Change Status Of Menu Grouping
     * @return string
     */

    public function changeStatus(Request $request)
    {
        return $this->menuNavigation->changeStatus($request->except(['_token']));
    }
}