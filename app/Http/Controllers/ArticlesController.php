<?php

namespace App\Http\Controllers;

use App\Article;
use App\Http\Requests\ArticlesStoreRequest;
use App\Image;
use App\Jobs\ElasticDeleteArticle;
use App\Jobs\ElasticSaveArticle;
use App\Panier;
use App\User;
use App\Like;
use Elasticsearch\ClientBuilder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use App\Jobs\ResizeImage;

class ArticlesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //recuperation des articles de la page home
        $articles=Article::with(['user','likes', 'images','panier' => function ($query) {
            $query->where('user_id', Auth::id())->whereNull('reponse');
            },'dimension'])
            ->withCount(['commentaires' => function($query){
                $query->whereNull('parent_id');
            },'likes','likes AS liked' => function ($query) {
                $query->where('user_id', Auth::id());
            }, 'panier'])
            ->orderBy('created_at','desc')
            ->limit(6)
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
    public function store(ArticlesStoreRequest $request)
    {
        $data = $request->except('photos');
        $data['user_id'] = Auth::id();
        $article = Article::create($data);
        foreach ($request->photos as $key=> $photo){
            $extension = $photo->getClientOriginalExtension();
            $name = Auth::id().$key.microtime().'.'.$extension;
            $path = 'img/articles/'.$name;
            $photo_path = URL::asset($path);
            $path = $photo->move(public_path('img/articles/'), $name);
            Image::create(['article_id'=>$article->id,'path'=>$photo_path]);
            $this->dispatch(new ResizeImage($path, [0=>['w'=>800,'h'=>600]]));
        }
        $this->dispatch(new ElasticSaveArticle($article));
        return Response::json($article);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $articles = Article::where('id', '<', $id)
            ->with(['user','likes', 'images', 'panier','dimension'])
            ->withCount(['commentaires' => function($query){
                $query->whereNull('parent_id');
            },'likes','likes AS liked' => function ($query) {
                $query->where('user_id', Auth::id());
            }, 'panier AS commander' => function ($query) {
                $query->where('user_id', Auth::id())->whereNull('reponse');
            }])
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();
        return Response::json($articles);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Article $article)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article $article)
    {
        if($article->user_id === Auth::id()){
            $article->delete();
            $this->dispatch(new ElasticDeleteArticle($article->id));
        }
        return Response::json(['statut'=>'ok']);
    }

    /**
     * @param $id int
     * id of last sended acticle
     */
    public function loadmore($id)
    {
        $articles = Article::where('id', '<', $id)
            ->with(['user','likes', 'images', 'panier','homedimension'])
            ->withCount(['commentaires' => function($query){
                $query->whereNull('parent_id');
            },'likes','likes AS liked' => function ($query) {
                $query->where('user_id', Auth::id());
            }, 'panier AS commander' => function ($query) {
                $query->where('user_id', Auth::id())->whereNull('reponse');
            }])
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();
        return Response::json($articles);
    }
}
