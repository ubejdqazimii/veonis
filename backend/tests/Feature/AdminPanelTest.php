<?php

namespace Tests\Feature;

use App\Models\ContactRequest;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    public function test_an_administrator_can_open_the_cms_resource_screens(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get('/admin')->assertOk();
        $this->actingAs($user)->get('/admin/pages')->assertOk();
        $this->actingAs($user)->get('/admin/pages/create')->assertOk();
        $this->actingAs($user)->get('/admin/blog-posts/create')->assertOk();
        $this->actingAs($user)->get('/admin/navigation-items/create')->assertOk();
    }

    public function test_an_administrator_can_open_a_crm_request(): void
    {
        $user = User::factory()->create();
        $request = ContactRequest::create([
            'first_name' => 'Anna',
            'last_name' => 'Muster',
            'email' => 'anna@example.com',
            'phone' => '+41 79 000 00 00',
            'client_type' => 'Private',
            'interest' => 'Planning',
            'message' => 'Please contact me about financial planning.',
            'contact_method' => 'Email',
            'locale' => 'en',
            'privacy_accepted_at' => now(),
        ]);

        $this->actingAs($user)->get("/admin/contact-requests/{$request->id}")->assertOk();
        $this->actingAs($user)->get("/admin/contact-requests/{$request->id}/edit")->assertOk();
    }
}
