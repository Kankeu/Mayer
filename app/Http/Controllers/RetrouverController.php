<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RetrouverController extends Controller
{
    //gestion des boutique et supermarche
    public function index()
    {
        return view('boutique/Retrouver');
    }
}
