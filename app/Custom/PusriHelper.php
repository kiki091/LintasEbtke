<?php

namespace App\Custom;

use LaravelLocalization;

class PusriHelper
{
	public static function getCurrentLanguageKey()
	{
		$currentLocale  = LaravelLocalization::getCurrentLocale();
        return $currentLocale;
	}
}