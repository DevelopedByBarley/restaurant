<?php

use App\Models\Client;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Client::class)->constrained()->cascadeOnDelete();
            $table->string('type'); // pl. "basic", "premium", stb.
            $table->date('start_date');
            $table->date('end_date')->nullable(); // ha nincs lejárat, lehet null
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
