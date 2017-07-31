<?php

namespace App\Custom\Facades;

use Illuminate\Support\Facades\Facade;

class SipedaDataHelper extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'SipedaDataHelper';
    }
}