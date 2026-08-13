<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\NavigationItem;
use App\Models\Page;
use App\Models\SiteSetting;
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

        SiteSetting::query()->firstOrCreate(
            ['key' => 'global'],
            [
                'name' => 'Global website settings',
                'preheader_enabled' => true,
                'contact_items' => [
                    [
                        'type' => 'email',
                        'label' => 'info@veonissuisse.ch',
                        'href' => 'mailto:info@veonissuisse.ch',
                        'is_visible' => true,
                    ],
                    [
                        'type' => 'phone',
                        'label' => '+41 79 812 81 88',
                        'href' => 'tel:+41798128188',
                        'is_visible' => false,
                    ],
                ],
                'social_links' => [
                    ['label' => 'LinkedIn', 'short_label' => 'in', 'url' => 'https://www.linkedin.com/', 'open_new_tab' => true, 'is_visible' => false],
                    ['label' => 'Instagram', 'short_label' => 'ig', 'url' => 'https://www.instagram.com/', 'open_new_tab' => true, 'is_visible' => false],
                    ['label' => 'Facebook', 'short_label' => 'fb', 'url' => 'https://www.facebook.com/', 'open_new_tab' => true, 'is_visible' => false],
                    ['label' => 'YouTube', 'short_label' => 'yt', 'url' => 'https://www.youtube.com/', 'open_new_tab' => true, 'is_visible' => false],
                    ['label' => 'TikTok', 'short_label' => 'tt', 'url' => 'https://www.tiktok.com/', 'open_new_tab' => true, 'is_visible' => false],
                ],
                'office_street' => 'Im Dreispitz 39',
                'office_zip_code' => '8105',
                'office_city' => 'Regensdorf',
                'office_country' => 'Schweiz',
                'google_maps_url' => null,
            ],
        );
    }
}
