<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Campaign extends Model
{
    protected $fillable = ['title', 'slug', 'description', 'giveaways', 'terms', 'is_published'];

    protected function casts(): array
    {
        return ['giveaways' => 'array', 'is_published' => 'boolean'];
    }

    public function leads(): HasMany
    {
        return $this->hasMany(CampaignLead::class);
    }

    public function getPublicUrlAttribute(): string
    {
        return 'https://www.veonissuisse.ch/campaign/'.$this->slug;
    }

    public function getRevisionAttribute(): string
    {
        return hash('sha256', json_encode([$this->title, $this->description, $this->giveaways, $this->terms]));
    }
}
