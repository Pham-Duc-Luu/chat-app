// types/editorjs-code.d.ts
declare module '@editorjs/code' {
  import { BlockTool, BlockToolConstructorOptions } from '@editorjs/editorjs';

  interface CodeData {
    code: string;
  }

  class Code implements BlockTool {
    constructor(options: BlockToolConstructorOptions<CodeData>);
    render(): HTMLElement;
    save(blockContent: HTMLElement): CodeData;
    validate(savedData: CodeData): boolean;
    static get toolbox(): {
      title: string;
      icon: string;
    };
  }

  export = Code;
}
