<?php

namespace App\Http\Controllers;

use App\Http\Controllers\APIController;
use Illuminate\Http\Request;
use App\Member;
use Illuminate\Support\Facades\DB;

class MemberController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Get user from $request token.
        // if (
        //     !($user = auth()
        //         ->setRequest($request)
        //         ->user())
        // ) {
        //     return $this->responseUnauthorized();
        // }


        $collection = Member::orderBy('id', 'DESC');


        $collection = $collection->get();

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
        // if (
        //     !($user = auth()
        //         ->setRequest($request)
        //         ->user())
        // ) {
        //     return $this->responseUnauthorized();
        // }
        $data = $request->input('data');
        $row = new Member();
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
    public function batchStore(Request $request)
    {
        // Get user from $request token.
        // if (
        //     !($user = auth()
        //         ->setRequest($request)
        //         ->user())
        // ) {
        //     return $this->responseUnauthorized();
        // }
        $data = $request->input('data');
        $file_info = $request->input('file_info');

        if (!is_array($data)) {
            $data = [];
        }

        // $db_data = Member::get()->toArray();

        $filtered = [];

        foreach ($data as $item) {
            $is_exist = false;
            // foreach ($db_data as $row) {
            //     if (($row['code'] == $item['code']) || !$item['code']) {
            //         $is_exist = true;
            //         break;
            //     }
            // }

            if (!$is_exist) {
                $item['updated_at'] = date('Y-m-d H:i:s');
                array_push($filtered, $item);
            }
        }

        $ret = Member::insert($filtered);

        return json_encode($ret);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        // if (
        //     !($user = auth()
        //         ->setRequest($request)
        //         ->user())
        // ) {
        //     return $this->responseUnauthorized();
        // }

        $collection = Member::where([
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
        // if (
        //     !($user = auth()
        //         ->setRequest($request)
        //         ->user())
        // ) {
        //     return $this->responseUnauthorized();
        // }
        $data = $request->input('data');

        $row = Member::where(['id' => $id])->first();

        if (!$row) {
            $row = new Member(['id' => $id]);
        }

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
        // if (
        //     !($user = auth()
        //         ->setRequest($request)
        //         ->user())
        // ) {
        //     return $this->responseUnauthorized();
        // }

        $ret = Member::where([['id', '=', $id]])->delete();

        return json_encode($ret);
    }
}
