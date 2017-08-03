<?php

namespace App\Models;

use App\Models\BaseModel;

class CompanyHistory extends BaseModel
{
	protected $table = 'company_history';
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
        return $this->hasMany('App\Models\CompanyHistoryTrans', 'company_history_id', 'id');
    }

    /**
     * @return mixed
     */
    public function translation()
    {
        return $this->belongsTo('App\Models\CompanyHistoryTrans', 'id', 'company_history_id')->where('locale', '=' , $this->getCurrentLocalize());
    }

    /**
     * @param $query
     */
    public function scopeId($query, $params)
    {
        return $query->where('id', $params);
    }
}