<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\ToothFinding;
use Illuminate\Http\Request;

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

    public function createFinding(Request $request){
        $validate = $request->validate([
            'examination_id' => 'required',
            'tooth_id' => 'required',
            'condition_id' => 'required',
            'procedure_id' =>  'required',
            'status' =>  'required'
        ]);

        $toothFinding = new ToothFinding();
        $toothFinding->examination_id = $request->examination_id;
        $toothFinding->tooth_id = $request->tooth_id;
        $toothFinding->condition_id = $request->condition_id;
        $toothFinding->procedure_id = $request->procedure_id;
        $toothFinding->finding_description  = $request->finding_description;
        $toothFinding->status = $request->status;
        $toothFinding->save();

        return ApiResponse::success(200, $toothFinding)->toJsonResponse();
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
