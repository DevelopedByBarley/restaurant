<?php

namespace App\Http\Controllers;

use App\Models\DayException;
use App\Models\Opening;
use App\Models\Reservation;
use App\Models\Table;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('pages/Home', [
            'slots' => $this->freeTimeSlots(),
        ]);
    }

    private function freeTimeSlots()
    {
        // This method can be used to calculate and return free time slots for reservations
        // You can implement the logic similar to the one in the test route
        // For example, checking opening hours, exceptions, and available tables
        // This is just a placeholder for demonstration purposes
        $timestamps = [];
        $now = Carbon::now();
        $date = $now->toDateString();

        // 1. Kivétel nap ellenőrzése
        if (DayException::where('date', $date)->exists()) {
            return response()->json(['message' => 'This date is an exception day.'], 400);
        }

        $duration = 30; // perc
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
        $slotStart = $opens->copy(); // kezdő időpont
        while ($slotStart->copy()->addMinutes($duration)->lte($closes)) {   // addig megyünk, amíg a végpont nem lépi túl a zárást
            $slotEnd = $slotStart->copy()->addMinutes($duration); // végpont

            // 5. Ellenőrizd, hogy van-e legalább egy szabad asztal ebben az intervallumban
            $freeTable = $tables->first(function ($table) use ($date, $slotStart, $slotEnd) {  // minden asztalra ellenőrizzük
                // Ellenőrizzük, hogy van-e foglalás az adott asztalra
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

            if ($freeTable) {
                $timestamps[] = [
                    'start' => $slotStart->format('H:i'),
                    'end' => $slotEnd->format('H:i'),
                ];
            }

            $slotStart->addMinutes($duration);
        }




        return $timestamps;
    }
}
