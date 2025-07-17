<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DayException;
use App\Models\Opening;
use App\Models\Reservation;
use App\Models\Table;
use Carbon\Carbon;
use Inertia\Inertia;

class PublicReservationController extends Controller
{
    public function index(Request $request)
    {

        $date = $request->input('date');
        $count_of_guests = (int)$request->input('guest_count');
        $duration = (int)$request->input('duration');


        return self::freeTimeSlots($date, $count_of_guests, $duration);
    }



    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'guest_count' => 'required|integer|min:1',
            'guest_name' => 'required|string|max:255',
            'guest_phone' => 'nullable|string|max:20',
            'guest_email' => 'nullable|email|max:255',
            'reservation_start' => 'required|date_format:H:i',
            'reservation_end' => 'required|date_format:H:i',
            'duration' => 'required|integer|min:1',
            'notes' => 'nullable|string|max:500',

        ]);
        $data = $request->only([
            'date',
            'guest_count',
            'guest_name',
            'guest_phone',
            'guest_email',
            'reservation_start',
            'reservation_end',
            'notes',
        ]);
        $data['duration'] = sprintf('%02d:%02d:00', intdiv($request->input('duration', 60), 60), $request->input('duration', 60) % 60);
        $data['reservation_start'] = Carbon::parse($data['date'] . ' ' . $data['reservation_start']);
        $data['reservation_end'] = Carbon::parse($data['date'] . ' ' . $data['reservation_end']);
        $data['status'] = 'pending'; // default status

        Reservation::create($data);
        return redirect()->route('home.index')->with('success', 'Foglalás sikeresen létrehozva!');
    }

    private function freeTimeSlots($date, $count_of_guests, $duration)
    {
        // This method can be used to calculate and return free time slots for reservations
        // You can implement the logic similar to the one in the test route
        // For example, checking opening hours, exceptions, and available tables
        // This is just a placeholder for demonstration purposes
        $timestamps = [];

        // 1. Kivétel nap ellenőrzése
        if (DayException::where('date', $date)->exists()) {
            return response()->json(['message' => 'Ezen a napon éttermünk zárva tart.'], 400);
        }

        $dayOfWeek = strtolower(Carbon::parse($date)->englishDayOfWeek);

        // 2. Nyitvatartás lekérése
        $opening = Opening::where('day_of_week', $dayOfWeek)->first();
        if (!$opening || $opening->is_closed) {
            return response()->json(['message' => 'Nincs nyitvatartási idő erre a napra!'], 404);
        }

        $opens = Carbon::createFromFormat('H:i:s', $opening->opens_at)->setDateFrom(Carbon::parse($date));
        $closes = Carbon::createFromFormat('H:i:s', $opening->closes_at)->setDateFrom(Carbon::parse($date));


        // 3. Összes asztal lekérése
        $tables = Table::where('seats', '>=', $count_of_guests)->with('reservations')->get();

        // 4. Időintervallumok generálása
        $slotStart = $opens->copy(); // kezdő időpont
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
