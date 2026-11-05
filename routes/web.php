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
});
