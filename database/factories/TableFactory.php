<?php

namespace Database\Factories;

use App\Models\Floor;
use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Table>
 */
class TableFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected static ?string $password;

    public function definition(): array
    {
        return [
            'floor_id' => Floor::factory(),
            'restaurant_id' => Restaurant::factory(),
            'name' => 'Table ' . $this->faker->unique()->numberBetween(1, 100),
            'seats' => $this->faker->numberBetween(2, 10),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
