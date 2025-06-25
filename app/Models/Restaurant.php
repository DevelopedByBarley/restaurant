<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Restaurant extends Model
{
    /** @use HasFactory<\Database\Factories\RestaurantFactory> */
    use HasFactory;

    public function floors(): HasMany
    {
        return $this->hasMany(Floor::class);
    }

    public function openings(): HasMany
    {
        return $this->hasMany(Opening::class);
    }
    public function specials(): HasMany
    {
        return $this->hasMany(SpecialDay::class);
    }
}
