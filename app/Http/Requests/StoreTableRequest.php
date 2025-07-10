<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTableRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'location_id' => 'required|exists:locations,id',
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('tables')->where(function ($query) {
                    return $query->where('location_id', $this->location_id);
                }),
            ],
            'seats' => 'required|integer|min:1',
            // Az alábbi mezők csak akkor kellenek, ha nem akarod defaultként 0/60-ra bízni
            // 'pos_x' => 'nullable|integer|min:0',
            // 'pos_y' => 'nullable|integer|min:0',
            // 'width' => 'nullable|integer|min:1',
            // 'height' => 'nullable|integer|min:1',
        ];
    }
}
