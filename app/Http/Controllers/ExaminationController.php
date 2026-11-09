<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ExaminationController extends Controller
{
    public function dentistExamination($id){
        return Inertia::render('dentist/Examination');
    }

    public function examination($id)
    {

    }
}
