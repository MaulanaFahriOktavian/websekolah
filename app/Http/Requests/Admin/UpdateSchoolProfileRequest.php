<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSchoolProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * Route-level auth middleware already handles authorization.
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
            'name' => ['required', 'string', 'max:255'],
            'short_name' => ['nullable', 'string', 'max:50'],
            'npsn' => ['nullable', 'string', 'max:10'],
            'level' => ['nullable', 'string', 'max:100'],
            'status' => ['nullable', 'string', 'max:100'],
            'address' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:255'],
            'website' => ['nullable', 'url', 'max:255'],
            'logo_path' => ['nullable', 'string', 'max:500'],
            'favicon_path' => ['nullable', 'string', 'max:500'],
            'founded_year' => ['nullable', 'integer', 'min:1900', 'max:'.date('Y')],
            'accreditation' => ['nullable', 'string', 'max:10'],
            'principal_name' => ['nullable', 'string', 'max:255'],
            'principal_photo_path' => ['nullable', 'string', 'max:500'],
            'vision' => ['nullable', 'string'],
            'mission' => ['nullable', 'string'],
            'history' => ['nullable', 'string'],
        ];
    }
}
