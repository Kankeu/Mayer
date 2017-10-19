<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MagazinController extends Controller
{
    //enregistrement des articles
    public function index()
    {
        return view('boutique/magazin');
    }
}
