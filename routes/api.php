<?php

use Illuminate\Http\Request;

Route::resource('file', 'FileController', ['only' => ['index']]);
Route::resource('form', 'FormController', ['only' => ['index', 'store']]);
