<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\JsonResponse;

class PageController extends Controller
{
    public function __invoke(string $locale, string $key): JsonResponse
    {
        $page = Page::query()
            ->where('locale', $locale)
            ->where('key', $key)
            ->where('is_published', true)
            ->firstOrFail();

        return response()->json([
            'data' => [
                'key' => $page->key,
                'locale' => $page->locale,
                'slug' => $page->slug,
                'seoTitle' => $page->seo_title,
                'metaDescription' => $page->meta_description,
                'eyebrow' => $page->eyebrow,
                'title' => $page->title,
                'subtitle' => $page->subtitle,
                'description' => $page->description ?? [],
                'cta' => $page->cta,
                'secondaryCta' => $page->secondary_cta,
                'sections' => collect($page->sections ?? [])
                    ->map(function (array $block): array {
                        $section = $block['data'] ?? $block;

                        if (isset($section['cards'])) {
                            $section['cards'] = collect($section['cards'])
                                ->map(function (array $card): array {
                                    if (isset($card['image'])) {
                                        $card['image'] = $this->mediaUrl($card['image']);
                                    }

                                    return $card;
                                })
                                ->all();
                        }

                        return array_filter($section, fn (mixed $value): bool => $value !== null && $value !== [] && $value !== '');
                    })
                    ->values()
                    ->all(),
                'homepageContent' => $page->homepage_content ?? [],
                'homepageImages' => collect($page->homepage_images ?? [])->map(fn ($path) => $path ? $this->mediaUrl($path) : null)->all(),
                'updatedAt' => $page->updated_at?->toAtomString(),
            ],
        ])->setPublic()->setMaxAge(60);
    }

    private function mediaUrl(string $path): string
    {
        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://') || str_starts_with($path, '/')) {
            return $path;
        }

        return asset('storage/'.$path);
    }
}
