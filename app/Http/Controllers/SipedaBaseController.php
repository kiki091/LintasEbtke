<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\Route;

use JavaScript;
use Auth;
use Session;

class SipedaBaseController extends Controller
{
    const URL_BLADE_SIPEDA = 'ebtke.sipeda.pages';

	public function __construct()
    {
        if (Auth::guard('sipeda')->check() == null) {
           return redirect()->route('sipeda_login');
        }
    }
}