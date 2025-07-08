<?php

namespace App\Http\Controllers\Socialite;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class ProviderCallbackController extends Controller
{
    public function __invoke(string $provider)
    {
        if (!in_array($provider, ['google', 'facebook'])) {
            return redirect()->route('login')->with('danger', 'Invalid provider!');
        }
        $social_user = Socialite::driver($provider)->user();

        $user = User::where('email', $social_user->email)->first();

        if ($user) {
            // Frissítjük a social mezőket
            $user->update([
                'provider' => $provider,
                'provider_name' => $provider,
                'provider_id' => $social_user->id,
                'provider_token' => $social_user->token,
                'provider_refresh_token' => $social_user->refreshToken ?? null,
            ]);
        } else {
            // Új user létrehozása
            $user = User::create([
                'name' => $social_user->name,
                'email' => $social_user->email,
                'provider' => $provider,
                'provider_name' => $provider,
                'provider_id' => $social_user->id,
                'provider_token' => $social_user->token,
                'provider_refresh_token' => $social_user->refreshToken ?? null,
                'password' => bcrypt(Str::random(16)), // ha kötelező
            ]);
        }



        Auth::login($user);

            return redirect()->route('dashboard')->with('success', 'Sikeres bejelentkezés!');
    }
}
