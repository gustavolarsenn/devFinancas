<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckSession
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (!$request->session()->has('username')) {
            // redirect to login page or show an error
            return redirect('login');
        }

        return $next($request);
    }

    public function checkSession(Request $request)
    {
        if (!$request->session()->has('username')) {
            // redirect to login page or show an error
            return response()->json(['message' => 'Session not found. Please login.', 'access' => false]);

        }
        return response()->json(['message' => 'Session found. Welcome back!', 'access' => true, 'username' => $request->session()->get('username')]);
    }
}