<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/','ViewsController@accueil');
Route::post('/','ConnexionController@connexion');
Route::get('/inscription','ViewsController@accueil');
Route::get('user/confirmer/{choix}','UserController@confirmer')->where('choix', '[A-Za-z]+');;
Route::get('user/confirmation/{id}/{token}','UserController@confirmation')->where('id','[0-9]*');
Route::resource('/user','UserController');
Route::group(['prefix'=>'/','middleware' => 'user'], function (){
    Route::get('/panier','ViewsController@compte');
    Route::get('/commandes','ViewsController@compte');
    Route::get('/boutique','ViewsController@compte');
    Route::get('/home','ViewsController@compte')->name('home');
    Route::get('/magazin','MagazinController@index');
    Route::resource('/article', 'ArticlesController');
    Route::get('/loadmore/{id}', 'ArticlesController@loadmore')->where('id','[0-9]*');
    Route::resource('/user', 'UserArticlesController');
    Route::resource('/panier','PanierController');
    Route::resource('/commandes', 'CommandesController');
    Route::resource('/articles', 'ArticlesController');
    Route::get('/autocomplete/{cles}', 'SearchController@autocomplete');
    Route::get('/search/{cles}', 'SearchController@search');
    Route::resource('/dimension', 'DimensionArticlesController');
    Route::group(['prefix'=>'/like'],function (){
        Route::get('article/{id}','LikesController@article')->where('id','[0-9]*');
        Route::get('commentaire/{id}','LikesController@commentaire')->where('id','[0-9]*');
    });
    Route::get('/commentslike/{id}', 'CommentslikesController@index')->where('id','[0-9]*');
    Route::group(['prefix'=>'/comments/{article}'],function (){
        Route::resource('/', 'CommentsController',['only'=>['index','store']]);
        Route::delete('/{parent}', 'CommentsController@destroy')->where('parent','[0-9]*');
        Route::get('/{parent}', 'CommentsController@show')->where('parent','[0-9]*');
        Route::get('/loadmore/{parent}', 'CommentsController@loadMore')->where('parent','[0-9]*');
    });
    Route::get('/commandes/notify', 'CommandesController@notify');
    Route::get('/profil','ProfilController@index')->name('boutique.profil');
    Route::get('/deconnection','DeconnectionController@index')->name('boutique.deconnection');
});
