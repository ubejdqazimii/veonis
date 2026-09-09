<?php

namespace Tests\Feature;

use App\Models\Page;
use Database\Seeders\HomepageContentSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HomepageContentTest extends TestCase
{
    use RefreshDatabase;

    public function test_homepage_content_is_localized_and_edits_survive_reseeding(): void
    {
        $this->seed(HomepageContentSeeder::class);
        $de = Page::where('key', 'home-v2')->where('locale', 'de')->firstOrFail();
        $en = Page::where('key', 'home-v2')->where('locale', 'en')->firstOrFail();
        $content = $de->homepage_content;
        $source = $content['services'][0]['source'];
        $content['services'][0]['text'] = 'Individuelle Absicherung';
        $de->update(['homepage_content' => $content, 'title' => 'Edited hero', 'homepage_images' => ['hero' => 'pages/homepage/example.jpg']]);
        $this->seed(HomepageContentSeeder::class);
        $this->assertSame('Edited hero', $de->fresh()->title);
        $this->assertSame($en->homepage_content, $en->fresh()->homepage_content);
        $this->getJson('/api/v1/pages/de/home-v2')->assertOk()
            ->assertJsonPath('data.homepageContent.services.0.source', $source)
            ->assertJsonPath('data.homepageContent.services.0.text', 'Individuelle Absicherung')
            ->assertJsonPath('data.homepageImages.hero', url('/storage/pages/homepage/example.jpg'));
        $this->getJson('/api/v1/pages/en/home-v2')->assertOk()
            ->assertJsonPath('data.homepageContent.services.0.text', 'Protect');
    }
    public function test_administrator_can_edit_homepage_text_from_the_page_editor(): void
    {
        $this->seed(HomepageContentSeeder::class);
        $this->actingAs(\App\Models\User::factory()->create());
        \Filament\Facades\Filament::setCurrentPanel(\Filament\Facades\Filament::getPanel('admin'));
        $page = Page::where('key', 'home-v2')->where('locale', 'en')->firstOrFail();
        $this->get('/admin/pages/'.$page->id.'/edit')->assertOk()->assertSee('Interactive service explorer');
        $component = \Livewire\Livewire::test(\App\Filament\Resources\Pages\Pages\EditPage::class, ['record' => $page->id]);
        $state = $component->get('data');
        $key = array_key_first($state['homepage_content']['services']);
        $component->set('data.homepage_content.services.'.$key.'.text', 'Protection for your family')
            ->call('save')->assertHasNoErrors();
        $this->assertSame('Protection for your family', $page->fresh()->homepage_content['services'][0]['text']);
    }

}
