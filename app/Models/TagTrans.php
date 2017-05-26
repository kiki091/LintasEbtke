<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class Tag Trans
 */
class TagTrans extends BaseModel
{
    protected $table = 'tag_trans';

    public $timestamps = true;

    protected $fillable = [
        'created_at',
        'updated_at'
    ];

    protected $guarded = [];

        
}