<?php

namespace App\Http\Controllers;

use App\Currency;
use App\Http\Requests\SignPostRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SignPostRequest $request):\Illuminate\Http\JsonResponse
    {
        $data = $request->except('currency');
        $data['password'] = Hash::make($data['password']);
       // $user = User::create($data);
        $currency = $request->input('currency');
        //Currency::create(['user_id'=>$user->id,'currency'=>$currency]);
        //session(['id'=>$user->id]);
        return Response::json(['status'=>'ok']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function confirmer(string $choix):\Illuminate\Http\JsonResponse
    {
        $confirmation_token = str_replace(['/','?'],'',Hash::make(str_random(16)));
        $user = User::find(session('id'));
        $user->confirmation_token = $confirmation_token;
        $user->save();
        if($choix === "email")
        {
            $user->notify(new ConfirmEmail());
        }else if($choix === "sms"){
            //
        }
        return Response::json(['status'=>true]);
    }

    /**
     * @param int $id
     * @param string $token
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function confirmation(int $id, string $token)
    {
        $user = User::where('id',$id)->where('confirmation_token',$token)->first();
        if ($user) {
            $user->confirmation_token = null;
            $user->save();
            Auth::login($user);
            session(['id'=>null]);
            return redirect()->route('home');
        } else {
            return redirect('/');
        }
    }
}
