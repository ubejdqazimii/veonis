<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['key', 'name', 'preheader_enabled', 'contact_items', 'social_links'])]
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
