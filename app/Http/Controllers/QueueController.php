<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Helpers\ApiResponse;
use App\Models\Queue;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QueueController extends Controller
{
    public function listQueue(){
        return Inertia::render('clinicStaff/ListQueue');
    }

    public function getAllQueue(){
        $queue = Queue::with('patient')
            ->whereDate('created_at', today())
            ->latest()
            ->get();

        return ApiResponse::success(200, $queue)->toJsonResponse();
    }

    public function getQueuePatientSearch(Request $request)
    {
        $request->validate([
            'keyword' => 'required|string',
        ]);

        $keyword = trim($request->keyword);

        $cleanKeyword = str_replace('-', '', $keyword);

        $patient = User::where('role', 'patient')
            ->where(function ($query) use ($keyword, $cleanKeyword) {

                $query->where('name', 'LIKE', "%{$keyword}%")
                    ->orWhere('ic_passport', 'LIKE', "%{$keyword}%")
                    ->orWhereRaw(
                        "REPLACE(ic_passport, '-', '') LIKE ?",
                        ["%{$cleanKeyword}%"]
                    )
                    ->orWhere('student_staff_id', 'LIKE', "%{$keyword}%")
                    ->orWhere('email', 'LIKE', "%{$keyword}%");

            })
            ->first();

        if (!$patient) {
            return response()->json([
                'status' => 404,
                'message' => 'Patient not found',
                'data' => null
            ], 200);
        }

        return ApiResponse::success(200, $patient)->toJsonResponse();
    }

    public function createQueue(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:users,id',
        ]);

        try {

            $queue = DB::transaction(function () use ($validated) {

                // Lock patient to prevent simultaneous duplicate registration
                $patient = User::where('id', $validated['patient_id'])
                    ->where('role', 'patient')
                    ->lockForUpdate()
                    ->first();

                if (!$patient) {
                    throw new \Exception('Patient not found.');
                }

                // Check existing active queue for today
                $existingQueue = Queue::where(
                    'patient_id',
                    $patient->id
                )
                    ->whereDate('created_at', today())
                    ->whereIn('status', [
                        'waiting',
                        'serving'
                    ])
                    ->exists();

                if ($existingQueue) {
                    throw new \Exception(
                        'Patient is already registered in the queue today.'
                    );
                }

                // Create queue
                return Queue::create([
                    'patient_id' => $patient->id,
                    'status' => 'waiting',
                ]);

            });

            return response()->json([
                'status' => 200,
                'message' => 'Patient successfully registered to queue.',
                'data' => $queue
            ], 200);

        } catch (\Exception $error) {

            return response()->json([
                'status' => 409,
                'message' => $error->getMessage(),
                'data' => null
            ], 409);

        }
    }

    public function getQueueById($id){
        $queue = Queue::where('id', $id)->first();

        return ApiResponse::success(200, $queue)->toJsonResponse();
    }


//    public function createQueue(Request $request)
//    {
//        $validated = $request->validate([
//            'patient_id' => 'required|exists:users,id',
//        ]);
//
//        // Check patient
//        $patient = User::where('id', $validated['patient_id'])
//            ->where('role', 'patient')
//            ->first();
//
//        if (!$patient) {
//            return response()->json([
//                'status' => 404,
//                'message' => 'Patient not found.',
//                'data' => null
//            ], 404);
//        }
//
//        // Check existing active queue
//        $existingQueue = Queue::where('patient_id', $patient->id)
//            ->whereIn('status', ['waiting', 'in_progress'])
//            ->first();
//
//        if ($existingQueue) {
//            return response()->json([
//                'status' => 409,
//                'message' => 'Patient already has an active queue.',
//                'data' => $existingQueue
//            ], 409);
//        }
//
//        // Create queue
//        $queue = new Queue();
//
//        $queue->patient_id = $patient->id;
//        $queue->status = 'waiting';
//
//        $queue->save();
//
//        $queue->load('patient');
//
//        return ApiResponse::success(200, $queue)->toJsonResponse();
//    }


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

    public function callQueue($id)
    {
        try {

            $queue = Queue::findOrFail($id);

            if ($queue->status !== 'Waiting') {
                return response()->json([
                    'status' => 422,
                    'message' => 'This queue has already been called or processed.',
                    'data' => null,
                ], 422);
            }

            $queue->status = 'Called';
            $queue->save();

            return ApiResponse::success(
                200,
                $queue
            )->toJsonResponse();

        } catch (\Exception $e) {

            return response()->json([
                'status' => 500,
                'message' => 'Failed to call queue',
                'error' => $e->getMessage(),
            ], 500);

        }
    }
}
