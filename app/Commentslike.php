<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Commentslike extends Model
{
    // model for table commentslikes which containt like of comments from articles
    protected $fillable = ['commentaire_id','user_id','vote'];
}
