<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DeconnectionController extends Controller
{
    //deconnection de l'utilisateur
    public function index()
    {
        Auth::logout();
        return redirect()->route('connexion.index');
    }
}
