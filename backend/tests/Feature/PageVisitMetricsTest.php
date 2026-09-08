<?php

namespace Tests\Feature;

use App\Filament\Resources\Campaigns\Pages\CreateCampaign;
use App\Models\AnalyticsEvent;
use App\Models\Campaign;
use App\Models\DigitalCard;
use App\Models\User;
use App\Support\PageVisitMetrics;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Livewire\Livewire;
use Tests\TestCase;

class PageVisitMetricsTest extends TestCase
{
    use RefreshDatabase;

    public function test_counts_are_scoped_to_each_url_and_only_page_views(): void
    {
        $campaign = Campaign::create(['slug' => 'spring', 'title' => 'Spring', 'description' => 'Description', 'giveaways' => [['title' => 'Gift', 'description' => 'Details']], 'terms' => 'Terms', 'is_published' => true]);
        $card = DigitalCard::create(['slug' => 'anna', 'first_name' => 'Anna', 'last_name' => 'Test', 'is_active' => true]);
        $session = (string) Str::uuid();
        foreach ([['/campaign/spring', $session, 'page_view'], ['/campaign/spring', $session, 'page_view'], ['/campaign/spring', (string) Str::uuid(), 'page_view'], ['/campaign/spring', $session, 'heartbeat'], ['/campaign/spring-other', $session, 'page_view'], ['/team/anna', $session, 'page_view'], ['/team/anna/contact', $session, 'page_view']] as [$path,$id,$type]) {
            AnalyticsEvent::create(['path' => $path, 'session_id' => $id, 'event_type' => $type, 'visitor_hash' => 'test']);
        }
        $metrics = PageVisitMetrics::apply(Campaign::query(), '/campaign/')->findOrFail($campaign->id);
        $this->assertSame(3, (int) $metrics->visits_count);
        $this->assertSame(2, (int) $metrics->visitors_count);
        $metrics = PageVisitMetrics::apply(DigitalCard::query(), '/team/')->findOrFail($card->id);
        $this->assertSame(1, (int) $metrics->visits_count);
        $this->assertSame(1, (int) $metrics->visitors_count);
        $this->getJson('/api/v1/campaigns/spring')->assertOk()->assertJsonMissingPath('visits_count')->assertJsonMissingPath('visitors_count');
        $this->getJson('/api/v1/digital-cards/anna')->assertOk()->assertJsonMissingPath('data.visits_count')->assertJsonMissingPath('data.visitors_count');
        $fresh = Campaign::create(['slug' => 'new', 'title' => 'New', 'description' => 'Description', 'giveaways' => [], 'terms' => 'Terms']);
        $this->assertSame(0, (int) PageVisitMetrics::apply(Campaign::query(), '/campaign/')->findOrFail($fresh->id)->visits_count);
    }

    public function test_campaign_can_be_created_without_giveaway_pictures(): void
    {
        $this->actingAs(User::factory()->create());
        Livewire::test(CreateCampaign::class)
            ->fillForm(['title' => 'No picture', 'slug' => 'no-picture', 'description' => 'Description', 'giveaways' => [['title' => 'Gift', 'description' => 'Details']], 'terms' => 'Terms', 'is_published' => false])
            ->call('create')->assertHasNoFormErrors();
        $this->assertDatabaseHas('campaigns', ['slug' => 'no-picture']);
    }

    public function test_direct_and_legacy_campaign_visitors_are_combined(): void
    {
        $campaign = Campaign::create(['slug'=>'promo','title'=>'Promo','description'=>'Text','giveaways'=>[],'terms'=>'Terms']);
        $session = (string) Str::uuid();
        foreach (['/promo','/campaign/promo'] as $path) {
            AnalyticsEvent::create(['path'=>$path,'session_id'=>$session,'event_type'=>'page_view','visitor_hash'=>'test']);
        }
        $record = PageVisitMetrics::apply(Campaign::query(), '/', '/campaign/')->findOrFail($campaign->id);
        $this->assertSame(2, (int) $record->visits_count);
        $this->assertSame(1, (int) $record->visitors_count);
    }

    public function test_reserved_campaign_url_is_rejected(): void
    {
        $this->actingAs(\App\Models\User::factory()->create());
        \Livewire\Livewire::test(\App\Filament\Resources\Campaigns\Pages\CreateCampaign::class)
            ->fillForm(['title'=>'Conflict','slug'=>'de','description'=>'Text','giveaways'=>[['title'=>'Gift','description'=>'Text']],'terms'=>'Terms'])
            ->call('create')->assertHasFormErrors(['slug']);
        $this->assertDatabaseMissing('campaigns', ['slug'=>'de']);
    }
}
