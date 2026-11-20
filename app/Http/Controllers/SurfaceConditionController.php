<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\SurfaceCondition;
use Illuminate\Http\Request;

class SurfaceConditionController extends Controller
{
    public function getAllSurfaceCondition(){
        $surfaceCondition = SurfaceCondition::all();

        return ApiResponse::success(
            "",
            $surfaceCondition
        )->toJsonResponse();
    }
}
