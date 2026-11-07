<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QueueSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('queue')->insert([
            [
                'patient_id' => 3,
                'status' => 'waiting',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'patient_id' => 4,
                'status' => 'in_progress',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
