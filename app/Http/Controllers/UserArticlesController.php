<?php

namespace App\Http\Controllers;

use App\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class UserArticlesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $articles = Article::with(['user','images','dimension','panier' => function ($query) {
            $query->where('user_id', Auth::id())->whereNull('reponse');
            }])
            ->where('user_id', Auth::id())
            ->withCount(['commentaires' => function($query){
                $query->whereNull('parent_id');
            },'likes','likes AS liked' => function ($query) {
                $query->where('user_id', Auth::id());
            },'panier'])
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
        $articles = Article::where('id', '<', $id)
            ->with(['user','likes', 'images', 'panier','dimension'])
            ->withCount(['commentaires' => function($query){
                $query->whereNull('parent_id');
            },'likes','likes AS liked' => function ($query) {
                $query->where('user_id', Auth::id());
            }, 'panier' => function ($query) {
                $query->where('user_id', Auth::id())->whereNull('reponse');
            }])
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();
        return Response::json((count($articles)>0) ? $articles : ["status"=>"end"]);
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
}
