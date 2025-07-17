<?php

use App\Http\Controllers\LocaleController;
use App\Models\DayException;
use App\Models\Opening;
use App\Models\Reservation;
use App\Models\Table;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    $timestamps = [];
    $now = Carbon::now();
    $date = $now->toDateString();

    // 1. Kivétel nap ellenőrzése
    if (DayException::where('date', $date)->exists()) {
        return response()->json(['message' => 'This date is an exception day.'], 400);
    }

    $duration = 60; // perc
    $count_of_guests = 1;
    $dayOfWeek = strtolower($now->englishDayOfWeek);

    // 2. Nyitvatartás lekérése
    $opening = Opening::where('day_of_week', $dayOfWeek)->first();
    if (!$opening || $opening->is_closed) {
        return response()->json(['message' => 'No opening hours found for this day.'], 404);
    }

    $opens = Carbon::createFromFormat('H:i:s', $opening->opens_at);
    $closes = Carbon::createFromFormat('H:i:s', $opening->closes_at);

    // 3. Összes asztal lekérése
    $tables = Table::all()->where('seats', '>=', $count_of_guests);

    // 4. Időintervallumok generálása
    $slotStart = $opens->copy();
    while ($slotStart->copy()->addMinutes($duration)->lte($closes)) {   // addig megyünk, amíg a végpont nem lépi túl a zárást
        $slotEnd = $slotStart->copy()->addMinutes($duration); // végpont

        // 5. Ellenőrizd, hogy van-e legalább egy szabad asztal ebben az intervallumban
        $freeTable = $tables->first(function ($table) use ($date, $slotStart, $slotEnd) {  // minden asztalra ellenőrizzük
            $hasReservation = Reservation::where('table_id', $table->id)
                ->where('date', $date)
                ->where('status', '!=', 'cancelled')
                ->where(function ($query) use ($slotStart, $slotEnd) {
                    $query
                        ->where('reservation_start', '<', $slotEnd)
                        ->where('reservation_end', '>', $slotStart);
                })
                ->exists();
            return !$hasReservation;
        });

        dd($freeTable);

        if ($freeTable) {
            $timestamps[] = [
                'start' => $slotStart->format('H:i'),
                'end' => $slotEnd->format('H:i'),
            ];
        }

        $slotStart->addMinutes($duration);
    }



    return response()->json($timestamps);
});
Route::get('/locale/{lang}', [LocaleController::class, 'setLocale']);

require __DIR__ . '/home.php';
require __DIR__ . '/reservations.php';
require __DIR__ . '/locations.php';
require __DIR__ . '/tables.php';
require __DIR__ . '/blocks.php';
require __DIR__ . '/openings.php';
require __DIR__ . '/exceptions.php';


if (env('AUTH_ENABLED', false)) {
    require __DIR__ . '/auth/user.php';
    require __DIR__ . '/auth/socialite.php';
    require __DIR__ . '/auth/verify.php';
    require __DIR__ . '/auth/forgot-password.php';
}

if (env('ADMIN_AUTH_ENABLED', true)) {
    require __DIR__ . '/auth/admin.php';
}

if (env('PAYMENT', false)) {
    require __DIR__ . '/payment.php';
}
