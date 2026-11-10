<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\AppointmentBooking;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AppointmentBookingController extends Controller
{
    public function getAllBooking(){
        $bookings = AppointmentBooking::all();

        return ApiResponse::success(200, $bookings)->toJsonResponse();
    }

    public function getBookingById($id){
        $booking = AppointmentBooking::where('id', $id)->with("appointment")->first();

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

    public function getWeeklySchedule(Request $request)
    {
        $request->validate([
//            'dentist_id' => ['required', 'exists:users,id'],
            'start_date' => ['nullable', 'date'],
        ]);

        return ApiResponse::success(200, $request->start_date)->toJsonResponse();

        $startDate = $request->start_date
            ? Carbon::parse($request->start_date)->startOfWeek()
            : Carbon::now()->startOfWeek();

        $endDate = $startDate->copy()->endOfWeek();

        $appointments = AppointmentBooking::with([
            'bookings.patient'
        ])
            ->where('dentist_id', $request->dentist_id)
            ->whereBetween('appointment_date', [
                $startDate->toDateString(),
                $endDate->toDateString()
            ])
            ->get();

        $days = [];

        for ($date = $startDate->copy(); $date->lte($endDate); $date->addDay()) {

            $dailyAppointments = $appointments
                ->where('appointment_date', $date->toDateString())
                ->values();

            $days[] = [
                'date' => $date->toDateString(),
                'day' => $date->format('l'),
                'appointments' => $dailyAppointments->map(function ($appointment) {

                    $booking = $appointment->bookings->first();

                    return [
                        'appointment_id' => $appointment->id,
                        'time_slot' => $appointment->time_slot,
                        'status' => $booking
                            ? $booking->status
                            : $appointment->status,
                        'booking_status' => $booking?->status,
                        'patient' => $booking?->patient?->name,
                        'reason' => $booking?->reason,
                    ];
                })
            ];
        }

        return response()->json([
            'status' => 200,
            'message' => 'Weekly schedule retrieved successfully',
            'data' => [
                'dentist_id' => $request->dentist_id,
                'week_start' => $startDate->toDateString(),
                'week_end' => $endDate->toDateString(),
                'days' => $days
            ]
        ]);
    }
}
