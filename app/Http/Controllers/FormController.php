<?php

namespace App\Http\Controllers;

use App\Form;
use Illuminate\Http\Request;
use App\Http\Requests\FormPostRequest;

class FormController extends Controller
{
    public function index() {
        return response()->json( Form::all(array('file_name', 'owner_name', 'description')) );
    }

    public function store(FormPostRequest $request) {
        return response()->json( Form::create($request->all()) );
    }
}
