<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ConnexionController extends Controller
{

    public function connexion(Request $request)
    {
        $user = $request->all();
        $auth = Auth::attempt(["email" => $user['email'],"password" => $user['password'], "confirmation_token" => null],true);
        if(Auth::check())
        {
            return redirect('/home');
        }else{
            return view('welcome');
        }
    }
}
