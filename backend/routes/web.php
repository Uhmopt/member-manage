<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where the routes are registered for our application.
|
*/

// url test
Route::get('/test', 'TestController@index');
Route::post('/test', 'TestController@index');
Route::get('/test-action', 'TestController@testAction');

// Named route required for SendsPasswordResetEmails.
// Route::get('reset-password', function() {
//     return view('index');
// })->name('password.reset');

// Catches all other web routes.
// Route::get('{slug}', function () {
//     return view('index');
// })->where('slug', '^(?!api).*$');

// Route::get('/', 'home@index');
Route::get('/{any}', 'home@index')->where('any', '^(?!api).*$');
