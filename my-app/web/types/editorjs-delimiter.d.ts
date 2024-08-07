// types/editorjs-delimiter.d.ts
declare module '@editorjs/delimiter' {
  import { BlockTool, BlockToolConstructorOptions } from '@editorjs/editorjs';

  class Delimiter implements BlockTool {
    constructor(options: BlockToolConstructorOptions);
    render(): HTMLElement;
    save(blockContent: HTMLElement): {};
    static get toolbox(): {
      title: string;
      icon: string;
    };
  }

  export = Delimiter;
}
