<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class Tag
 */
class Tag extends BaseModel
{
    protected $table = 'tag';

    public $timestamps = true;

    protected $fillable = [
        'created_at',
        'updated_at'
    ];

    protected $guarded = [];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function translations()
    {
        return $this->hasMany('App\Models\TagTrans', 'tag_id', 'id');
    }

    /**
     * @return mixed
     */
    public function translation()
    {
        return $this->belongsTo('App\Models\TagTrans', 'id', 'tag_id')->where('locale', '=' , $this->getCurrentLocalize());
    }
}