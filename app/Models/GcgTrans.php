<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class News And Event Translation
 */
class GcgTrans extends BaseModel
{
    protected $table = 'gcg_trans';

    public $timestamps = true;

    protected $fillable = [
        'locale',
        'updated_at'
    ];

    protected $guarded = [];

        
}