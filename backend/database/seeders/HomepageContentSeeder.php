<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class HomepageContentSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = json_decode(file_get_contents(database_path('data/homepage-content.json')), true, flags: JSON_THROW_ON_ERROR);
        $original = json_decode(file_get_contents(database_path('data/website-content.json')), true, flags: JSON_THROW_ON_ERROR);

        foreach (['de', 'en'] as $locale) {
            $fallback = collect($original['pages'])->first(fn ($page) => $page['key'] === 'home-v2' && $page['locale'] === $locale);
            $page = Page::firstOrCreate(['key' => 'home-v2', 'locale' => $locale], $fallback + ['published_at' => now()]);
            $content = $page->homepage_content ?? [];
            foreach ($defaults[$locale] as $group => $entries) {
                $existing = collect($content[$group] ?? [])->keyBy('source');
                $content[$group] = collect($entries)->map(fn ($entry) => $existing->get($entry['source'], $entry))->all();
            }
            $page->update([
                'name' => $locale === 'de' ? 'Main homepage · Deutsch (/de)' : 'Main homepage · English (/en)',
                'homepage_content' => $content,
            ]);
        }
    }
}
