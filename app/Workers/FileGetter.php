<?php

namespace App\Workers;

use Storage;

class FileGetter
{
    protected $extensions = [
        'mp4', 'mov', 'mpeg',
    ];

    public function getFiles() {
        $files = Storage::disk('local')->files('videos');
        foreach($files as $index => $file)
        {
            if(!$this->_validExtension($file))
            {
                unset($files[$index]);
            }
        }
        return $files;
    }

    protected function _validExtension($file)
    {
        return in_array(pathinfo($file)['extension'], $this->extensions);
    }
}
