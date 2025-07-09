<?php

use App\Http\Controllers\LocationController;
use Illuminate\Support\Facades\Route;


Route::resource('admin/locations', LocationController::class)->names('locations')->middleware(['auth:admin']);
