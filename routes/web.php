
<?php

use App\Http\Controllers\ConditionController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\ProcedureController;
use App\Http\Controllers\SurfaceController;
use App\Http\Controllers\ToothController;
use App\Http\Controllers\ToothFindingController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\QueueController;
use App\Http\Controllers\ExaminationController;
use App\Http\Controllers\AppointmentBookingController;
use App\Http\Controllers\ExaminationMedicineController;
use App\Http\Controllers\ToothSurfaceController;
/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
|
| Here is where you can register authentication and authorization routes
| such as login, registration, password resets, and session management.
|
*/
Route::get('/bruno/csrf', function () {
    return response()->json([
        'csrf_token' => csrf_token()
    ]);
});

Route::middleware('guest')->group(function () {

    Route::get('/login', [UserController::class, 'showLoginPage'])->name('login');
    Route::get('/register', [UserController::class, 'showRegisterPage'])->name('register');
    Route::get('/new-password', [UserController::class, 'showForgotPasswordPage'])->name('newPassword');
    Route::get('/forgot-password', [UserController::class, 'showForgotPasswordPage'])->name('forgotPassword');

    Route::post('/login', [UserController::class, 'login'])->name('userLogin');
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
    Route::get('examination/{id}', [ExaminationController::class, 'pageExamination'])->name('pageExamination');

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
        Route::get('/', [UserController::class, 'getProfileData'])->name('getProfileData');
        Route::PUT('/updateProfile', [UserController::class, 'updateProfile'])->name('updateProfile');
    });

    Route::prefix('examination')->group(function () {
        Route::get('/', [ExaminationController::class, "getAllExaminations"])->name("getAllExaminations");
        Route::get('/{id}', [ExaminationController::class, 'getExaminationById'])->name('getExaminationById');
        Route::post('/store', [ExaminationController::class, 'createExamination'])->name('createExamination');
        Route::put('update/{id}', [ExaminationController::class, 'updateExamination'])->name('updateExamination');
    });

    Route::prefix('patient')->group(function () {
        Route::get('/', [UserController::class, 'getAllPatient'])->name('getAllPatient');
        Route::post('/store', [UserController::class, 'createPatient'])->name('createPatient');
        Route::get('/{id}', [UserController::class, 'getPatientById'])->name('getPatientById');
        Route::post('/search', [UserController::class, 'getPatientSearch'])->name('getPatientSearch');
    });

    Route::prefix("procedure")->group(function () {
        Route::get('/', [ProcedureController::class, 'getAllProcedure'])->name('getAllProcedure');
        Route::get('/{id}', [ProcedureController::class, 'getProcedureById'])->name('getProcedureById');
        Route::post('/store', [ProcedureController::class, 'createProcedure'])->name('createProcedure');
        Route::put('update/{id}', [ProcedureController::class, 'updateProcedure'])->name('updateProcedure');
        Route::delete('delete/{id}', [ProcedureController::class, 'deleteProcedure'])->name('deleteProcedure');
    });

    Route::prefix('condition')->group(function () {
        Route::get('/', [ConditionController::class, 'getAllCondition'])->name('getAllCondition');
        Route::get('/{id}', [ConditionController::class, 'getConditionById'])->name('getConditionById');
        Route::post('/store', [ConditionController::class, 'createCondition'])->name('createCondition');
        Route::put('update/{id}', [ConditionController::class, 'updateCondition'])->name('updateCondition');
        Route::delete('delete/{id}', [ConditionController::class, 'deleteCondition'])->name('deleteCondition');
    });

    Route::prefix('tooth')->group(function () {
        Route::get('/', [ToothController::class, 'getAllTooth'])->name('getAllTooth');
        Route::get('/{id}', [ToothController::class, 'getToothById'])->name('getToothById');
        Route::post('/store', [ToothController::class, 'createTooth'])->name('createTooth');
        Route::put('update/{id}', [ToothController::class, 'updateTooth'])->name('updateTooth');
        Route::delete('delete/{id}', [ToothController::class, 'deleteTooth'])->name('deleteTooth');
    });

    Route::prefix('surface')->group(function () {
        Route::get('/', [SurfaceController::class, 'getAllSurface'])->name('getAllSurface');
        Route::get('/{id}', [SurfaceController::class, 'getSurfaceById'])->name('getSurfaceById');
        Route::post('/store', [SurfaceController::class, 'createSurface'])->name('createSurface');
        Route::put('update/{id}', [SurfaceController::class, 'updateSurface'])->name('updateSurface');
        Route::delete('delete/{id}', [SurfaceController::class, 'deleteSurface'])->name('deleteSurface');
    });

    Route::prefix('queue')->group(function () {
        Route::get('/', [QueueController::class, 'getAllQueue'])->name('getAllQueue');
        Route::get('/{id}', [QueueController::class, 'getQueueById'])->name('getQueueById');
        Route::post('/store', [QueueController::class, 'createQueue'])->name('createQueue');
        Route::put('/update/{id}', [QueueController::class, 'updateQueue'])->name('updateQueue');
        Route::delete('/delete/{id}', [QueueController::class, 'deleteQueue'])->name('deleteQueue');
    });

    Route::prefix('appointment')->group(function () {
        Route::get('/getWeeklySchedule', [AppointmentBookingController::class, 'getWeeklySchedule'])->name('getWeeklySchedule');
        Route::get('/', [AppointmentController::class, 'getAllAppointment'])->name('getAllAppointment');
        Route::get('/{id}', [AppointmentController::class, 'getAppointmentById'])->name('getAppointmentById');
        Route::post('/store', [AppointmentController::class, 'createAppointment'])->name('createAppointment');
        Route::put('/update/{id}', [AppointmentController::class, 'updateAppointment'])->name('updateAppointment');
        Route::delete('/delete/{id}', [AppointmentController::class, 'deleteAppointment'])->name('deleteAppointment');
    });

    Route::get('/booking/day', [AppointmentBookingController::class, 'getDailyAppointmentWithStatus']);

    Route::prefix('booking')->group(function () {
        Route::get('/', [AppointmentBookingController::class, 'getAllBooking'])->name('getAllBooking');
        Route::get('/{id}', [AppointmentBookingController::class, 'getBookingById'])->name('getBookingById');
        Route::post('/store', [AppointmentBookingController::class, 'createBooking'])->name('createBooking');
        Route::put('/update/{id}', [AppointmentBookingController::class, 'updateBooking'])->name('updateBooking');
        Route::delete('/delete/{id}', [AppointmentBookingController::class, 'deleteBooking'])->name('deleteBooking');
    });

    Route::prefix('medicine')->group(function () {
        Route::get('/', [MedicineController::class, 'getAllMedicine'])->name('getAllMedicine');
        Route::get('/{id}', [MedicineController::class, 'getMedicineById'])->name('getMedicineById');
        Route::post('/store', [MedicineController::class, 'createMedicine'])->name('createMedicine');
        Route::put('update/{id}', [MedicineController::class, 'updateMedicine'])->name('updateMedicine');
        Route::delete('delete/{id}', [MedicineController::class, 'deleteMedicine'])->name('deleteMedicine');
    });

    Route::prefix('examinationMedicine')->group(function () {
        Route::get('/', [ExaminationMedicineController::class, 'getAllExaminationMedicine'])->name('getAllExaminationMedicine');
        Route::get('/{id}', [ExaminationMedicineController::class, 'getExaminationMedicineById'])->name('getExaminationById');
        Route::post('/store', [ExaminationMedicineController::class, 'createExaminationMedicine'])->name('createExamination');
        Route::put('update/{id}', [ExaminationMedicineController::class, 'updateExaminationMedicine'])->name('updateExamination');
        Route::delete('delete/{id}', [ExaminationMedicineController::class, 'deleteExaminationMedicine'])->name('deleteExamination');
    });

    Route::prefix('toothSurface')->group(function () {
        Route::get('/', [ToothSurfaceController::class, 'getAllToothSurfaces'])->name('getAllToothSurvey');
        Route::get('/{id}', [ToothSurfaceController::class, 'getToothSurfacesById'])->name('getToothSurfaceById');
        Route::post('/store', [ToothSurfaceController::class, 'createToothSurface'])->name('createToothSurface');
        Route::put('update/{id}', [ToothSurfaceController::class, 'updateToothSurface'])->name('updateToothSurface');
        Route::delete('delete/{id}', [ToothSurfaceController::class, 'deletetoothSurface'])->name('deleteTooth');
    });

    Route::prefix('toothFinding')->group(function () {
        Route::get('/',[ToothFindingController::class, 'getAllToothFinding'])->name('getAllToothFinding');
        Route::get('{id}', [ToothFindingController::class, 'getFindingById'])->name('getFindingById');
        Route::post('/store', [ToothFindingController::class, 'createFinding'])->name('createFinding');
        Route::put('update/{id}', [ToothFindingController::class, 'updateFinding'])->name('updateFinding');
        Route::delete('delete/{id}', [ToothFindingController::class, 'deleteFinding'])->name('deleteFinding');
    });

});

