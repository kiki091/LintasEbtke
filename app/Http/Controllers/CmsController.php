<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use App\Http\Controllers\Controller;

use URL;
use Auth;
use Session;

class CmsController extends Controller
{
    protected $currentLanguage;

	const MAIN_BLADE_CMS = 'ebtke.cms.pages';

	public function __construct()
	{

        if (Auth::check()) {
           return redirect()->route('CmsDashboardPage');
        }
	}

}