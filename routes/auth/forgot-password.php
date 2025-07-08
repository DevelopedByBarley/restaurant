<?php

use App\Http\Controllers\Auth\ResetPasswordController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Auth\Events\PasswordReset;

Route::middleware('guest')->group(function () {
    Route::get('/forgot-password', [ResetPasswordController::class, 'forgotPasswordForm'])
        ->name('password.request');

    Route::post('/forgot-password', [ResetPasswordController::class, 'sendResetLinkEmail'])
        ->name('password.email');

    Route::get('/reset-password/{token}', [ResetPasswordController::class, 'showResetForm'])
        ->name('password.reset');

    Route::post('/reset-password', [ResetPasswordController::class, 'reset'])
        ->name('password.update');
});

