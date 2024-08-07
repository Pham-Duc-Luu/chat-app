'use client';
// components/Editor.tsx
import React, { memo, useEffect, useId, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Link from '@editorjs/link';
import Delimiter from '@editorjs/delimiter';
import CheckList from '@editorjs/checklist';

export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  checkList: CheckList,
  list: List,
  header: Header,
  delimiter: Delimiter,
  link: Link,
};

export interface IEditorProps {
  data: OutputData;
  onChange: (data: OutputData) => void;
}

const Editor = ({ data, onChange, editorblock }: any) => {
  const ref = useRef<EditorJS>();
  //Initialize editorjs
  useEffect(() => {
    //Initialize editorjs if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: editorblock,

        tools: EDITOR_JS_TOOLS,
        data: data,
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
        },
      });
      ref.current = editor;
    }

    //Add a return function to handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);
  return <div id={editorblock} />;
};

export default memo(Editor);
