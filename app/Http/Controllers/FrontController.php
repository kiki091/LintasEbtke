<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Custom\RouteMenuLocation;
use App\Http\Controllers\Controller;
use App\Services\Bridge\Front\Navigation as NavigationService;

use LaravelLocalization;
use URL;
use Session;
use JavaScript;

class FrontController extends Controller
{
	protected $navigation;
    protected $currentLanguage;

	const URL_BLADE_FRONT_SITE = 'pusri.front.pages';

	public function __construct(NavigationService $navigation)
	{
		$this->navigation = $navigation;

		$this->_init();
        $this->getMenuNavigation();
        $this->setJavascriptVariable();
	}

    

    public function getMenuNavigation()
    {
        $menu = $this->navigation->getNavigation();

        return $menu;
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

	public function getTopNavigation()
	{
		$top_menu = $this->navigation->getTopNavigation();

		return $top_menu;
	}
}