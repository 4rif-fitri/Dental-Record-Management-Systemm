<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\AppointmentBooking;
use Illuminate\Http\Request;

class AppointmentBookingController extends Controller
{
    public function getAllBooking(){
        $bookings = AppointmentBooking::all();

        return ApiResponse::success(200, $bookings)->toJsonResponse();
    }

    public function getBookingById($id){
        $booking = AppointmentBooking::where('id', $id)->first();

        return ApiResponse::success(200, $booking)->toJsonResponse();
    }

    public function createBooking(Request $request){
        $validated = $request->validate([
            'appointment_id' => 'required',
            'patient_id' => 'required',
            'status' => 'required',
            'reason' => 'required',
        ]);

        $booking = new AppointmentBooking();
        $booking->appointment_id = $request->appointment_id;
        $booking->patient_id = $request->patient_id;
        $booking->status = $request->status;
        $booking->reason = $request->reason;
        $booking->save();

        return ApiResponse::success(200, $booking)->toJsonResponse();
    }

    public function updateBooking(Request $request, $id){
        $validated = $request->validate([
            'appointment_id' => 'required',
            'patient_id' => 'required',
            'status' => 'required',
            'reason' => 'required',
        ]);

        $booking = AppointmentBooking::where('id', $id)->first();
        $booking->appointment_id = $request->appointment_id;
        $booking->patient_id = $request->patient_id;
        $booking->status = $request->status;
        $booking->reason = $request->reason;
        $booking->save();

        return ApiResponse::success(200, $booking)->toJsonResponse();
    }

    public function deleteBooking($id){
        $response = AppointmentBooking::destroy($id);

        return ApiResponse::success(200, $response)->toJsonResponse();
    }
}
