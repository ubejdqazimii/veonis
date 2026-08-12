<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;

class SiteSettingController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $settings = SiteSetting::query()->where('key', 'global')->first();

        $contacts = collect($settings?->contact_items ?? [])
            ->filter(fn (array $item): bool => ($item['is_visible'] ?? true) && filled($item['label'] ?? null) && filled($item['href'] ?? null))
            ->values();
        $socialLinks = collect($settings?->social_links ?? [])
            ->filter(fn (array $item): bool => ($item['is_visible'] ?? true) && filled($item['label'] ?? null) && filled($item['url'] ?? null))
            ->values();

        return response()->json([
            'data' => [
                'preheaderEnabled' => $settings?->preheader_enabled ?? true,
                'contactItems' => $contacts,
                'socialLinks' => $socialLinks,
            ],
        ])->setPublic()->setMaxAge(60);
    }
}
