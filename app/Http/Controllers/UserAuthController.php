<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserAuthController extends Controller
{
    public function loginForm()
    {
        return Inertia::render('pages/auth/Login');
    }
    public function registerForm()
    {
        return Inertia::render('pages/auth/Register');
    }
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);


        $admin = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        Auth::guard('web')->login($admin);

        return redirect()->route('dashboard')->with('success', 'Regisztráció sikeresen megtörtént!');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (Auth::guard('web')->attempt($request->only('email', 'password'))) {
            return redirect()->route('dashboard')->with('success', 'Sikeresen bejelentkeztél!');
        }

        return redirect()->back()->withErrors(['email' => 'Hibás e-mail vagy jelszó.']);
    }

    public function logout()
    {
        Auth::guard('web')->logout();
        return redirect()->route('login')->with('success', 'Sikeresen kijelentkeztél!');
    }
}
