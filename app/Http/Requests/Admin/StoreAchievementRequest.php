<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreAchievementRequest extends FormRequest
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
        $currentYear = (int) date('Y');

        return [
            'title' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:100'],
            'level' => ['nullable', 'string', 'max:100'],
            'year' => ['nullable', 'integer', 'min:1900', 'max:'.($currentYear + 1)],
            'achievement_date' => ['nullable', 'date'],
            'recipient' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'photo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ];
    }
}
