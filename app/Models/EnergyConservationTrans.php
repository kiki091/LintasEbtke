<?php

namespace App\Models;

use App\Models\BaseModel;

class EnergyConservationTrans extends BaseModel
{
	protected $table = 'energy_conservation_trans';
    public $timestamps = false;

    protected $fillable = [
	    'created_at', 
	    'updated_by'
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