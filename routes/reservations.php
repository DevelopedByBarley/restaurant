<?php

use App\Http\Controllers\PublicReservationController;
use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;


Route::resource('admin/reservations', ReservationController::class)->names('reservations');

Route::get('/admin/reservation/{date}', [ReservationController::class, 'getReservationsByDate'])->name('reservations.index');

Route::post('/reservations/fetch', [PublicReservationController::class, 'index'])->name('reservations.index');
Route::post('/reservations', [PublicReservationController::class, 'store'])->name('reservations.store');
