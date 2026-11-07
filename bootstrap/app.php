<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\GuestMiddleware;
use App\Http\Middleware\CheckRoleMiddleware;
use App\Http\Middleware\AuthMiddleware;
use App\Http\Middleware\AjaxMiddleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {

        // Web middleware
        $middleware->web(append: [
            HandleInertiaRequests::class,
        ]);

        // Register middleware aliases
        $middleware->alias([
            'guest.custom' => GuestMiddleware::class,
            'role' => CheckRoleMiddleware::class,
            'auth.custom' => AuthMiddleware::class,
            'ajax' => AjaxMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {

        $exceptions->shouldRenderJsonWhen(
            fn(Request $request) =>
            $request->is('api/*') || $request->expectsJson(),
        );
    })->create();
