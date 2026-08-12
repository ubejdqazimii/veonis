<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'event_type', 'session_id', 'visitor_hash', 'path', 'page_title', 'locale',
    'referrer_host', 'source', 'medium', 'campaign', 'country', 'region', 'city',
    'browser', 'operating_system', 'device_type', 'screen_width', 'screen_height',
    'engagement_seconds',
])]
class AnalyticsEvent extends Model
{
    protected function casts(): array
    {
        return [
            'engagement_seconds' => 'integer',
            'screen_width' => 'integer',
            'screen_height' => 'integer',
        ];
    }
}
