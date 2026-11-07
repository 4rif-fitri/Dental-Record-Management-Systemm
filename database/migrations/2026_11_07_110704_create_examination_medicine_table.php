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
        Schema::create('examination_medicine', function (Blueprint $table) {
            $table->id();
            $table->foreignId('examination_id')->constrained('examination')->onDelete('restrict');
            $table->foreignId('medicine_id')->constrained('medicine')->onDelete('restrict');
            $table->string("dosage", 100);
            $table->string("frequency", 100);
            $table->string("duration", 100);
            $table->string("instructions", 255);
            $table->string("quantity", 20);
            $table->string("notes", 255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('examination_medicine');
    }
};
