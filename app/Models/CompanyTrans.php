<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class MainBannerTrans
 */
class CompanyTrans extends BaseModel
{
    protected $table = 'company_profile_trans';

    public $timestamps = true;

    protected $fillable = [
        'locale',
        'updated_at'
    ];

    protected $guarded = [];

    

    /**
     * @param $query
     */
    public function scopeIsSlug($query, $slug)
    {
        return $query->where('slug', $slug);
    }
}