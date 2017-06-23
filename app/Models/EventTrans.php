<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class News Trans
 */
class EventTrans extends BaseModel
{
    protected $table = 'event_trans';

    public $timestamps = true;

    protected $fillable = [
        'locale',
        'title'
    ];

    protected $guarded = [];

    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeSlug($query, $slug)
    {
        return $query->where('slug', $slug);
    }
}