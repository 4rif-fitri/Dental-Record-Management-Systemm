<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Surface extends Model
{
    protected $table = 'surfaces';

    protected $fillable = [
        'surface_name',
        'surface_type',
        'surface_code',
    ];

    public function toothSurfaces()
    {
        return $this->hasMany(ToothSurface::class, 'surface_id');
    }
}
