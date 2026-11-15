<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\ExaminationMedicine;
use Illuminate\Http\Request;

class ExaminationMedicineController extends Controller
{
    public function getAllExaminationMedicine()
    {
        $examinationMedicines = ExaminationMedicine::all();

        return ApiResponse::success(
            "List of examination medicine",
            $examinationMedicines
        )->toJsonResponse();
    }

    public function getExaminationMedicineById($id){
        $examinationMedicines = ExaminationMedicine::where('id', $id)->first();

        return ApiResponse::success(
            "List of examination medicine",
            $examinationMedicines
        )->toJsonResponse();
    }

    public function getExaminationMedicineByPatientId($id)
    {
        $medicine = ExaminationMedicine::where('patient_id', $id)
            ->with("medicine")
            ->get();

        return ApiResponse::success(
            "List of examination medicine",
            $medicine
        )->toJsonResponse();
    }

    public function createExaminationMedicine(Request $request){
        $validated = $request->validate([
            'patient_id' => 'required',
            'medicine_id' => 'required',
            'dosage' => 'required',
            'frequency' => 'required',
            'duration' => 'required',
            'quantity' => 'required',
            'instructions' => 'required',
        ]);

        $examinationMedicine = new ExaminationMedicine();
        $examinationMedicine->patient_id = $request->patient_id;
        $examinationMedicine->medicine_id = $request->medicine_id;
        $examinationMedicine->dosage = $request->dosage;
        $examinationMedicine->frequency = $request->frequency;
        $examinationMedicine->duration = $request->duration;
        $examinationMedicine->instructions = $request->instructions;
        $examinationMedicine->quantity = $request->quantity;
        $examinationMedicine->notes = $request->notes;
        $examinationMedicine->save();

        return ApiResponse::success(
            "List of examination medicine",
            $examinationMedicine
        )->toJsonResponse();
    }

    public function updateExaminationMedicine(Request $request, $id){
        $validated = $request->validate([
            'examination_id' => 'required',
            'medicine_id' => 'required',
            'dosage' => 'required',
            'frequency' => 'required',
            'duration' => 'required',
            'quantity' => 'required',
        ]);

        $examinationMedicines = ExaminationMedicine::where('id', $id)->first();
        $examinationMedicines->examination_id = $request->examination_id;
        $examinationMedicines->medicine_id = $request->medicine_id;
        $examinationMedicines->dosage = $request->dosage;
        $examinationMedicines->frequency = $request->frequency;
        $examinationMedicines->duration = $request->duration;
        $examinationMedicines->instructions = $request->instructions;
        $examinationMedicines->quantity = $request->quantity;
        $examinationMedicines->notes = $request->notes;
        $examinationMedicines->save();

        return ApiResponse::success(
            "List of examination medicine",
            $examinationMedicines
        )->toJsonResponse();
    }

    public function deleteExaminationMedicine($id){
        $response = ExaminationMedicine::where('id', $id)->delete();

        return ApiResponse::success(
            "List of examination medicine",

        )->toJsonResponse();
    }

}
