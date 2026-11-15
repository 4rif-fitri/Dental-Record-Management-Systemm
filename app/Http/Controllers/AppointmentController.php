<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Appointment;
use App\Services\AppointmentService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{

    public function getAppointmentsByDate($date)
    {
        $appointments = Appointment::withCount([
            'bookings as active_bookings_count' => function ($query) {
                $query->whereIn('status', [
                    'pending',
                    'approved'
                ]);
            }
        ])
            ->whereDate('appointment_date', $date)
            ->orderBy('time_slot')
            ->get()
            ->map(function ($appointment) {

                // Only override when active booking exists
                if ($appointment->active_bookings_count > 0) {
                    $appointment->status = 'booked';
                }

                // Otherwise preserve original database status
                return $appointment;
            });

        return ApiResponse::success(
            200,
            $appointments
        )->toJsonResponse();
    }

    public function patientAppointment(){
        return Inertia::render('patient/ListAppointment');
    }

    public function patientBookAppointment()
    {
        return Inertia::render('patient/Booking');

    }

    public function dentistListAppointment()
    {
        return Inertia::render('dentist/ListAppointment');
    }

    public function getAllAppointment(){
        $appointment = Appointment::all();

        return ApiResponse::success(
            "Appointment list successfully",
            $appointment
        )->toJsonResponse();
    }

    public function getAppointmentById($id){
        $appointment = Appointment::where('id', $id)->first();

        return ApiResponse::success(
            "Appointment status updated successfully",
            $appointment
        )->toJsonResponse();
    }

    public function createAppointment(Request $request){

        $dentist_id = session('id');

        $validated = $request->validate([
            'appointment_date' => 'required',
            'time_slot' => 'required',
            'status' => 'required',
        ]);

        $appointment = new Appointment();
        $appointment->dentist_id = $dentist_id;
        $appointment->appointment_date = $request->appointment_date;
        $appointment->status = $request->status;
        $appointment->time_slot = $request->time_slot;
        $appointment->save();

        return ApiResponse::success(
            "Appointment created successfully",
            $appointment
        )->toJsonResponse();
    }

    public function updateAppointment(Request $request, $id){
        $validated = $request->validate([
            'status' => 'required',
        ]);

        $appointment = Appointment::where('id', $id)->first();
        $appointment->status = $request->status;
        $appointment->save();

        return ApiResponse::success(
            "Appointment status updated successfully",
            $appointment
        )->toJsonResponse();
    }

    public function deleteAppointment($id){
        $response = Appointment::where('id', $id)->delete();

        return ApiResponse::success(
            "Appointment deleted successfully",
            $response
        )->toJsonResponse();
    }
}
