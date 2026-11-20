<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SurfaceConditions extends Seeder
{
    public function run(): void
    {
        $conditions = [
            ['7', 'For filling'],
            ['8', 'Redo filling'],
            ['9', 'Fissure sealant'],
            ['11', 'Filled with preventive resin restoration type 1'],
            ['14', 'Fracture'],
            ['8a', 'Filled (amalgam)'],
            ['8b', 'Filled (tooth-coloured)'],
            ['8c', 'Filled with recurrent caries'],
            ['E10', 'For fissure sealant'],
            ['E12', 'For filling with preventive resin restoration type 1'],
            ['E13', 'For fluoride varnish'],
            ['Nil', 'No Treatment Required'],
            ['N/A', 'Not Applicable'],
        ];

        foreach ($conditions as $item) {
            DB::table('surface_conditions')->updateOrInsert(
                ['condition_code' => $item[0]],
                ['condition_name' => $item[1]]
            );
        }
    }
}
