<?php

namespace Tests\Feature;

use App\Models\AnalyticsEvent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class AnalyticsTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_records_a_privacy_conscious_page_view(): void
    {
        $session = (string) Str::uuid();

        $this->withHeaders([
            'User-Agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/537.36 Chrome/140.0 Safari/537.36',
            'X-Visitor-Country' => 'CH',
            'X-Visitor-Region' => 'ZH',
            'X-Visitor-City' => 'Zurich',
        ])->postJson('/api/v1/analytics', [
            'event_type' => 'page_view',
            'session_id' => $session,
            'path' => '/de/services',
            'page_title' => 'Services',
            'locale' => 'de',
            'referrer' => 'https://www.google.com/search?q=veonis',
            'screen_width' => 1440,
            'screen_height' => 900,
        ])->assertNoContent();

        $event = AnalyticsEvent::query()->firstOrFail();

        $this->assertSame('www.google.com', $event->referrer_host);
        $this->assertSame('www.google.com', $event->source);
        $this->assertSame('CH', $event->country);
        $this->assertSame('Chrome', $event->browser);
        $this->assertSame('macOS', $event->operating_system);
        $this->assertSame('desktop', $event->device_type);
        $this->assertSame(64, strlen($event->visitor_hash));
        $this->assertArrayNotHasKey('ip_address', $event->getAttributes());
    }

    public function test_engagement_updates_the_matching_page_view(): void
    {
        $event = AnalyticsEvent::query()->create([
            'event_type' => 'page_view',
            'session_id' => (string) Str::uuid(),
            'visitor_hash' => str_repeat('a', 64),
            'path' => '/en/about-veonis',
        ]);

        $this->postJson('/api/v1/analytics', [
            'event_type' => 'engagement',
            'session_id' => $event->session_id,
            'path' => $event->path,
            'engagement_seconds' => 82,
        ])->assertNoContent();

        $this->assertDatabaseCount('analytics_events', 1);
        $this->assertSame(82, $event->refresh()->engagement_seconds);
    }

    public function test_heartbeat_keeps_a_visitor_live_without_creating_extra_views(): void
    {
        $event = AnalyticsEvent::query()->create([
            'event_type' => 'page_view',
            'session_id' => (string) Str::uuid(),
            'visitor_hash' => str_repeat('b', 64),
            'path' => '/de/contact',
            'updated_at' => now()->subMinutes(5),
        ]);

        $this->postJson('/api/v1/analytics', [
            'event_type' => 'heartbeat',
            'session_id' => $event->session_id,
            'path' => $event->path,
            'engagement_seconds' => 125,
        ])->assertNoContent();

        $this->assertDatabaseCount('analytics_events', 1);
        $this->assertSame(125, $event->refresh()->engagement_seconds);
        $this->assertTrue($event->updated_at->isAfter(now()->subMinute()));
    }
}
