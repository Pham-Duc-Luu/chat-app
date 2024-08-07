// components/Editor.tsx
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { useEffect, useId, useRef } from 'react';
// import Paragraph from '@editorjs/paragraph';
// import Header from '@editorjs/header';
// import List from '@editorjs/list';
// import Link from '@editorjs/link';
// import Delimiter from '@editorjs/delimiter';
// import CheckList from '@editorjs/checklist';
// import Embed from '@editorjs/embed';
// import ImageTool from '@editorjs/image';
// import InlineCode from '@editorjs/inline-code';
// import LinkTool from '@editorjs/link';
// import Quote from '@editorjs/quote';
// import SimpleImage from '@editorjs/simple-image';
// import CodeTool from '@editorjs/code';
// import Table from '@editorjs/table';
// import Underline from '@editorjs/underline';
// import TextVariantTune from '@editorjs/text-variant-tune';
// import Checklist from '@editorjs/checklist';
export const EDITOR_JS_TOOLS = {};

export interface IEditorProps {
  data: OutputData;
  onChange: (data: OutputData) => void;
}

const Editor = () => {
  //Initialize editorjs
  const editorRef = useRef<EditorJS | null>(null);

  const id = useId();
  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: id,
      });
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();

        editorRef.current = null;
      }
    };
  }, [id]);

  //Add a return function to handle cleanup

  return (
    <div className="editor-container">
      <div id={id} className="border border-gray-300 p-4"></div>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Save
      </button>
    </div>
  );
};

export default Editor;
