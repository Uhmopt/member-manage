<?php

// -----------------------------------------------------------------
// Table routes Table
// -----------------------------------------------------------------
// --------------------------------------------------------------------
// routes for Table
// url prefix Table
// name Table.
// --------------------------------------------------------------------
Route::group(
    [
        'prefix' => 'table',
        'as' => 'Table.',
    ],
    function () {
        Route::post('get', 'TableController@index')->name('get');
        Route::post('show/{id}', 'TableController@show')->name('show');
        Route::post('store', 'TableController@store')->name('store');
        Route::post('batchstore', 'TableController@batchStore')->name('batchStore');
        Route::post('update/{id?}', 'TableController@update')->name(
            'update'
        );
        Route::post('delete/{id?}', 'TableController@destroy')->name(
            'delete'
        );
    }
);
