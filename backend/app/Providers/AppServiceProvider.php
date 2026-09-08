<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('campaign-leads', function (Request $request) {
            return [
                Limit::perMinute(120)->by('campaign-ip:'.$request->ip()),
                Limit::perMinute(5)->by('campaign-email:'.hash('sha256', strtolower((string) $request->input('email')))),
            ];
        });
    }
}
