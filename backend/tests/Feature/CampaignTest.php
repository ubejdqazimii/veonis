<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Filament\Resources\Campaigns\Pages\EditCampaign;
use App\Models\Campaign;
use App\Models\CampaignLead;
use App\Models\User;
use Database\Seeders\CampaignTemplateSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

class CampaignTest extends TestCase
{
    use RefreshDatabase;

    private function campaign(): Campaign
    {
        return Campaign::create(['title' => 'Summer campaign', 'slug' => 'summer', 'description' => 'Campaign introduction', 'giveaways' => [['title' => 'Gift', 'description' => 'Gift details', 'image' => 'campaign-giveaways/test.jpg', 'image_alt' => 'Example gift']], 'terms' => 'Participation rules', 'is_published' => true]);
    }

    private function payload(Campaign $campaign): array
    {
        return ['first_name' => 'Anna', 'last_name' => 'Muster', 'zip_code' => '8000', 'city' => 'Zürich', 'email' => 'anna@example.com', 'mobile' => '+41 79 000 00 00', 'birth_year' => 1990, 'consent' => true, 'revision' => $campaign->revision];
    }

    public function test_published_campaign_is_available_but_drafts_are_not(): void
    {
        $campaign = $this->campaign();
        $this->getJson('/api/v1/campaigns/summer')->assertOk()->assertJsonPath('title', 'Summer campaign')->assertJsonPath('giveaways.0.image', asset('storage/campaign-giveaways/test.jpg'))->assertJsonPath('giveaways.0.image_alt', 'Example gift');
        $campaign->update(['is_published' => false]);
        $this->getJson('/api/v1/campaigns/summer')->assertNotFound();
        $this->postJson('/api/v1/campaigns/summer/leads', $this->payload($campaign))->assertNotFound();
    }

    public function test_lead_attribution_and_consent_are_server_owned(): void
    {
        $campaign = $this->campaign();
        $this->postJson('/api/v1/campaigns/summer/leads', [...$this->payload($campaign), 'campaign_title' => 'Spoofed', 'source_url' => 'https://wrong.example', 'consent_text' => 'wrong'])->assertCreated();
        $lead = CampaignLead::firstOrFail();
        $this->assertSame('Summer campaign', $lead->campaign_title);
        $this->assertSame('https://www.veonissuisse.ch/campaign/summer', $lead->source_url);
        $this->assertSame('Participation rules', $lead->terms_snapshot);
        $this->assertNotNull($lead->consented_at);
        $this->assertStringContainsString('E-Mail oder Telefon', $lead->consent_text);
    }

    public function test_required_consent_invalid_details_and_honeypot_are_rejected(): void
    {
        $campaign = $this->campaign();
        $this->postJson('/api/v1/campaigns/summer/leads', [...$this->payload($campaign), 'consent' => false, 'birth_year' => 3000, 'zip_code' => 'bad', 'website' => 'spam'])->assertUnprocessable()->assertJsonValidationErrors(['consent', 'birth_year', 'zip_code', 'website']);
        $this->assertDatabaseCount('campaign_leads', 0);
    }

    public function test_changed_campaign_requires_fresh_consent(): void
    {
        $campaign = $this->campaign();
        $payload = $this->payload($campaign);
        $campaign->update(['terms' => 'Updated terms']);
        $this->postJson('/api/v1/campaigns/summer/leads', $payload)->assertStatus(409);
        $this->assertDatabaseCount('campaign_leads', 0);
    }

    public function test_retries_do_not_duplicate_a_lead_and_other_campaigns_remain_separate(): void
    {
        $campaign = $this->campaign();
        $this->postJson('/api/v1/campaigns/summer/leads', $this->payload($campaign))->assertCreated();
        $this->postJson('/api/v1/campaigns/summer/leads', $this->payload($campaign))->assertCreated();
        $other = $campaign->replicate();
        $other->slug = 'winter';
        $other->save();
        $this->postJson('/api/v1/campaigns/winter/leads', $this->payload($other))->assertCreated();
        $this->assertDatabaseCount('campaign_leads', 2);
    }

    public function test_admin_screens_and_permissions(): void
    {
        $campaign = $this->campaign();
        $admin = User::factory()->create();
        $this->actingAs($admin)->get('/admin/campaigns')->assertOk();
        $this->actingAs($admin)->get('/admin/campaigns/create')->assertOk();
        $this->actingAs($admin)->get('/admin/campaigns/'.$campaign->id.'/edit')->assertOk();
        $this->actingAs($admin)->get('/admin/campaign-leads')->assertOk();
        $editor = User::factory()->create(['role' => UserRole::BlogEditor]);
        $this->actingAs($editor)->get('/admin/campaigns')->assertForbidden();
        $this->actingAs($editor)->get('/admin/campaign-leads')->assertForbidden();
    }

    public function test_duplicate_copies_content_to_a_draft_with_no_leads(): void
    {
        $campaign = $this->campaign();
        $this->postJson('/api/v1/campaigns/summer/leads', $this->payload($campaign))->assertCreated();
        $this->actingAs(User::factory()->create());
        Livewire::test(EditCampaign::class, ['record' => $campaign->id])
            ->callAction('duplicate', data: ['title' => 'Winter giveaway', 'slug' => 'winter-giveaway'])
            ->assertHasNoActionErrors();
        $copy = Campaign::where('slug', 'winter-giveaway')->firstOrFail();
        $this->assertFalse($copy->is_published);
        $this->assertSame($campaign->giveaways, $copy->giveaways);
        $this->assertSame($campaign->description, $copy->description);
        $this->assertSame($campaign->terms, $copy->terms);
        $this->assertSame(0, $copy->leads()->count());
        $this->assertSame(1, $campaign->leads()->count());
    }

    public function test_duplicate_rejects_an_existing_url_and_template_is_idempotent(): void
    {
        $campaign = $this->campaign();
        $this->actingAs(User::factory()->create());
        Livewire::test(EditCampaign::class, ['record' => $campaign->id])
            ->callAction('duplicate', data: ['title' => 'Copy', 'slug' => 'summer'])
            ->assertHasActionErrors(['slug' => 'unique']);
        $this->seed(CampaignTemplateSeeder::class);
        $this->seed(CampaignTemplateSeeder::class);
        $this->assertSame(1, Campaign::where('slug', 'vorlage-giveaway-kampagne')->count());
        $this->assertFalse(Campaign::where('slug', 'vorlage-giveaway-kampagne')->firstOrFail()->is_published);
    }
}
