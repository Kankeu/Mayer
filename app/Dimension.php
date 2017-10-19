<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dimension extends Model
{
    protected $fillable = ['article_id', 'x', 'y'];
}
