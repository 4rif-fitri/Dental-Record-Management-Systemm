<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ConditionSeeder extends Seeder
{
    public function run(): void
    {
        $conditions = [
            ['0', 'Sound', 'bg-teal-300', '#5eead4'],
            ['1', 'Caries', 'bg-red-300', '#fca5a5'],
            ['2', 'Missing due to caries', 'bg-gray-400', '#9ca3af'],
            ['3', 'Filled due to caries', 'bg-blue-300', '#93c5fd'],
            ['4', 'For extraction due to caries', 'bg-orange-300', '#fdba74'],
            ['5', 'Impacted tooth', 'bg-purple-300', '#d8b4fe'],
            ['6', 'Unerupted tooth', 'bg-indigo-300', '#a5b4fc'],
            ['2a', 'Missing due to other reasons', 'bg-gray-400', '#9ca3af'],
            ['3a', 'Filled for other reasons', 'bg-sky-300', '#7dd3fc'],
            ['4a', 'For extraction for other reasons', 'bg-orange-300', '#fdba74'],
            ['C', 'Crown', 'bg-violet-300', '#c4b5fd'],
            ['P', 'Pontic', 'bg-violet-400', '#a78bfa'],
            ['SN', 'Supernumerary tooth', 'bg-pink-300', '#f9a8d4'],
            ['SM', 'Space maintainer', 'bg-cyan-300', '#67e8f9'],
            ['L', 'Loose tooth', 'bg-amber-300', '#fcd34d'],
            ['TSl', 'Tooth surface loss', 'bg-lime-300', '#bef264'],
            ['EDD', 'Enamel defect / MIH', 'bg-orange-200', '#fed7aa'],
        ];

        foreach ($conditions as $item) {
            DB::table('condition')->updateOrInsert(
                ['condition_code' => $item[0]],
                [
                    'condition_name' => $item[1],
                    'color' => $item[2],
                    'color_code' => $item[3],
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );
        }
    }
}
