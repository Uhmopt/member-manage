<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    protected $fillable = ['table_id', 'data'];

    public function getDataAttribute($value)
    {
        return json_decode($value);
    }

    public function setDataAttribute($value)
    {
        $this->attributes['data'] = is_string($value) ? $value : json_encode($value);
    }

    public function Table()
    {
        return $this->hasOne('App\Table', 'id', 'table_id');
    }
}
