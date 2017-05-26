<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class MainBannerTrans
 */
class MainBannerTrans extends BaseModel
{
    protected $table = 'main_banner_trans';

    public $timestamps = true;

    protected $fillable = [
        'locale',
        'main_banner_id',
        'updated_at'
    ];

    protected $guarded = [];

        
}