<?php

Route::resource('file', 'FileController', ['only' => ['index']]);
Route::resource('form', 'FormController', ['only' => ['index', 'store']]);
Route::delete('form/{id}', 'FormController@destroy');
