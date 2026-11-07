<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Examination extends Model
{
    protected $table = 'examination';

    protected $fillable = [
        'patient_id',
        'case_summary',
    ];

    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function medicines()
    {
        return $this->hasMany(ExaminationMedicine::class, 'examination_id');
    }

    public function toothFindings()
    {
        return $this->hasMany(ToothFinding::class, 'examination_id');
    }
}
