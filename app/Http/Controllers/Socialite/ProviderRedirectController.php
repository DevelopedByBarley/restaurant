<?php

namespace App\Http\Controllers\Socialite;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Laravel\Socialite\Facades\Socialite;

class ProviderRedirectController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(string $provider)
    {
        if (!in_array($provider, ['google', 'facebook'])) {
            return redirect()->route('login')->with('danger', 'Invalid Providers!');
        }
        try {
            sleep(3);
            return Socialite::driver($provider)->redirect();
        } catch (\Throwable $th) {
            return redirect()->route('login')->with('danger', 'Something went wrong!');
        }
    }
}
