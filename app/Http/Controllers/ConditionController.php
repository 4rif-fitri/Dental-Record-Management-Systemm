<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Condition;
use Illuminate\Http\Request;

class ConditionController extends Controller
{
    public function getAllCondition(){
        $conditions = Condition::all();

        return ApiResponse::success(200,$conditions)->toJsonResponse();
    }

    public function getConditionById($id){
        $conditions = Condition::where('condition_id', $id)->get();

        return ApiResponse::success(200,$conditions)->toJsonResponse();
    }

    public function createCondition(Request $request){
        $validate = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['required', 'string'],
            'condition_type' => ['required', 'string'],
            'condition_code' => ['required'],
        ]);

        $condition = new Condition();
        $condition->condition_name = $validate['name'];
        $condition->condition_description = $validate['description'];
        $condition->condition_type = $validate['condition_type'];
        $condition->condition_code = $validate['condition_code'];
        $condition->save();

        return ApiResponse::success(200,$condition)->toJsonResponse();
    }

    public function updateCondition(Request $request, $id){
        $validate = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['required', 'string'],
            'condition_type' => ['required', 'string'],
            'condition_code' => ['required'],
        ]);

        $condition = Condition::where('condition_id', $id)->first();
        $condition->condition_name = $validate['name'];
        $condition->condition_description = $validate['description'];
        $condition->condition_type = $validate['condition_type'];
        $condition->condition_code = $validate['condition_code'];
        $condition->save();

        return ApiResponse::success(200,$condition)->toJsonResponse();
    }

    public function deleteCondition(Request $request, $id){
        $response = Condition::destroy($id);

        return ApiResponse::success(200, $response)->toJsonResponse();
    }
}
