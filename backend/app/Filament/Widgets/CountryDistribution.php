<?php

namespace App\Filament\Widgets;

use App\Models\AnalyticsEvent;
use Filament\Widgets\ChartWidget;

class CountryDistribution extends ChartWidget
{
    protected ?string $heading = 'Visitors by country';

    protected ?string $description = 'Page views and unique sessions for the top visitor countries. Location is estimated from the public IP address.';

    protected int|string|array $columnSpan = 1;

    protected function getData(): array
    {
        $countries = AnalyticsEvent::query()
            ->where('event_type', 'page_view')
            ->selectRaw("COALESCE(country, 'Unknown') as country_name, COUNT(*) as views, COUNT(DISTINCT session_id) as sessions")
            ->groupBy('country_name')
            ->orderByDesc('views')
            ->limit(10)
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Page views',
                    'data' => $countries->pluck('views')->all(),
                    'backgroundColor' => '#c63d4d',
                    'borderRadius' => 5,
                ],
                [
                    'label' => 'Unique sessions',
                    'data' => $countries->pluck('sessions')->all(),
                    'backgroundColor' => '#d7a1a8',
                    'borderRadius' => 5,
                ],
            ],
            'labels' => $countries->pluck('country_name')->map(fn (string $country): string => $this->countryLabel($country))->all(),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }

    private function countryLabel(string $country): string
    {
        if (strlen($country) !== 2) {
            return $country;
        }

        $flag = collect(mb_str_split(strtoupper($country)))
            ->map(fn (string $letter): string => mb_chr(127397 + ord($letter)))
            ->implode('');

        return $flag.' '.strtoupper($country);
    }
}
