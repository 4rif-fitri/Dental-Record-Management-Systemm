<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExaminationController extends Controller
{
    public function dentistExamination($id){
        $user = User::where('role', 'patient')
            ->where('id', $id)->first();

        if(!$user){
            return to_route('dentistListPatient');
        }else{
            return Inertia::render('dentist/Examination');
        }
    }

    public function examination($id)
    {

    }
}
