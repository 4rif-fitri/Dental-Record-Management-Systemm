<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailTestController extends Controller
{
    public function sendTestEmail(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        Mail::raw(
            'This is a test email from Dental Treatment Management System.',
            function ($message) use ($request) {
                $message->to($request->email)
                    ->subject('Dental System - Email Test');
            }
        );

        return response()->json([
            'status' => 200,
            'message' => 'Test email sent successfully.',
        ]);
    }
}
