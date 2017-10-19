<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class ViewsController extends Controller
{
    public function accueil(){
        if(Auth::check()){
            return redirect()->route('home');
        }else{
            return view('welcome');
        }
    }

    public function compte(){
        return view('boutique');
    }
}
