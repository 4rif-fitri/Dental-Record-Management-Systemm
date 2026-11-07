<?php

namespace App\Services;

use App\Models\Examination;
use Illuminate\Support\Facades\DB;

class ExaminationService
{
    public function getAll()
    {
        return Examination::with([
            'patient',
            'medicines.medicine',
            'toothFindings.tooth',
            'toothFindings.condition',
            'toothFindings.procedure',
            'toothFindings.surfaces.surface'
        ])->latest()->get();
    }

    public function getById($id)
    {
        return Examination::with([
            'patient',
            'medicines.medicine',
            'toothFindings.tooth',
            'toothFindings.condition',
            'toothFindings.procedure',
            'toothFindings.surfaces.surface'
        ])->findOrFail($id);
    }

    public function create(array $data)
    {
        return Examination::create([
            'patient_id' => $data['patient_id'],
            'case_summary' => $data['case_summary']
        ]);
    }

    public function update($id, array $data)
    {
        $examination = Examination::findOrFail($id);

        $examination->update($data);

        return $examination;
    }

    public function delete($id)
    {
        return DB::transaction(function () use ($id) {

            $examination = Examination::findOrFail($id);

            $examination->delete();

            return true;
        });
    }
}
