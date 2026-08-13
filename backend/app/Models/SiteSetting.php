<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'key', 'name', 'preheader_enabled', 'contact_items', 'social_links',
    'office_street', 'office_zip_code', 'office_city', 'office_country', 'google_maps_url',
])]
class SiteSetting extends Model
{
    protected function casts(): array
    {
        return [
            'preheader_enabled' => 'boolean',
            'contact_items' => 'array',
            'social_links' => 'array',
        ];
    }
}
