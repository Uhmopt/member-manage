<?php

// -----------------------------------------------------------------
// AccessControl routes AccessControl
// -----------------------------------------------------------------
// --------------------------------------------------------------------
// routes for AccessControl
// url prefix AccessControl
// name AccessControl.
// --------------------------------------------------------------------
Route::group(
    [
        'prefix' => 'accesscontrol',
        'as' => 'AccessControl.',
    ],
    function () {
        Route::post('get', 'AccessControlController@index')->name('get');
        Route::post('show/{id}', 'AccessControlController@show')->name('show');
        Route::post('store', 'AccessControlController@store')->name('store');
        Route::post('update/{id?}', 'AccessControlController@update')->name(
            'update'
        );
        Route::post('delete/{id?}', 'AccessControlController@destroy')->name(
            'delete'
        );
    }
);
