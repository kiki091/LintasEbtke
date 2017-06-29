<?php

namespace App\Http\Controllers\Ebtke\Cms\Pages\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\CmsBaseController;
use App\Services\Bridge\Auth\SubMenuNavigation as SubMenuNavigationServices;
use App\Services\Api\Response as ResponseService;
use App\Custom\DataHelper;

use Auth;
use Session;
use Validator;
use ValidatesRequests;

class SubMenuNavigationController extends CmsBaseController
{
    protected $response;
    protected $subMenuNavigation;

    public function __construct(SubMenuNavigationServices $subMenuNavigation, ResponseService $response)
    {
        $this->response = $response;
        $this->subMenuNavigation = $subMenuNavigation;
    }

    /**
     * Index Of Menu Grouping
     * @return string
     */

    public function index(Request $request)
    {
        $blade = self::URL_BLADE_CMS. '.auth.menu-navigation.sub-navigation.main';
        
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
        $data['sub_navigation'] = $this->subMenuNavigation->getData();
        return $this->response->setResponse(trans('success_get_data'), true, $data);
    }

    /**
     * Change Status Of Menu Grouping
     * @return string
     */

    public function changeStatus(Request $request)
    {
        return $this->subMenuNavigation->changeStatus($request->except(['_token']));
    }
}