<?php

namespace App\Filament\Widgets;

use App\Models\ContactRequest;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class CrmOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('New requests', ContactRequest::query()->where('status', 'new')->count())
                ->description('Awaiting first response')
                ->color('danger'),
            Stat::make('Active conversations', ContactRequest::query()->whereIn('status', ['in_progress', 'waiting', 'qualified'])->count())
                ->description('In the CRM pipeline')
                ->color('warning'),
            Stat::make('Requests this month', ContactRequest::query()->where('created_at', '>=', now()->startOfMonth())->count())
                ->description('Website enquiries received')
                ->color('success'),
        ];
    }
}
