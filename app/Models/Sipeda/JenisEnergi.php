<?php

namespace App\Models\Sipeda;

use Illuminate\Database\Eloquent\Model;

/**
 * Class EnergiTerbarukan
 */
class JenisEnergi extends Model
{
    protected $connection = 'sipeda';
    protected $table = 'jenis_energi';

    protected $guard = 'sipeda';
    public $timestamps = true;

    protected $fillable = [
        'tahun',
        'nama_proyek',
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

    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeUserId($query, $params = true)
    {
        return $query->where('id', $params);
    }
}