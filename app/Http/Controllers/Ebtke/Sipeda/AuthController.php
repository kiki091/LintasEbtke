<?php

namespace App\Http\Controllers\Ebtke\Sipeda;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use App\Http\Controllers\SipedaBaseController;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use App\Services\Bridge\Sipeda\Perusahaan as UserServices;
use App\Custom\SipedaDataHelper;
use App\Custom\RouteMenuLocation;
use App\Services\Api\Response as ResponseService;
use Session;
use Auth;
use Validator;
use ValidatesRequests;
use Response;

class AuthController extends SipedaBaseController
{
	use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    protected $validationMessage = '';
    protected $validationChangePasswordForm = '';
    protected $response;
    protected $user;

    public function __construct(UserServices $user, ResponseService $response)
    {
        $this->user = $user;
        $this->response = $response;
    }

    public function index(Request $request)
    {
        $blade = self::URL_BLADE_SIPEDA. '.auth.login';
        
        if(view()->exists($blade)) {
        
            return view($blade);

        }

        return abort(404);
    }

    /**
     * @param Request $request
     */
    public function authenticate(Request $request)
    {
        //TODO: Validation Auth
        if (!$this->validationAuth($request->input())) {
            return redirect(route('sipeda_login'))
                ->withInput($request->only($this->loginUsername(), 'remember'))
                ->withErrors($this->validationMessage);
        }

        $credentials = $request->only('email', 'password');
        $credentials['is_active'] = true;

        //TODO: Check Throttles
        $throttles = $this->isUsingThrottlesLoginsTrait();

        if ($throttles && $this->hasTooManyLoginAttempts($request)) {

            return $this->sendLockoutResponse($request);
        }

        if (Auth::guard('sipeda')->attempt($credentials)) {
            //TODO: set session first
            if ($this->user->setSipedaAuthSession()) {
                //TODO : redirect to dashboard
               return $this->manageRedirectAfterLogin();
            }
        }

        if ($throttles) {
            $this->incrementLoginAttempts($request);
        }

        return redirect(route('msc_login'))
            ->withInput($request->only($this->loginUsername(), 'remember'))
            ->withErrors([
                $this->loginUsername() => $this->getFailedLoginMessage(),
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
     * Manage redirect after login
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    private function manageRedirectAfterLogin()
    {
        $sipedaInfo = SipedaDataHelper::sipedaInfo();

        if (isset($sipedaInfo['nama_perusahaan']) && !empty($sipedaInfo['nama_perusahaan'])) {
            
            return redirect('/dashboard');
        }

        return redirect(route('sipeda_login'));
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
            //return $this->user->changePassword($request->except(['_token']));
        }
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
            'email'         => 'required|email',
            'password'      => 'required',
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
    
    /**
     * Logout
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function logout()
    {
        Auth::guard('sipeda')->logout();
        Session::flush();

        return redirect(route('sipeda_login'));
    }

}