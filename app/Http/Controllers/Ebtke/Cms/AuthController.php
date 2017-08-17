<?php

namespace App\Http\Controllers\Ebtke\Cms;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use App\Http\Controllers\CmsBaseController;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use App\Services\Bridge\Auth\Users as UserServices;
use App\Custom\Facades\DataHelper;
use App\Custom\RouteMenuLocation;
use App\Services\Api\Response as ResponseService;
use Session;
use Auth;
use Validator;
use ValidatesRequests;
use Response;

class AuthController extends CmsBaseController
{
	use AuthenticatesAndRegistersUsers;

    protected $validationMessage = '';
    protected $validationChangePasswordForm = '';
    protected $response;
    protected $user;

    public function __construct(UserServices $user, ResponseService $response)
    {
        $this->user = $user;
        $this->response = $response;
    }

    public function authenticate(Request $request)
    {
    	if (!$this->validationAuth($request->input())) {
            return redirect(route('login'))->withInput($request->only($this->username(), 'remember'))->withErrors($this->validationMessage);
        }

        $credentials = $request->only($this->username(), 'password');
        $credentials['is_active'] = true;

        //TODO: Check Throttles
        $throttles = $this->isUsingThrottlesLoginsTrait();

        if ($throttles && $this->hasTooManyLoginAttempts($request)) {

            return $this->sendLockoutResponse($request);
        }


        if (Auth::guard('users')->attempt($credentials)) {
            //TODO: set session first

            if ($this->user->setAuthSession()) {
                //TODO : redirect to dashboard
                return $this->manageRedirectAfterLogin();
                // return redirect()->route('CmsDashboardPage');
            }
        }

        if ($throttles) {
            $this->incrementLoginAttempts($request);
        }


        return redirect(route('login'))
            ->withInput($request->only($this->username(), 'remember'))
            ->withErrors([
                $this->username() => $this->getFailedLoginMessage(),
            ]);

    }

    /**
     * Get the login username to be used by the controller.
     *
     * @return string
     */
    public function loginUsername()
    {
        return property_exists($this, 'username') ? $this->username : 'email';
    }

    /**
     * Determine if the class is using the ThrottlesLogins trait.
     *
     * @return bool
     */
    protected function isUsingThrottlesLoginsTrait()
    {
        return in_array(
            ThrottlesLogins::class, class_uses_recursive(static::class)
        );
    }

    /**
     * Get the failed login message.
     *
     * @return string
     */
    protected function getFailedLoginMessage()
    {
        return Lang::has('auth.failed')
                ? Lang::get('auth.failed')
                : 'These credentials do not match our records.';
    }

    /**
     *
     * Registration User
     * @return array
     */
    
    public function register(Request $request)
    {
        $blade = self::URL_BLADE_CMS. '.auth.register';
        
        if(view()->exists($blade)) {
        
            return view($blade);

        }

        return abort(404);
    }

    /**
     * Registered user
     * @param Request $request
     */

    public function registered(Request $request)
    {
        $validator = Validator::make($request->all(), $this->validateRegistrationUser($request));

        if ($validator->fails()) {
            //TODO: case fail
            return $this->response->setResponseErrorFormValidation($validator->messages(), false);

        } else {
            //TODO: case pass
            return $this->user->registered($request->except(['_token']));
        }
    }

    /**
     * Change Password
     * @param Request $request
     */
    public function changePassword(Request $request)
    {

        $validator = Validator::make($request->all(), $this->validationChangePasswordForm($request));

        if ($validator->fails()) {
            //TODO: case fail
            return $this->response->setResponseErrorFormValidation($validator->messages(), false);

        } else {
            //TODO: case pass
            return $this->user->changePassword($request->except(['_token']));
        }
    }


    /**
     * Manage redirect after login
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    private function manageRedirectAfterLogin()
    {
        $userInfo = DataHelper::userInfo();

        if (isset($userInfo['system_location']) && !empty($userInfo['system_location']))
        {
            foreach ($userInfo['system_location'] as $key => $value) {
                $value['system_slug'];
            }
            Session::forget('slug_system_menu');
            Session::put('slug_system_menu', $value['system_slug']);

            $user_location_slug = Session::get('slug_system_menu');
            
            return redirect()->route('CmsDashboardPage');
        }

        return redirect(route('login'));
    }

    
    /**
     * Logout
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function logout()
    {
        Auth::guard('users')->logout();
        Session::flush();

        return redirect(route('login'));
    }



    /**
     * Validate Offers Dining
     */
    private function validateRegistrationUser($request = array())
    {
        $rules = [
            'name'             => 'required|max:30',
            'email'            => 'required|email|max:30',
            'password'         => 'required|min:8|max:20',
            'confirm_password' => 'required|same:password|min:8|max:20',
        ];

        return $rules;
    }

    /**
     * Validation for authenticate
     * @param $credentials
     * @return bool
     */
    private function validationAuth($credentials)
    {
        $validator = Validator::make($credentials, $this->getValidationRules());

        if ($validator->fails()) {
            $this->validationMessage = $validator->messages();
            return false;
        }
        return true;
    }

    /**
     * Validation Rules
     * @return array
     */
    private function getValidationRules()
    {
        return $rules = array(
            'email'            => 'required|email',
            'password'         => 'required',
        );
    }

    /**
     * Validation Change Password Rules
     * @return array
     */
    private function validationChangePasswordForm()
    {
        return $rules = array(
            'old_password'      => 'required',
            'new_password'      => 'required',
            'confirm_password'  => 'required|same:new_password',
        );
    }

}