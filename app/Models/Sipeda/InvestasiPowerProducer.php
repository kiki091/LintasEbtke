<?php

namespace App\Models\Sipeda;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ProyekPowerProducer 
 */
class InvestasiPowerProducer  extends Model
{
    protected $connection = 'sipeda';
    protected $table = 'investasi_power_producer';

    protected $guard = 'sipeda';
    public $timestamps = true;

    protected $fillable = [
        'sumber_dana',
        'status',
        'tahun_investasi',
        'rencana_pengembangan'
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
    
    public function proyek_power_producer()
    {
        return $this->belongsTo('App\Models\Sipeda\ProyekPowerProducer', 'proyek_power_producer_id', 'id')->with('perusahaan');
    }
    
    
    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeUserId($query, $params = true)
    {
        return $query->where('id', $params);
    }
}