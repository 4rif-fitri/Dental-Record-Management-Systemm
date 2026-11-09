<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\ToothSurface;
use Illuminate\Http\Request;

class ToothSurfaceController extends Controller
{
    public function getToothSurfacesById($id){
        $toothSurface = ToothSurface::find($id);

        return ApiResponse::success(200, $toothSurface)->toJsonResponse();
    }

    public function createToothSurface(Request $request){

        $validated = $request->validate([
            'tooth_findings_id' => 'required',
            'tooth_surfaces_id' => 'required',
//            'tooth_findings_id' => 'nullable|exists:tooth_findings,id',
//            'tooth_surfaces_id' => 'nullable|exists:tooth_surfaces,id',
        ]);

        $toothSurface = new ToothSurface();
        $toothSurface->tooth_findings_id = $request->tooth_findings_id;
        $toothSurface->surface_id = $request->surface_id;
        $toothSurface->save();

        return ApiResponse::success(200, $toothSurface)->toJsonResponse();
    }

    public function deleteToothSurface($id){
        $result = ToothSurface::destroy($id);

        return ApiResponse::success(200, $result)->toJsonResponse();
    }

}
