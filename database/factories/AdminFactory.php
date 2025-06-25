<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin>
 */
class AdminFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'restaurant_id' => 1,
            'name' => 'Szaniszló Árpád',
            'email' => 'arpadsz@max.hu',
            'level' => 3,
            'password' => bcrypt('Csak1enter@@admin'), // vagy használj valami biztonságosat
            'remember_token' => 'asdasddsadasdsadasddasda',
        ];
    }
}
