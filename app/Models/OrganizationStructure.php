<?php

namespace App\Models;

use App\Models\BaseModel;

class OrganizationStructure extends BaseModel
{
	protected $table = 'organization_structure';
    public $timestamps = false;

    protected $fillable = [
	    'created_at', 
	    'updated_by',
    ];

    protected $guarded = [];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function translations()
    {
        return $this->hasMany('App\Models\OrganizationStructureTrans', 'organization_structure_id', 'id');
    }

    /**
     * @return mixed
     */
    public function translation()
    {
        return $this->belongsTo('App\Models\OrganizationStructureTrans', 'id', 'organization_structure_id')->where('locale', '=' , $this->getCurrentLocalize());
    }

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