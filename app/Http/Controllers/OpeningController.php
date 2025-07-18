<?php

namespace App\Http\Controllers;

use App\Models\Opening;
use App\Http\Requests\StoreOpeningRequest;
use App\Http\Requests\UpdateOpeningRequest;
use Inertia\Inertia;

class OpeningController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('pages/admin/openings/Openings', [
            'openings' => Opening::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('pages/admin/openings/CreateOpening');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOpeningRequest $request)
    {
        $data = $request->validated();

        Opening::create($data);

        return redirect()->route('openings.index')->with('success', 'Nyitvatartás sikeresen hozzáadva.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Opening $opening)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Opening $opening)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOpeningRequest $request, Opening $opening)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Opening $opening)
    {
        //
    }
}
