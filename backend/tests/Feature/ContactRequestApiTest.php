<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactRequestApiTest extends TestCase
{
    use RefreshDatabase;

    private function validPayload(): array
    {
        return [
            'firstName' => 'Anna',
            'lastName' => 'Muster',
            'email' => 'anna@example.com',
            'phone' => '+41 79 000 00 00',
            'clientType' => 'Privatperson',
            'interest' => '360°-Check',
            'message' => 'Ich wünsche eine persönliche Beratung.',
            'contactMethod' => 'E-Mail',
            'locale' => 'de',
            'sourceUrl' => 'https://example.com/de/contact',
            'privacy' => true,
        ];
    }

    public function test_a_contact_request_is_stored_in_the_crm(): void
    {
        $this->postJson('/api/v1/contact-requests', $this->validPayload())
            ->assertCreated()
            ->assertJsonStructure(['message', 'reference']);

        $this->assertDatabaseHas('contact_requests', [
            'email' => 'anna@example.com',
            'status' => 'new',
            'interest' => '360°-Check',
        ]);
    }

    public function test_privacy_consent_is_required(): void
    {
        $payload = $this->validPayload();
        $payload['privacy'] = false;

        $this->postJson('/api/v1/contact-requests', $payload)
            ->assertUnprocessable()
            ->assertJsonValidationErrors('privacy');
    }

    public function test_honeypot_submissions_are_rejected(): void
    {
        $payload = $this->validPayload();
        $payload['website'] = 'https://spam.invalid';

        $this->postJson('/api/v1/contact-requests', $payload)
            ->assertUnprocessable()
            ->assertJsonValidationErrors('website');
    }
}
