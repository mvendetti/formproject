<?php

namespace App\Http\Controllers;

use App\Form;
use App\Http\Requests\FormPostRequest;

class FormController extends Controller
{
    public function index() {
        return response()->json( Form::all() );
    }

    public function store(FormPostRequest $request) {
        return response()->json( Form::create($request->all()) );
    }

    public function edit(FormPostRequest $request, $id) {
        // return response()->json( Form:: )
    }

    public function destroy($id) {
        return response()->json( Form::destroy($id) );
    }
}
