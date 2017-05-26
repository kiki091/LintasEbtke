<?php

namespace App\Models;

use App\Models\BaseModel;

class TopNavigation extends BaseModel
{
	protected $table = 'top_menu';
    public $timestamps = true;

    protected $fillable = [
	    'created_at', 
	    'updated_by',
    ];

    public function top_menu_trans()
    {
        return $this->hasMany('App\Models\TopNavigationTrans', 'top_menu_id', 'id');
    }

    public function top_menu_tran()
    {
        return $this->belongsTo('App\Models\TopNavigationTrans', 'id', 'top_menu_id')->where('locale', '=' , $this->getCurrentLocalize());
    }

    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeIsActive($query, $params = true)
    {
        return $query->where('is_active', $params);
    }

    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeId($query, $params)
    {
        return $query->where('id', $params);
    }
}