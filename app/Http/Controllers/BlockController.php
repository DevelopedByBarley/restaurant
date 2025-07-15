<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBlockRequest;
use App\Http\Requests\UpdateBlockRequest;
use App\Models\Block;
use Illuminate\Http\Request;

class BlockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreBlockRequest $request)
    {
        
        Block::create([
            'location_id' => $request->location_id,
            'name' => $request->name,
            'pos_x' => 0,
            'pos_y' => 0,
            'width' => 60,
            'height' => 60,
        ]);

        return redirect()->route('tables.index')->with('success', 'Blokk sikeresen létrehozva.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Block $block)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Block $block)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBlockRequest $request, Block $block)
    {

        $block->update([
            'name' => $request->name,
            'seats' => $request->seats,
            'color' => $request->color ?? 'bg-slate-600',
            'pos_x' => $request->pos_x,
            'pos_y' => $request->pos_y,
            'width' => $request->width,
            'height' => $request->height,
        ]);

        return redirect()->route('tables.index')->with('success', 'Blokk sikeresen frissítve.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Block $block)
    {
        //
    }

    public function save(Request $request, Block $block)
    {
        $block->update([
            'pos_x' => $request->pos_x ?? 0,
            'pos_y' => $request->pos_y ?? 0,
            'width' => $request->width ?? 60,
            'height' => $request->height ?? 60,
        ]);

        return redirect()->route('tables.index')->with('success', 'Blokk sikeresen frissítve.');
    }
}
