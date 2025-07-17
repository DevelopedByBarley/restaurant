<?php

namespace App\Http\Controllers;

use App\Models\DayException;
use App\Models\Opening;
use App\Models\Reservation;
use App\Models\Table;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('pages/Home');
    }

}
