<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Tooth;
use Illuminate\Http\Request;

class ToothController extends Controller
{
    public function getAllTooth(){
        $tooths = Tooth::all();

        return ApiResponse::success(200, $tooths)->toJsonResponse();
    }

    public function getToothById($id){
        $tooth = Tooth::where('id', $id)->first();

        return ApiResponse::success(200, $tooth)->toJsonResponse();
    }
    public function createTooth(Request $request){
        $validated = $request->validate([
            'tooth_number' => 'required',
            'tooth_name' => 'required',
            'tooth_type' => 'required',
            'jaw' => 'required',
            'quadrant' => 'required',
        ]);

        $tooth = new Tooth();
        $tooth->tooth_number = $request->tooth_number;
        $tooth->tooth_name = $request->tooth_name;
        $tooth->tooth_type = $request->tooth_type;
        $tooth->jaw = $request->jaw;
        $tooth->quadrant = $request->quadrant;
        $tooth->save();

        return ApiResponse::success(200, $tooth)->toJsonResponse();
    }

    public function updateTooth(Request $request, $id){
        $validated = $request->validate([
            'tooth_number' => 'required',
            'tooth_name' => 'required',
            'tooth_type' => 'required',
            'jaw' => 'required',
            'quadrant' => 'required',
        ]);

        $tooth = Tooth::where('id', $id)->first();
        $tooth->tooth_number = $request->tooth_number;
        $tooth->tooth_name = $request->tooth_name;
        $tooth->tooth_type = $request->tooth_type;
        $tooth->jaw = $request->jaw;
        $tooth->quadrant = $request->quadrant;
        $tooth->save();

        return ApiResponse::success(200, $tooth)->toJsonResponse();
    }

    public function deleteTooth($id){
        $response = Tooth::destroy('id', $id);

        return ApiResponse::success(200, $response)->toJsonResponse();
    }
}
