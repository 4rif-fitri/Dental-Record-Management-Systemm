<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Surface;
use Illuminate\Http\Request;

class SurfaceController extends Controller
{
    public function getAllSurface(){
        $surfaces = Surface::all();

        return ApiResponse::success(200, $surfaces)->toJsonResponse();
    }

    public function getSurfaceById($id){
        $surface = Surface::where('id', $id)->first();

        return ApiResponse::success(200, $surface)->toJsonResponse();
    }
    public function createSurface(Request $request){
        $validated = $request->validate([
            'surface_name' => 'required',
            'surface_type' => 'required',
            'surface_code' => 'required',
        ]);

        $surface = new Surface();
        $surface->surface_name = $request->surface_name;
        $surface->surface_type = $request->surface_type;
        $surface_code = $request->surface_code;
        $surface->save();

        return ApiResponse::success(200, $surface)->toJsonResponse();
    }

    public function updateSurface(Request $request, $id){
        $validated = $request->validate([
            'surface_name' => 'required',
            'surface_type' => 'required',
            'surface_code' => 'required',
        ]);

        $surface = Surface::where('id', $id)->first();
        $surface->surface_name = $request->surface_name;
        $surface->surface_type = $request->surface_type;
        $surface_code = $request->surface_code;
        $surface->save();

        return ApiResponse::success(200, $surface)->toJsonResponse();
    }

    public function deleteSurface($id){
        $response = Surface::destroy($id);

        return ApiResponse::success(200,$response)->toJsonResponse();
    }
}
