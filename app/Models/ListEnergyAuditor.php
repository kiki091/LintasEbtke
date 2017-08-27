<?php

namespace App\Models;

use App\Models\BaseModel;

class ListEnergyAuditor extends BaseModel
{
	protected $table = 'list_energy_auditor';
    public $timestamps = true;

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
        return $this->hasMany('App\Models\ListEnergyAuditorTrans', 'list_energy_auditor_id', 'id');
    }

    /**
     * @return mixed
     */
    public function translation()
    {
        return $this->belongsTo('App\Models\ListEnergyAuditorTrans', 'id', 'list_energy_auditor_id')->where('locale', '=' , $this->getCurrentLocalize());
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\belongsTo
     */

    /**
     * @return mixed
     */
    public function province()
    {
        return $this->belongsTo('App\Models\Province', 'province_id', 'id');
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