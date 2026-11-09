<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tooth extends Model
{
    protected $table = 'tooth';
    protected $fillable = [
        'tooth_number',
        'tooth_name',
        'tooth_type',
        'jaw',
        'quadrant',
    ];

    public function findings()
    {
        return $this->hasMany(ToothFinding::class, 'tooth_id');
    }
}
