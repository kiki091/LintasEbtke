<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class Seo Trans
 */
class SeoTrans extends BaseModel
{
    protected $table = 'seo_trans';

    public $timestamps = true;

    protected $fillable = [
        'locale',
        'seo_id',
        'updated_at'
    ];

    protected $guarded = [];

        
}