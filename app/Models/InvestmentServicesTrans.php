<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class Seo Trans
 */
class InvestmentServicesTrans extends BaseModel
{
    protected $table = 'investment_services_trans';

    public $timestamps = true;

    protected $fillable = [
        'locale',
        'updated_at'
    ];

    protected $guarded = [];

    /**
     * @param $query
     */
    public function scopeSlug($query, $slug)
    {
        return $query->where('slug', $slug);
    }

        
}