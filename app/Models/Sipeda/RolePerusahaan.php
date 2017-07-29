<?php

namespace App\Models\Sipeda;

use Illuminate\Database\Eloquent\Model;

/**
 * Class User
 */
class RolePerusahaan extends Model
{
    protected $connection = 'sipeda';
    protected $table = 'role_perusahaan';

    public $timestamps = true;

    protected $fillable = [
        'update_at',
        'created_by'
    ];

    protected $guarded = ['sipeda'];

    public function sipeda_privilage()
    {
        return $this->belongsTo('App\Models\Sipeda\PrivilagePerusahaan', 'privilage_id', 'id');
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