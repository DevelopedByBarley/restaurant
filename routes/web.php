<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('pages/Home');
});

if (env('AUTH_ENABLED', false)) {
    require __DIR__ . '/auth/user.php';
}
require __DIR__ . '/auth/admin.php';
