<?php

namespace App\Custom;

use LaravelLocalization;

class EbtkeHelper
{
	public static function getCurrentLanguageKey()
	{
		$currentLocale  = LaravelLocalization::getCurrentLocale();
        return $currentLocale;
	}
}