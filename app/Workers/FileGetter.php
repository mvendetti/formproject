<?php

namespace App\Workers;

use Storage;
use App\Form;

class FileGetter
{
    protected $extensions = [
        'mp4', 'mov', 'mpeg',
    ];

    public function getFiles() {
        $files = Storage::disk('videos')->files();

        foreach($files as $index => $file)
        {
            if(!$this->_validExtension($file))
            {
                unset($files[$index]);
            }

            if(Form::where('file_name', '=', $file)->exists()) {
                //
            }
        }
        return $files;
    }

    protected function _validExtension($file)
    {
        return in_array(pathinfo($file)['extension'], $this->extensions);
    }
}
