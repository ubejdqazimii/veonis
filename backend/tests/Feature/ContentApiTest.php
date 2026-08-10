<?php

namespace Tests\Feature;

use App\Models\NavigationItem;
use App\Models\Page;
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
}
