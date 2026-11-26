<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {

        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(300)
                ->by($request->user()?->id ?: $request->ip());
        });

        ResetPassword::createUrlUsing(function ($user, string $token) {
            return rtrim(config('app.frontend_url'), '/')
                . '/reset-password?token=' . urlencode($token)
                . '&email=' . urlencode($user->getEmailForPasswordReset());
        });

    }
}
