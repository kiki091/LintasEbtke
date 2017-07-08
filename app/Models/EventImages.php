<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class News Trans
 */
class EventImages extends BaseModel
{
    protected $table = 'event_images';

    public $timestamps = true;

    protected $fillable = [
        'filename'
    ];

    protected $guarded = [];

    /**
     * @param $query
     */
    public function scopeId($query, $params)
    {
        return $query->where('id', $params);
    }
}