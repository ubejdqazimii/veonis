<?php

namespace App\Filament\Resources\AnalyticsEvents\Tables;

use App\Models\AnalyticsEvent;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class AnalyticsEventsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('created_at')->label('Visited')->since()->dateTimeTooltip()->sortable(),
                TextColumn::make('path')->searchable()->limit(45)->tooltip(fn ($record): string => $record->path),
                TextColumn::make('source')->badge()->placeholder('direct'),
                TextColumn::make('country')->placeholder('—'),
                TextColumn::make('city')->placeholder('—')->toggleable(),
                TextColumn::make('browser')->badge(),
                TextColumn::make('device_type')->badge(),
                TextColumn::make('operating_system')->toggleable(),
                TextColumn::make('engagement_seconds')->label('Engagement')->suffix(' sec')->sortable(),
                TextColumn::make('campaign')->placeholder('—')->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('locale')->options(['de' => 'Deutsch', 'en' => 'English']),
                SelectFilter::make('device_type')->options(['desktop' => 'Desktop', 'mobile' => 'Mobile', 'tablet' => 'Tablet']),
                SelectFilter::make('browser')->options(fn (): array => AnalyticsEvent::query()->whereNotNull('browser')->distinct()->pluck('browser', 'browser')->all()),
                SelectFilter::make('country')->options(fn (): array => AnalyticsEvent::query()->whereNotNull('country')->distinct()->pluck('country', 'country')->all()),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
