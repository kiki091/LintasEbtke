<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class News Trans
 */
class ListEnergyAuditorTrans extends BaseModel
{
    protected $table = 'list_energy_auditor_trans';

    public $timestamps = true;

    protected $fillable = [
        'locale',
        'sector',
        'sub_sector'
    ];

    protected $guarded = [];

        
}