<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class News And Event Translation
 */
class SeoTrans extends BaseModel
{
    protected $table = 'seo_trans';

    public $timestamps = true;

    protected $fillable = [
        'locale',
        'updated_at'
    ];

    protected $guarded = [];

        
}