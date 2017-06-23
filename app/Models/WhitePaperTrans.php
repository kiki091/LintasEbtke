<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class Seo Trans
 */
class WhitePaperTrans extends BaseModel
{
    protected $table = 'white_paper_trans';

    public $timestamps = true;

    protected $fillable = [
        'locale',
        'updated_at'
    ];

    protected $guarded = [];

    

    /**
     * @param $query
     */
    public function scopeSlug($query, $params)
    {
        return $query->where('slug', $params);
    }
}