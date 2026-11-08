<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $validated['username'])
            ->orWhere('student_staff_id', $validated['username'])
            ->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return back()->withErrors([
                'username' => 'Invalid username or password.',
            ]);
        }

        Auth::login($user);

        $request->session()->regenerate();
        $request->session()->put('role', $user->role);
        $request->session()->put('id', $user->id);

        return redirect()->route('dashboard');
    }

    public function index(){
        if (session('role') === 'patient') {
            return redirect()->route('patientAppointment');
        }else if(session('role') === 'dentist'){
            return redirect()->route('dentistListAppointment');
        }else if(session('role') === 'clinicStaff'){
            return redirect()->route('listQueue');
        }
    }

    public function logout(Request $request){
        Auth::logout();

        $request->session()->forget('role');
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }

    public function getProfileData()
    {
        $userProfileId = session('id');

        $profile = User::where('id', $userProfileId)->first();

        return ApiResponse::success('Success', $profile)->toJsonResponse();
    }

    public function userProfile()
    {
        return Inertia::render('Profile');
    }

    public function getAllPatient(){
        $patients = User::where('role', 'patient')->get();
        return ApiResponse::success('Success', $patients)->toJsonResponse();
    }

    public function getPatientSearch(Request $request)
    {
        $keyword = $request->query('keyword');

        $patients = User::where('name', 'LIKE', "%{$keyword}%")
            ->orWhere('ic_passport', 'LIKE', "%{$keyword}%")
            ->orWhere('student_staff_id', 'LIKE', "%{$keyword}%")
            ->orWhere('email', 'LIKE', "%{$keyword}%")
            ->get();

        return ApiResponse::success('Success', $patients)->toJsonResponse();
    }

    public function dentistListPatient()
    {
        return Inertia::render('dentist/ListPatient');
    }
}
