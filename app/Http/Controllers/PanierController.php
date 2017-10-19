<?php

namespace App\Http\Controllers;

use App\Article;
use App\Events\CommandeEvent;
use App\Http\Requests\PanierRequest;
use App\Panier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class PanierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $articles=Panier::with('article')
            ->where('etat',false)
            ->where('user_id',Auth::id())
            ->orderBy('created_at','desc')
            ->get();
        return Response::json($articles);
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
    public function store(PanierRequest $request)
    {
        $commande = Panier::create(['user_id' => Auth::id(),'article_id' => $request->input('article_id'), 'etat' => false, 'quantite'=>1]);
        return Response::json([$commande]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        $articles=Panier::with('article')
            ->where('etat',false)
            ->where('id','<',$id)
            ->where('user_id',Auth::id())
            ->orderBy('created_at','desc')
            ->get();
        return Response::json($articles);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(int $id)
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
    public function update(PanierRequest $request, Panier $panier)
    {
        if($panier->etat === 0)
        {
           // $panier->update(['etat'=>true, 'quantite' => $request->input('quantite'),'message'=>$request->input('message')]);
            $nom = strtoupper(Auth::user()->name);
            $message = "Vous avez 1 nouvelle commande de $nom";
            $event = new CommandeEvent(['commande'=>$panier, 'message'=>$message]);
            broadcast($event);
            return Response::json(['status'=>'ok']);
        }
        return Response::json(['status'=>'repeat']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Panier $panier)
    {
        $panier->delete();
        return Response::json(['status' => 'ok']);
    }
}
