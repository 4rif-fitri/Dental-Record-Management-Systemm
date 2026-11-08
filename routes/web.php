
<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;


Route::middleware('guest')->group(function () {

    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

    Route::post('/', [UserController::class, 'login'])->name('userLogin');

    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');

    Route::get('/new-password', function () {
        return Inertia::render('Auth/NewPassword');
    })->name('newPassword');

    Route::get('/forgot-password', function () {
        return Inertia::render('Auth/ForgotPassword');
    })->name('forgotPassword');
});


Route::middleware('auth')->group(function () {

    Route::get('/',[UserController::class,'index'])->name('dashboard');

    Route::post('logout', [UserController::class, 'logout'])->name('logout');

    Route::get('/logout', function () {
        return Inertia::render('Auth/Login');
    })->name('logout');

    Route::get('/user-profile', function () {
        return Inertia::render('Profile');
    })->name('userProfile');


    // Patient Page Route
    Route::middleware('role:patient')->group(function () {

        Route::get('/patient-appointment', function () {
            return Inertia::render('patient/ListAppointment');
        })->name('patientAppointment');

        Route::get('/patient-book-appointment', function () {
            return Inertia::render('patient/BookAppointment');
        })->name('patientBookAppointment');
    });


    // Clinic Staff Page Route
    Route::middleware('role:staff')->group(function () {

        Route::get('/list-queue', function () {
            return Inertia::render('clinicStaff/ListQueue');
        })->name('listQueue');
    });


    // Dentist Page Route
    Route::middleware('role:dentist')->group(function () {

        Route::get('/dentist-list-appointment', function () {
            return Inertia::render('dentist/ListAppointment');
        })->name('dentistListAppointment');

        Route::get('/dentist-list-patient', function () {
            return Inertia::render('dentist/ListPatient');
        })->name('dentistListPatient');

        Route::get('/dentist-examination/{id}', function () {
            return Inertia::render('dentist/Examination');
        })->name('dentistExamination');
    });
});
