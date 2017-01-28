<?php

Route::resource('file', 'FileController', ['only' => ['index']]);
Route::resource('form', 'FormController', ['only' => ['index', 'show', 'store', 'update', 'destroy']]);
