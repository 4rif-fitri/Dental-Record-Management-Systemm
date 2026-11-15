<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $table = 'appointments';

    protected $fillable = [
        'dentist_id',
        'appointment_date',
        'status',
        'time_slot',
    ];

    protected function casts(): array
    {
        return [
            'appointment_date' => 'date',
        ];
    }

    public function dentist()
    {
        return $this->belongsTo(User::class, 'dentist_id');
    }

    public function bookings()
    {
        return $this->hasMany(AppointmentBooking::class, 'appointment_id');
    }
}
