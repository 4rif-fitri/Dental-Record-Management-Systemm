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

        return ApiResponse::success(200, $bookings)->toJsonResponse();
    }

    public function getBookingById($id){
        $booking = AppointmentBooking::where('id', $id)->with("appointment")->first();

        return ApiResponse::success(200, $booking)->toJsonResponse();
    }

    public function createBooking(Request $request){
        $validated = $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'patient_id' => 'required|exists:users,id',
            'reason' => 'required|string|max:100',
        ]);

        try {

            $booking = DB::transaction(function () use ($validated) {

                $appointment = Appointment::where(
                    'id',
                    $validated['appointment_id']
                )
                    ->lockForUpdate()
                    ->firstOrFail();

                // Check appointment availability
                if ($appointment->status !== 'available') {
                    abort(409, 'Appointment is unavailable.');
                }

                // Check existing active booking
                $existingBooking = AppointmentBooking::where(
                    'appointment_id',
                    $validated['appointment_id']
                )
                    ->whereIn('status', [
                        'pending',
                        'approved'
                    ])
                    ->exists();

                if ($existingBooking) {
                    abort(409, 'This appointment already has an active booking.');
                }

                // Create new booking
                $booking = new AppointmentBooking();

                $booking->appointment_id = $validated['appointment_id'];
                $booking->patient_id = $validated['patient_id'];
                $booking->status = 'pending';
                $booking->reason = $validated['reason'];

                $booking->save();

                // Update appointment status
                $appointment->update([
                    'status' => 'booked'
                ]);

                return $booking;

            });

            return ApiResponse::success(
                200,
                $booking
            )->toJsonResponse();

        } catch (\Symfony\Component\HttpKernel\Exception\HttpException $e) {

            return ApiResponse::error(
                $e->getMessage(),
                $e->getStatusCode()
            )->toJsonResponse();

        } catch (\Throwable $e) {

            return ApiResponse::error(
                $e->getMessage(),
                500
            )->toJsonResponse();
        }
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

    public function getWeeklyAppointment(Request $request)
    {
        $request->validate([
            'week_start' => ['required', 'date'],
        ]);

        $dentistId = session('id');

        $startDate = Carbon::parse($request->week_start)
            ->startOfWeek(Carbon::MONDAY);

        $endDate = $startDate->copy()
            ->endOfWeek(Carbon::SUNDAY);

        $appointments = Appointment::with([
            'bookings.patient'
        ])
            ->where('dentist_id', $dentistId)
            ->whereBetween('appointment_date', [
                $startDate->toDateString(),
                $endDate->toDateString()
            ])
            ->get();

        $times = [
            '08:00', '09:00', '10:00', '11:00',
            '12:00', '13:00', '14:00', '15:00', '16:00'
        ];

        $days = [];

        for (
            $date = $startDate->copy();
            $date->lte($endDate);
            $date->addDay()
        ) {
            $dateString = $date->format('Y-m-d');

            $slots = [];

            foreach ($times as $time) {

                $appointment = $appointments->first(
                    fn ($item) =>
                        $item->appointment_date == $dateString &&
                        $item->time_slot == $time
                );

                $booking = $appointment?->bookings
                    ->first();

                if ($date->isWeekend()) {
                    $status = 'unavailable';
                } elseif (in_array($time, ['12:00', '13:00'])) {
                    $status = 'unavailable';
                } elseif (in_array($time, ['15:00', '16:00'])) {
                    $status = 'none';
                } elseif (!$appointment) {
                    $status = 'available';
                } elseif (!$booking) {
                    $status = 'available';
                } else {
                    $status = 'booked';
                }

                $slots[] = [
                    'appointment_id' => $appointment?->id,
                    'time' => $time,
                    'status' => $status,

                    'booking' => $booking ? [
                        'id' => $booking->id,
                        'status' => $booking->status,
                        'reason' => $booking->reason,

                        'patient' => [
                            'id' => $booking->patient->id,
                            'name' => $booking->patient->name,
                            'ic_passport' => $booking->patient->ic_passport,
                            'phone_number' => $booking->patient->phone_number,
                            'student_staff_id' => $booking->patient->student_staff_id,
                            'gender' => $booking->patient->gender,
                            'email' => $booking->patient->email,
                        ]
                    ] : null
                ];
            }

            $days[] = [
                'date' => $dateString,
                'day' => $date->format('l'),
                'slots' => $slots
            ];
        }

        return ApiResponse::success(
            'Weekly appointment retrieved successfully',
            [
                'week_start' => $startDate->toDateString(),
                'week_end' => $endDate->toDateString(),
                'days' => $days
            ]
        )->toJsonResponse();
    }

    public function getWeeklySchedule(Request $request)
    {
        $dentistId = session('id');

        $startDate = Carbon::now()->startOfWeek(Carbon::MONDAY);
        $endDate = Carbon::now()->endOfWeek(Carbon::SUNDAY);

        $appointments = Appointment::with([
            'bookings' => function ($query) {
                $query->whereIn('status', [
                    'pending',
                    'approved'
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

        // Group by date
        $groupedAppointments = $appointments
            ->groupBy(function ($appointment) {
                return $appointment->getRawOriginal('appointment_date');
            })
            ->map(function ($items, $date) {

                return [
                    'date' => $date,
                    'day' => Carbon::parse($date)->format('l'),

                    'appointments' => $items->map(function ($item) {

                        // Check active booking
                        $booking = $item->bookings->first();

                        // Determine status
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

                                'patient' => [
                                    'id' => $booking->patient->id,
                                    'name' => $booking->patient->name,
                                    'ic_passport' => $booking->patient->ic_passport,
                                    'phone_number' => $booking->patient->phone_number,
                                    'student_staff_id' => $booking->patient->student_staff_id,
                                    'gender' => $booking->patient->gender,
                                    'email' => $booking->patient->email,
                                ]
                            ] : false
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
            200,
            $response
        )->toJsonResponse();
    }

    public function getWeeklyAppointmentWithStatus(Request $request)
    {
        $validated = $request->validate([
            'week_start' => ['required', 'date'],
        ]);

        $dentistId = session('id');

        $startDate = Carbon::parse($validated['week_start'])
            ->startOfWeek(Carbon::MONDAY);

        $endDate = $startDate->copy()
            ->endOfWeek(Carbon::SUNDAY);

        $appointments = Appointment::with([
            'bookings' => function ($query) {
                $query->whereIn('status', [
                    'pending',
                    'approved'
                ]);
            }
        ])
            ->where('dentist_id', $dentistId)
            ->whereBetween('appointment_date', [
                $startDate->toDateString(),
                $endDate->toDateString()
            ])
            ->orderBy('appointment_date')
            ->orderBy('time_slot')
            ->get();

        // Group by date
        $groupedAppointments = $appointments
            ->groupBy(function ($appointment) {
                return $appointment->getRawOriginal('appointment_date');
            })
            ->map(function ($items, $date) {

                return [
                    'date' => $date,
                    'day' => Carbon::parse($date)->format('l'),

                    'appointments' => $items->map(function ($appointment) {

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

                    })->values()
                ];

            })->values();

        $response = [
            'week_start' => $startDate->toDateString(),
            'week_end' => $endDate->toDateString(),
            'days' => $groupedAppointments
        ];

        return ApiResponse::success(
            200,
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
            200,
            $response
        )->toJsonResponse();
    }
}
