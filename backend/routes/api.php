<?php

use App\Http\Controllers\Api\V1\AnalyticsController;
use App\Http\Controllers\Api\V1\BlogPostController;
use App\Http\Controllers\Api\V1\CampaignController;
use App\Http\Controllers\Api\V1\ContactRequestController;
use App\Http\Controllers\Api\V1\DigitalCardController;
use App\Http\Controllers\Api\V1\NavigationController;
use App\Http\Controllers\Api\V1\PageController;
use App\Http\Controllers\Api\V1\SiteSettingController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('/campaigns/{slug}', [CampaignController::class, 'show']);
    Route::post('/campaigns/{slug}/leads', [CampaignController::class, 'store'])->middleware('throttle:campaign-leads');
    Route::get('/pages/{locale}/{key}', PageController::class)
        ->whereIn('locale', ['de', 'en'])
        ->where('key', '.*');
    Route::get('/blog-posts/{locale}', [BlogPostController::class, 'index'])
        ->whereIn('locale', ['de', 'en']);
    Route::get('/blog-posts/{locale}/{slug}', [BlogPostController::class, 'show'])
        ->whereIn('locale', ['de', 'en']);
    Route::get('/navigation/{locale}', NavigationController::class)
        ->whereIn('locale', ['de', 'en']);
    Route::get('/site-settings', SiteSettingController::class);
    Route::get('/digital-cards/{slug}', DigitalCardController::class);
    Route::post('/contact-requests', ContactRequestController::class)
        ->middleware('throttle:10,1');
    Route::post('/analytics', AnalyticsController::class)
        ->middleware('throttle:120,1');
});
