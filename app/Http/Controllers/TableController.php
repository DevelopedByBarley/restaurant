<?php

namespace App\Http\Controllers;

use App\Models\Table;
use App\Http\Requests\StoreTableRequest;
use App\Http\Requests\UpdateTableRequest;
use App\Models\Location;
use Inertia\Inertia;

class TableController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('pages/admin/tables/Index', [
            'tables' => Table::with('location')->get()->map(function ($table) {
                return [
                    'id' => $table->id,
                    'name' => $table->name,
                    'seats' => $table->seats,
                    'location_name' => $table->location->name ?? 'N/A',
                    'created_at' => $table->created_at->format('Y-m-d H:i'),
                    'updated_at' => $table->updated_at->format('Y-m-d H:i'),
                ];
            }),
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */

    public function create()
    {
        return Inertia::render('pages/admin/tables/Create', [
            'locations' => Location::all()->map(function ($location) {
                return [
                    'id' => $location->id,
                    'name' => $location->name,
                    'description' => $location->description,
                ];
            }),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTableRequest $request)
    {
        Table::create([
            'location_id' => $request->location_id,
            'name' => $request->name,
            'seats' => $request->seats,
            'pos_x' => 0,
            'pos_y' => 0,
            'width' => 60,
            'height' => 60,
        ]);

        return redirect()->route('tables.index')->with('success', 'Asztal sikeresen létrehozva.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Table $table)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Table $table)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTableRequest $request, Table $table)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Table $table)
    {
        //
    }
}
