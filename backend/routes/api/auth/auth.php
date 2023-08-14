<?php

  // -----------------------------------------------------------------
  // auth routes auth
  // -----------------------------------------------------------------
  // --------------------------------------------------------------------
  // routes for auth
  // url prefix auth
  // name auth.
  // --------------------------------------------------------------------
  Route::group(
    [
      'prefix' => 'auth',
      'as' => 'auth.',
    ],
    function() {
      Route::post('login', 'Auth\LoginController@login')->name('login');
      Route::post('logout', 'Auth\LogoutController@logout')->name('logout');
      Route::post('register', 'Auth\RegisterController@register')->name('register');
      Route::post('forgot-password', 'Auth\ForgotPasswordController@email')->name('forgetpassword');
      Route::post('password-reset', 'Auth\ResetPasswordController@reset')->name('reset');
    }
  );

?>
