<?php

namespace App\Http\Controllers;

use App\Services\AppointmentService;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    protected $appointmentService;

    public function __construct(AppointmentService $appointmentService)
    {
        $this->appointmentService = $appointmentService;
    }

    public function index()
    {
        return response()->json(
            $this->appointmentService->getAll()
        );
    }

    public function show($id)
    {
        return response()->json(
            $this->appointmentService->getById($id)
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'dentist_id' => 'required|exists:users,id',
            'appointment_date' => 'required|date',
            'status' => 'required|string|max:20',
            'time_slot' => 'required|string|max:100',
        ]);

        $appointment = $this->appointmentService->create($validated);

        return response()->json([
            'message' => 'Appointment created successfully',
            'data' => $appointment
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'appointment_date' => 'sometimes|date',
            'status' => 'sometimes|string|max:20',
            'time_slot' => 'sometimes|string|max:100',
        ]);

        return response()->json(
            $this->appointmentService->update($id, $validated)
        );
    }

    public function destroy($id)
    {
        $this->appointmentService->delete($id);

        return response()->json([
            'message' => 'Appointment deleted successfully'
        ]);
    }
}
