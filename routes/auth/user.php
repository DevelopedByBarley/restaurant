<?php

use App\Http\Controllers\Auth\UserAuthController;

use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\UserFileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Auth routes
Route::get('/register', [UserAuthController::class, 'registerForm'])->name('register');
Route::post('/register', [UserAuthController::class, 'register'])->name('register');
Route::get('/login', [UserAuthController::class, 'loginForm'])->name('login');
Route::post('/login', [UserAuthController::class, 'login']);
Route::post('/logout', [UserAuthController::class, 'logout']);


// Routes requiring authentication
Route::middleware(['auth:web'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('pages/user/Index');
    })->name('dashboard');


    Route::resource('user', UserController::class)
        ->only(['index', 'edit'])
        ->names('user');

    Route::patch('/user/{user}', [UserController::class, 'update'])
        ->can('update', 'user')
        ->name('user.update');

    Route::delete('/user/{user}', [UserController::class, 'destroy'])
        ->can('delete', 'user')
        ->name('user.destroy');

    Route::patch('/update-password/{user}', [UserAuthController::class, 'changePw'])
        ->can('changePassword', 'user')
        ->name('update-password');
});


Route::resource('file', UserFileController::class)
    ->only(['index', 'store', 'destroy'])
    ->middleware(['auth:web'])
    ->names('user-file');
