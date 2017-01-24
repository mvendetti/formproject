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
            if(!$this->_validExtension($file) || $this->_filterFiles($file))
            {
                unset($files[$index]);
            }
        }
        return $files;
    }

    protected function _filterFiles($file)
    {
        return Form::where('file_name', $file)->exists();
    }

    protected function _validExtension($file)
    {
        return in_array(strtolower(pathinfo($file)['extension']), $this->extensions);
    }
}
