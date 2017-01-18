<?php

namespace App\Http\Controllers;

use App\Form;
use Illuminate\Http\Request;

class FormController extends Controller
{
    public function index() {
        return response()->json( Form::all(array('file_name', 'owner_name', 'description')) );
    }

    public function store(Request $request) {
        return response()->json( Form::create($request->all()) );
    }
}
