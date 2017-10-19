<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Like;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class LikesController extends Controller
{

    public function article(int $id){
      $like = Like::where('article_id', $id)->where('user_id', Auth::id())->first();
      if($like)
      {
         $like->delete();
      }else{
         Like::create(['article_id' => $id,'user_id' => Auth::id(),'vote' => 1]);
      }
      return Response::json(['status'=>'ok']);
    }

    public function commentaire(int $id){
      $like = Like::where('commentaire_id', $id)->where('user_id', Auth::id())->first();
      if($like)
      {
         $like->delete();
      }else{
         Like::create(['commentaire_id' => $id,'user_id' => Auth::id(),'vote' => 1]);
      }
      return Response::json(['status'=>'ok']);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        //
    }
}
