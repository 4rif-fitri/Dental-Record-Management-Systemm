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
        Schema::create('tooth_findings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('examination_id')->constrained('examination')->onDelete('restrict');
            $table->foreignId('tooth_id')->constrained('tooth')->onDelete('restrict');
            $table->foreignId('condition_id')->constrained('condition')->onDelete('restrict');
            $table->foreignId('procedure_id')->constrained('procedure')->onDelete('restrict');
            $table->string('finding_description', 255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tooth_findings');
    }
};
