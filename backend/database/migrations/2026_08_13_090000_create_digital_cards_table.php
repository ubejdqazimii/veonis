<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('digital_cards', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('position')->nullable();
            $table->string('company')->default('Veonis GmbH');
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('street')->nullable();
            $table->string('zip_code', 24)->nullable();
            $table->string('city')->nullable();
            $table->string('country')->default('Schweiz');
            $table->string('photo')->nullable();
            $table->boolean('is_active')->default(true)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('digital_cards');
    }
};
