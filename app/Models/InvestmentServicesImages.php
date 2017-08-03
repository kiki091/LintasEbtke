<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class News Related
 */
class InvestmentServicesImages extends BaseModel
{
    protected $table = 'investment_services_images';

    public $timestamps = true;

    protected $fillable = [
        'filename',
        'investment_services_id'
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