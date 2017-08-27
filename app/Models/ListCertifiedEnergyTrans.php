<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class News Trans
 */
class ListCertifiedEnergyTrans extends BaseModel
{
    protected $table = 'list_certified_energy_trans';

    public $timestamps = true;

    protected $fillable = [
        'locale',
        'sector',
        'sub_sector'
    ];

    protected $guarded = [];

        
}