<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDayExceptionRequest;
use App\Http\Requests\UpdateDayExceptionRequest;
use App\Models\DayException;
use Inertia\Inertia;

class DayExceptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('pages/admin/exceptions/Index', [
            'dayExceptions' => DayException::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('pages/admin/exceptions/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDayExceptionRequest $request)
    {
        DayException::create($request->validated());

        return redirect()->route('exceptions.index')->with('success', 'Day exception created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(DayException $dayException)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DayException $dayException)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDayExceptionRequest $request, DayException $dayException)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DayException $dayException)
    {
        //
    }
}
