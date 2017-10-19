<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticlesStoreRequest extends FormRequest
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
        $rules =  [
            "nom"=>"required",
            "prix"=>"required",
            "description"=>"required",
            "photos.*"=>"required|mimes:jpeg,jpg,gif,png|max:2050"
        ];
        return $rules;
    }
}
