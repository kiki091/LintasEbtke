<?php

namespace App\Models;

use App\Models\BaseModel;

class TopNavigationTrans extends BaseModel
{
	protected $table = 'top_menu_trans';
    public $timestamps = true;

    protected $fillable = [
	    'created_at', 
	    'updated_at',
    ];
}