<?php

namespace App\Models\Sipeda;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ProyekPowerProducer 
 */
class InvestasiPabrikanAnekaEbt  extends Model
{
    protected $connection = 'sipeda';
    protected $table = 'investasi_pabrikan_aneka_ebt';

    protected $guard = 'sipeda';
    public $timestamps = true;

    protected $fillable = [
        'nama_produk',
        'sumber_dana',
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
     * @return \Illuminate\Database\Eloquent\Relations\belongsTo
     */
    
    public function perusahaan()
    {
        return $this->belongsTo('App\Models\Sipeda\Perusahaan', 'perusahaan_id', 'id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\belongsTo
     */
    public function provinsi()
    {
        return $this->belongsTo('App\Models\Sipeda\Provinsi', 'provinsi_id', 'id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\belongsTo
     */
    public function kabupaten()
    {
        return $this->belongsTo('App\Models\Sipeda\Kabupaten', 'kabupaten_id', 'id');
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