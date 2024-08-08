// components/Editor.tsx
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { useEffect, useId, useRef } from 'react';
import Paragraph from '@editorjs/paragraph';
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

const Editor = () => {
  //Initialize editorjs
  const editorRef = useRef<EditorJS | null>(null);

  const id = useId();

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: id,
        tools: {},
      });
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();

        editorRef.current = null;
      }
    };
  }, [id]);

  return (
    <div className="editor-container">
      <div id={id}></div>
    </div>
  );
};

export default Editor;
