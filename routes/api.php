<?php

Route::group(['middleware' => 'web'], function() {
    Route::post('login', ['as' => 'auth.login', 'uses' => 'Auth\LoginController@login']);
});

Route::post('register', ['as' => 'auth.register', 'uses' => 'Auth\RegisterController@register']);
Route::get('logout', ['as' => 'auth.logout', 'uses' => 'Auth\LoginController@logout']);

Route::group(['middleware' => 'auth'], function() {
    Route::resource('form', 'FormController', ['only' => ['index', 'show', 'store', 'update', 'destroy']]);
});

Route::resource('file', 'FileController', ['only' => ['index']]);
Route::resource('user', 'UserController', ['only' => ['index']]);
