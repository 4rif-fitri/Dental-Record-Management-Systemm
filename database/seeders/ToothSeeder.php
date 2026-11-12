<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ToothSeeder extends Seeder
{
    public function run(): void
    {
        $teeth = [];

        $quadrants = [
            1 => ['jaw' => 'upper', 'tooth_type' => 'permanent'],
            2 => ['jaw' => 'upper', 'tooth_type' => 'permanent'],
            3 => ['jaw' => 'lower', 'tooth_type' => 'permanent'],
            4 => ['jaw' => 'lower', 'tooth_type' => 'permanent'],

            5 => ['jaw' => 'upper', 'tooth_type' => 'primary'],
            6 => ['jaw' => 'upper', 'tooth_type' => 'primary'],
            7 => ['jaw' => 'lower', 'tooth_type' => 'primary'],
            8 => ['jaw' => 'lower', 'tooth_type' => 'primary'],
        ];

        $types = [
            1 => ['name' => 'Central Incisor', 'surfaces' => 4],
            2 => ['name' => 'Lateral Incisor', 'surfaces' => 4],
            3 => ['name' => 'Canine', 'surfaces' => 4],
            4 => ['name' => 'First Premolar', 'surfaces' => 5],
            5 => ['name' => 'Second Premolar', 'surfaces' => 5],
            6 => ['name' => 'First Molar', 'surfaces' => 5],
            7 => ['name' => 'Second Molar', 'surfaces' => 5],
            8 => ['name' => 'Third Molar', 'surfaces' => 5],
        ];

        foreach ($quadrants as $quadrant => $details) {

            // Permanent teeth: 1-8
            // Primary teeth: 1-5
            $maxTooth = $details['tooth_type'] === 'permanent' ? 8 : 5;

            for ($i = 1; $i <= $maxTooth; $i++) {

                // Primary tooth numbering:
                // Quadrant 5-8 uses tooth position 1-5
                $teeth[] = [
                    'tooth_number' => ($quadrant * 10) + $i,

                    'tooth_name' => $types[$i]['name'],

                    'tooth_type' => $details['tooth_type'],

                    'jaw' => $details['jaw'],

                    'quadrant' => $quadrant,

                    'number_of_surface' => $types[$i]['surfaces'],

                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        foreach ($teeth as $tooth) {
            DB::table('tooth')->updateOrInsert(
                ['tooth_number' => $tooth['tooth_number']],
                $tooth
            );
        }
    }
}
