<?php

namespace App\Filament\Widgets;

use App\Models\AnalyticsEvent;
use Filament\Widgets\ChartWidget;

class TrafficTrend extends ChartWidget
{
    protected ?string $heading = 'Traffic over the last 30 days';

    protected int|string|array $columnSpan = 1;

    protected function getData(): array
    {
        $counts = AnalyticsEvent::query()
            ->where('event_type', 'page_view')
            ->where('created_at', '>=', now()->subDays(29)->startOfDay())
            ->get()
            ->groupBy(fn (AnalyticsEvent $event): string => $event->created_at->format('Y-m-d'))
            ->map->count();
        $days = collect(range(29, 0))->map(fn (int $daysAgo) => now()->subDays($daysAgo));

        return [
            'datasets' => [[
                'label' => 'Page views',
                'data' => $days->map(fn ($day) => $counts->get($day->format('Y-m-d'), 0))->all(),
                'borderColor' => '#c63d4d',
                'backgroundColor' => 'rgba(198, 61, 77, 0.12)',
                'fill' => true,
                'tension' => 0.35,
            ]],
            'labels' => $days->map(fn ($day) => $day->format('d M'))->all(),
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
