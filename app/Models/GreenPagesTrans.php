<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class News Trans
 */
class GreenPagesTrans extends BaseModel
{
    protected $table = 'green_pages_trans';

    public $timestamps = true;

    protected $fillable = [
        'locale',
        'introduction',
        'description'
    ];

    protected $guarded = [];

        
}