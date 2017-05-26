<?php

namespace App\Models;

use App\Models\BaseModel;

class NavigationTrans extends BaseModel
{
	protected $table = 'menu_trans';
    public $timestamps = true;

    protected $fillable = [
	    'created_at', 
	    'updated_at',
    ];
}