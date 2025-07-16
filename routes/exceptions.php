<?php

use App\Http\Controllers\DayExceptionController;
use Illuminate\Support\Facades\Route;

Route::resource('admin/exceptions', DayExceptionController::class)->middleware('auth:admin')->names('exceptions');
