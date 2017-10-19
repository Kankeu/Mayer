<?php

namespace App\Http\Controllers;

use App\Article;
use Elasticsearch\ClientBuilder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class SearchController extends Controller
{

    public function autocomplete(string $cles){
        $client = ClientBuilder::create()->build();
        $articles = $client->search([
            "index" => "baseusers",
            "type" => "articles",
            "body" => [
                "query" => [
                    "query_string" => [
                        "query" => "nom:$cles~",
                        "query" => "description:$cles~"
                    ]
                ]
            ]
        ]);
        $articles = $articles['hits']['hits'];
        return Response::json($articles);
    }

    public function search(string $cles){
        $client = ClientBuilder::create()->build();
        $articles = $client->search([
            "index" => "baseusers",
            "type" => "articles",
            "body" => [
                "query" => [
                    "query_string" => [
                        "query" => "nom:$cles~",
                        "query" => "description:$cles~"
                      ]
                    ]
                ]
        ]);
        $articles = $articles['hits']['hits'];
        $id = [];
        foreach ($articles as $article){
            $id[$article['_id']] = $article['_id'];
        }
        $reponse = Article::with(['user','likes', 'images','panier','dimension'])
            ->withCount(['commentaires' => function($query){
                $query->whereNull('parent_id');
            },'likes','likes AS liked' => function ($query) {
                $query->where('user_id', Auth::id());
            }, 'panier AS commander' => function ($query) {
                $query->where('user_id', Auth::id())->whereNull('reponse');
            }])
            ->whereIn('id', $id)
            ->orderBy('created_at','desc')
            ->limit(6)
            ->get();
        return Response::json($reponse);
    }
}
