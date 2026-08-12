<?php

namespace App\Filament\Resources\AnalyticsEvents\Pages;

use App\Filament\Resources\AnalyticsEvents\AnalyticsEventResource;
use App\Filament\Widgets\AnalyticsOverview;
use App\Filament\Widgets\PagePerformance;
use App\Filament\Widgets\TrafficSources;
use App\Filament\Widgets\TrafficTrend;
use Filament\Resources\Pages\ListRecords;

class ListAnalyticsEvents extends ListRecords
{
    protected static string $resource = AnalyticsEventResource::class;

    protected function getHeaderWidgets(): array
    {
        return [AnalyticsOverview::class, TrafficTrend::class, TrafficSources::class, PagePerformance::class];
    }

    public function getHeaderWidgetsColumns(): int|array
    {
        return 2;
    }
}
