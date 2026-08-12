<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\AnalyticsEvent;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class AnalyticsController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $data = $request->validate([
            'event_type' => ['required', 'in:page_view,engagement'],
            'session_id' => ['required', 'uuid'],
            'path' => ['required', 'string', 'max:500', 'regex:/^\//'],
            'page_title' => ['nullable', 'string', 'max:255'],
            'locale' => ['nullable', 'in:de,en'],
            'referrer' => ['nullable', 'url:http,https', 'max:1000'],
            'source' => ['nullable', 'string', 'max:100'],
            'medium' => ['nullable', 'string', 'max:100'],
            'campaign' => ['nullable', 'string', 'max:150'],
            'screen_width' => ['nullable', 'integer', 'between:1,10000'],
            'screen_height' => ['nullable', 'integer', 'between:1,10000'],
            'engagement_seconds' => ['nullable', 'integer', 'between:0,86400'],
        ]);

        $userAgent = $request->userAgent() ?? '';
        $ip = $request->ip() ?? 'unknown';
        $referrerHost = filled($data['referrer'] ?? null) ? parse_url($data['referrer'], PHP_URL_HOST) : null;

        if ($data['event_type'] === 'engagement') {
            AnalyticsEvent::query()
                ->where('event_type', 'page_view')
                ->where('session_id', $data['session_id'])
                ->where('path', $data['path'])
                ->latest()
                ->first()
                ?->update(['engagement_seconds' => $data['engagement_seconds'] ?? 0]);

            return response()->noContent();
        }

        AnalyticsEvent::query()->create([
            'event_type' => $data['event_type'],
            'session_id' => $data['session_id'],
            'path' => $data['path'],
            'page_title' => $data['page_title'] ?? null,
            'locale' => $data['locale'] ?? null,
            'medium' => $data['medium'] ?? null,
            'campaign' => $data['campaign'] ?? null,
            'screen_width' => $data['screen_width'] ?? null,
            'screen_height' => $data['screen_height'] ?? null,
            'visitor_hash' => hash_hmac('sha256', $ip.'|'.$userAgent, config('app.key')),
            'referrer_host' => $referrerHost ? Str::lower($referrerHost) : null,
            'source' => $data['source'] ?? ($referrerHost ?: 'direct'),
            'country' => $request->header('X-Visitor-Country'),
            'region' => $request->header('X-Visitor-Region'),
            'city' => $request->header('X-Visitor-City'),
            'browser' => $this->browser($userAgent),
            'operating_system' => $this->operatingSystem($userAgent),
            'device_type' => $this->deviceType($userAgent),
        ]);

        return response()->noContent();
    }

    private function browser(string $ua): string
    {
        return match (true) {
            str_contains($ua, 'Edg/') => 'Edge',
            str_contains($ua, 'OPR/') => 'Opera',
            str_contains($ua, 'Chrome/') => 'Chrome',
            str_contains($ua, 'Firefox/') => 'Firefox',
            str_contains($ua, 'Safari/') => 'Safari',
            default => 'Other',
        };
    }

    private function operatingSystem(string $ua): string
    {
        return match (true) {
            str_contains($ua, 'iPhone'), str_contains($ua, 'iPad') => 'iOS',
            str_contains($ua, 'Android') => 'Android',
            str_contains($ua, 'Windows') => 'Windows',
            str_contains($ua, 'Mac OS') => 'macOS',
            str_contains($ua, 'Linux') => 'Linux',
            default => 'Other',
        };
    }

    private function deviceType(string $ua): string
    {
        return match (true) {
            str_contains($ua, 'iPad'), str_contains($ua, 'Tablet') => 'tablet',
            str_contains($ua, 'Mobile'), str_contains($ua, 'iPhone'), str_contains($ua, 'Android') => 'mobile',
            default => 'desktop',
        };
    }
}
