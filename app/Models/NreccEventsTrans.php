<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class Nrecc Resources Events
 */
class NreccEventsTrans extends BaseModel
{
    protected $table = 'nrecc_event_trans';

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