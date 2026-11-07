<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExaminationMedicine extends Model
{
    protected $table = 'examination_medicine';

    protected $fillable = [
        'examination_id',
        'medicine_id',
        'dosage',
        'frequency',
        'duration',
        'instructions',
        'quantity',
        'notes',
    ];

    public function examination()
    {
        return $this->belongsTo(Examination::class, 'examination_id');
    }

    public function medicine()
    {
        return $this->belongsTo(Medicine::class, 'medicine_id');
    }
}
