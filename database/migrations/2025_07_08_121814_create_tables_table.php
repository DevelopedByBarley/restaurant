<?php

use App\Models\Location;
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
            $table->foreignIdFor(Location::class)->constrained()->onDelete('cascade');
            $table->string('name');
            $table->integer('seats')->default(4);
            $table->integer('pos_x'); // pixel érték
            $table->integer('pos_y');
            $table->integer('width')->default(60);
            $table->integer('height')->default(60);
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
