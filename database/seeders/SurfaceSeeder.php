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
                'surface_name' => 'Palatal',
                'surface_code' => 'P',
            ],
            [
                'surface_name' => 'Incisal',
                'surface_code' => 'I',
            ],
            [
                'surface_name' => 'Lingual',
                'surface_code' => 'L',
            ],
            [
                'surface_name' => 'Occlusal',
                'surface_code' => 'O',
            ],
            [
                'surface_name' => 'Mesial',
                'surface_code' => 'M',
            ],
            [
                'surface_name' => 'Distal',
                'surface_code' => 'D',
            ],
            [
                'surface_name' => 'Buccal',
                'surface_code' => 'B',
            ],
        ]);
    }
}
