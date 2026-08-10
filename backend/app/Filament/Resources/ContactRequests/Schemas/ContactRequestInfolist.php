<?php

namespace App\Filament\Resources\ContactRequests\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ContactRequestInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Contact request')->columns(3)->schema([
                TextEntry::make('full_name')->label('Name'),
                TextEntry::make('email')->copyable(),
                TextEntry::make('phone')->copyable(),
                TextEntry::make('client_type'),
                TextEntry::make('interest'),
                TextEntry::make('contact_method'),
                TextEntry::make('message')->columnSpanFull(),
            ]),
            Section::make('CRM')->columns(3)->schema([
                TextEntry::make('status')->badge(),
                TextEntry::make('priority')->badge(),
                TextEntry::make('assignee.name')->label('Owner')->placeholder('Unassigned'),
                TextEntry::make('created_at')->label('Received')->dateTime(),
                TextEntry::make('last_contacted_at')->dateTime()->placeholder('Not contacted'),
                TextEntry::make('public_id')->label('Reference')->copyable(),
            ]),
            Section::make('Privacy and source')->collapsed()->columns(2)->schema([
                TextEntry::make('source_url')->url(fn ($record): ?string => $record->source_url)->placeholder('-'),
                TextEntry::make('locale'),
                TextEntry::make('privacy_accepted_at')->dateTime(),
                TextEntry::make('ip_hash')->placeholder('-'),
                TextEntry::make('user_agent')->columnSpanFull()->placeholder('-'),
            ]),
        ]);
    }
}
