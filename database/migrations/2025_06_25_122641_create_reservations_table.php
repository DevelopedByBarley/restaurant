<?php

use App\Models\Restaurant;
use App\Models\Table;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Restaurant::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Table::class)->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->date('date');
            $table->time('start');
            $table->time('end');
            $table->integer('guest_count')->default(1);
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
