<?php

namespace App\Custom\Facades;

use Illuminate\Support\Facades\Facade;

class EbtkeHelper extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'EbtkeHelper';
    }
}