<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SurfaceCondition extends Model
{
    protected $table = 'surface_conditions';

    protected $fillable = [
        'condition_name',
        'condition_code',
    ];


}
