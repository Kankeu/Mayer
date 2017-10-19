<?php

namespace App\Http\Controllers;

use App\Commentaire;
use App\Http\Requests\CommentsStoreRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;

class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(int $article)
    {
        //Get comments of articles
        $comments = Commentaire::where('article_id',$article)
            ->whereNull('parent_id')
            ->with('user','previewsreponse')
            ->withCount(['reponses','likes','likes AS liked' => function ($query) {
                $query->where('user_id', Auth::id());
            }])
            ->orderBy('reponses_count','desc')
            ->paginate(20);
        return Response::json($comments);
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
    public function store(CommentsStoreRequest $request)
    {
        //enregistrer les commentaires et les reponses des commentaires
        $comment = Commentaire::create($request->all()+['user_id'=>Auth::id()]);
        $comment = Commentaire::where('id',$comment->id)
            ->with('reponses')
            ->withCount(['reponses','likes','likes AS liked' => function ($query) {
                $query->where('user_id', Auth::id());
            }])
            ->get();
        return Response::json($comment);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $article, int $parent)
    {
        $comments = Commentaire::where('article_id',$article)
            ->where('parent_id',$parent)
            ->with('user')
            ->withCount(['likes','likes AS liked' => function ($query) {
                $query->where('user_id', Auth::id());
            }])
            ->orderBy('likes_count','desc')
            ->get();
        return Response::json($comments);
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
    public function destroy(int $article, Commentaire $parent)
    {
        if($parent->user_id === Auth::id())
        {
            $parent->reponses()->delete();
            $parent->delete();
            return Response::json(['statut'=>'ok']);
        }
    }

    public function loadMore(int $article, int $parent)
    {
        $comments = Commentaire::where('article_id',$article)
            ->whereNull('parent_id')
            ->where('id','>',$parent)
            ->with('user','previewsreponse')
            ->withCount(['reponses','likes','likes AS liked' => function ($query) {
                $query->where('user_id', Auth::id());
            }])
            ->orderBy('created_at','asc')
            ->limit(20)
            ->get();
        return Response::json($comments);
    }
}
