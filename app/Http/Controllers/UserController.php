<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $validated['username'])
            ->orWhere('ic/passport', $validated['username'])
            ->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return back()->withErrors([
                'username' => 'Invalid username or password.',
            ]);
        }

        Auth::login($user);

        $request->session()->regenerate();
        $request->session()->put('role', $user->role);

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
}
