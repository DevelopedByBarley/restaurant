<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminAuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function loginForm()
    {
        return Inertia::render('pages/admin/auth/Login');
    }
    public function registerForm()
    {
        return Inertia::render('pages/admin/auth/Register');
    }

    public function register(Request $request)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins',
            'password' => 'required|string|min:8|confirmed',
        ]);


        // Create the user
        $admin = Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        // Optionally, you can log in the user after registration
        Auth::guard('admin')->login($admin);

        // Redirect to a desired page after registration
        return redirect()->route('admin.dashboard')->with('success', 'Regisztráció sikeresen megtörtént!');
    }

    public function login(Request $request)
    {        // Validate the request data
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Attempt to log in the user
        if (Auth::guard('admin')->attempt($request->only('email', 'password'))) {
            // Redirect to a desired page after successful login
            return redirect()->route('admin.dashboard')->with('success', 'Sikeresen bejelentkeztél!');
        }

        // If login fails, redirect back with an error message
        return redirect()->back()->withErrors(['email' => 'Hibás e-mail vagy jelszó.']);
    }
    public function logout()
    {
        Auth::guard('admin')->logout();
        return redirect()->route('admin.login')->with('success', 'Sikeresen kijelentkeztél!');
    }
}
