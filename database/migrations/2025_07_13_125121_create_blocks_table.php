<?php

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
        Schema::create('blocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('location_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('type')->default('block');
            $table->integer('pos_x')->default(null)->nullable(); // pixel érték
            $table->integer('pos_y')->default(null)->nullable();
            $table->integer('width')->default(60);
            $table->integer('height')->default(60);
            $table->string('color')->default('bg-slate-600');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blocks');
    }
};
