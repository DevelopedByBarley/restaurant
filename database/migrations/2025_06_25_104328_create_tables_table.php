<?php

use App\Models\Floor;
use App\Models\Restaurant;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tables', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Floor::class)->constrained('floors')->onDelete('cascade');
            $table->foreignIdFor(Restaurant::class)->constrained('restaurants')->onDelete('cascade');
            $table->string('name'); // pl. "Asztal 1", "Terasz 5"
            $table->integer('seats')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tables');
    }
};
