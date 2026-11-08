<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExaminationController extends Controller
{
    public function dentistExamination($id){
        return Inertia::render('dentist/Examination');
    }
}
