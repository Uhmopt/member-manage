<?php

namespace App\Http\Controllers\APIs;

use App\Http\Controllers\APIController;
use Illuminate\Http\Request;
use App\AccessControl;
use App\FinancialAdviserDetail;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AccessControlController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Get user from $request token.
        if (
            !($user = auth()
                ->setRequest($request)
                ->user())
        ) {
            return $this->responseUnauthorized();
        }

        $user_id = $request->input('user_id');

        $collection = AccessControl::where([
            'user_id' => $user_id,
        ])->first();

        return json_encode($collection);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Get user from $request token.
        if (
            !($user = auth()
                ->setRequest($request)
                ->user())
        ) {
            return $this->responseUnauthorized();
        }
        $data = $request->input('data');

        $row = AccessControl::where(['user_id' => $data['user_id']])->first();
        if (!$row) {
            $row = new AccessControl();
        }

        $row->fill($data);
        $row->save();

        return json_encode($row);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeAccessUser(Request $request)
    {
        // Get user from $request token.
        if (
            !($user = auth()
                ->setRequest($request)
                ->user())
        ) {
            return $this->responseUnauthorized();
        }
        $data = $request->input('data');

        $adviser_detail = FinancialAdviserDetail::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name']
        ]);

        $user  =  User::create([
            'name' => $data['email'],
            'email' => $data['email'],
            'password' => Hash::make("123456"),
            'user_type_id' => 1, // default user type is client from frontend register
            'user_detail_type' => 'App\FinancialAdviserDetail',
            'user_detail_id' => $adviser_detail->id,
        ]);


        $row = AccessControl::create([
            'user_id' => $user->id,
            'role' => $data['access']
        ]);

        return json_encode($row);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        if (
            !($user = auth()
                ->setRequest($request)
                ->user())
        ) {
            return $this->responseUnauthorized();
        }

        $collection = AccessControl::where([
            'id' => $id,
        ])->first();

        return json_encode($collection);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Get user from $request token.
        if (
            !($user = auth()
                ->setRequest($request)
                ->user())
        ) {
            return $this->responseUnauthorized();
        }
        $data = $request->input('data');

        $row = AccessControl::where(['id' => $id])->first();
        $row->fill($data);
        $row->save();

        return json_encode($row);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        // Get user from $request token.
        if (
            !($user = auth()
                ->setRequest($request)
                ->user())
        ) {
            return $this->responseUnauthorized();
        }

        $ret = AccessControl::where([['id', '=', $id]])->delete();

        return json_encode($ret);
    }
}
