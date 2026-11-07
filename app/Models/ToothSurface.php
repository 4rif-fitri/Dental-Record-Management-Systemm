<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ToothSurface extends Model
{
    protected $table = 'tooth_surfaces';

    protected $fillable = [
        'tooth_findings_id',
        'surface_id',
    ];

    public function toothFinding()
    {
        return $this->belongsTo(ToothFinding::class, 'tooth_findings_id');
    }

    public function surface()
    {
        return $this->belongsTo(Surface::class, 'surface_id');
    }
}
