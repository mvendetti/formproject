<?php

Route::get('/', 'HomeController@index');
Route::get('/{id}/edit', 'FormController@edit');
