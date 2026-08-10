<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'key', 'locale', 'slug', 'name', 'seo_title', 'meta_description', 'eyebrow',
    'title', 'subtitle', 'description', 'cta', 'secondary_cta', 'sections',
    'is_published', 'published_at',
])]
class Page extends Model
{
    protected function casts(): array
    {
        return [
            'description' => 'array',
            'sections' => 'array',
            'is_published' => 'boolean',
            'published_at' => 'datetime',
        ];
    }
}
