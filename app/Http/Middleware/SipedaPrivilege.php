<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Session;
use Route;
use App\Services\Auth\SipedaPrivilegeChecker;

class SipedaPrivilege
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = 'sipeda')
    {
        try {
            $session            = Session::get('sipeda_user_info');

            if (!isset($session['sipeda_privilage'][0]['role_name']) && empty($session['sipeda_privilage'][0]['role_name'])) {
                return response()->json(['message' => 'No Privilege', 'status' => false]);
            }

            $privilegeChecker   = new SipedaPrivilegeChecker($session['sipeda_privilage'][0]['role_name']);

            if (!$privilegeChecker->isAuthorized()) {
                return response()->json(['message' => 'No Privilege', 'status' => false]);
            }

            return $next($request);


        } catch (\Exception $e) {
            return response()->json(['message' => 'Internal Server Error', 'status' => false]);
        }
    }
}
