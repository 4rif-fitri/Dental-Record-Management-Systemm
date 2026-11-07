<?php

namespace App\Services;

use App\Models\AppointmentBooking;
use App\Models\Appointment;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class AppointmentBookingService
{
    public function getAll()
    {
        return AppointmentBooking::with([
            'appointment.dentist',
            'patient'
        ])->latest()->get();
    }

    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {

            $appointment = Appointment::whereKey($data['appointment_id'])
                ->lockForUpdate()
                ->firstOrFail();

            if ($appointment->status !== 'available') {
                throw ValidationException::withMessages([
                    'appointment_id' => 'Appointment is not available.'
                ]);
            }

            $booking = AppointmentBooking::create($data);

            $appointment->update([
                'status' => 'booked'
            ]);

            return $booking;
        });
    }

    public function update($id, array $data)
    {
        $booking = AppointmentBooking::findOrFail($id);

        $booking->update($data);

        return $booking;
    }

    public function delete($id)
    {
        return AppointmentBooking::findOrFail($id)->delete();
    }
}
