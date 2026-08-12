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
        Schema::create('analytics_events', function (Blueprint $table) {
            $table->id();
            $table->string('event_type', 30)->default('page_view')->index();
            $table->uuid('session_id')->index();
            $table->string('visitor_hash', 64)->index();
            $table->string('path', 500)->index();
            $table->string('page_title')->nullable();
            $table->string('locale', 5)->nullable()->index();
            $table->string('referrer_host')->nullable()->index();
            $table->string('source')->nullable()->index();
            $table->string('medium')->nullable();
            $table->string('campaign')->nullable();
            $table->string('country', 2)->nullable()->index();
            $table->string('region')->nullable();
            $table->string('city')->nullable();
            $table->string('browser')->nullable()->index();
            $table->string('operating_system')->nullable()->index();
            $table->string('device_type', 20)->nullable()->index();
            $table->unsignedSmallInteger('screen_width')->nullable();
            $table->unsignedSmallInteger('screen_height')->nullable();
            $table->unsignedInteger('engagement_seconds')->default(0);
            $table->timestamps();

            $table->index(['event_type', 'created_at']);
            $table->index(['path', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('analytics_events');
    }
};
