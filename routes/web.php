<?php

use App\Http\Controllers\LocaleController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('pages/Home');
});

Route::get('/test', function () {
    return Inertia::render('pages/Test');
});
Route::get('/locale/{lang}', [LocaleController::class, 'setLocale']);

require __DIR__ . '/reservations.php';
require __DIR__ . '/locations.php';


if (env('AUTH_ENABLED', false)) {
    require __DIR__ . '/auth/user.php';
    require __DIR__ . '/auth/socialite.php';
    require __DIR__ . '/auth/verify.php';
    require __DIR__ . '/auth/forgot-password.php';
}

if (env('ADMIN_AUTH_ENABLED', false)) {
    require __DIR__ . '/auth/admin.php';
}

if (env('PAYMENT', false)) {
    require __DIR__ . '/payment.php';
}
