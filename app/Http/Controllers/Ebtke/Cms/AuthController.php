<?php

namespace App\Http\Controllers\Ebtke\Cms;

use Illuminate\Http\Request;
use App\Http\Controllers\CmsBaseController;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\Services\Bridge\Auth\Users as UserServices;
use App\Custom\Facades\DataHelper;
use App\Custom\RouteMenuLocation;
use Session;
use Auth;
use Validator;
use ValidatesRequests;
use Response;

class AuthController extends CmsBaseController
{
	use AuthenticatesUsers, ThrottlesLogins;

    protected $validationMessage = '';
    protected $validationChangePasswordForm = '';
    protected $user;

    public function __construct(UserServices $user)
    {
        $this->user = $user;
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


        if (Auth::attempt($credentials)) {
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

    /*

    protected function isUsingThrottlesLoginsTrait()
    {
        return in_array(
            ThrottlesLogins::class, class_uses_recursive(static::class)
        );
    }
    
    */

    /**
     * Get the failed login message.
     *
     * @return string
     */

    /**

    protected function getFailedLoginMessage()
    {
        return trans('message.failed');
    }

    */


    /**
     * Manage redirect after login
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    private function manageRedirectAfterLogin()
    {
        $userInfo = DataHelper::userInfo();

        if (isset($userInfo['user_location']['slug']) && !empty($userInfo['user_location']['slug']))
        {
            Session::forget('slug_menu');
            Session::put('slug_menu', $userInfo['user_location']['slug']);

            $user_location_slug = Session::get('slug_menu');
            
            return redirect('/'.$user_location_slug);
            //return redirect()->route('CmsDashboardPage');
        }

        return redirect(route('login'));
    }

    
    /**
     * Logout
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function logout()
    {
        Auth::logout();
        Session::flush();

        return redirect(route('login'));
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
     * Change Password
     * @param Request $request
     */
    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->input(), $this->validationChangePasswordForm());

        if ($validator->fails()) {
            //TODO: case fail
            $old_password = $validator->messages()->first('old_password') ?: '';
            $new_password = $validator->messages()->first('new_password') ?: '';
            $confirm_password = $validator->messages()->first('confirm_password') ?: '';
            $status = '';

            return Response::json(compact('old_password', 'new_password', 'confirm_password', 'status'));

        } else {
            //TODO: case pass
            return $this->user->changePassword($request->input());
        }
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