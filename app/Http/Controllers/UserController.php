<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
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

    public function createPatient(Request $request)
    {
        $validated = $request->validate([
            'student_staff_id' => 'required|string|unique:users,student_staff_id',
            'ic_passport' => 'required|string|unique:users,ic_passport',
            'name' => 'required|string',
            'gender' => 'required|string',
            'phone_number' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['role'] = 'patient';

        $user = new User($validated);
        $user->save();

        return ApiResponse::success('Success', $user)->toJsonResponse();

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

        $keyword = $request->keyword;

        $icKeyword = str_replace('-', '', $keyword);

        $patients = User::where('role', 'patient')
            ->where(function ($query) use ($keyword, $icKeyword) {

                $query->where('name', 'LIKE', "%{$keyword}%")
                    ->orWhere('student_staff_id', 'LIKE', "%{$keyword}%")
                    ->orWhere('ic_passport', 'LIKE', "%{$keyword}%")
                    ->orWhere('email', 'LIKE', "%{$keyword}%")
                    ->orWhereRaw(
                        "REPLACE(ic_passport, '-', '') LIKE ?",
                        ["%{$icKeyword}%"]
                    );

            })
            ->get();

        return ApiResponse::success(
            'Success',
            $patients
        )->toJsonResponse();
    }

    public function dentistListPatient()
    {
        return Inertia::render('dentist/ListPatient');
    }

    public function updateProfile(Request $request)
    {
        $id = session('id');
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string',
            'gender' => 'required|string',

            'student_staff_id' => [
                'required',
                'string',
                Rule::unique('users', 'student_staff_id')->ignore($user->id),
            ],

            'ic_passport' => [
                'required',
                'string',
                Rule::unique('users', 'ic_passport')->ignore($user->id),
            ],

            'phone_number' => 'required|string',

            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
        ]);

        $user->update($validated);

        return ApiResponse::success('Success', $user)->toJsonResponse();
    }

    public function showLoginPage(){
        return Inertia::render('Auth/Login');
    }

    public function showRegisterPage(){
        return Inertia::render('Auth/Register');
    }

    public function showNewPasswordPage(){
        return Inertia::render('Auth/NewPassword');
    }

    public function showForgotPasswordPage(){
        return Inertia::render('Auth/ForgotPassword');
    }

    public function getPatientById($id)
    {
        $patientDetails = User::with('examinations')
            ->where('id', $id)
            ->where('role', 'patient')
            ->firstOrFail();

        return ApiResponse::success(
            'Success',
            $patientDetails
        )->toJsonResponse();
    }

}
