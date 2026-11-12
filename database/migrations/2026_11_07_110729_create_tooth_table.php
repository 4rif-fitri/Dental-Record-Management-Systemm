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
            $table->string('tooth_number', 2)->unique();
            $table->string('tooth_name', 100);
            $table->enum('jaw', ['upper', 'lower']);
            $table->unsignedTinyInteger('quadrant');
            $table->enum('tooth_type', ['permanent', 'primary']);
            $table->unsignedTinyInteger('number_of_surface');
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
