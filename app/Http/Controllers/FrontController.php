<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use LaravelLocalization;
use URL;
use Session;
use JavaScript;

class FrontController extends Controller
{
    protected $currentLanguage;

	const URL_BLADE_FRONT_SITE = 'ebtke.front.pages';

	public function __construct()
	{

		$this->_init();
        $this->setJavascriptVariable();
	}

	/**
     * Initial function
     */
    private function _init()
    {
        $this->setCurrentLanguage();
    }

	/**
     * Set current Language
     */
    public function setCurrentLanguage()
    {
        $this->currentLanguage  = LaravelLocalization::getCurrentLocale();
    }

    /**
     * Phars php to Js
     */
    protected function setJavascriptVariable()
    {
        JavaScript::put([
            'current_language' => LaravelLocalization::getCurrentLocale(),
            'app_domain' => env('APP_DOMAIN'),
            'token' => csrf_token()
        ]);
    }
}