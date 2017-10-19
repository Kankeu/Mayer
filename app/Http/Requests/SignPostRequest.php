<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "name"=>"required|string",
            "forename"=>"required|string",
            "email"=>"required|email|unique:users",
            "birthday"=>"required",
            "sex"=>"required|string",
            "country"=>"required|string",
            "currency"=>"required|string",
            "number"=>"required|integer",
            "password"=>"required|string|min:8",
            "confirm"=>"required|string|min:8|same:password"
        ];
    }
}
