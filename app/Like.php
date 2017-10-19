<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    //class relier a la table likes des articles
    protected $fillable = ['article_id','user_id','commentaire_id','vote'];
}
