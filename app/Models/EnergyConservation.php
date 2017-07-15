<?php

namespace App\Models;

use App\Models\BaseModel;

class EnergyConservation extends BaseModel
{
	protected $table = 'energy_conservation';
    public $timestamps = false;

    protected $fillable = [
	    'created_at', 
	    'updated_by',
        'is_active'
    ];

    protected $guarded = [];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function translations()
    {
        return $this->hasMany('App\Models\EnergyConservationTrans', 'energy_conservation_id', 'id');
    }

    /**
     * @return mixed
     */
    public function translation()
    {
        return $this->belongsTo('App\Models\EnergyConservationTrans', 'id', 'energy_conservation_id')->where('locale', '=' , $this->getCurrentLocalize());
    }

    /**
     * @return mixed
     */
    public function maps_data()
    {
        return $this->hasMany('App\Models\EnergyConservationMaps', 'energy_conservation_id', 'id')->with('maps_category','province');
    }

    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeIsActive($query, $params = true)
    {
        return $query->where('is_active', $params);
    }

    /**
     * @param $query
     */
    public function scopeId($query, $params)
    {
        return $query->where('id', $params);
    }
}