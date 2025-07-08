<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('pages/user/profile/index');
    }

    public function edit()
    {
        return Inertia::render('pages/user/profile/edit');
    }


    public function update(Request $request, User $user)
    {
        $auth = Auth::user();

        if ($auth->id !== $user->id) {
            dd('AUTH PROBLEM');
        }


        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($auth->id)],
            'current_password' => ['nullable', 'required_with:password', 'current_password'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return back()->with('success', 'Profil sikeresen frissítve!');
    }
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('login')->with('success', 'Felhasználó sikeresen törölve!');
    }
}
