<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Examination;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExaminationController extends Controller
{

    public function pagePatientConsent(){
        return Inertia::render('patient/Consent');
    }

    public function pagePatientExamination(){
        return Inertia::render('patient/Examination');
    }

    public function pageExamination($id){
        return Inertia::render('dentist/Examination');
    }

}
