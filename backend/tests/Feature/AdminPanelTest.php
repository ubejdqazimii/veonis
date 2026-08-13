<?php

namespace Tests\Feature;

use App\Enums\UserRole;
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
        $this->actingAs($user)->get('/admin/site-settings')->assertOk();
        $this->actingAs($user)->get('/admin/users')->assertOk();
        $this->actingAs($user)->get('/admin/users/create')->assertOk();
        $this->actingAs($user)->get("/admin/users/{$user->id}/edit")->assertOk();
        $this->actingAs($user)->get('/admin/analytics-events')->assertOk();
        $this->actingAs($user)->get('/admin/digital-cards')->assertOk();
        $this->actingAs($user)->get('/admin/digital-cards/create')->assertOk();
    }

    public function test_a_blog_editor_can_only_manage_blog_articles(): void
    {
        $editor = User::factory()->create(['role' => UserRole::BlogEditor]);

        $this->actingAs($editor)->get('/admin')->assertOk();
        $this->actingAs($editor)->get('/admin/blog-posts')->assertOk();
        $this->actingAs($editor)->get('/admin/blog-posts/create')->assertOk();

        $this->actingAs($editor)->get('/admin/pages')->assertForbidden();
        $this->actingAs($editor)->get('/admin/navigation-items')->assertForbidden();
        $this->actingAs($editor)->get('/admin/site-settings')->assertForbidden();
        $this->actingAs($editor)->get('/admin/contact-requests')->assertForbidden();
        $this->actingAs($editor)->get('/admin/users')->assertForbidden();
        $this->actingAs($editor)->get('/admin/analytics-events')->assertForbidden();
        $this->actingAs($editor)->get('/admin/digital-cards')->assertForbidden();
    }

    public function test_a_disabled_user_cannot_access_the_admin_panel(): void
    {
        $user = User::factory()->create(['is_active' => false]);

        $this->actingAs($user)->get('/admin')->assertForbidden();
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
