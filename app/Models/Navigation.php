<?php

namespace App\Models;

use App\Models\BaseModel;

class Navigation extends BaseModel
{
	protected $table = 'menu';
    public $timestamps = true;

    protected $fillable = [
	    'created_at', 
	    'created_by',
	    'updated_by',
    ];

    public function menu_trans()
    {
        return $this->hasMany('App\Models\NavigationTrans', 'menu_id', 'id');
    }

    public function menu_tran()
    {
        return $this->belongsTo('App\Models\NavigationTrans', 'id', 'menu_id')->where('locale', '=' , $this->getCurrentLocalize());
    }

    public function sub_menu()
    {
        return $this->belongsTo('App\Models\SubNavigation', 'id', 'menu_id')->with('sub_menu_tran');
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
    public function scopeSlug($query, $params = true)
    {
        return $query->where('slug', $params);
    }

    /**
     * @param $query
     */
    public function scopeId($query, $params)
    {
        return $query->where('id', $params);
    }
}