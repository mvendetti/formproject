<?php

namespace App\Http\Controllers;

use App\Form;
use App\Http\Requests\FormPostRequest;
use App\Http\Requests\FormUpdateRequest;

class FormController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index() {
        return response()->json( Form::all() );
    }

    public function show($id) {
        return response()->json( Form::find($id) );
    }

    public function store(FormPostRequest $request) {
        return response()->json( Form::create($request->all()) );
    }

    public function update(FormUpdateRequest $request, $id) {
        return response()
            ->json( Form::where('id', $id)
            ->update($request->all()) );
    }

    public function destroy($id) {
        return response()->json( Form::destroy($id) );
    }
}
