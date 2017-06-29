<?php

namespace App\Http\Controllers\Ebtke\Cms\Pages\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\CmsBaseController;
use App\Services\Bridge\Auth\Users as UserAccountServices;
use App\Services\Api\Response as ResponseService;
use App\Custom\DataHelper;

use Auth;
use Session;
use Validator;
use ValidatesRequests;

class UserAccountController extends CmsBaseController
{
    protected $response;
    protected $userAccount;

    public function __construct(UserAccountServices $userAccount, ResponseService $response)
    {
        $this->response = $response;
        $this->userAccount = $userAccount;
    }

    /**
     * Index Of User Account
     * @return string
     */

    public function index(Request $request)
    {
        $blade = self::URL_BLADE_CMS. '.auth.user-account.main';
        
        if(view()->exists($blade)) {
        
            return view($blade);

        }

        return abort(404);
    }

    /**
     * Get Data Of User Account
     * @return string
     */

    public function getData(Request $request)
    {
        $data['user_account'] = $this->userAccount->getData();
        return $this->response->setResponse(trans('success_get_data'), true, $data);
    }

    /**
     * Change Status Of User Account
     * @return string
     */

    public function changeStatus(Request $request)
    {
        return $this->userAccount->changeStatus($request->except(['_token']));
    }
}