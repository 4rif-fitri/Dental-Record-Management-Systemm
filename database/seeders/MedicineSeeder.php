<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MedicineSeeder extends Seeder
{
    public function run(): void
    {
        $medicines = [
            [
                'name' => 'Paracetamol',
                'description' => 'Analgesic medication used to relieve dental pain.',
            ],
            [
                'name' => 'Ibuprofen',
                'description' => 'Non-steroidal anti-inflammatory medication used to relieve pain and inflammation.',
            ],
            [
                'name' => 'Amoxicillin',
                'description' => 'Penicillin antibiotic used for selected bacterial dental infections.',
            ],
            [
                'name' => 'Metronidazole',
                'description' => 'Antibiotic used for selected anaerobic bacterial infections.',
            ],
            [
                'name' => 'Amoxicillin + Clavulanic Acid',
                'description' => 'Combination antibiotic used for selected bacterial infections.',
            ],
            [
                'name' => 'Clindamycin',
                'description' => 'Alternative antibiotic used for selected bacterial infections.',
            ],
            [
                'name' => 'Chlorhexidine',
                'description' => 'Antiseptic mouthwash used to support oral hygiene and gum treatment.',
            ],
        ];

        foreach ($medicines as $medicine) {
            DB::table('medicine')->updateOrInsert(
                ['name' => $medicine['name']],
                [
                    'description' => $medicine['description'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
    }
}
