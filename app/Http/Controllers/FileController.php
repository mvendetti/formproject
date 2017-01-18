<?php

namespace App\Http\Controllers;

use App\Workers\FileGetter;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function index() {
        $worker = New FileGetter;
        $files = $worker->getFiles();

        return response()->json($files);
    }
}
