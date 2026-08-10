<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\JsonResponse;

class BlogPostController extends Controller
{
    public function index(string $locale): JsonResponse
    {
        $posts = BlogPost::query()
            ->where('locale', $locale)
            ->where('is_published', true)
            ->latest('published_at')
            ->get()
            ->map(fn (BlogPost $post): array => $this->transform($post, false));

        return response()->json(['data' => $posts])->setPublic()->setMaxAge(60);
    }

    public function show(string $locale, string $slug): JsonResponse
    {
        $post = BlogPost::query()
            ->where('locale', $locale)
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        return response()->json(['data' => $this->transform($post, true)])
            ->setPublic()
            ->setMaxAge(60);
    }

    private function transform(BlogPost $post, bool $includeArticle): array
    {
        $data = [
            'slug' => $post->slug,
            'locale' => $post->locale,
            'title' => $post->title,
            'excerpt' => $post->excerpt,
            'category' => $post->category,
            'readTime' => $post->read_time,
            'image' => $post->image ? $this->mediaUrl($post->image) : null,
            'alt' => $post->image_alt,
            'publishedAt' => $post->published_at?->toAtomString(),
        ];

        if ($includeArticle) {
            $data += [
                'intro' => $post->intro ?? [],
                'sections' => $post->sections ?? [],
                'takeaways' => $post->takeaways ?? [],
            ];
        }

        return $data;
    }

    private function mediaUrl(string $path): string
    {
        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://') || str_starts_with($path, '/')) {
            return $path;
        }

        return asset('storage/'.$path);
    }
}
