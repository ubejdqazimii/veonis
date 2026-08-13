<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

#[Fillable([
    'slug', 'first_name', 'last_name', 'position', 'company', 'phone', 'email', 'linkedin_url',
    'street', 'zip_code', 'city', 'country', 'photo', 'is_active',
])]
class DigitalCard extends Model
{
    protected static function booted(): void
    {
        static::creating(function (DigitalCard $card): void {
            if (blank($card->slug)) {
                $card->slug = static::uniqueSlug($card->first_name.' '.$card->last_name);
            }
        });
    }

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }

    public function getFullNameAttribute(): string
    {
        return trim($this->first_name.' '.$this->last_name);
    }

    private static function uniqueSlug(string $name): string
    {
        $base = Str::slug($name) ?: 'team-member';
        $slug = $base;
        $suffix = 2;

        while (static::query()->where('slug', $slug)->exists()) {
            $slug = $base.'-'.$suffix++;
        }

        return $slug;
    }
}
