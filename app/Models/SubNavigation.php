<?php

namespace App\Models;

use App\Models\BaseModel;

class SubNavigation extends BaseModel
{
	protected $table = 'sub_menu';
    public $timestamps = true;

    protected $fillable = [
	    'created_at', 
	    'updated_at',
	    'updated_by',
    ];

    public function sub_menu_tran()
    {
        return $this->hasMany('App\Models\SubNavigationTrans', 'sub_menu_id', 'id')->where('locale', '=' , $this->getCurrentLocalize());
    }


    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeMenuId($query, $params = true)
    {
        return $query->where('menu_id', $params);
    }
}