import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './editor.scss';

export default function Editor() {
  return (
    <div className="App">
      <CKEditor
        editor={ClassicEditor}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        config={{
          removePlugins: ['insertTable'],
        }}
      />
    </div>
  );
}
