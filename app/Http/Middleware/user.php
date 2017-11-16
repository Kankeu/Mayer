<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;

class user 
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     * @return l'object redirect
     */
    public function handle($request, Closure $next)
    {
        if(Auth::check())
        {
            if($request->ajax()){
                return $next($request);
            }else{
                return new Response(view('boutique'));
            }
            
        }else{
            return redirect('/');
        }

    }
}
