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

Route::middleware('auth')->group(function () {

    // Patient Page Raute
    Route::get('/patient-appointment', function () {
        return Inertia::render('patient/ListAppointment');
    })->name("patientAppointment");

    Route::get('/patient-book-appointment', function () {
        return Inertia::render('patient/BookAppointment');
    })->name("patientBookAppointment");

    Route::get('/patient-profile', function () {
        return Inertia::render('patient/Profile');
    })->name("patientProfile");

    // Clinic Staff Page Raute
    Route::get('/clinic-staff-profile', function () {
        return Inertia::render('clinicStaff/Profile');
    })->name("clinicStaffProfile");

    // Dentist Page Raute
    Route::get('/patient-dentist', function () {
        return Inertia::render('dentist/Profile');
    })->name("dentistProfile");
});
