<?php

use App\Http\Controllers\Api\V1\BlogPostController;
use App\Http\Controllers\Api\V1\ContactRequestController;
use App\Http\Controllers\Api\V1\NavigationController;
use App\Http\Controllers\Api\V1\PageController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('/pages/{locale}/{key}', PageController::class)
        ->whereIn('locale', ['de', 'en'])
        ->where('key', '.*');
    Route::get('/blog-posts/{locale}', [BlogPostController::class, 'index'])
        ->whereIn('locale', ['de', 'en']);
    Route::get('/blog-posts/{locale}/{slug}', [BlogPostController::class, 'show'])
        ->whereIn('locale', ['de', 'en']);
    Route::get('/navigation/{locale}', NavigationController::class)
        ->whereIn('locale', ['de', 'en']);
    Route::post('/contact-requests', ContactRequestController::class)
        ->middleware('throttle:10,1');
});
