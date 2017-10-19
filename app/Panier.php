<?php

namespace App;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

class Panier extends Model
{
    protected $fillable = ['user_id','article_id','etat', 'reponse', 'quantite','message'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function article()
    {
       return $this->belongsTo('App\Article')
           ->with('user','images')
           ->orderBy('updated_at','desc');
    }
}
