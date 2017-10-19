<?php

namespace App\Http\Controllers;

use App\Notifications\ConfirmEmail;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\SignPostRequest;
use Illuminate\Support\Facades\Hash;
use App\User;
use Auth;

class InscriptionController extends Controller
{
    public function index()
    {
        return view("welcome");
    }

    public function inscription(SignPostRequest $request)
    {
        $data = $request->all();
        $data['password'] = Hash::make($data['password']);
        Auth::login(User::create($data));
        if($data['choix']== "Email")
        {
            $this->email();
            $success = ['Bravo inscription reussie, nous avons envoyez un Email de confirmation vers votre adresse!.'];
            return back()->with("success",$success);
        }elseif ($data['choix'] == "SMS")
        {
            $this->sms();
        }
    }

    public function email()
    {
        $confirmation_token = str_replace(['/','?'],'',Hash::make(str_random(16)));
        $user = Auth::user();
        $user->confirmation_token = $confirmation_token;
        $user->save();
        $user->notify(new ConfirmEmail());
    }
    public function sms()
    {
        $confirmation_token = "dddd";
        $user = Auth::user();
        $user->confirmation_token = $confirmation_token;
        $user->save();
        $success = ["Bravo plus qu'une étape avant la fin de l'inscription!"];
        return redirect()->route('confirm.index')->with("success",$success);
    }
}
