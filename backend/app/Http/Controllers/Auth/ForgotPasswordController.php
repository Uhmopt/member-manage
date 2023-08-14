<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\APIController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use App\History;

class ForgotPasswordController extends APIController
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Send a reset link to the given user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function email(Request $request)
    {

        $validator = Validator::make(
            $request->only('email'),
            ['email' => 'required|string|email|max:255|exists:users,email'],
            ['exists' => "We couldn't find an account with that email."]
        );

        if ($validator->fails()) {
            return $this->responseUnprocessable($validator->errors());
        }

        $email = $request->input('email');

        $response = $this->sendResetLinkEmail($request);

        if ($response) {
            History::create([
                'platform' => 'ALL',
                'date' => date('Y-m-d h:i:s'),
                'adviser_id' => '',
                'client_id' => '',
                'type' => 'reset password',
                'target_id' => 'login',
                'target_data' => '',
                'description' => 'The email address ' . $email . 'had requested reset password.',
            ]);
            return $this->responseSuccess('Email reset link sent.');
        } else {
            return $this->responseServerError();
        }
    }
}
