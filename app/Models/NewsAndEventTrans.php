<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class News And Event Translation
 */
class NewsAndEventTrans extends BaseModel
{
    protected $table = 'news_and_event_trans';

    public $timestamps = true;

    protected $fillable = [
        'locale',
        'updated_at'
    ];

    protected $guarded = [];

        
}