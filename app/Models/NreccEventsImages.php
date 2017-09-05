<?php

namespace App\Models;

use App\Models\BaseModel;

class NreccEventsImages extends BaseModel
{
	protected $table = 'nrecc_event_images';
    public $timestamps = false;

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