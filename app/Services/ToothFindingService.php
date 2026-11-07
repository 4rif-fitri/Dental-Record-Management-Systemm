<?php

namespace App\Services;

use App\Models\ToothFinding;
use Illuminate\Support\Facades\DB;

class ToothFindingService
{
    public function getByExamination($examinationId)
    {
        return ToothFinding::with([
            'tooth',
            'condition',
            'procedure',
            'surfaces.surface'
        ])
            ->where('examination_id', $examinationId)
            ->get();
    }

    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {

            $finding = ToothFinding::create([
                'examination_id' => $data['examination_id'],
                'tooth_id' => $data['tooth_id'],
                'condition_id' => $data['condition_id'],
                'procedure_id' => $data['procedure_id'],
                'finding_description' => $data['finding_description'],
            ]);

            foreach ($data['surface_ids'] ?? [] as $surfaceId) {
                $finding->surfaces()->create([
                    'surface_id' => $surfaceId
                ]);
            }

            return $finding->load([
                'tooth',
                'condition',
                'procedure',
                'surfaces.surface'
            ]);
        });
    }
}
