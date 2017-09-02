<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class Nrecc Institution
 */
class NreccInstitution extends BaseModel
{
	protected $table = 'nrecc_institution';
    public $timestamps = false;

    protected $fillable = [
        'thumbnail',
        'order',
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
        return $this->hasMany('App\Models\NreccInstitutionTrans', 'nrecc_institution_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function translation()
    {
        return $this->belongsTo('App\Models\NreccInstitutionTrans', 'id', 'nrecc_institution_id')->where('locale', '=' , $this->getCurrentLocalize());
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