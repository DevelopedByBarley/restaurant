<?php

namespace Database\Seeders;

use App\Models\Opening;
use Database\Factories\OpeningFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OpeningSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       Opening::factory()->create();
    }
}
