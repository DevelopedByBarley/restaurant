<?php

use App\Http\Controllers\LocaleController;
use App\Models\Client;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('pages/Home');
});

Route::get('/locale/{lang}', [LocaleController::class, 'setLocale']);

Route::get('/test', function () {
    $client = Client::with(['restaurants.openings', 'restaurants.floors.tables'])->find(1);
    return response()->json([
        'client' => $client
    ]);
});

if (env('AUTH_ENABLED', false)) {
    require __DIR__ . '/auth/user.php';
    require __DIR__ . '/auth/forgot-password.php';
}
if (env('ADMIN_AUTH_ENABLED', false)) {
    require __DIR__ . '/auth/admin.php';
}
