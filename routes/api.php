<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\PasswordResetPinController;

Route::prefix('auth')->group(function () {
    Route::post('/forgot-password', [PasswordResetPinController::class,'sendPin'])->middleware('throttle:5,1');
    Route::post('/verify-pin', [PasswordResetPinController::class,'verifyPin'])->middleware('throttle:10,1');
    Route::post('/reset-password', [PasswordResetPinController::class,'resetPassword'])->middleware('throttle:5,1');
});

