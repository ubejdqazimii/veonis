<?php

namespace App\Support;

use App\Models\AnalyticsEvent;
use Illuminate\Database\Eloquent\Builder;

class PageVisitMetrics
{
    public static function apply(Builder $query, string $prefix, ?string $legacyPrefix = null): Builder
    {
        $table = $query->getModel()->getTable();
        // Both table and prefix are supplied by the resource, never user input.
        $path = $query->getConnection()->getDriverName() === 'sqlite'
            ? "? || {$table}.slug"
            : "CONCAT(?, {$table}.slug)";
        foreach (['visits_count' => 'COUNT(*)', 'visitors_count' => 'COUNT(DISTINCT session_id)'] as $alias => $aggregate) {
            $query->addSelect([$alias => AnalyticsEvent::query()->selectRaw($aggregate)
                ->where('event_type', 'page_view')->where(function (Builder $events) use ($path, $prefix, $legacyPrefix): void {
                    $events->whereRaw("path = {$path}", [$prefix]);
                    if ($legacyPrefix !== null) {
                        $events->orWhereRaw("path = {$path}", [$legacyPrefix]);
                    }
                })]);
        }

        return $query;
    }
}
