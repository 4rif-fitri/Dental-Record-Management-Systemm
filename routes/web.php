
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\QueueController;
use App\Http\Controllers\ExaminationController;

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
|
| Here is where you can register authentication and authorization routes
| such as login, registration, password resets, and session management.
|
*/
Route::middleware('guest')->group(function () {

    Route::get('/bruno/csrf', function () {
        return response()->json([
            'csrf_token' => csrf_token()
        ]);
    });

    Route::get('/login', [UserController::class, 'showLoginPage'])->name('login');
    Route::get('/register', [UserController::class, 'showRegisterPage'])->name('register');
    Route::get('/new-password', [UserController::class, 'showForgotPasswordPage'])->name('newPassword');
    Route::get('/forgot-password', [UserController::class, 'showForgotPasswordPage'])->name('forgotPassword');

    Route::post('/', [UserController::class, 'login'])->name('userLogin');
});

/*
|--------------------------------------------------------------------------
| Page Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web page and view routes for your
| application. These routes are loaded by the RouteServiceProvider.
|
*/
Route::middleware('auth')->group(function () {

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
});

/*
|--------------------------------------------------------------------------
| Backend API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application.
|
*/
Route::middleware('auth')->group(function () {

    Route::prefix('profile')->group(function () {
        Route::PUT('/updateProfile', [UserController::class, 'updateProfile'])->name('updateProfile');
        Route::get('/getProfileData', [UserController::class, 'getProfileData'])->name('getProfileData');
    });

    Route::prefix('patient')->group(function () {
        Route::get('/search', [UserController::class, 'getPatientSearch'])->name('getPatientSearch');
        Route::get('/getAllPatient', [UserController::class, 'getAllPatient'])->name('getAllPatient');
    });

    Route::prefix('examination')->group(function () {
        Route::get('/{id}', [ExaminationController::class, 'dentistExamination'])->name('examination');
    });

    Route::prefix('queue')->group(function () {

    });

    Route::prefix('appointment')->group(function () {

    });

 });

