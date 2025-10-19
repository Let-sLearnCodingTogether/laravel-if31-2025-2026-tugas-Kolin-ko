<?php

use App\Http\Controllers\Auth\AuthenticationController;
use App\Http\Controllers\NoteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function (){
    Route::post('/login', [AuthenticationController::class, 'login']);
    Route::post('/register', [AuthenticationController::class, 'register']);
});

Route::middleware('auth:sanctum')->group(function (){
    Route::post('/logout', [AuthenticationController::class, 'logout']);
    Route::apiResource('note', NoteController::class);
});




Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
