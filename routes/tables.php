<?php

use App\Http\Controllers\TableController;
use Illuminate\Support\Facades\Route;


Route::resource('admin/tables', TableController::class)->except(['create'])->names('tables')->middleware('auth:admin');
Route::post('/admin/tables/{table}/save', [TableController::class, 'save'])->name('tables.save')->middleware('auth:admin');
