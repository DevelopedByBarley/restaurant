<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    /** @use HasFactory<\Database\Factories\TableFactory> */
    use HasFactory;

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
