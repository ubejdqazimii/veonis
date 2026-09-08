<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CampaignLead extends Model
{
    protected $fillable = ['campaign_id', 'campaign_title', 'source_url', 'first_name', 'last_name', 'zip_code', 'city', 'email', 'mobile', 'birth_year', 'terms_snapshot', 'consent_text', 'consented_at', 'status'];

    protected function casts(): array
    {
        return ['consented_at' => 'datetime'];
    }

    public function campaign(): BelongsTo
    {
        return $this->belongsTo(Campaign::class);
    }
}
