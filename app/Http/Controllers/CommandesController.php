<?php

namespace App\Http\Controllers;

use App\Article;
use App\Events\CommandeEvent;
use App\Panier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class CommandesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $commandes = Panier::where('etat',true)
            ->whereNull('reponse')
            ->whereHas('article',function($query){
                $query->where('user_id', Auth::id());
            })
            ->with('user','article')
            ->paginate(3);
        return Response::json($commandes);
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $commandes = Panier::where('etat',true)
            ->whereNull('reponse')
            ->whereHas('article',function($query){
                $query->where('user_id', Auth::id());
            })
            ->with('user','article')
            ->paginate(2);
        return Response::json($commandes);
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
    public function update(Request $request, Panier $commande)
    {
        if($commande->reponse === null)
        {
            //$commande->update(['reponse'=>true]);
            $nom = strtoupper(Auth::user()->name);
            $message = "$nom a repondu à votre commande";
            $event = new CommandeEvent(['commande'=>$commande, 'message'=>$message]);
            broadcast($event);
            return Response::json(['status'=>$commande]);
        }
        return Response::json(['status'=>'repeat']);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Panier $commande)
    {
        $commande->update(['reponse'=>false]);
        $nom = strtoupper(Auth::user()->name);
        $message = "$nom a annuler votre commande";
        $event = new CommandeEvent(['commande'=>$commande, 'message'=>$message]);
        broadcast($event)->toOthers();
        return Response::json(['status'=>$commande]);
    }

    /**
     * get commandes of user from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function notify()
    {
        $number = Article::where('user_id', Auth::id())
            ->whereHas('panier', function ($query){
                $query->where('etat',true)->whereNull('reponse');
            })->count();
        if($number > 0)
        {
            $pluriel = ($number > 1) ? 'commandes' : 'commande';
            $message= ['message' => "Vous avez $number $pluriel en file d'attente"];
            return Response::json($message);
        }
        return Response::json(['status'=>'empty']);
    }
}
