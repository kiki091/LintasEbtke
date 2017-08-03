<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class News Related
 */
class InvestmentServicesRelated extends BaseModel
{
    protected $table = 'investment_services_related';

    public $timestamps = true;

    protected $fillable = [
        'investment_services_id',
        'investment_services_related_id'
    ];

    protected $guarded = [];

    /**
     * @return mixed
     */
    public function related_investment_services()
    {
        return $this->belongsTo('App\Models\InvestmentServices', 'investment_services_related_id', 'id')->with('translation');
    }



    /**
     * @param $query
     */
    public function scopeInvestmentId($query, $params)
    {
        return $query->where('investment_services_id', $params);
    }
}