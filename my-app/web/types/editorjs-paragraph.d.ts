// types/editorjs-paragraph.d.ts
declare module '@editorjs/paragraph' {
  import { BlockTool, BlockToolConstructorOptions } from '@editorjs/editorjs';

  interface ParagraphData {
    text: string;
  }

  class Paragraph implements BlockTool {
    constructor(options: BlockToolConstructorOptions<ParagraphData>);
    save(blockContent: HTMLElement): ParagraphData;
    render(): HTMLElement;
    static get toolbox(): {
      title: string;
      icon: string;
    };
    static get sanitize(): {
      text: boolean;
    };
  }

  export = Paragraph;
}
