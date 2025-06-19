<?php

use App\Http\Controllers\LocaleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('pages/Home');
});

Route::get('/locale/{lang}', [LocaleController::class, 'setLocale']);

if (env('AUTH_ENABLED', false)) {
    require __DIR__ . '/auth/user.php';
    require __DIR__ . '/auth/forgot-password.php';
}
if (env('ADMIN_AUTH_ENABLED', false)) {
    require __DIR__ . '/auth/admin.php';
}
