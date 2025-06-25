<?php

namespace Database\Factories;

use App\Models\Opening;
use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Opening>
 */
class OpeningFactory extends Factory
{
    protected $model = Opening::class;

    public function definition(): array
    {
        $date = $this->faker->dateTimeBetween('-1 month', '+1 month'); // véletlenszerű dátum az elmúlt és a következő hónap között
        $dayName = $date->format('l'); // angol napnév, pl. Monday

        return [
            'restaurant_id' => Restaurant::factory(),
            'date' => $date->format('Y-m-d'),
            'day' => $dayName,
            'open_time' => $this->faker->time('H:i:s', '10:00'),  // például 10:00 vagy későbbi nyitás
            'close_time' => $this->faker->time('H:i:s', '22:00'), // például 22:00 vagy későbbi zárás
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
