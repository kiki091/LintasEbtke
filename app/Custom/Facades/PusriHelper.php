<?php

namespace App\Custom\Facades;

use Illuminate\Support\Facades\Facade;

class PusriHelper extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'PusriHelper';
    }
}