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
        Schema::create('tooth', function (Blueprint $table) {
            $table->id();
            $table->integer('tooth_number')->unique();
            $table->string('tooth_name', 100);
            $table->string('tooth_type', 100);
            $table->string('jaw', 100);
            $table->string('quadrant', 100);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tooth');
    }
};
