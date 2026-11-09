<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Queue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QueueController extends Controller
{
    public function listQueue(){
        return Inertia::render('clinicStaff/ListQueue');
    }

    public function getAllQueue(){
        $queue = Queue::all();

        return ApiResponse::success(200, $queue)->toJsonResponse();
    }

    public function getQueueById($id){
        $queue = Queue::where('id', $id)->first();

        return ApiResponse::success(200, $queue)->toJsonResponse();
    }

    public function createQueue(Request $request){
        $validated = $request->validate([
            'patient_id' => 'required',
            'status' => 'required',
        ]);

        $queue = new Queue();
        $queue->patient_id = $request->patient_id;
        $queue->status = $request->status;
        $queue->save();

        return ApiResponse::success(200, $queue)->toJsonResponse();
    }

    public function updateQueue(Request $request, $id){
        $validated = $request->validate([
            'patient_id' => 'required',
            'status' => 'required',
        ]);

        $queue = Queue::where('id', $id)->first();
        $queue->patient_id = $request->patient_id;
        $queue->status = $request->status;
        $queue->save();

        return ApiResponse::success(200, $queue)->toJsonResponse();
    }

    public function deleteQueue($id){
        $response = Queue::where('id', $id)->delete();

        return ApiResponse::success(200, $response)->toJsonResponse();
    }
}
