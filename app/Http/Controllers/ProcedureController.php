<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Procedure;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Exception;
class ProcedureController extends Controller
{
    public function getAllProcedure()
    {
        $procedures = Procedure::latest()->get();

        return ApiResponse::success(
            200,
            $procedures
        )->toJsonResponse();
    }

    public function getProcedureById($id)
    {
        $procedure = Procedure::findOrFail($id);

        return ApiResponse::success(
            200,
            $procedure
        )->toJsonResponse();
    }

    public function createProcedure(Request $request)
    {
        $validated = $request->validate([
            'procedure_name' => ['required', 'string', 'max:100'],
            'procedure_description' => ['required', 'string', 'max:255'],
            'procedure_type' => ['required', 'string', 'max:100'],
        ]);

        $procedure = Procedure::create($validated);

        return ApiResponse::success(
            200,
            $procedure
        )->toJsonResponse();
    }

    public function updateProcedure(Request $request, $id)
    {
        $validated = $request->validate([
            'procedure_name' => ['required', 'string', 'max:100'],
            'procedure_description' => ['required', 'string', 'max:255'],
            'procedure_type' => ['required', 'string', 'max:100'],
        ]);

        $procedure = Procedure::findOrFail($id);

        $procedure->update($validated);

        return ApiResponse::success(
            200,
            $procedure
        )->toJsonResponse();
    }

    public function deleteProcedure($id)
    {
        $procedure = Procedure::findOrFail($id);

        $procedure->delete();

        return ApiResponse::success(
            200,
            $procedure
        )->toJsonResponse();
    }
}
