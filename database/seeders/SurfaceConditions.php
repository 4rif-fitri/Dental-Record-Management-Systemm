<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SurfaceConditions extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('surface_conditions')->insert([
            [
                'condition_name' => 'Palatal',
                'condition_code' => 'P',
            ],
        ]);
    }
}
