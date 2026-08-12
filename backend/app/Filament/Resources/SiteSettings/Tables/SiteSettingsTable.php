<?php

namespace App\Filament\Resources\SiteSettings\Tables;

use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class SiteSettingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->label('Settings'),
                IconColumn::make('preheader_enabled')->label('Top bar')->boolean(),
                TextColumn::make('contact_items')->label('Contacts')->formatStateUsing(fn (?array $state): int => count($state ?? [])),
                TextColumn::make('social_links')->label('Social profiles')->formatStateUsing(fn (?array $state): int => count($state ?? [])),
                TextColumn::make('updated_at')->label('Last updated')->since(),
            ])
            ->recordActions([EditAction::make()]);
    }
}
