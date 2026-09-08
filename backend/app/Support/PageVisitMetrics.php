<?php

namespace App\Support;

use App\Models\AnalyticsEvent;
use Illuminate\Database\Eloquent\Builder;

class PageVisitMetrics
{
    public static function apply(Builder $query, string $prefix): Builder
    {
        $table = $query->getModel()->getTable();
        // Both table and prefix are supplied by the resource, never user input.
        $path = $query->getConnection()->getDriverName() === 'sqlite'
            ? "? || {$table}.slug"
            : "CONCAT(?, {$table}.slug)";
        foreach (['visits_count' => 'COUNT(*)', 'visitors_count' => 'COUNT(DISTINCT session_id)'] as $alias => $aggregate) {
            $query->addSelect([$alias => AnalyticsEvent::query()->selectRaw($aggregate)
                ->where('event_type', 'page_view')->whereRaw("path = {$path}", [$prefix])]);
        }

        return $query;
    }
}
