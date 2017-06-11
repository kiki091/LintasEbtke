<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class News Trans
 */
class OrganizationStructureTrans extends BaseModel
{
    protected $table = 'organization_structure_trans';

    public $timestamps = true;

    protected $fillable = [
        'locale'
    ];

    protected $guarded = [];

        
}