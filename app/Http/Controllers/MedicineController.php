<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Medicine;
use Illuminate\Http\Request;

class MedicineController extends Controller
{
    // READ ALL
    public function getAllMedicine()
    {
        $medicines = Medicine::all();

        return ApiResponse::success(
            "List of medicine",
            $medicines
        )->toJsonResponse();
    }

    // READ BY ID
    public function getMedicineById($id)
    {
        $medicine = Medicine::findOrFail($id);

        return ApiResponse::success(
            "Medicine details",
            $medicine
        )->toJsonResponse();
    }

    // CREATE
    public function createMedicine(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $medicine = Medicine::create($validated);

        return ApiResponse::success(
            "Successfully created medicine",
            $medicine
        )->toJsonResponse();
    }

    // UPDATE
    public function updateMedicine(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $medicine = Medicine::findOrFail($id);

        $medicine->update($validated);

        return ApiResponse::success(
            "Successfully updated medicine",
            $medicine
        )->toJsonResponse();
    }

    // DELETE
    public function deleteMedicine($id)
    {
        $medicine = Medicine::findOrFail($id);

        $medicine->delete();

        return ApiResponse::success(
            "Successfully deleted medicine"
        )->toJsonResponse();
    }
}
