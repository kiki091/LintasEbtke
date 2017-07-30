<?php

namespace App\Models\Sipeda;

use Illuminate\Database\Eloquent\Model;

/**
 * Class User
 */
class PrivilagePerusahaan extends Model
{
    protected $connection = 'sipeda';
    protected $table = 'privilage_perusahaan';

    protected $guard = 'sipeda';
    public $timestamps = true;

    protected $fillable = [
        'update_at',
        'created_by'
    ];

    protected $guarded = ['sipeda'];

    public function role_perusahaan()
    {
        return $this->belongsTo('App\Models\Sipeda\RolePerusahaan', 'id', 'privilage_id');
    }


    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeId($query, $params = true)
    {
        return $query->where('id', $params);
    }
}