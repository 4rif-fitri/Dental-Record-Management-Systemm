<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MailTestController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\Auth\PasswordResetPinController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/test-email', [
    MailTestController::class,
    'sendTestEmail'
]);



Route::prefix('auth')->group(function () {

    Route::post('/forgot-password', [
        PasswordResetPinController::class,
        'sendPin'
    ])->middleware('throttle:5,1');

    Route::post('/verify-pin', [
        PasswordResetPinController::class,
        'verifyPin'
    ])->middleware('throttle:10,1');

    Route::post('/reset-password', [
        PasswordResetPinController::class,
        'resetPassword'
    ])->middleware('throttle:5,1');

});

