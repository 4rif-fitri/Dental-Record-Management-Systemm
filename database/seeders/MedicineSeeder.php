<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MedicineSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('medicine')->insert([
            [
                'name' => 'Paracetamol',
                'description' => 'Pain relief medication.',
            ],
            [
                'name' => 'Ibuprofen',
                'description' => 'Non-steroidal anti-inflammatory medication.',
            ],
            [
                'name' => 'Amoxicillin',
                'description' => 'Penicillin antibiotic.',
            ],
            [
                'name' => 'Chlorhexidine',
                'description' => 'Antiseptic mouthwash.',
            ],
        ]);
    }
}
