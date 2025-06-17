<?php

namespace App\Http\Controllers\Socialite;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class ProviderCallbackController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(string $provider)
    {

        if (!in_array($provider, ['google', 'facebook'])) {
            return redirect()->route('login')->with('danger', 'Invalid provider!');
        }

        $social_user = Socialite::driver($provider)->user();

        $user = User::updateOrCreate([
            'provider_id' => $social_user->id,
            'provider_name' => $social_user->provider,
        ], [
            'name' => $social_user->name,
            'email' => $social_user->email,
            'provider_token' => $social_user->token,
            'provider_refresh_token' => $social_user->refreshToken,
        ]);

        Auth::login($user);

        return redirect('/dashboard');
    }
}
