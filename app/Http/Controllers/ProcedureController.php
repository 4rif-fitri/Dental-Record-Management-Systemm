<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Procedure;
use Illuminate\Http\Request;

class ProcedureController extends Controller
{
    public function getAllProcedure(){
        $procedures = Procedure::all();
        return ApiResponse::success(200, $procedures)->toJsonResponse();
    }

    public function getProcedureById($id){
        $procedures = Procedure::where('id', $id)->first();
        return ApiResponse::success(200, $procedures)->toJsonResponse();
    }

    public function createProcedure(Request $request){

        $validates = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'type' => 'required',
        ]);

        $procedure = new Procedure();
        $procedure->procedure_name = $request->name;
        $procedure->procedure_description = $request->description;
        $procedure->procedure_type = $request->type;
        $procedure->save();

        return ApiResponse::success(200, $procedure)->toJsonResponse();
    }

    public function updateProcedure(Request $request, $id){
        $validates = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'type' => 'required',
        ]);

        $procedure = Procedure::where('id', $id)->first();
        $procedure->procedure_name = $request->name;
        $procedure->procedure_description = $request->description;
        $procedure->procedure_type = $request->type;
        $procedure->save();

        return ApiResponse::success(200, $procedure)->toJsonResponse();
    }

    public function deleteProcedure($id){
        Procedure::where('id', $id)->delete();

        return ApiResponse::success(200)->toJsonResponse();
    }
}
