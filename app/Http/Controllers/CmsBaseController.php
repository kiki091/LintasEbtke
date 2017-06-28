<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\Route;

use LaravelLocalization;
use JavaScript;
use Auth;
use Session;

class CmsBaseController extends Controller
{
    const URL_BLADE_CMS = 'ebtke.cms.pages';

	public function __construct()
    {
        if (Auth::check() == null) {
           return redirect()->route('login');
        }
    }

    /**
     * Phars php to Js
     */
    protected function setSuportedLanguage()
    {
        $supported_locales = LaravelLocalization::getSupportedLocales();

        return $supported_locales;
    }

    protected function setSuportedLanguageKey()
    {
        $supported_language = LaravelLocalization::getSupportedLocales();

        foreach ($supported_language as $key => $value) {
            $supported_language[$key] = '';
        }

        return $supported_language;
    }
}