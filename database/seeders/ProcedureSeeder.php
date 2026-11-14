<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProcedureSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('procedure')->insert([
            [
                'procedure_name' => 'Dental Filling',
                'procedure_description' => 'Restore damaged tooth using filling material.',
                'procedure_type' => 'Restorative',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'procedure_name' => 'Tooth Extraction',
                'procedure_description' => 'Removal of a tooth.',
                'procedure_type' => 'Surgical',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'procedure_name' => 'Scaling',
                'procedure_description' => 'Removal of plaque and calculus.',
                'procedure_type' => 'Preventive',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'procedure_name' => 'Root Canal Treatment',
                'procedure_description' => 'Treatment of infected dental pulp.',
                'procedure_type' => 'Endodontic',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'procedure_name' => 'Dental Crown',
                'procedure_description' => 'Placement of a crown to protect a damaged tooth.',
                'procedure_type' => 'Restorative',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'procedure_name' => 'No Treatment',
                'procedure_description' => 'No treatment required.',
                'procedure_type' => 'Observation',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
