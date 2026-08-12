<?php

namespace App\Filament\Widgets;

use App\Models\AnalyticsEvent;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class AnalyticsOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        $views = AnalyticsEvent::query()->where('event_type', 'page_view');
        $today = (clone $views)->where('created_at', '>=', now()->startOfDay())->count();
        $month = (clone $views)->where('created_at', '>=', now()->startOfMonth())->count();
        $sessions = (clone $views)->distinct('session_id')->count('session_id');
        $averageEngagement = (int) round((clone $views)->where('engagement_seconds', '>', 0)->avg('engagement_seconds') ?? 0);

        return [
            Stat::make('Page views today', number_format($today))->color('primary'),
            Stat::make('Views this month', number_format($month))->color('success'),
            Stat::make('Unique sessions', number_format($sessions))->description('All recorded time'),
            Stat::make('Average engagement', $averageEngagement.' sec')->description('Active time per page'),
        ];
    }
}
