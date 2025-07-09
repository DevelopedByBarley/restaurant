<?php

use App\Models\Table;
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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();

            $table->foreignIdFor(Table::class)->constrained()->onDelete('cascade'); // melyik asztalhoz
            $table->string('guest_name');   // vendég neve
            $table->string('guest_phone')->nullable(); // telefon (opcionális)
            $table->string('guest_email')->nullable(); // email (opcionális)

            $table->dateTime('reservation_start'); // foglalás kezdete
            $table->dateTime('reservation_end');   // foglalás vége

            $table->integer('guest_count')->default(1); // létszám

            $table->text('notes')->nullable(); // egyéb megjegyzés

            $table->enum('status', ['pending', 'confirmed', 'cancelled', 'completed'])->default('pending');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
