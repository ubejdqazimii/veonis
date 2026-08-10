<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\NavigationItem;
use App\Models\Page;
use Illuminate\Database\Seeder;

class WebsiteContentSeeder extends Seeder
{
    public function run(): void
    {
        $payload = json_decode(
            file_get_contents(database_path('data/website-content.json')),
            true,
            flags: JSON_THROW_ON_ERROR,
        );

        foreach ($payload['pages'] as $page) {
            Page::query()->updateOrCreate(
                ['key' => $page['key'], 'locale' => $page['locale']],
                $page + ['published_at' => now()],
            );
        }

        foreach ($payload['posts'] as $post) {
            BlogPost::query()->updateOrCreate(
                ['slug' => $post['slug'], 'locale' => $post['locale']],
                $post + ['published_at' => now()],
            );
        }

        foreach ($payload['navigation'] as $item) {
            NavigationItem::query()->updateOrCreate(
                ['locale' => $item['locale'], 'href' => $item['href'], 'group' => $item['group']],
                $item,
            );
        }
    }
}
