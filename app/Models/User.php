<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'student_staff_id',
        'ic_passport',
        'name',
        'gender',
        'phone_number',
        'role',
        'profile_image',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'dentist_id');
    }

    public function bookings()
    {
        return $this->hasMany(AppointmentBooking::class, 'patient_id');
    }

    public function queues()
    {
        return $this->hasMany(Queue::class, 'patient_id');
    }

    public function examinations()
    {
        return $this->hasMany(Examination::class, 'patient_id');
    }

    public function media()
    {
        return $this->hasMany(Media::class, 'uploaded_by_user_id');
    }
}
