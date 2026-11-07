<?php

namespace App\Services;

use App\Models\Appointment;

class AppointmentService
{
    public function getAll()
    {
        return Appointment::with('dentist')
            ->latest()
            ->get();
    }

    public function getById($id)
    {
        return Appointment::with([
            'dentist',
            'bookings.patient'
        ])->findOrFail($id);
    }

    public function getAvailable()
    {
        return Appointment::with('dentist')
            ->where('status', 'available')
            ->whereDate('appointment_date', '>=', now()->toDateString())
            ->orderBy('appointment_date')
            ->get();
    }

    public function create(array $data)
    {
        return Appointment::create($data);
    }

    public function update($id, array $data)
    {
        $appointment = Appointment::findOrFail($id);

        $appointment->update($data);

        return $appointment;
    }

    public function delete($id)
    {
        return Appointment::findOrFail($id)->delete();
    }
}
