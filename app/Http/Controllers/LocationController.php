<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Http\Requests\StoreLocationRequest;
use App\Http\Requests\UpdateLocationRequest;
use Inertia\Inertia;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('pages/admin/locations/Index', [
            'locations' => Location::all()->map(function ($location) {
                return [
                    'id' => $location->id,
                    'name' => $location->name,
                    'description' => $location->description,
                    'created_at' => $location->created_at->toDateTimeString(),
                    'updated_at' => $location->updated_at->toDateTimeString(),
                ];
            }),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('pages/admin/locations/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLocationRequest $request)
    {
        Location::create($request->validated());

        return redirect()->route('locations.index')->with('success', 'Helyszín sikeresen létrehozva.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Location $location)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Location $location)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLocationRequest $request, Location $location)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Location $location)
    {
        //
    }
}
