<?php

namespace Tests\Feature;

use App\Models\DigitalCard;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DigitalCardTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_an_active_digital_business_card(): void
    {
        DigitalCard::query()->create([
            'slug' => 'anna-muster',
            'first_name' => 'Anna',
            'last_name' => 'Muster',
            'position' => 'Beraterin',
            'company' => 'Veonis GmbH',
            'phone' => '+41 79 000 00 00',
            'email' => 'anna@example.com',
            'street' => 'Im Dreispitz 39',
            'zip_code' => '8105',
            'city' => 'Regensdorf',
            'country' => 'Schweiz',
            'photo' => 'digital-cards/anna.jpg',
            'is_active' => true,
        ]);

        $this->getJson('/api/v1/digital-cards/anna-muster')
            ->assertOk()
            ->assertJsonPath('data.fullName', 'Anna Muster')
            ->assertJsonPath('data.position', 'Beraterin')
            ->assertJsonPath('data.address.city', 'Regensdorf')
            ->assertJsonPath('data.photo', 'http://localhost/storage/digital-cards/anna.jpg');
    }

    public function test_an_inactive_card_is_not_publicly_available(): void
    {
        DigitalCard::query()->create([
            'first_name' => 'Hidden',
            'last_name' => 'Person',
            'is_active' => false,
        ]);

        $this->getJson('/api/v1/digital-cards/hidden-person')->assertNotFound();
    }

    public function test_it_generates_a_unique_slug_from_the_name(): void
    {
        $first = DigitalCard::query()->create(['first_name' => 'Anna', 'last_name' => 'Muster']);
        $second = DigitalCard::query()->create(['first_name' => 'Anna', 'last_name' => 'Muster']);

        $this->assertSame('anna-muster', $first->slug);
        $this->assertSame('anna-muster-2', $second->slug);
    }
}
