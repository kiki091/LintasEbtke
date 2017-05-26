<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class News And Event Translation
 */
class Gp3kTrans extends BaseModel
{
    protected $table = 'gp3k_trans';

    public $timestamps = true;

    protected $fillable = [
        'locale',
        'updated_at'
    ];

    protected $guarded = [];

        
}