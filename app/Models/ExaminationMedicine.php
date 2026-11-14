<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExaminationMedicine extends Model
{
    protected $table = 'examination_medicine';

    protected $fillable = [
        'patient_id',
        'medicine_id',
        'dosage',
        'frequency',
        'duration',
        'instructions',
        'quantity',
        'notes',
    ];

    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function medicine()
    {
        return $this->belongsTo(Medicine::class, 'medicine_id');
    }
}
