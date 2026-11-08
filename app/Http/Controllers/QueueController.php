<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class QueueController extends Controller
{
    public function listQueue(){
        return Inertia::render('clinicStaff/ListQueue');
    }
}
