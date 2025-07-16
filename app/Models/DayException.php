<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DayException extends Model
{
    /** @use HasFactory<\Database\Factories\DayExceptionFactory> */
    use HasFactory;

    protected $fillable = [
        'date',
        'reason',
    ];
}
