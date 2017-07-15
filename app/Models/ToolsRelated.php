<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class Tools Related
 */
class ToolsRelated extends BaseModel
{
    protected $table = 'tools_related';

    public $timestamps = true;

    protected $fillable = [
        'tools_id',
        'tools_related_id'
    ];

    protected $guarded = [];

    /**
     * @return mixed
     */
    public function related_tools()
    {
        return $this->belongsTo('App\Models\Tools', 'tools_related_id', 'id')->with('translation');
    }


    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeToolsId($query, $params)
    {
        return $query->where('tools_id', $params);
    }
}