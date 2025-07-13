<?php

use App\Http\Controllers\BlockController;
use Illuminate\Support\Facades\Route;

Route::post('/admin/blocks/{block}/save', [BlockController::class, 'save'])
    ->name('blocks.update')
    ->middleware(['auth:admin']);
Route::post('/admin/blocks', [BlockController::class, 'store'])
    ->name('blocks.store')
    ->middleware(['auth:admin']);
