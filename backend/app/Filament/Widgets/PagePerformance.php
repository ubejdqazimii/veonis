<?php

namespace App\Filament\Widgets;

use App\Models\AnalyticsEvent;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;

class PagePerformance extends TableWidget
{
    protected int|string|array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->heading('Page performance')
            ->description('Views, unique sessions and average engagement for every page.')
            ->query(
                AnalyticsEvent::query()
                    ->where('event_type', 'page_view')
                    ->selectRaw('MIN(id) as id, path, COUNT(*) as views, COUNT(DISTINCT session_id) as sessions, ROUND(AVG(engagement_seconds)) as average_engagement')
                    ->groupBy('path')
                    ->orderByDesc('views')
            )
            ->columns([
                TextColumn::make('path')->label('Page')->searchable(),
                TextColumn::make('views')->numeric()->sortable(),
                TextColumn::make('sessions')->label('Unique sessions')->numeric(),
                TextColumn::make('average_engagement')->label('Avg. engagement')->suffix(' sec'),
            ])
            ->paginated([10, 25, 50]);
    }
}
