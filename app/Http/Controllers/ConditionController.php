<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Condition;
use Illuminate\Http\Request;

class ConditionController extends Controller
{
    public function getAllCondition()
    {
        $conditions = Condition::all();

        return ApiResponse::success(
            "Condition list successfully",
            $conditions
        )->toJsonResponse();
    }

    public function getConditionById($id)
    {
        $condition = Condition::findOrFail($id);

        return ApiResponse::success(
            "Condition successfully retrieved",
            $condition
        )->toJsonResponse();
    }

    public function createCondition(Request $request)
    {
        $validate = $request->validate([
            'condition_name' => ['required', 'string', 'max:100'],
            'condition_code' => ['required', 'string', 'max:100'],
            'color' => ['required', 'string', 'max:100'],
            'color_code' => ['required', 'regex:/^#[0-9A-Fa-f]{6}$/'],
        ]);

        $condition = Condition::create($validate);

        return ApiResponse::success(
            "New condition successfully created",
            $condition
        )->toJsonResponse();
    }

    public function updateCondition(Request $request, $id)
    {
        $validate = $request->validate([
            'condition_name' => ['required', 'string', 'max:100'],
            'condition_code' => ['required', 'string', 'max:100'],
            'color' => ['required', 'string', 'max:100'],
            'color_code' => ['required', 'regex:/^#[0-9A-Fa-f]{6}$/'],
        ]);

        $condition = Condition::findOrFail($id);

        $condition->update($validate);

        return ApiResponse::success(
            "Condition successfully updated",
            $condition
        )->toJsonResponse();
    }

    public function deleteCondition($id)
    {
        $condition = Condition::findOrFail($id);

        $condition->delete();

        return ApiResponse::success(
            "Condition successfully deleted",
            $condition
        )->toJsonResponse();
    }
}
