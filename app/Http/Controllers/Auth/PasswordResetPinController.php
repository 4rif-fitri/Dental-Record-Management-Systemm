<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\PasswordResetPin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;

class PasswordResetPinController extends Controller
{

    public function sendPin(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        $email = strtolower($request->email);

        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json([
                'status' => 200,
                'message' => 'If the email is registered, a PIN will be sent.',
            ]);
        }

        $key = 'password-reset-pin:' . $request->ip() . ':' . $email;

        if (RateLimiter::tooManyAttempts($key, 3)) {
            return response()->json([
                'status' => 429,
                'message' => 'Too many requests. Please try again later.',
            ], 429);
        }

        RateLimiter::hit($key, 60);

        $pin = (string) random_int(100000, 999999);

        PasswordResetPin::updateOrCreate(
            ['email' => $email],
            [
                'pin_hash' => Hash::make($pin),
                'expires_at' => now()->addMinutes(10),
                'attempts' => 0,
            ]
        );

        try {
            Mail::raw(
                "Your Dental Treatment Management System password reset PIN is: {$pin}\n\nThis PIN expires in 10 minutes.",
                function ($message) use ($email) {
                    $message->to($email)
                        ->subject('Dental System - Password Reset PIN');
                }
            );
        } catch (\Throwable $e) {
            PasswordResetPin::where('email', $email)->delete();

            report($e);

            return response()->json([
                'status' => 500,
                'message' => 'Unable to send PIN. Please try again later.',
            ], 500);
        }

        return response()->json([
            'status' => 200,
            'message' => 'If the email is registered, a PIN will be sent.',
        ]);
    }

    public function verifyPin(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'pin' => ['required', 'digits:6'],
        ]);

        $email = strtolower($request->email);

        $record = PasswordResetPin::where('email', $email)->first();

        if (!$record || $record->expires_at->isPast()) {
            if ($record) {
                $record->delete();
            }

            return response()->json([
                'status' => 422,
                'message' => 'Invalid or expired PIN.',
            ], 422);
        }

        if ($record->attempts >= 5) {
            $record->delete();

            return response()->json([
                'status' => 429,
                'message' => 'Too many incorrect attempts. Request a new PIN.',
            ], 429);
        }

        if (!Hash::check($request->pin, $record->pin_hash)) {
            $record->increment('attempts');

            return response()->json([
                'status' => 422,
                'message' => 'Incorrect PIN.',
            ], 422);
        }

        // PIN is verified. It will be consumed during password reset.
        return response()->json([
            'status' => 200,
            'message' => 'PIN verified successfully.',
        ]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'pin' => ['required', 'digits:6'],
            'password' => ['required', 'confirmed', Password::min(8)],
        ]);

        $email = strtolower($request->email);

        $result = DB::transaction(function () use ($request, $email) {
            $record = PasswordResetPin::where('email', $email)
                ->lockForUpdate()
                ->first();

            if (!$record || $record->expires_at->isPast()) {
                return 'invalid';
            }

            if ($record->attempts >= 5) {
                $record->delete();
                return 'locked';
            }

            if (!Hash::check($request->pin, $record->pin_hash)) {
                $record->increment('attempts');
                return 'incorrect';
            }

            $user = User::where('email', $email)->first();

            if (!$user) {
                return 'invalid';
            }

            $user->forceFill([
                'password' => Hash::make($request->password),
                'remember_token' => Str::random(60),
            ])->save();

            $record->delete();

            return 'success';
        });

        if ($result !== 'success') {
            return response()->json([
                'status' => 422,
                'message' => match ($result) {
                    'incorrect' => 'Incorrect PIN.',
                    'locked' => 'Too many incorrect attempts. Request a new PIN.',
                    default => 'Invalid or expired PIN.',
                },
            ], $result === 'locked' ? 429 : 422);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Password reset successfully.',
        ]);
    }
}
