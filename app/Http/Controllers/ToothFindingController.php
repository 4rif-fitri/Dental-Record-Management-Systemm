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

    public function updateFindingStatus(Request $request, $id){

        $validated = $request->validate([
            'status' => 'required'
        ]);

        $findind = ToothFinding::where('id', $id)->first();
        $findind->status = $request->status;
        $findind->save();

        return ApiResponse::success(200, $findind)->toJsonResponse();
    }

    public function getFindingByPatientId($id)
    {
        $toothFinding = ToothFinding::where('patient_id', $id)
            ->with([
                'tooth',
                'condition',
                'procedure',
                'surfaces.surface'
            ])
            ->get();

        return ApiResponse::success("asd", $toothFinding)->toJsonResponse();
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

    public function updateFinding(Request $request, $id)
    {
        $validate = $request->validate([
            'condition_id' => 'required|exists:condition,id',
            'procedure_id' => 'required|exists:procedure,id',
            'finding_description' => 'nullable|string',
            'selectedSurfaceIds' => 'required|array|min:1',
            'selectedSurfaceIds.*' => 'required|exists:surfaces,id',
        ]);

        try {

            DB::transaction(function () use ($validate, $id) {

                // Get existing finding
                $toothFinding = ToothFinding::findOrFail($id);

                // Update finding information
                $toothFinding->update([
                    'condition_id' => $validate['condition_id'],
                    'procedure_id' => $validate['procedure_id'],
                    'finding_description' => $validate['finding_description'] ?? null,
                ]);

                // Delete old surfaces
                ToothSurface::where(
                    'tooth_findings_id',
                    $toothFinding->id
                )->delete();

                // Insert updated surfaces
                foreach ($validate['selectedSurfaceIds'] as $surfaceId) {

                    ToothSurface::create([
                        'tooth_findings_id' => $toothFinding->id,
                        'surface_id' => $surfaceId,
                    ]);

                }

            });

            // Get updated finding with relationships
            $toothFinding = ToothFinding::with([
                'tooth',
                'condition',
                'procedure',
                'surfaces.surface'
            ])->findOrFail($id);

            return ApiResponse::success(
                "Finding updated successfully",
                $toothFinding
            )->toJsonResponse();

        } catch (\Exception $e) {

            return ApiResponse::error(
                $e->getMessage()
            )->toJsonResponse();

        }
    }

    public function deleteFinding($id)
    {
        $finding = ToothFinding::findOrFail($id);

        DB::transaction(function () use ($finding) {

            ToothSurface::where(
                'tooth_findings_id',
                $finding->id
            )->delete();

            $finding->delete();

        });

        return ApiResponse::success(
            "Finding deleted successfully",
            null
        )->toJsonResponse();
    }
}
