<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('procedure', function (Blueprint $table) {
            $table->id();
            $table->string('procedure_code', 20)->unique();
            $table->string('procedure_name', 150);
            $table->string('procedure_description', 255)->nullable();
            $table->string('procedure_type', 100);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('procedure');
    }
};
