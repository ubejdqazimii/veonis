<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->json('giveaways');
            $table->text('terms');
            $table->boolean('is_published')->default(false);
            $table->timestamps();
        });
        Schema::create('campaign_leads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campaign_id')->constrained()->restrictOnDelete();
            $table->string('campaign_title');
            $table->string('source_url');
            $table->string('first_name', 100);
            $table->string('last_name', 100);
            $table->string('zip_code', 20);
            $table->string('city', 100);
            $table->string('email');
            $table->string('mobile', 40);
            $table->unsignedSmallInteger('birth_year');
            $table->text('terms_snapshot');
            $table->text('consent_text');
            $table->timestamp('consented_at');
            $table->string('status')->default('new');
            $table->timestamps();
            $table->unique(['campaign_id', 'email']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('campaign_leads');
        Schema::dropIfExists('campaigns');
    }
};
