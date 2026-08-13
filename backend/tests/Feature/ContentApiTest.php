<?php

namespace Tests\Feature;

use App\Models\NavigationItem;
use App\Models\Page;
use App\Models\SiteSetting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContentApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_a_published_localized_page_in_frontend_shape(): void
    {
        Page::create([
            'key' => 'about-veonis',
            'locale' => 'de',
            'slug' => '/de/ueber-veonis',
            'name' => 'Über Veonis',
            'seo_title' => 'Über Veonis',
            'meta_description' => 'Description',
            'eyebrow' => 'Über Veonis',
            'title' => 'Beratung beginnt mit Vertrauen.',
            'description' => ['Paragraph'],
            'sections' => [[
                'type' => 'section',
                'data' => ['title' => 'Unser Team', 'paragraphs' => ['Team paragraph']],
            ]],
            'is_published' => true,
            'published_at' => now(),
        ]);

        $this->getJson('/api/v1/pages/de/about-veonis')
            ->assertOk()
            ->assertJsonPath('data.title', 'Beratung beginnt mit Vertrauen.')
            ->assertJsonPath('data.sections.0.title', 'Unser Team')
            ->assertJsonMissingPath('data.sections.0.type');
    }

    public function test_draft_pages_are_not_public(): void
    {
        Page::create([
            'key' => 'draft', 'locale' => 'en', 'slug' => '/en/draft', 'name' => 'Draft',
            'seo_title' => 'Draft', 'meta_description' => 'Draft', 'title' => 'Draft',
            'is_published' => false,
        ]);

        $this->getJson('/api/v1/pages/en/draft')->assertNotFound();
    }

    public function test_navigation_is_localized_ordered_and_only_published(): void
    {
        NavigationItem::create(['locale' => 'de', 'label' => 'Zwei', 'href' => '/zwei', 'group' => 'primary', 'sort_order' => 2, 'is_published' => true]);
        NavigationItem::create(['locale' => 'de', 'label' => 'Eins', 'href' => '/eins', 'group' => 'primary', 'sort_order' => 1, 'is_published' => true]);
        NavigationItem::create(['locale' => 'de', 'label' => 'Hidden', 'href' => '/hidden', 'group' => 'primary', 'sort_order' => 0, 'is_published' => false]);

        $this->getJson('/api/v1/navigation/de')
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.label', 'Eins');
    }

    public function test_it_returns_visible_contact_and_social_settings(): void
    {
        SiteSetting::create([
            'key' => 'global',
            'name' => 'Global website settings',
            'preheader_enabled' => true,
            'contact_items' => [
                ['type' => 'email', 'label' => 'Team email', 'href' => 'mailto:team@example.com', 'is_visible' => true],
                ['type' => 'phone', 'label' => 'Hidden phone', 'href' => 'tel:+41000000000', 'is_visible' => false],
            ],
            'social_links' => [
                ['label' => 'LinkedIn', 'short_label' => 'in', 'url' => 'https://linkedin.com/company/example', 'open_new_tab' => true, 'is_visible' => true],
            ],
            'office_street' => 'Im Dreispitz 39',
            'office_zip_code' => '8105',
            'office_city' => 'Regensdorf',
            'office_country' => 'Schweiz',
            'google_maps_url' => 'https://maps.google.com/?q=Veonis',
        ]);

        $this->getJson('/api/v1/site-settings')
            ->assertOk()
            ->assertJsonPath('data.preheaderEnabled', true)
            ->assertJsonCount(1, 'data.contactItems')
            ->assertJsonPath('data.contactItems.0.label', 'Team email')
            ->assertJsonCount(1, 'data.socialLinks')
            ->assertJsonPath('data.socialLinks.0.short_label', 'in')
            ->assertJsonPath('data.officeAddress.street', 'Im Dreispitz 39')
            ->assertJsonPath('data.officeAddress.city', 'Regensdorf')
            ->assertJsonPath('data.googleMapsUrl', 'https://maps.google.com/?q=Veonis');
    }
}
