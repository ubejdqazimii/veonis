<?php

namespace App\Filament\Resources\AnalyticsEvents;

use App\Filament\Resources\AnalyticsEvents\Pages\ListAnalyticsEvents;
use App\Filament\Resources\AnalyticsEvents\Tables\AnalyticsEventsTable;
use App\Models\AnalyticsEvent;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class AnalyticsEventResource extends Resource
{
    protected static ?string $model = AnalyticsEvent::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedChartBar;

    protected static ?string $navigationLabel = 'Analytics';

    protected static ?string $modelLabel = 'visit';

    protected static ?string $pluralModelLabel = 'analytics';

    public static function table(Table $table): Table
    {
        return AnalyticsEventsTable::configure($table);
    }

    public static function getPages(): array
    {
        return ['index' => ListAnalyticsEvents::route('/')];
    }
}
