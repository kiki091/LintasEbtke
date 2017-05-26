<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use LaravelLocalization;

class BaseModel extends Model
{
	protected function getCurrentLocalize()
    {
        $currentLocale  = LaravelLocalization::getCurrentLocale();
        return $currentLocale;
    }

    
}