<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\NavigationItem;
use Illuminate\Http\JsonResponse;

class NavigationController extends Controller
{
    public function __invoke(string $locale): JsonResponse
    {
        $items = NavigationItem::query()
            ->where('locale', $locale)
            ->where('is_published', true)
            ->orderBy('group')
            ->orderBy('sort_order')
            ->get(['label', 'href', 'group', 'sort_order']);

        return response()->json(['data' => $items])->setPublic()->setMaxAge(60);
    }
}
