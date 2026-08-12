<?php

namespace App\Filament\Widgets;

use App\Models\AnalyticsEvent;
use Filament\Widgets\ChartWidget;

class TrafficSources extends ChartWidget
{
    protected ?string $heading = 'Top acquisition sources';

    protected int|string|array $columnSpan = 1;

    protected function getData(): array
    {
        $sources = AnalyticsEvent::query()
            ->where('event_type', 'page_view')
            ->selectRaw("COALESCE(source, 'direct') as source_name, COUNT(*) as aggregate")
            ->groupBy('source_name')
            ->orderByDesc('aggregate')
            ->limit(8)
            ->get();

        return [
            'datasets' => [[
                'label' => 'Views',
                'data' => $sources->pluck('aggregate')->all(),
                'backgroundColor' => ['#c63d4d', '#5d1d29', '#ef7d8b', '#8d3a49', '#d7a1a8', '#24191c', '#b76a75', '#6b5960'],
            ]],
            'labels' => $sources->pluck('source_name')->all(),
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }
}
