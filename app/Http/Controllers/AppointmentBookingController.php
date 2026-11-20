<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Appointment;
use App\Models\AppointmentBooking;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AppointmentBookingController extends Controller
{
    public function getAllBooking(){
        $bookings = AppointmentBooking::all();

        return ApiResponse::success("List of all bookings", $bookings)->toJsonResponse();
    }

    public function getBookingById($id){
        $booking = AppointmentBooking::where('id', $id)->with("appointment")->first();

        return ApiResponse::success("Booking Details", $booking)->toJsonResponse();
    }

    public function getAppointmentPatient()
    {
        $patient_id = session()->get('id');

        $response = AppointmentBooking::where("patient_id", $patient_id)
            ->with("appointment")
            ->get();

        return ApiResponse::success("", $response)->toJsonResponse();
    }

    public function createBooking(Request $request)
    {
        $patientId = session('id');

        $validated = $request->validate([
            'appointment_id' => ['required', 'integer', 'exists:appointments,id'],
            'reason' => ['nullable', 'string', 'max:255'],
        ]);

        try {

            $result = DB::transaction(function () use ($validated,$patientId) {

                $appointment = Appointment::where('id',$validated['appointment_id'])
                    ->lockForUpdate()
                    ->first();

                if (!$appointment) {
                    return [
                        'conflict' => true,
                        'message' => 'Appointment not found.'
                    ];
                }

                $existingBooking = $appointment->bookings()
                    ->whereIn('status', ['pending', 'approved'])->exists();

                if ($existingBooking) {
                    return [
                        'conflict' => true,
                        'message' => 'This appointment slot is already booked.'
                    ];
                }

                // Create new booking
                // Rejected booking does not block a new booking
                $booking = $appointment->bookings()->create([
                    'patient_id' => $patientId,
                    'status' => 'pending',
                    'reason' => $validated['reason'] ?? null,
                ]);

                // Update appointment status
                $appointment->update([
                    'status' => 'booked'
                ]);

                return [
                    'conflict' => false,
                    'booking' => $booking->load('patient', 'appointment')
                ];
            }, 5);

            // If slot already booked
            if ($result['conflict']) {
                return response()->json([
                    'status' => 422,
                    'message' => $result['message'],
                    'data' => null
                ], 422);
            }

            // Success
            return ApiResponse::success(
                200,
                $result['booking']
            )->toJsonResponse();

        } catch (\Throwable $e) {

            \Log::error('Create Booking Error: ' . $e->getMessage());

            return response()->json([
                'status' => 500,
                'message' => 'Failed to create appointment booking.',
                'data' => null
            ], 500);
        }
    }

    public function updateBooking(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:approved,rejected,cancelled',
        ]);

        $booking = AppointmentBooking::findOrFail($id);

        if (
            $validated['status'] === 'cancelled' &&
            $booking->status !== 'pending'
        ) {
            return ApiResponse::error(
                "Only pending appointments can be cancelled."
            )->toJsonResponse();
        }

        $booking->status = $validated['status'];
        $booking->save();

        return ApiResponse::success(
            "Booking updated successfully.",
            $booking
        )->toJsonResponse();
    }

    public function getWeeklySchedule(Request $request)
    {
        $validated = $request->validate([
            'date' => ['required', 'date'],
        ]);

        $dentistId = session('id');

        $startDate = Carbon::parse($validated['date'])
            ->startOfWeek(Carbon::MONDAY);

        $endDate = $startDate->copy()
            ->endOfWeek(Carbon::SUNDAY);

        $appointments = Appointment::with([
            'bookings' => function ($query) {
                $query->whereIn('status', [
                    'pending',
                    'accepted'
                ])->with('patient');
            }
        ])
            ->where('dentist_id', $dentistId)
            ->whereBetween('appointment_date', [
                $startDate->toDateString(),
                $endDate->toDateString()
            ])
            ->select([
                'id',
                'appointment_date',
                'status',
                'time_slot'
            ])
            ->orderBy('appointment_date')
            ->orderBy('time_slot')
            ->get();

        // Group appointments by date
        $groupedAppointments = $appointments
            ->groupBy(function ($appointment) {
                return $appointment->getRawOriginal('appointment_date');
            })
            ->map(function ($items, $date) {

                return [
                    'date' => $date,
                    'day' => Carbon::parse($date)->format('l'),

                    'appointments' => $items->map(function ($item) {

                        // Get active booking
                        $booking = $item->bookings->first();

                        // Determine appointment status
                        if ($item->status === 'unavailable') {
                            $status = 'unavailable';
                        } elseif ($booking) {
                            $status = 'booked';
                        } else {
                            $status = 'available';
                        }

                        return [
                            'id' => $item->id,
                            'status' => $status,
                            'time_slot' => $item->time_slot,

                            'booking' => $booking ? [
                                'id' => $booking->id,
                                'status' => $booking->status,
                                'reason' => $booking->reason,

                                'patient' => $booking->patient ? [
                                    'id' => $booking->patient->id,
                                    'name' => $booking->patient->name,
                                    'ic_passport' => $booking->patient->ic_passport,
                                    'phone_number' => $booking->patient->phone_number,
                                    'student_staff_id' => $booking->patient->student_staff_id,
                                    'gender' => $booking->patient->gender,
                                    'email' => $booking->patient->email,
                                ] : null,

                            ] : null
                        ];

                    })->values()
                ];

            })->values();

        $response = [
            'week_start' => $startDate->toDateString(),
            'week_end' => $endDate->toDateString(),
            'days' => $groupedAppointments
        ];

        return ApiResponse::success(
            "Weekly appointment retrieved successfully",
            $response
        )->toJsonResponse();
    }

    public function getDailyAppointmentWithStatus(Request $request)
    {
        $validated = $request->validate([
            'date' => ['required', 'date'],
        ]);

        $dentistId = session('id');

        $appointments = Appointment::with([
            'bookings' => function ($query) {
                $query->whereIn('status', [
                    'pending',
                    'approved'
                ]);
            }
        ])
            ->whereDate('appointment_date', $validated['date'])
            ->orderBy('time_slot')
            ->get();

        $response = $appointments->map(function ($appointment) {

            $booking = $appointment->bookings->first();

            if ($appointment->status === 'unavailable') {
                $status = 'unavailable';
            } elseif ($booking) {
                $status = 'booked';
            } else {
                $status = 'available';
            }

            return [
                'id' => $appointment->id,
                'status' => $status,
                'time_slot' => $appointment->time_slot,
            ];

        })->values();

        return ApiResponse::success(
            "Daily appointment retrieved successfully",
            $response
        )->toJsonResponse();
    }

    public function updateBookingStatus(Request $request, $id, $action)
    {
        $validated = validator(
            ['action' => $action],
            ['action' => 'required|in:accept,reject']
        )->validate();

        $booking = AppointmentBooking::findOrFail($id);

        $booking->status = $action === 'accept'
            ? 'accepted'
            : 'rejected';

        $booking->save();

        return ApiResponse::success(
            "Booking status updated successfully",
            $booking
        )->toJsonResponse();
    }

    public function deleteBooking($id)
    {
        AppointmentBooking::destroy($id);

        return ApiResponse::success("Booking deleted successfully",)->toJsonResponse();
    }
}
