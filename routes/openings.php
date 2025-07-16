
<?php

use App\Http\Controllers\OpeningController;
use Illuminate\Support\Facades\Route;

Route::resource('admin/openings', OpeningController::class)
    ->middleware(['auth:admin']);
?>
