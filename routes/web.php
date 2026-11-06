<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Auth/Login');
    })->name("login");

    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name("register");

    Route::get('/new-password', function () {
        return Inertia::render('Auth/NewPassword');
    })->name("newPassword");

    Route::get('/forgot-password', function () {
        return Inertia::render('Auth/ForgotPassword');
    })->name("forgotPassword");
});

// Route::middleware('auth')->group(function () {

    Route::get('/logout', function () {
        return Inertia::render('Auth/Login');
    })->name("logout");

    Route::get('/user-profile', function () {
        return Inertia::render('Profile');
    })->name("userProfile");

    // Patient Page Raute
    Route::get('/patient-appointment', function () {
        return Inertia::render('patient/ListAppointment');
    })->name("patientAppointment");

    Route::get('/patient-book-appointment', function () {
        return Inertia::render('patient/BookAppointment');
    })->name("patientBookAppointment");


    // Clinic Staff Page Raute
    Route::get('/list-queue', function () {
        return Inertia::render('clinicStaff/ListQueue');
    })->name("listQueue");

    // Dentist Page Raute

    Route::get('/dentist-list-appointment', function () {
        return Inertia::render('dentist/ListAppointment');
    })->name("dentistListAppointment");

    Route::get('/dentist-list-patient', function () {
        return Inertia::render('dentist/ListAppointment');
    })->name("dentistListAppointment");

    Route::get('/dentist-examination/{id}', function () {
        return Inertia::render('dentist/ListAppointment');
    })->name("dentistExamination");
// });
