<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'slug', 'locale', 'title', 'excerpt', 'category', 'read_time', 'image',
    'image_alt', 'intro', 'sections', 'takeaways', 'is_published', 'published_at',
])]
class BlogPost extends Model
{
    protected function casts(): array
    {
        return [
            'intro' => 'array',
            'sections' => 'array',
            'takeaways' => 'array',
            'is_published' => 'boolean',
            'published_at' => 'datetime',
        ];
    }
}
