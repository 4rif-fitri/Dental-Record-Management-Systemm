<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    protected $table = 'medicine';

    protected $fillable = [
        'name',
        'description',
    ];

    public function examinations()
    {
        return $this->hasMany(ExaminationMedicine::class, 'medicine_id');
    }
}
