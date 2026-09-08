<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\CampaignLead;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\Request;

class CampaignController extends Controller
{
    public const CONSENT = 'Ich akzeptiere die Teilnahmebedingungen und die Datenschutzerklärung. Ich bin damit einverstanden, dass Veonis mich per E-Mail oder Telefon zu ihren Dienstleistungen und Angeboten kontaktiert. Diese Einwilligung kann ich jederzeit mit Wirkung für die Zukunft widerrufen.';

    public function show(string $slug)
    {
        $campaign = Campaign::where('slug', $slug)->where('is_published', true)->firstOrFail();

        return response()->json(['title' => $campaign->title, 'slug' => $campaign->slug, 'description' => $campaign->description, 'giveaways' => collect($campaign->giveaways)->map(fn (array $gift): array => [...$gift, 'image' => empty($gift['image']) ? null : asset('storage/'.$gift['image'])])->all(), 'terms' => $campaign->terms, 'revision' => $campaign->revision, 'consent_text' => self::CONSENT]);
    }

    public function store(Request $request, string $slug)
    {
        $campaign = Campaign::where('slug', $slug)->where('is_published', true)->firstOrFail();
        $data = $request->validate([
            'first_name' => ['required', 'string', 'max:100'], 'last_name' => ['required', 'string', 'max:100'],
            'zip_code' => ['required', 'string', 'regex:/^[0-9]{4}$/'], 'city' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:255'], 'mobile' => ['required', 'string', 'max:40', 'regex:/^\+?[0-9 ()\-]{7,40}$/'],
            'birth_year' => ['required', 'integer', 'min:1900', 'max:'.date('Y')],
            'consent' => ['required', 'accepted'], 'revision' => ['required', 'string'], 'website' => ['nullable', 'max:0'],
        ]);
        if (! hash_equals($campaign->revision, $data['revision'])) {
            return response()->json(['message' => 'Die Kampagne wurde aktualisiert. Bitte laden Sie die Seite neu und prüfen Sie die Bedingungen.'], 409);
        }
        unset($data['consent'],$data['revision'],$data['website']);
        $data['email'] = strtolower(trim($data['email']));
        try {
            CampaignLead::create([...$data, 'campaign_id' => $campaign->id, 'campaign_title' => $campaign->title, 'source_url' => $campaign->public_url, 'terms_snapshot' => $campaign->terms, 'consent_text' => self::CONSENT, 'consented_at' => now()]);
        } catch (UniqueConstraintViolationException $e) {
            // Repeat submissions receive the same confirmation without exposing existing lead data.
        }

        return response()->json(['message' => 'Vielen Dank! Ihre Teilnahme wurde erfasst.'], 201);
    }
}
