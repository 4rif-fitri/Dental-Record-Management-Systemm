<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AppointmentSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('appointments')->insert([
            [
                'dentist_id' => 1,
                'appointment_date' => '2026-11-10',
                'status' => 'available',
                'time_slot' => '09:00 AM - 09:30 AM',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'dentist_id' => 1,
                'appointment_date' => '2026-11-10',
                'status' => 'available',
                'time_slot' => '10:00 AM - 10:30 AM',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'dentist_id' => 2,
                'appointment_date' => '2026-11-10',
                'status' => 'available',
                'time_slot' => '11:00 AM - 11:30 AM',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
