<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\ToothFinding;
use App\Models\ToothSurface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Throwable;

class ToothFindingController extends Controller
{
    public function getAllToothFinding(){
        $toothFinding = ToothFinding::all();

        return ApiResponse::success(200, $toothFinding)->toJsonResponse();
    }

    public function getFindingById($id){
        $toothFinding = ToothFinding::where('id', $id)->first();

        return ApiResponse::success(200, $toothFinding)->toJsonResponse();
    }

    public function createFinding(Request $request)
    {
        try {

            $validate = $request->validate([
                'patient_id' => 'required',
                'tooth_id' => 'required',
                'condition_id' => 'required',
                'procedure_id' => 'required',
                'status' => 'required',
                'selectedSurfaceIds' => 'required|array|min:1',
                'selectedSurfaceIds.*' => 'required|integer|exists:surfaces,id',
            ]);

            $toothFinding = DB::transaction(function () use ($request) {

                $toothFinding = new ToothFinding();
                $toothFinding->patient_id = $request->patient_id;
                $toothFinding->tooth_id = $request->tooth_id;
                $toothFinding->condition_id = $request->condition_id;
                $toothFinding->procedure_id = $request->procedure_id;
                $toothFinding->finding_description = $request->finding_description ?? "";
                $toothFinding->status = $request->status;
                $toothFinding->save();

                foreach ($request->selectedSurfaceIds as $surfaceId) {
                    $toothSurface = new ToothSurface();
                    $toothSurface->tooth_findings_id = $toothFinding->id;
                    $toothSurface->surface_id = $surfaceId;
                    $toothSurface->save();
                }

                return $toothFinding;
            });

            return ApiResponse::success($toothFinding)->toJsonResponse();

        } catch (ValidationException $error) {

            return response()->json([
                'status' => 422,
                'message' => 'Validation Error',
                'errors' => $error->errors()
            ], 422);

        } catch (Throwable $error) {

            \Log::error('Create Finding Error: ' . $error->getMessage());

            return response()->json([
                'status' => 500,
                'message' => 'Failed to create finding',
                'error' => $error->getMessage()
            ], 500);
        }
    }

    public function updateFinding(Request $request, $id){
        $validate = $request->validate([
            'examination_id' => 'required',
            'tooth_id' => 'required',
            'condition_id' => 'required',
            'procedure_id' =>  'required',
            'status' =>  'required'
        ]);

        $toothFinding = ToothFinding::where('id', $id)->first();
        $toothFinding->examination_id = $request->examination_id;
        $toothFinding->tooth_id = $request->tooth_id;
        $toothFinding->condition_id = $request->condition_id;
        $toothFinding->procedure_id = $request->procedure_id;
        $toothFinding->finding_description  = $request->finding_description;
        $toothFinding->status = $request->status;
        $toothFinding->save();

        return ApiResponse::success(200, $toothFinding)->toJsonResponse();
    }

    public function deleteFinding($id){
        $response = ToothFinding::where('id', $id)->delete();

        return ApiResponse::success(200, $response)->toJsonResponse();
    }
}
