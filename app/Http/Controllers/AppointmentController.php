<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Appointment;
use App\Services\AppointmentService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function patientAppointment(){
        return Inertia::render('patient/ListAppointment');
    }

    public function patientBookAppointment()
    {
        return Inertia::render('patient/BookAppointment');

    }

    public function dentistListAppointment()
    {
        return Inertia::render('dentist/ListAppointment');
    }

    public function getAllAppointment(){
        $appointment = Appointment::all();

        return ApiResponse::success(200, $appointment)->toJsonResponse();
    }

    public function getAppointmentById($id){
        $appointment = Appointment::where('id', $id)->first();

        return ApiResponse::success(200, $appointment)->toJsonResponse();
    }

    public function createAppointment(Request $request){

        $validated = $request->validate([
            'dentist_id' => 'required',
            'appointment_date' => 'required',
            'time_slot' => 'required',
            'status' => 'required',
        ]);

        $appointment = new Appointment();
        $appointment->dentist_id = $request->dentist_id;
        $appointment->appointment_date = $request->appointment_date;
        $appointment->status = $request->status;
        $appointment->time_slot = $request->time_slot;
        $appointment->save();

        return ApiResponse::success(200, $appointment)->toJsonResponse();
    }

    public function updateAppointment(Request $request, $id){
        $validated = $request->validate([
            'dentist_id' => 'required',
            'appointment_date' => 'required',
            'time_slot' => 'required',
            'status' => 'required',
        ]);

        $appointment = Appointment::where('id', $id)->first();
        $appointment->dentist_id = $request->dentist_id;
        $appointment->appointment_date = $request->appointment_date;
        $appointment->status = $request->status;
        $appointment->time_slot = $request->time_slot;
        $appointment->save();

        return ApiResponse::success(200, $appointment)->toJsonResponse();
    }

    public function deleteAppointment($id){
        $response = Appointment::where('id', $id)->delete();

        return ApiResponse::success(200, $response)->toJsonResponse();
    }
}
