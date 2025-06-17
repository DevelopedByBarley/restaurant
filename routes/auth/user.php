<?php

use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/register', [UserAuthController::class, 'registerForm'])->name('register');
Route::post('/register', [UserAuthController::class, 'register'])->name('register');
Route::get('/login', [UserAuthController::class, 'loginForm'])->name('login');
Route::post('/login', [UserAuthController::class, 'login']);
Route::post('/logout', [UserAuthController::class, 'logout']);

Route::get('/dashboard', [UserController::class, 'index'])->middleware(['auth:web'])->name('dashboard');

/*
Route::get('/admin', [UserAuthController::class, 'loginForm'])->name('admin.login');
Route::post('/admin/login', [UserAuthController::class, 'login']);
Route::post('/admin/logout', [UserAuthController::class, 'logout'])->name('admin.logout');
Route::get('/admin/dashboard', [AdminController::class, 'index'])->middleware(['auth:admin'])->name('admin.dashboard');
Route::resource('admin', AdminController::class)
->except(['index'])
->middleware(['auth:admin'])
->names('admin');


*/
