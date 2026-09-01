<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreContactMessageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Guest submissions allowed for contact form
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
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:100'],
            'phone' => ['nullable', 'string', 'max:20'],
            'subject' => ['required', 'string', 'max:150'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
        ];
    }

    /**
     * Get custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama harus diisi.',
            'name.max' => 'Nama tidak boleh lebih dari 100 karakter.',
            'email.required' => 'Email harus diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.max' => 'Email tidak boleh lebih dari 100 karakter.',
            'phone.max' => 'Nomor telepon tidak boleh lebih dari 20 karakter.',
            'subject.required' => 'Subjek/topik harus diisi.',
            'subject.max' => 'Subjek tidak boleh lebih dari 150 karakter.',
            'message.required' => 'Pesan harus diisi.',
            'message.min' => 'Pesan minimal harus 10 karakter.',
            'message.max' => 'Pesan tidak boleh lebih dari 5000 karakter.',
        ];
    }
}
