<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExaminationSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('examination')->insert([
            [
                'patient_id' => 3,
                'case_summary' => 'Patient experiencing pain in upper right molar.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'patient_id' => 4,
                'case_summary' => 'Routine dental examination.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
