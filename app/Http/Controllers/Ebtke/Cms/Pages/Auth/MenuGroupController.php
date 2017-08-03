<?php

namespace App\Http\Controllers\Ebtke\Cms\Pages\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\CmsBaseController;
use App\Services\Bridge\Auth\MenuGroup as MenuGroupServices;
use App\Services\Api\Response as ResponseService;
use App\Custom\DataHelper;

use Auth;
use Session;
use Validator;
use ValidatesRequests;

class MenuGroupController extends CmsBaseController
{
    protected $response;
    protected $menuGroup;

    public function __construct(MenuGroupServices $menuGroup, ResponseService $response)
    {
        $this->response = $response;
        $this->menuGroup = $menuGroup;
    }

    /**
     * Index Of Menu Grouping
     * @return string
     */

    public function index(Request $request)
    {
        $blade = self::URL_BLADE_CMS. '.auth.menu-navigation.group.main';
        
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
        $data['menu_group'] = $this->menuGroup->getData();
        return $this->response->setResponse(trans('success_get_data'), true, $data);
    }

    /**
     * Change Status Of Menu Grouping
     * @return string
     */

    public function changeStatus(Request $request)
    {
        return $this->menuGroup->changeStatus($request->except(['_token']));
    }
}