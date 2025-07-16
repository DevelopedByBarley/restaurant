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
        Schema::create('day_exceptions', function (Blueprint $table) {
            $table->id();
            $table->date('date')->comment('The date of the exception');
            $table->text('reason')->nullable()->comment('Reason for the exception');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('day_exceptions');
    }
};
