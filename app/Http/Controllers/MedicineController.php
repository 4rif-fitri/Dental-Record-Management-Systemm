<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Medicine;
use Illuminate\Http\Request;

class MedicineController extends Controller
{
    public function getAllMedicine(){
        $medicines = Medicine::all();

        return ApiResponse::success(200, $medicines)->toJsonResponse();
    }

    public function getMedicineById($id){
        $medicines = Medicine::where('id', $id)->first();

        return ApiResponse::success(200, $medicines)->toJsonResponse();
    }

    public function createMedicine(Request $request){
        $validated = $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $medicines = new Medicine();
        $medicines->name = $request->name;
        $medicines->description = $request->description;
        $medicines->save();

        return ApiResponse::success(200, $medicines)->toJsonResponse();
    }

    public function updateMedicine(Request $request, $id){
        $validated = $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $medicines = Medicine::where('id', $id)->first();
        $medicines->name = $request->name;
        $medicines->description = $request->description;
        $medicines->save();

        return ApiResponse::success(200, $medicines)->toJsonResponse();
    }

    public function deleteMedicine($id){
        $response = Medicine::where('id', $id)->delete();

        return ApiResponse::success(200, $response)->toJsonResponse();
    }
}
