<?php

namespace App;


use Illuminate\Database\Eloquent\Model;

class AccessControl extends Model
{
    protected $fillable = [
        'user_id',
        'role',
        'data',
    ];

    public function getDataAttribute($value)
    {
        return json_decode($value);
    }

    public function setDataAttribute($value)
    {
        $this->attributes['data'] = json_encode($value);
    }
}
