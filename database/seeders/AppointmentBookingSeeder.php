<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AppointmentBookingSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('appointment_bookings')->insert([
            [
                'appointment_id' => 1,
                'patient_id' => 3,
                'status' => 'confirmed',
                'reason' => 'Toothache',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'appointment_id' => 2,
                'patient_id' => 4,
                'status' => 'pending',
                'reason' => 'Dental Checkup',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
