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
        Schema::create('tooth_surfaces', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tooth_findings_id')->constrained('tooth_findings')->onDelete('restrict');
            $table->foreignId('surface_id')->constrained('surfaces')->onDelete('restrict');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tooth_surfaces');
    }
};
