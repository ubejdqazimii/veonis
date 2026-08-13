<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\DigitalCard;
use Illuminate\Http\JsonResponse;

class DigitalCardController extends Controller
{
    public function __invoke(string $slug): JsonResponse
    {
        $card = DigitalCard::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return response()->json([
            'data' => [
                'slug' => $card->slug,
                'firstName' => $card->first_name,
                'lastName' => $card->last_name,
                'fullName' => $card->full_name,
                'position' => $card->position,
                'company' => $card->company,
                'phone' => $card->phone,
                'email' => $card->email,
                'address' => [
                    'street' => $card->street,
                    'zipCode' => $card->zip_code,
                    'city' => $card->city,
                    'country' => $card->country,
                ],
                'photo' => $card->photo ? $this->mediaUrl($card->photo) : null,
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
