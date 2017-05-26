<?php

namespace App\Models;

use App\Models\BaseModel;

class SubNavigationTrans extends BaseModel
{
	protected $table = 'sub_menu_trans';
    public $timestamps = true;

    protected $fillable = [
	    'created_at', 
	    'updated_at',
    ];
}