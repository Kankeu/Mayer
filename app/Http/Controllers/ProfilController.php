<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfilController extends Controller
{
    //gestion du profil
    public function index()
    {
        return view('boutique/profil');
    }
}
