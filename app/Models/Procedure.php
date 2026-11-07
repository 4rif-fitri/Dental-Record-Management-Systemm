<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Procedure extends Model
{
    protected $table = 'procedure';

    protected $fillable = [
        'procedure_name',
        'procedure_description',
        'procedure_type',
    ];

    public function findings()
    {
        return $this->hasMany(ToothFinding::class, 'procedure_id');
    }
}
