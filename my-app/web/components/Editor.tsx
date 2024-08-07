// components/Editor.tsx
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Link from '@editorjs/link';
import Delimiter from '@editorjs/delimiter';
import CheckList from '@editorjs/checklist';
import Embed from '@editorjs/embed';
import ImageTool from '@editorjs/image';
import InlineCode from '@editorjs/inline-code';
import LinkTool from '@editorjs/link';
import Quote from '@editorjs/quote';
import SimpleImage from '@editorjs/simple-image';
import CodeTool from '@editorjs/code';
import Table from '@editorjs/table';
import Underline from '@editorjs/underline';
import TextVariantTune from '@editorjs/text-variant-tune';
import Checklist from '@editorjs/checklist';

export const EDITOR_JS_TOOLS = {
  checkList: CheckList,
  textVariant: TextVariantTune,
  paragraph: {
    class: Paragraph,
    tunes: ['textVariant'],
    inlineToolbar: true,
  },
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: 'unordered',
    },
  },
  checklist: {
    class: Checklist,
    inlineToolbar: true,
  },
  underline: Underline,
  header: Header,
  delimiter: Delimiter,
  link: Link,
  image: SimpleImage,
  quote: {
    class: Quote,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+O',
    config: {
      quotePlaceholder: 'Enter a quote',
      captionPlaceholder: "Quote's author",
    },
  },
  inlineCode: {
    class: InlineCode,
    shortcut: 'CMD+SHIFT+M',
  },
  code: CodeTool,
  table: Table,
};

export interface IEditorProps {
  data: OutputData;
  onChange: (data: OutputData) => void;
}

const Editor = ({
  data,
  onChange,
  editorblock,
}: {
  data?: OutputData | undefined | null;
  onChange?: (data: any) => void;
  editorblock?: string;
}) => {
  //Initialize editorjs

  const editor = new EditorJS({
    holder: editorblock,

    tools: EDITOR_JS_TOOLS,

    async onChange(api, event) {
      const data = await api.saver.save();
      // onChange(data);
    },
  });

  //Add a return function to handle cleanup

  return <div id={editorblock} />;
};

export default Editor;
