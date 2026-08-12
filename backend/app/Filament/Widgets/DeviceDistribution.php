<?php

namespace App\Filament\Widgets;

use App\Models\AnalyticsEvent;
use Filament\Widgets\ChartWidget;

class DeviceDistribution extends ChartWidget
{
    protected ?string $heading = 'Devices used';

    protected ?string $description = 'Share of page views by desktop, mobile and tablet.';

    protected int|string|array $columnSpan = 1;

    protected function getData(): array
    {
        $devices = AnalyticsEvent::query()
            ->where('event_type', 'page_view')
            ->selectRaw("COALESCE(device_type, 'unknown') as device_name, COUNT(*) as views")
            ->groupBy('device_name')
            ->orderByDesc('views')
            ->get();

        return [
            'datasets' => [[
                'label' => 'Page views',
                'data' => $devices->pluck('views')->all(),
                'backgroundColor' => ['#c63d4d', '#5d1d29', '#ef7d8b', '#8d3a49'],
            ]],
            'labels' => $devices->pluck('device_name')->map(fn (string $device): string => ucfirst($device))->all(),
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }
}
