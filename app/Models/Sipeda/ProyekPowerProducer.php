<?php

namespace App\Models\Sipeda;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ProyekPowerProducer 
 */
class ProyekPowerProducer  extends Model
{
    protected $connection = 'sipeda';
    protected $table = 'proyek_power_producer';

    protected $guard = 'sipeda';
    public $timestamps = true;

    protected $fillable = [
        'nama_proyek',
        'jenis_pembangkit',
        'update_at',
        'created_by'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $guarded = ['sipeda'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    
    
    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeUserId($query, $params = true)
    {
        return $query->where('id', $params);
    }
}