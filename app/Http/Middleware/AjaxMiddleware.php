<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AjaxMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->ajax()) {
            return response()->json([
                'success' => false,
                'message' => 'AJAX request only.',
            ], 406);
        }

        return $next($request);
    }
}
