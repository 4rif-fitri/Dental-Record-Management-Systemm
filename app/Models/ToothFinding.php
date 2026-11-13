<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ToothFinding extends Model
{
    protected $table = 'tooth_findings';

    protected $fillable = [
        'patient_id',
        'tooth_id',
        'condition_id',
        'procedure_id',
        'finding_description',
        'status',
    ];

    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function tooth()
    {
        return $this->belongsTo(Tooth::class, 'tooth_id');
    }

    public function condition()
    {
        return $this->belongsTo(Condition::class, 'condition_id');
    }

    public function procedure()
    {
        return $this->belongsTo(Procedure::class, 'procedure_id');
    }

    public function surfaces()
    {
        return $this->hasMany(ToothSurface::class, 'tooth_findings_id');
    }
}
