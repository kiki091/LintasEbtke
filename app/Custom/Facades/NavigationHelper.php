<?php

namespace App\Custom\Facades;

use Illuminate\Support\Facades\Facade;

class NavigationHelper extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'NavigationHelper';
    }
}