
<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\QueueController;
use App\Http\Controllers\ExaminationController;

Route::middleware('guest')->group(function () {

    Route::get('/bruno/csrf', function () {
        return response()->json([
            'csrf_token' => csrf_token()
        ]);
    });

    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');

    Route::get('/new-password', function () {
        return Inertia::render('Auth/NewPassword');
    })->name('newPassword');

    Route::get('/forgot-password', function () {
        return Inertia::render('Auth/ForgotPassword');
    })->name('forgotPassword');

    Route::post('/', [UserController::class, 'login'])->name('userLogin');

});


Route::middleware('auth')->group(function () {

    //==========================
    // Page Route
    //==========================
    Route::get('/',[UserController::class,'index'])->name('dashboard');
    Route::post('logout', [UserController::class, 'logout'])->name('logout');
    Route::get('/user-profile', [userController::class, 'userProfile'])->name('userProfile');

    Route::middleware('role:patient')->group(function () {
        Route::get('/patient-appointment', [AppointmentController::class, 'patientAppointment'])->name('patientAppointment');
        Route::get('/patient-book-appointment', [AppointmentController::class, 'patientBookAppointment'])->name('patientBookAppointment');
    });

    Route::middleware('role:staff')->group(function () {
        Route::get('/list-queue', [QueueController::class, 'listQueue'])->name('listQueue');
    });

    Route::middleware('role:dentist')->group(function () {
        Route::get('/dentist-list-appointment', [AppointmentController::class, 'dentistListAppointment'])->name('dentistListAppointment');
        Route::get('/dentist-list-patient', [UserController::class, 'dentistListPatient'])->name('dentistListPatient');
        Route::get('/dentist-examination/{id}', [ExaminationController::class, 'dentistExamination'])->name('dentistExamination');
    });


    //==========================
    // API Route
    //==========================

    Route::get('/getProfileData', [UserController::class, 'getProfileData'])->name('getProfileData');
    Route::get('/getAllPatient', [UserController::class, 'getAllPatient'])->name('getAllPatient');
    Route::get('/getPatient/search', [UserController::class, 'getPatientSearch'])->name('getPatientSearch');


});
