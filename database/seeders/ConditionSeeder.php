<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ConditionSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('condition')->insert([
            [
                'condition_name' => 'Dental Caries',
                'condition_code' => 'CAR',
                'color' => 'bg-red-300'
            ],
            [
                'condition_name' => 'Fractured Tooth',
                'condition_code' => 'FRA',
                'color' => 'bg-orange-300'
            ],
            [
                'condition_name' => 'Missing Tooth',
                'condition_code' => 'MIS',
                'color' => 'bg-amber-300'
            ],
            [
                'condition_name' => 'Dental Calculus',
                'condition_code' => 'CAL',
                'color' => 'bg-lime-300'
            ],
            [
                'condition_name' => 'Healthy',
                'condition_code' => 'HLT',
                'color' => 'bg-teal-300'
            ],
        ]);
    }
}
