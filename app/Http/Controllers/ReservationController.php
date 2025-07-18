<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use App\Models\Location;
use App\Models\Table;
use Inertia\Inertia;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $date = request('date'); // pl. '2024-07-18'
        $start = $date . ' ' . request('start'); // pl. '2024-07-18 18:00'
        $end = $date . ' ' . request('end');     // pl. '2024-07-18 19:30'


        // Lekérjük az asztalokat, és minden asztalhoz csak az adott időintervallumra eső foglalásokat csatoljuk
        $tables = Table::with(['reservations' => function ($query) use ($date, $start, $end) {
            if ($date && $start && $end) {
                $query->whereDate('reservation_start', $date)
                      ->where(function ($q) use ($start, $end) {
                          $q->where(function ($sub) use ($start, $end) {
                              $sub->where('reservation_start', '<', $end)
                                  ->where('reservation_end', '>', $start);
                          });
                      });
            }
        }])->get();

        return Inertia::render('pages/admin/reservations/Index', [
            'tables' => $tables,
            'filters' => request()->all('search', 'trashed', 'date', 'start', 'end'),
            'locations' => Location::with(['tables', 'blocks'])->get(),
            // A reservations maradhat, ha külön listázni akarod
            'reservations' => Reservation::with(['table'])->paginate()
        ]);
    }

    public function getReservationsByDate($date)
    {
        $reservations = Reservation::whereDate('reservation_start', $date)->get();
        return $reservations;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReservationRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReservationRequest $request, Reservation $reservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        //
    }
}
