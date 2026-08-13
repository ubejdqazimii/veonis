<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $settings = DB::table('site_settings')->where('key', 'global')->first();

        if (! $settings) {
            return;
        }

        $links = collect(json_decode($settings->social_links ?? '[]', true) ?: []);

        foreach ([
            ['label' => 'YouTube', 'short_label' => 'yt', 'url' => 'https://www.youtube.com/', 'open_new_tab' => true, 'is_visible' => true],
            ['label' => 'TikTok', 'short_label' => 'tt', 'url' => 'https://www.tiktok.com/', 'open_new_tab' => true, 'is_visible' => true],
        ] as $channel) {
            if (! $links->contains(fn (array $link): bool => strcasecmp($link['label'] ?? '', $channel['label']) === 0)) {
                $links->push($channel);
            }
        }

        DB::table('site_settings')->where('key', 'global')->update([
            'social_links' => json_encode($links->values()->all(), JSON_UNESCAPED_SLASHES),
            'updated_at' => now(),
        ]);
    }

    public function down(): void
    {
        $settings = DB::table('site_settings')->where('key', 'global')->first();

        if (! $settings) {
            return;
        }

        $links = collect(json_decode($settings->social_links ?? '[]', true) ?: [])
            ->reject(fn (array $link): bool => in_array(strtolower($link['label'] ?? ''), ['youtube', 'tiktok'], true));

        DB::table('site_settings')->where('key', 'global')->update([
            'social_links' => json_encode($links->values()->all(), JSON_UNESCAPED_SLASHES),
            'updated_at' => now(),
        ]);
    }
};
