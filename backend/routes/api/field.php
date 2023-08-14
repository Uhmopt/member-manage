<?php

// -----------------------------------------------------------------
// Field routes Field
// -----------------------------------------------------------------
// --------------------------------------------------------------------
// routes for Field
// url prefix Field
// name Field.
// --------------------------------------------------------------------
Route::group(
    [
        'prefix' => 'field',
        'as' => 'Field.',
    ],
    function () {
        Route::post('get', 'FieldController@index')->name('get');
        Route::post('show/{id}', 'FieldController@show')->name('show');
        Route::post('store', 'FieldController@store')->name('store');
        Route::post('batchstore', 'FieldController@batchStore')->name('batchStore');
        Route::post('update/{id?}', 'FieldController@update')->name(
            'update'
        );
        Route::post('delete/{id?}', 'FieldController@destroy')->name(
            'delete'
        );
    }
);
