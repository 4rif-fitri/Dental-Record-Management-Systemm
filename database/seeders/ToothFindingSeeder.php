<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ToothFindingSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('tooth_findings')->insert([
            [
                'patient_id' => 3,
                'tooth_id' => 6,
                'condition_id' => 1,
                'procedure_id' => 1,
                'finding_description' => 'Dental caries detected on upper right first molar.',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'patient_id' => 3,
                'tooth_id' => 11,
                'condition_id' => 5,
                'procedure_id' => 6,
                'finding_description' => 'Tooth is healthy. No treatment required.',
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
