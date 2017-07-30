<?php

namespace App\Models\Sipeda;

use Illuminate\Database\Eloquent\Model;

/**
 * Class PotensiEnergiTerbarukan
 */
class PotensiEnergiTerbarukan extends Model
{
    protected $connection = 'sipeda';
    protected $table = 'potensi_energi_terbarukan';

    protected $guard = 'sipeda';
    public $timestamps = true;

    protected $fillable = [
        'tahun',
        'terbukti_kapasitas',
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
    
    public function perusahaan()
    {
        return $this->hasMany('App\Models\Sipeda\Perusahaan', 'perusahaan_id', 'id');
    }

    public function lokasi()
    {
        return $this->hasMany('App\Models\Sipeda\Lokasi', 'lokasi_id', 'id');
    }

    public function energi()
    {
        return $this->hasMany('App\Models\Sipeda\JenisEnergi', 'jenis_energi_id', 'id');
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