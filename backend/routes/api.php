<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group.
|
*/

// Not Found
// Route::fallback(function(){
//     return response()->json(['message' => 'Resource not found.'], 404);
// });


// from here routes that can be used in front end
// all api routes
Route::group(
  ['prefix' => 'v1'],
  function() {
    includeRouteFiles(__DIR__.'//api//');
  }
);
