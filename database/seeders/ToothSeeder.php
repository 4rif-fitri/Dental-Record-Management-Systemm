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
            1 => ['jaw' => 'Upper', 'side' => 'Right'],
            2 => ['jaw' => 'Upper', 'side' => 'Left'],
            3 => ['jaw' => 'Lower', 'side' => 'Left'],
            4 => ['jaw' => 'Lower', 'side' => 'Right'],
        ];

        $types = [
            1 => 'Central Incisor',
            2 => 'Lateral Incisor',
            3 => 'Canine',
            4 => 'First Premolar',
            5 => 'Second Premolar',
            6 => 'First Molar',
            7 => 'Second Molar',
            8 => 'Third Molar',
        ];

        foreach ($quadrants as $quadrant => $details) {
            for ($i = 1; $i <= 8; $i++) {
                $teeth[] = [
                    'tooth_number' => ($quadrant * 10) + $i,
                    'tooth_name' => $types[$i],
                    'tooth_type' => $i <= 3 ? 'Anterior' : 'Posterior',
                    'jaw' => $details['jaw'],
                    'quadrant' => $details['side'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        DB::table('tooth')->insert($teeth);
    }
}
