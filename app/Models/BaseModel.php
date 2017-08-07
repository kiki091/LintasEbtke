<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use LaravelLocalization;
use RouteMenuLocation;

class BaseModel extends Model
{
	protected function getSystemLocation()
	{
		$systemLocation = RouteMenuLocation::systemLocation();
		return $systemLocation;
	}
	
	protected function getCurrentLocalize()
    {
        $currentLocale  = LaravelLocalization::getCurrentLocale();
        return $currentLocale;
    }

    
}