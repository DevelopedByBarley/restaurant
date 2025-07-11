<?php

use App\Http\Controllers\TableController;
use Illuminate\Support\Facades\Route;


Route::resource('admin/tables', TableController::class)->except(['create'])->names('tables');
