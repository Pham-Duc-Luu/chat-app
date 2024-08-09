'use client';

import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
  EditorProvider,
  useEditorState,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { Editor } from '@tiptap/core';
import Controlbar from './Controlbar';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
const MyEditorToolbar = () => {
  return <div>MyEditorToolbar</div>;
};

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
    ],
    content: '<p>Hello World! 🌎️</p>',
    immediatelyRender: false,
  });
  return (
    <>
      <Controlbar editor={editor} />
      <EditorContent editor={editor} />
      {/* Other components that depend on the editor instance */}
    </>
  );
};

export default Tiptap;
