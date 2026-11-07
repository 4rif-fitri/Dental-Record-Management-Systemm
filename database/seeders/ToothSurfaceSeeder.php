<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ToothSurfaceSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('tooth_surfaces')->insert([
            [
                'tooth_findings_id' => 1,
                'surface_id' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'tooth_findings_id' => 1,
                'surface_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
