<?php

use App\Http\Controllers\Socialite\ProviderCallbackController;
use App\Http\Controllers\Socialite\ProviderRedirectController;
use Illuminate\Support\Facades\Route;

// Socialite
Route::get('/auth/{provider}/callback', ProviderCallbackController::class)->name('auth.callback');
Route::get('/auth/{provider}/redirect', ProviderRedirectController::class)->name('auth.redirect');
