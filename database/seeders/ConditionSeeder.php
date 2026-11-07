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
                'condition_description' => 'Tooth decay caused by bacteria.',
                'condition_type' => 'Disease',
                'condition_code' => 'CAR',
            ],
            [
                'condition_name' => 'Fractured Tooth',
                'condition_description' => 'Crack or break in the tooth.',
                'condition_type' => 'Injury',
                'condition_code' => 'FRA',
            ],
            [
                'condition_name' => 'Missing Tooth',
                'condition_description' => 'Tooth is missing.',
                'condition_type' => 'Status',
                'condition_code' => 'MIS',
            ],
            [
                'condition_name' => 'Dental Calculus',
                'condition_description' => 'Hardened dental plaque.',
                'condition_type' => 'Disease',
                'condition_code' => 'CAL',
            ],
            [
                'condition_name' => 'Healthy',
                'condition_description' => 'No visible dental abnormalities.',
                'condition_type' => 'Normal',
                'condition_code' => 'HLT',
            ],
        ]);
    }
}
