<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\APIController;

use App\User;

class LoginController extends APIController
{
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $email = request('email');
        $name = request('name');
        $password = request('password');

        $is_mya = request('is_mya');
        $is_p2p = request('is_p2p');

        if ($email == '') {
            $name = request('name');
            $user = User::where([['name', '=', $name]])->first();
            if ($user != null) {
                $email = $user->email;
            }
        }

        $credentials = ['email' => $email, 'password' => $password];
        $user = User::where(['email' => $email])
            ->first();

        if (!($token = auth()->attempt($credentials))) {
            return $this->responseUnauthorized();
        }

        return response()->json(
            [
                'status' => 200,
                'message' => 'Authorized.',
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' =>
                auth()
                    ->factory()
                    ->getTTL() * 60,
                'user' => $user,
            ],
            200
        );
    }
}
