<?php

namespace App\Http\Controllers\Ebtke\Cms\Pages\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\CmsBaseController;
use App\Services\Bridge\Auth\Users as UserAccountServices;
use App\Services\Bridge\Auth\MenuNavigation as MenuNavigationServices;
use App\Services\Bridge\Auth\Privilage as PrivilageServices;
use App\Services\Bridge\Auth\System as SystemServices;
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
    protected $privilage;
    protected $system;
    protected $menuNavigation;
    protected $validationMessage = '';

    public function __construct(UserAccountServices $userAccount, PrivilageServices $privilage, SystemServices $system, MenuNavigationServices $menuNavigation, ResponseService $response)
    {
        $this->response = $response;
        $this->userAccount = $userAccount;
        $this->privilage = $privilage;
        $this->system = $system;
        $this->menuNavigation = $menuNavigation;
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
        $data['user_role'] = $this->privilage->getData();
        $data['system_location'] = $this->system->getData();
        $data['menu_navigation'] = $this->menuNavigation->getData();
        return $this->response->setResponse(trans('message.cms_success_get_data'), true, $data);
    }

    /**
     * Change Status Of User Account
     * @param array
     * @return string
     */

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->validationStore($request));

        if ($validator->fails()) {
            //TODO: case fail
            return $this->response->setResponseErrorFormValidation($validator->messages(), false);

        } else {
            //TODO: case pass
            return $this->userAccount->store($request->except(['_token']));
        }
    }

    /**
     * Change Status Of User Account
     * @return string
     */

    public function changeStatus(Request $request)
    {
        return $this->userAccount->changeStatus($request->except(['_token']));
    }

    /**
     * Edit Data Of User Account
     * @return string
     */

    public function edit(Request $request)
    {
        return $this->userAccount->edit($request->except(['_token']));
    }

    /**
     * Validation Store 
     * @return array
     */
    private function validationStore($request = array())
    {
        $rules = [
            'name'               => 'required',
            'email'              => 'required|email|max:30',
            'password'           => 'required|min:6|max:20',
            'confirm_password'   => 'required|same:password|min:6|max:20',
            'menu_id'            => 'required',
            'location_id'        => 'required',
            'system_id'          => 'required',
            'privilage_id'       => 'required',
        ];

        if ($this->isEditMode($request->input())) 
        {
            if (is_null($request->file('password'))) {
                unset($rules['password']);
            }
            
            if (is_null($request->file('confirm_password'))) {
                unset($rules['confirm_password']);
            }
        }


        return $rules;
    }

    /**
     * Check is edit mode or no
     * @param $data
     * @return bool
     */
    protected function isEditMode($data)
    {
        return isset($data['id']) && !empty($data['id']) ? true : false;
    }
}