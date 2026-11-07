<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Condition extends Model
{
    protected $table = 'condition';

    protected $fillable = [
        'condition_name',
        'condition_description',
        'condition_type',
        'condition_code',
    ];

    public function findings()
    {
        return $this->hasMany(ToothFinding::class, 'condition_id');
    }
}
