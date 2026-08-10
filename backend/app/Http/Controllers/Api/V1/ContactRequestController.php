<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Models\ContactRequest;
use Illuminate\Http\JsonResponse;

class ContactRequestController extends Controller
{
    public function __invoke(StoreContactRequest $request): JsonResponse
    {
        $data = $request->validated();
        $contactRequest = ContactRequest::create([
            'first_name' => $data['firstName'],
            'last_name' => $data['lastName'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'client_type' => $data['clientType'],
            'interest' => $data['interest'],
            'message' => $data['message'],
            'contact_method' => $data['contactMethod'],
            'locale' => $data['locale'] ?? 'de',
            'source_url' => $data['sourceUrl'] ?? null,
            'privacy_accepted_at' => now(),
            'ip_hash' => $request->ip()
                ? hash_hmac('sha256', $request->ip(), (string) config('app.key'))
                : null,
            'user_agent' => mb_substr((string) $request->userAgent(), 0, 1000),
        ]);

        return response()->json([
            'message' => 'Your request has been received.',
            'reference' => $contactRequest->public_id,
        ], 201);
    }
}
