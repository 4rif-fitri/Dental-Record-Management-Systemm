<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Examination;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExaminationController extends Controller
{
    public function pageExamination($id){
        $user = User::where('role', 'patient')
            ->where('id', $id)->first();

        if(!$user){
            return to_route('dentistListPatient');
        }else{
            return Inertia::render('dentist/Examination');
        }
    }

    public function getAllExaminations()
    {
        $examinations = Examination::all();

        return ApiResponse::success(200, $examinations)->toJsonResponse();
    }

    public function getExaminationById($id)
    {
        $examination = Examination::where('patient_id', $id)
            ->with([
                'patient',
                'medicines',
                'toothFindings.tooth',
                'toothFindings.condition',
                'toothFindings.procedure',
                'toothFindings.surfaces.surface',
            ])
            ->first();

        if($examination == null){
            return ApiResponse::error("Data not found!", 400)->toJsonResponse();
        }else{
            return ApiResponse::success(200, $examination)->toJsonResponse();
        }

    }

    public function createExamination(Request $request){
        $examination = new Examination([
            'patient_id' => $request->patient_id,
        ]);

        return ApiResponse::success(200, $examination)->toJsonResponse();
    }

    public function updateExamination(Request $request, $id){

        $examination = Examination::where('id', $id)->first();
        $examination->case_summary = $request->case_summary;
        $examination->save();

        return ApiResponse::success(200, $examination)->toJsonResponse();

    }

}
