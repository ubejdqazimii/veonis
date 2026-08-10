<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

#[Fillable([
    'public_id', 'first_name', 'last_name', 'email', 'phone', 'client_type',
    'interest', 'message', 'contact_method', 'locale', 'source_url', 'status',
    'priority', 'assigned_to', 'last_contacted_at', 'privacy_accepted_at',
    'ip_hash', 'user_agent',
])]
class ContactRequest extends Model
{
    protected static function booted(): void
    {
        static::creating(function (self $request): void {
            $request->public_id ??= (string) Str::uuid();
        });
    }

    protected function casts(): array
    {
        return [
            'last_contacted_at' => 'datetime',
            'privacy_accepted_at' => 'datetime',
        ];
    }

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function notes(): HasMany
    {
        return $this->hasMany(ContactNote::class);
    }

    public function getFullNameAttribute(): string
    {
        return trim("{$this->first_name} {$this->last_name}");
    }
}
