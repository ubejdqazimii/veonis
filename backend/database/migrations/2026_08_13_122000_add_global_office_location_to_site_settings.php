<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->string('office_street')->nullable()->after('social_links');
            $table->string('office_zip_code', 24)->nullable()->after('office_street');
            $table->string('office_city')->nullable()->after('office_zip_code');
            $table->string('office_country')->nullable()->after('office_city');
            $table->string('google_maps_url', 2048)->nullable()->after('office_country');
        });

        $card = DB::table('digital_cards')
            ->where(function ($query): void {
                $query->whereNotNull('street')
                    ->orWhereNotNull('city');
            })
            ->orderBy('id')
            ->first();

        if ($card) {
            DB::table('site_settings')->where('key', 'global')->update([
                'office_street' => $card->street,
                'office_zip_code' => $card->zip_code,
                'office_city' => $card->city,
                'office_country' => $card->country,
            ]);
        }
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn([
                'office_street',
                'office_zip_code',
                'office_city',
                'office_country',
                'google_maps_url',
            ]);
        });
    }
};
