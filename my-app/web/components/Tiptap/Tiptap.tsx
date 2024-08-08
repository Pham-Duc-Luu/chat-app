'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { Editor } from '@tiptap/core';
const Tiptap = () => {
  new Editor({
    // bind Tiptap to `.element`
    //     element: document.querySelector('.element'),
    // register extensions
    extensions: [Document, Paragraph, Text],
    // set the initial content
    content: '<p>Example Text</p>',
    // place the cursor in the editor after initialization
    autofocus: true,
    // make the text editable (but that’s the default anyway)
    editable: true,
    // disable the loading of the default CSS (which is not much anyway)
    injectCSS: false,
  });
  const editor = useEditor({
    extensions: [StarterKit, Document, Paragraph, Text],
    content: '<p>Hello World! 🌎️</p>',
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
