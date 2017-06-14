<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class Seo Trans
 */
class ToolsTrans extends BaseModel
{
    protected $table = 'tools_trans';

    public $timestamps = true;

    protected $fillable = [
        'locale',
        'updated_at'
    ];

    protected $guarded = [];

        
}