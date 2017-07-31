<?php

namespace App\Models\Sipeda;

use Illuminate\Database\Eloquent\Model;

/**
 * Class JenisKegiatan
 */
class JenisKegiatan extends Model
{
    protected $connection = 'sipeda';
    protected $table = 'jenis_kegiatan';

    protected $guard = 'sipeda';
    public $timestamps = true;

    protected $fillable = [
        'nama_kegiatan',
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