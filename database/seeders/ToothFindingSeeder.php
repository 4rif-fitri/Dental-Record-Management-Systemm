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
                'examination_id' => 1,
                'tooth_id' => 6,
                'condition_id' => 1,
                'procedure_id' => 1,
                'finding_description' => 'Dental caries detected on upper right first molar.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'examination_id' => 2,
                'tooth_id' => 11,
                'condition_id' => 5,
                'procedure_id' => 6,
                'finding_description' => 'Tooth is healthy. No treatment required.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
