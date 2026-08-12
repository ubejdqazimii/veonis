<?php

namespace App\Filament\Widgets;

use App\Models\AnalyticsEvent;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;

class LiveVisitors extends TableWidget
{
    protected int|string|array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        $latestLiveVisitIds = AnalyticsEvent::query()
            ->selectRaw('MAX(id)')
            ->where('event_type', 'page_view')
            ->where('updated_at', '>=', now()->subMinutes(2))
            ->groupBy('session_id');

        return $table
            ->heading('Live visitors')
            ->description('Current page and approximate location for sessions active during the last two minutes. Refreshes every 15 seconds.')
            ->query(
                AnalyticsEvent::query()
                    ->whereIn('id', $latestLiveVisitIds)
                    ->orderByDesc('updated_at')
            )
            ->columns([
                TextColumn::make('path')
                    ->label('Current page')
                    ->description(fn (AnalyticsEvent $record): ?string => $record->page_title)
                    ->searchable(),
                TextColumn::make('country')
                    ->formatStateUsing(fn (?string $state): string => $state ? $this->countryFlag($state).' '.$state : 'Unknown')
                    ->badge(),
                TextColumn::make('city')->placeholder('Unknown'),
                TextColumn::make('device_type')->label('Device')->badge(),
                TextColumn::make('browser')->badge(),
                TextColumn::make('engagement_seconds')->label('Time on page')->suffix(' sec'),
                TextColumn::make('updated_at')->label('Last seen')->since()->dateTimeTooltip(),
            ])
            ->poll('15s')
            ->paginated(false)
            ->emptyStateHeading('No visitors are live right now')
            ->emptyStateDescription('Visitors appear here after opening the public website.');
    }

    private function countryFlag(string $country): string
    {
        return collect(mb_str_split(strtoupper($country)))
            ->map(fn (string $letter): string => mb_chr(127397 + ord($letter)))
            ->implode('');
    }
}
