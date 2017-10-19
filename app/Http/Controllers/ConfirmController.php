<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;
use Image;
use Auth;
use App\User;
use App\Jobs\ResizeImage;

class ConfirmController extends Controller
{
    //confirmation de l'inscription et ajout de la photo de profil
    public function index()
    {
        return view("accueil/confirmSms");
    }
    public function confirmation($id,$token)
    {
        $user = User::where('id',$id)->where('confirmation_token',$token)->first();
            if ($user   AND !Session::get('keep') == "ok") {
                $user->confirmation_token = null;
                $user->save();
                Auth::login($user);
                $user = Auth::user();
                Session::put('keep', 'ok');
                $success = ["Bravo $user->nom $user->prenom. Votre compte a été confirmer avec success"];
                Session::flash('success', $success);
                return view("accueil/confirmEmail");
            } elseif(!$user AND !Session::get('keep') == "ok")
            {
                return redirect()->route('connexion.index');
            }elseif(Session::get('keep') == "ok")
            {
                return view("accueil/confirmEmail");
            }
    }
    public function terminer(Request $request)
    {
        if($request->hasFile('photo'))
        {
            $photo = $request->file('photo');
            $extension = $photo->getClientOriginalExtension();
            $this->photo($photo,$extension);
            $photo = $request->file('photo');
        }
        $user = Auth::user();
        Session::put('keep','');
        return redirect()->route('boutique.home');
    }
    public function photo($photo,$extension)
    {
       $name = Auth::id().time().'.'.$extension;
       $path = 'img/profils/'.$name;
       $photo_path = URL::asset($path);
       $path = $photo->move(public_path('img/profils/'), $name);
       $this->dispatch(new ResizeImage($path, [0=>['w'=>800,'h'=>600]]));
       $user = Auth::user();
       if($path){
           $user->avatar = $photo_path;
           $user->save();
       }
    }
}
