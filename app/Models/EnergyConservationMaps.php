<?php

namespace App\Models;

use App\Models\BaseModel;

class EnergyConservationMaps extends BaseModel
{
	protected $table = 'energy_conservation_maps';
    public $timestamps = false;

    protected $fillable = [
	    'created_at', 
	    'updated_by'
    ];

    protected $guarded = [];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function energy_conservation()
    {
        return $this->belongsTo('App\Models\EnergyConservation', 'energy_conservation_id', 'id')->with('translation');
    }

    public function maps_category()
    {
        return $this->belongsTo('App\Models\MapsCategory', 'maps_category_id', 'id')->with('translation');
    }

    public function province()
    {
        return $this->belongsTo('App\Models\Provinsi', 'provinsi_id', 'id')->with('pulau');
    }

    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeCategoryId($query, $params)
    {
        return $query->where('maps_category_id', $params);
    }

    /**
     * @param $query
     */
    public function scopeConservationId($query, $params)
    {
        return $query->where('energy_conservation_id', $params);
    }

    /**
     * @param $query
     */
    public function scopeId($query, $params)
    {
        return $query->where('id', $params);
    }
}