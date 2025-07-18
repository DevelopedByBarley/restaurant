 $date = request('date', date('Y-m-d'));
        $start = $date . ' ' . request('start');
        $end = $date . ' ' . request('end');

        // Asztalok szűrt foglalásokkal
        $tables = Table::with(['reservations' => function ($query) use ($date, $start, $end) {
            if ($date && $start && $end) {
                $query->whereDate('reservation_start', $date)
                      ->where(function ($q) use ($start, $end) {
                          $q->where('reservation_start', '<', $end)
                            ->where('reservation_end', '>', $start);
                      });
            }
        }])->get();

        // Locations szűrt asztalokkal (itt is with-eljük a reservations-t!)
        $locations = Location::with([
            'tables.reservations' => function ($query) use ($date, $start, $end) {
                if ($date && $start && $end) {
                    $query->whereDate('reservation_start', $date)
                          ->where('reservation_start', '<', $end)
                          ->where('reservation_end', '>', $start);
                }
            },
            'blocks'
        ])->get();

        

        return Inertia::render('pages/admin/reservations/Reservations', [
            'tables' => $tables,
            'filters' => request()->all('search', 'trashed', 'date', 'start', 'end'),
            'locations' => $locations,
            'reservations' => Reservation::with(['table'])->paginate()
        ]);




