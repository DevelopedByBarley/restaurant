<?php

namespace App\Http\Controllers;

use App\Models\Table;
use App\Http\Requests\StoreTableRequest;
use App\Http\Requests\UpdateTableRequest;
use App\Models\Block;
use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TableController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('pages/admin/tables/Tables', [
            'locations' => Location::with('tables', 'blocks')->get(),
            'tables' => Table::with('location')->get(),
            'blocks' => Block::with('location')->get(), // Assuming blocks are tables without a location
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */

    public function create()
    {
        return Inertia::render('pages/admin/tables/CreateTable', [
            'locations' => Location::with('tables')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTableRequest $request)
    {
        $validated = $request->validated();
        $size = $this->generateSizeOfTable($validated['seats']);

        Table::create([
            'location_id' => $validated['location_id'],
            'name' => $validated['name'],
            'seats' => $validated['seats'],
            'pos_x' => $validated['pos_x'] ?? 0,
            'pos_y' => $validated['pos_y'] ?? 0,
            'width' => $size['width'],
            'height' => $size['height'],
            'color' => $validated['color'] ?? 'bg-teal-400',
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
        $table->update([
            'location_id' => $request->location_id,
            'name' => $request->name,
            'seats' => $request->seats,
            'color' => $request->color,
            'pos_x' => $request->pos_x ?? 0,
            'pos_y' => $request->pos_y ?? 0,
            'width' => $request->width ?? 60,
            'height' => $request->height ?? 60,
        ]);

        return redirect()->route('tables.index')->with('success', 'Asztal sikeresen frissítve.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Table $table)
    {
        //
        $table->delete();
        return redirect()->route('tables.index')->with('success', 'Asztal sikeresen törölve.');
    }

    public function save(Request $request, Table $table)
    {
        $table->update([
            'width' => $request->width,
            'height' => $request->height,
            'pos_x' => $request->pos_x,
            'pos_y' => $request->pos_y,
        ]);

        return redirect()->route('tables.index')->with('success', 'Asztal mérete sikeresen frissítve.');
    }

    private function generateSizeOfTable($seats)
    {
        $width = 60;
        $height = 60;

        switch ($seats) {
            case $seats <= 2:
                return [
                    'width' => $width,
                    'height' => $height,
                ];
            case $seats <= 4:
                return [
                    'width' => $width * 1.5,
                    'height' => $height * 1.5,
                ];
            case $seats <= 6:
                return [
                    'width' => $width * 2,
                    'height' => $height * 2,
                ];
            case $seats <= 8:
                return [
                    'width' => $width * 2.5,
                    'height' => $height * 2.5,
                ];
            default:
                return [
                    'width' => $width,
                    'height' => $height,
                ];
        }
    }
}
