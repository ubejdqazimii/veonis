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
        $weekStart = now()->startOfWeek();
        $monthStart = now()->startOfMonth();
        $week = (clone $views)->where('created_at', '>=', $weekStart)->count();
        $weekSessions = (clone $views)->where('created_at', '>=', $weekStart)->distinct()->count('session_id');
        $previousWeek = (clone $views)
            ->where('created_at', '>=', $weekStart->copy()->subWeek())
            ->where('created_at', '<', $weekStart)
            ->count();
        $month = (clone $views)->where('created_at', '>=', $monthStart)->count();
        $monthSessions = (clone $views)->where('created_at', '>=', $monthStart)->distinct()->count('session_id');
        $previousMonth = (clone $views)
            ->where('created_at', '>=', $monthStart->copy()->subMonthNoOverflow())
            ->where('created_at', '<', $monthStart)
            ->count();
        $sessions = (clone $views)->distinct('session_id')->count('session_id');
        $averageEngagement = (int) round((clone $views)->where('engagement_seconds', '>', 0)->avg('engagement_seconds') ?? 0);
        $liveVisitors = (clone $views)->where('updated_at', '>=', now()->subMinutes(2))->distinct('session_id')->count('session_id');

        return [
            Stat::make('Live visitors', number_format($liveVisitors))
                ->description('Active during the last 2 minutes')
                ->color($liveVisitors > 0 ? 'success' : 'gray'),
            Stat::make('Page views today', number_format($today))->color('primary'),
            Stat::make('Views this week', number_format($week))
                ->description($this->comparisonDescription($week, $previousWeek, 'last week'))
                ->color('primary'),
            Stat::make('Sessions this week', number_format($weekSessions))
                ->description('Unique sessions since Monday'),
            Stat::make('Views this month', number_format($month))
                ->description($this->comparisonDescription($month, $previousMonth, 'last month'))
                ->color('success'),
            Stat::make('Sessions this month', number_format($monthSessions))
                ->description('Unique sessions since month start')
                ->color('success'),
            Stat::make('Unique sessions', number_format($sessions))->description('All recorded time'),
            Stat::make('Average engagement', $averageEngagement.' sec')->description('Active time per page'),
        ];
    }

    private function comparisonDescription(int $current, int $previous, string $period): string
    {
        if ($previous === 0) {
            return $current > 0 ? 'New traffic; no '.$period.' data' : 'No traffic recorded yet';
        }

        $change = (int) round((($current - $previous) / $previous) * 100);

        if ($change === 0) {
            return 'Same as '.$period;
        }

        return ($change > 0 ? '+' : '').$change.'% vs '.$period;
    }
}
