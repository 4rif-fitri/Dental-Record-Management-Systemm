<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppointmentBooking extends Model
{
    protected $table = 'appointment_bookings';

    protected $fillable = [
        'appointment_id',
        'patient_id',
        'status',
        'reason',
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }

    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }
}
