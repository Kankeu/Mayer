<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = ['user_id', 'nom', 'prix', 'description',];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
    public function likes()
    {
        return $this->hasMany('App\Like');
    }
    public function commentaires()
    {
        return $this->hasMany('App\Commentaire');
    }
    public function panier()
    {
        return $this->hasMany('App\Panier');
    }
    public function images(){
        return $this->hasMany('App\Image');
    }
    public function dimension(){
        return $this->hasOne('App\Dimension');
    }
}
