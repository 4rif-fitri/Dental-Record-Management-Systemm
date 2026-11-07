<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SurfaceSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('surfaces')->insert([
            [
                'surface_name' => 'Mesial',
                'surface_type' => 'Proximal',
                'surface_code' => 'M',
            ],
            [
                'surface_name' => 'Distal',
                'surface_type' => 'Proximal',
                'surface_code' => 'D',
            ],
            [
                'surface_name' => 'Buccal',
                'surface_type' => 'External',
                'surface_code' => 'B',
            ],
            [
                'surface_name' => 'Lingual',
                'surface_type' => 'Internal',
                'surface_code' => 'L',
            ],
            [
                'surface_name' => 'Occlusal',
                'surface_type' => 'Chewing',
                'surface_code' => 'O',
            ],
            [
                'surface_name' => 'Incisal',
                'surface_type' => 'Cutting',
                'surface_code' => 'I',
            ],
        ]);
    }
}
