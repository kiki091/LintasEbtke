<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class News Trans
 */
class GreenPagesImages extends BaseModel
{
    protected $table = 'green_pages_images';

    public $timestamps = true;

    protected $fillable = [
        'filename'
    ];

    protected $guarded = [];

        
}