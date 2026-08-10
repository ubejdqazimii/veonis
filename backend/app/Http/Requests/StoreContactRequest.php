<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'firstName' => ['required', 'string', 'min:2', 'max:100'],
            'lastName' => ['required', 'string', 'min:2', 'max:100'],
            'email' => ['required', 'email:rfc', 'max:255'],
            'phone' => ['required', 'string', 'min:6', 'max:40'],
            'clientType' => ['required', 'string', 'max:100'],
            'interest' => ['required', 'string', 'max:150'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
            'contactMethod' => ['required', 'string', 'max:100'],
            'locale' => ['nullable', 'in:de,en'],
            'sourceUrl' => ['nullable', 'url', 'max:1000'],
            'privacy' => ['accepted'],
            'website' => ['prohibited'],
        ];
    }
}
