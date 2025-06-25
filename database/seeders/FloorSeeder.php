<?php

namespace Database\Seeders;

use App\Models\Floor;
use App\Models\Restaurant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FloorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $restaurant = Restaurant::factory()->create(); // csak 1 étterem

        Floor::factory(3)->create([
            'restaurant_id' => $restaurant->id, // ezt adjuk át mindháromnak
        ]);
    }
}
