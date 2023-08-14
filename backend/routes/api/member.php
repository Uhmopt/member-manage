<?php

// -----------------------------------------------------------------
// Member routes Member
// -----------------------------------------------------------------
// --------------------------------------------------------------------
// routes for Member
// url prefix Member
// name Member.
// --------------------------------------------------------------------
Route::group(
    [
        'prefix' => 'member',
        'as' => 'Member.',
    ],
    function () {
        Route::post('get', 'MemberController@index')->name('get');
        Route::post('show/{id}', 'MemberController@show')->name('show');
        Route::post('store', 'MemberController@store')->name('store');
        Route::post('batchstore', 'MemberController@batchStore')->name('batchStore');
        Route::post('update/{id?}', 'MemberController@update')->name(
            'update'
        );
        Route::post('delete/{id?}', 'MemberController@destroy')->name(
            'delete'
        );
    }
);
