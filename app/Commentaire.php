<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Commentslike;
use Illuminate\Support\Facades\Auth;

class Commentaire extends Model
{
    //commentaires des articles
    protected $fillable = ['user_id', 'article_id', 'commentaire', 'parent_id'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
    public function article()
    {
        return $this->belongsTo('App\Article');
    }
    public function reponses()
    {
        return $this->hasMany('App\Commentaire','parent_id')
            ->with('user')
            ->withCount(['likes','likes AS liked' => function ($query) {
                $query->where('user_id', Auth::id());
              }]);
    }

    public function previewsreponse()
    {
        return $this->hasOne('App\Commentaire','parent_id')
            ->with('user')
            ->withCount(['likes','likes AS liked' => function ($query) {
                $query->where('user_id', Auth::id());
            }])
            ->orderBy('likes_count','desc');
    }

    public function likes()
    {
        return $this->hasMany('App\Like');
    }
}
