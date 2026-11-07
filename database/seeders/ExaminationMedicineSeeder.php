<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExaminationMedicineSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('examination_medicine')->insert([
            [
                'examination_id' => 1,
                'medicine_id' => 1,
                'dosage' => '500mg',
                'frequency' => 'Every 6 hours',
                'duration' => '3 days',
                'instructions' => 'Take after food',
                'quantity' => '12 tablets',
                'notes' => 'Sample prescription',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
